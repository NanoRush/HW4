if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

// referenced https://www.youtube.com/watch?v=c6zI1gCaO-c 

//importing libraries that we installed with npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")//importing bycrpt packages
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
//const ejs = require('ejs')
const methodOverride= require("method-override")
const mongoose =require('mongoose')
const User = require("./Users")
mongoose.connect("mongodb://0.0.0.0:27017/PetrolPricer")
app.set('view engine', 'ejs');

/*
function getmail( email){
    var temp=User.find({email:email})
    return temp[0].email

}

function getmailid( id){
    var temp=User.find({_id:id})
    return temp[0]._id.toString()

}
*/

//function that will authenticate users from db
initializePassport(
    passport,
    //email => users.find(user=>user.email === email),
    //id => users.find(user =>user.id===id),
    //email => getmail(email),
    //id => getmailid(id)
    )

const users =[]

app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,//we wont resave the session var if nothing changes
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use('/css', express.static(__dirname + 'public/css'));


//configure the login post functionality
//logins in users
app.post("/login",checkNotAuthenticated,passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))



/*
app.post("/login",checkNotAuthenticated,async (req,res)=>{

try {
    var email1 = req.body.email
    var password1=req.body.password
    const val = await User.find({email:email1})
    if(bcrypt.compare(password1,val[0].password)){
        
        console.log("logged in")
        //res.redirect("/")
        
    }
    
    
} catch (e) {
    console.log(e)
    //res.redirect("/login")
}

})
*/



//configure the register post functionality
//registers users
app.post("/register", checkNotAuthenticated, async (req,res)=>{
    try{
        //we already hashed the password in backend using bcyrpt
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            zipcode:req.body.zipcode, 
            password: hashedPassword,
        })

        const nUser = await User.create({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            zipcode:req.body.zipcode, 
            password:hashedPassword
        })
        await nUser.save()
        console.log(users);//display newly registed users
        console.log(nUser);
        res.redirect("/login")
    }catch(e){
        console.log(e);
        res.redirect("/register")
    }
})

//routes

//renders the dashboard,login,and register pages
app.get('/',checkAuthenticated,(req,res)=>{
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login',checkNotAuthenticated, (req, res)=>{

    res.render("login.ejs")

})

app.get('/register',checkNotAuthenticated,(req,res)=>{
    res.render("register.ejs")
})
//end routes
//logout
app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}
app.listen(3000)
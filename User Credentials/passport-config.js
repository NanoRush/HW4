const LocalStrategy = require("passport-local").Strategy
const bycrpt = require("bcrypt")
const mongoose = require("mongoose")
const User = require("./Users")
mongoose.connect("mongodb://0.0.0.0:27017/PetrolPricer")


function initialize(passport){
    //function to auth users
    var id2='';
    const authenticateUsers= async (email, password, done) =>{
        //get users by email
        //console.log("the email")
        //console.log(email)
        //console.log("the db user")

        //will find user in db based on user input 
        const val = await User.find({email:email})
        const val2=val[0]
        console.log(val2)
        
        //const user1 = getUserByEmail(email)
        
        //if user doesn't exist  say no user exist
        if(val2== null){
            //console.log("the user")
            //console.log(user)
            
            return done(null,false,{message: "No user found with that email"})
        }
        const user ={id:val2.id,email:val2.email,password:val2.password}
        id2=user.id
        console.log("the user")
        console.log(user)

        //authenticate user comparing hashed passwords
        try {
            if(await bycrpt.compare(password, user.password)){
                return done(null,user)
            }else{
                //if wrong password tell them
                return done(null, false,{message: "Password Incorrect"})
            }
        } catch (e) {
            console.log(e);
            return done(e)
            
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'},authenticateUsers))
    passport.serializeUser((user, done)=>done(null,user.id))
    passport.deserializeUser((id2, done)=>{
        return done(null, id2)
    })
}

module.exports = initialize
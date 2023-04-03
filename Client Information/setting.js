//frontend
const bodyParser = require("body-parser");
const express = require("express");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/usersDB");

const usersSchema = new mongoose.Schema ({
    id: Number,
    full_name: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipcode: Number,
    user_name: String,
    password: String,
    cardNumber: String,
    cardExp: String,
    cvv: Number
});

const User = mongoose.model("User", usersSchema);

const user = new User ({
    id: 1,
    full_name: 'John Deer',
    email: 'John@gmail.com',
    address: '123 Main st.',
    city: 'Houston',
    state: 'TX',
    zipcode: 12345,
    user_name: 'John123',
    password: '123',
    cardNumber: '123456789',
    cardExp: '11/27',
    cvv: 312
})

//user.save();



const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.get("/setting", (req, res)=>{
    User.find().then(function(usersdata){
        let temp = usersdata;
    
        res.render("setting", 
        {fullName: temp[0].full_name, 
        userEmail: temp[0].email,
        userName: temp[0].user_name,
        address: temp[0].address,
        city: temp[0].city,
        state: temp[0].state,
        zipCode: temp[0].zipcode,
        cardNumber: temp[0].cardNumber,
        expirationDate: temp[0].cardExp,
        cvv: temp[0].cvv,
        }
        );
        
    });
});


app.post("/setting", (req, res)=>{
    if (req.body.fullName){

        const doc = User.findOneAndUpdate(
            { name: req.body.fullName},
            { new: true }
          );
        console.log(doc);

        //User.updateOne({id: 1}, {$set: {full_name: req.body.fullName}});
    }
    if (req.body.userEmail){
        User.updateOne({id: 1}, {$set: {email: req.body.userEmail}});
    }
    if (req.body.address){
        User.updateOne({id: 1}, {$set: {address: req.body.address}});
    }
    if (req.body.city){
        User.updateOne({id: 1}, {$set: {city: req.body.city}});
    }
    if (req.body.state){
        User.updateOne({id: 1}, {$set: {state: req.body.state}});
    }
    if (req.body.zipCode){
        User.updateOne({id: 1}, {$set: {zipcode: req.body.zipCode}});
    }
    if (req.body.userName){
        User.updateOne({id: 1}, {$set: {userName: req.body.userName}});
    }
    if (req.body.password){
        User.updateOne({id: 1}, {$set: {password: req.body.password}});
    }
    if (req.body.cardNumber){
        User.updateOne({id: 1}, {$set: {cardNumber: req.body.cardNumber}});
    }
    if (req.body.expirationDate){
        User.updateOne({id: 1}, {$set: {cardExp: req.body.expirationDate}});
    }
    if (req.body.cvv){
        User.updateOne({id: 1}, {$set: {cvv: req.body.cvv}});
    }
    
    res.redirect("setting");

});


app.listen(3000, () => {console.log("Server's running on port 3000")});

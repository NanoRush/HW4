
const mongoose = require("mongoose");
const History = require("./history");
const Client = require("./client");
const express = require('express');

mongoose.connect("mongodb://127.0.0.1:27017/PetrolPricer");


const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use('/css', express.static(__dirname + 'public/css'));

app.set('view-engine', 'ejs');

app.get("/", (req, res) => {

    res.render("index.ejs");

} );

app.get("/dashboard", (req, res) => {

    res.render("dashboard.ejs");

} );

app.get("/history", (req, res) => {

    res.render("history.ejs");

} );

app.get("/register", (req, res) => {

    res.render("register.ejs");

} );

app.get("/login", (req, res) => {

    res.render("login.ejs");

} );

var localID = "642a06397c9a94d473a56eb6";

app.get("/items", (req, res) => {

    runAd();
    async function runAd(){

        const temp2 = await Client.findById(localID);
        
        if(temp2 == null){
            return;
        }

        res.status(200).json({

            address: temp2.address,
            clientID: temp2.id

        });

    }
});

app.post("/dashboard", (req, res) => {

    run();
    async function run(){

        const hist = new History({
            clientID: req.body.clientID,
            requested: req.body.gallons,
            address: req.body.address,
            date: req.body.date,
            suggested: "$300",
            total: "$" + parseInt(300 * req.body.gallons)
        });
    
        await hist.save();
    
    }

    localID = req.body.clientID;

});

gallons = [];
address = [];
date = [];
suggested = [];
total = [];

app.get("/info", (req, res) => {

    var historyLength;

    runQuery();
    async function runQuery(){

        const temp = await History.find({clientID: localID});

        let historyLength = temp.length;

        for(let x = 0; x < historyLength; x++){
            gallons.push(temp[x].requested);
            address.push(temp[x].address);
            date.push(temp[x].date);
            suggested.push(temp[x].suggested);
            total.push(temp[x].total);
        }

    }


    res.status(200).json({
        
        clientID: localID,
        gallons: gallons,
        address: address,
        date: date,
        suggested: suggested,
        total: total

    });

    gallons = [];
    address = [];
    date = [];
    suggested = [];
    total = [];

} );



app.listen(3000);






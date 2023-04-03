const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({

    address: String
    
}, {collection: "client"});

module.exports = mongoose.model("client", clientSchema);


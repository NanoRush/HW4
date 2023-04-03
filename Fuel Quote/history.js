const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({

    clientID: String,
    requested: Number,
    address: String,
    date: String,
    suggested: String,
    total: String

}, {collection: "purchase_history"});

module.exports = mongoose.model("purchase_history", historySchema);

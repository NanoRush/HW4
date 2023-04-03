const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

    id: String,
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    zipcode: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("User",userSchema)
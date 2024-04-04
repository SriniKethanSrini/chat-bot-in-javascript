const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://smsrinikethan:secret@67@cluster0.wg2hzc9.mongodb.net/login-tut");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema mongodb://localhost:27017/login-tut    mongodb+srv://smsrinikethan:<password>@cluster0.wg2hzc9.mongodb.net/
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;
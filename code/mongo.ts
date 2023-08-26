const mongoose = require("mongoose");

const Credentials = mongoose.connect("mongodb://localHOST:27017/Credentials",{
     useNewUrlParser : true,
     useUnifiedTopology: true
})

const loginSchema={
    name: String,
    email: String,
    userID: String,
    password: String,
    repassword: String,
}

const newLogin= mongoose.model("newLogin", loginSchema);

export {newLogin};
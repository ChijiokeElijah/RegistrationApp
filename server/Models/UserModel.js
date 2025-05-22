const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    FirstName:{
        type: String
    },
    LastName:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    confirmPassword:{
        type: String
    },
    RegNum:{
        type: String
    }

})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:[true,'Please add username']
    },
    email:{
        type:String,
        trim:true,
        require:[true,'Please add a email']
    },
    password:{
        type:String,
        trim:true,
        require:[true,'Please add a password']
    },
    password2:{
        type:String,
        trim:true,
        require:[true,'Please add a password']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',UserSchema);


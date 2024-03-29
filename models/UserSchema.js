const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
});

UserSchema.pre('save',function(next){
    this.password =bcrypt.hashSync(this.password,10);
    next();
});

module.exports = mongoose.model("User",UserSchema);
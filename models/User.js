const  mongoose = require('mongoose');
const { Schema } = mongoose;

//Object of Schema
const  UserSchema = new Schema({
    name :{
        type : String ,
        required : true
    },
    location :{
        type:String,
        required : true
    },
    email :{
        type:String,
        required : true
    },
    password :{
        type:String,
        required : true
    },
    date :{
        type:Date,
        default : Date.now
    }

});
//Humare database me store ho jaaega ye model jisme user ye hoga or ye given UserSchema

module.exports = mongoose.model('user' , UserSchema)
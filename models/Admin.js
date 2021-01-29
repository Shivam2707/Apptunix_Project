const { timeStamp } = require('console');
const mongoose = require('mongoose');

const requiredString = {
    type : String,
    required : true
}

const adminModel = new mongoose.Schema({
    firstName : requiredString,
    lastName : requiredString,
    email : {
        ...requiredString,
        unique:true
    },
    password:requiredString,
    address : requiredString,
    isDelete : {
        type:Boolean,
        default:false
    },
    isBlocked : {
        type:Boolean,
        default:false
    }
},{
    timeStamp:true,
    versionKey: false
});

module.exports = mongoose.model('admin',adminModel);
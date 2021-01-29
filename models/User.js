const mongoose = require("mongoose");
const bcrypt=require('bcryptjs');

const requiredString = {
    type: String,
    required: true
};


const userModel = new mongoose.Schema({
    name: requiredString,
    email: {
        ...requiredString,
        unique: true
    },
    password: requiredString,
    address:requiredString,
    isVerified:{
        type:Boolean,
        default:false
    }
});
// userModel.pre("save",async function(next) {
//     console.log(this);
//     let {password} = this
//     const salt = await bcrypt.genSalt(10);
//     password = await bcrypt.hash(password,salt);
// })

module.exports = mongoose.model('user', userModel);
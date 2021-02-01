const services = require("../services");
const status = require("../utils/statusCodes")
const {models} = require("../models");
const jwt = require('jsonwebtoken');
const responses= require('../response/responses')
const md5 = require('md5');
const config = require("config");

module.exports.login = async (req, res) => {
    try {
        const found = await services.findOne(models.User, "email", req.body.email);
        if (found) {
            const password = md5(req.body.password);
            if (password === found.password) {
                const token =await jwt.sign(found.id,config.get("secretKey"));
                console.log(token);
                res.status(status.accepted).json({ success: true, message: responses.responseMessages.LOGGED_IN });
            }
            else {
                res.json({ success: false, message: responses.responseMessages.INCORRECT_CREDENTIALS });
            }
        }
        else {
            res.send("Email not found");
        }
    } catch (error) {
        console.error(responses.responseMessages.INCORRECT_CREDENTIALS);
    }
}

module.exports.getProfile = async (req, res) => {
    try {
        const token = req.header('authorization');
        
        if (token) {
            const decode = await jwt.verify(token,config.get("secretKey"));
            let userProfile = await models.User.findById(decode);
            res.json({success:false,restaurantProfile:userProfile});
        }
        else {
            res.send("Invalid Token");
        }
    } catch (error) {
        res.json({success:false,message:responses.responseMessages.TOKEN_MISSING});
    }
}

module.exports.updateProfile = async(req,res) =>{
    try {
        const token = req.header('authorization');
        if (token) {
            const decode = await jwt.verify(token,config.get("secretKey"));
            let updatedProfile = await models.User.findByIdAndUpdate(decode, req.body,{new:true});
            res.json({success:false,updatedProfile:updatedProfile});
        }
        else {
            res.send("Invalid Token");
        }
    } catch (error) {
        res.json({success:false,message:responses.responseMessages.TOKEN_MISSING});
    }
}




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
            console.log("jkfb");
            if (password === found.password) {
                console.log("enter=====",id);
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




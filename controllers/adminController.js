const services = require("../services"),
 status = require("../utils/statusCodes"),
 { models } = require("../models"),
 responses = require("../response/responses"),
 config = require("config"),
 jwt = require('jsonwebtoken'),
 md5 = require('md5');
 const sgMail = require('@sendgrid/mail');
const { findOneAndUpdate } = require("../models/User");

// module.exports.register = async (req, res) => {
//     try {
//         req.body.password = md5(req.body.password);
//         let admin = await services.createModel(models.Admin,req.body);
//         const payload = admin.id;
//         const token = services.genToken(payload, config.get("secretKey"));
//         res.send(token);
//         res.status(status.created).json({ success: true, message: responses.responseMessages.SIGNED_UP});
//     } catch (error) {
//         res.json({success: false,message : responses.responseMessages.NOT_CREATED});
//     }
// }

module.exports.login= async (req, res) => {
    try {
        const found = await services.findOne(models.Admin, "email", req.body.email);
        console.log(found);
        if(found) {
            const payload={
                id:found._id
            };
            const password = md5(req.body.password);
            if(password === found.password) {
                res.status(status.accepted).json({ success: true, message: responses.responseMessages.LOGGED_IN });
            }
            else{
                res.json({success:false, message:responses.responseMessages.INCORRECT_CREDENTIALS});
            }
        }
        else{
            res.send("Email not found");
        }
    } catch (error) {
        console.error(responses.responseMessages.INCORRECT_CREDENTIALS);
    }
}

module.exports.addRestaurant = async(req,res) =>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        req.body.password = md5(req.body.password);
        if(!(email || name || address || req.body.password)){
            res.send("Parameters missing");
        }
        else{
            let restaurantDetails = await services.createModel(models.User,req.body);
            const id = restaurantDetails.id;
           // console.log(id);
            // if(restaurantDetails){
            //     res.status(status.created).json({success:true, message:responses.responseMessages.ADDED});
            // }
        // const email = restaurantDetails.email;
        const payload = {
            restaurantId:id,
            to : email,
            from : "shivam@apptunix.com",
            subject :"Thanks",
            text : "hfnjwkf"
        }
        res.json({status:200, restaurantDetails :restaurantDetails});
        //res.json({user:payload.restaurantDetails});
        const mail = await services.sendEmail(payload);
    }
    } catch (error) {
        res.json({success:false,message:responses.responseMessages.NOT_CREATED});
    }
}

module.exports.verifyRestaurant = async(req, res) => {
    try {
        console.log("---------------------------------------");
        const id = req.params.id;
        const isExist = await models.User.findByIdAndUpdate({_id:id},{isVerified:true},{new:true});
        console.log(isExist,"isE")
        if(isExist){
            isExist.isVerified = true;
            res.send("Created")
        }
        else{
            res.send("User does not exist");
        }
    } catch (error) {
        res.json({success:false,message:responses.responseMessages.NOT_CREATED});
    }
}
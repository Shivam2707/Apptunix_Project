const services = require("../services");
const status = require("../utils/statusCodes")
const {models} = require("../models");

module.exports.register = async(req, res) => {
    try {
         const user = await services.createModel(models.User, req.body);
         res.status(200).json({success: true, message: 'User add success !!'})
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports.dashboard = async() => {
    try {
        
    } catch (error) {
        
    }
}
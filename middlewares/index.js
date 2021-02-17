const jwt = require("jsonwebtoken");
const config = require("config")
const joi = require('joi');

const middlewares = {
    verifyToken : (req, res, next) => {
    // check token here
    const token = req.header("authorization");
        if (token){
            const verified = jwt.verify(token, config.get("secretKey"));
            req.user = verified.id;
            next();
        } else {
            return res.status(401).json({success: false, messaage: "Not Authorized !"})
        }
    },
    validator : async (req,res,next) =>{
        const email = req.body.email;
        const password = req.body.password;
        const schema = joi.object({
            email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required(),
            password: joi.string().min(5).required()
        })
        try {
            const value = await schema.validateAsync({email,password});
            next();
        }
        catch (err) {
            err.status = 422;
            res.sendStatus(err.status);
         }
    }
}

module.exports = middlewares;
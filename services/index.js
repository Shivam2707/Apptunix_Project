const jwt = require('jsonwebtoken');
const config = require('config');
const sgMail = require('@sendgrid/mail')

const services = {
    createModel: async (Model, body) => {
        console.log("Working !!");
        const modelObj = new Model(body);
        return await modelObj.save();
    },
    findOne: async (Model, k, v) => {
       // console.log(v,k,"que")
        //const val = ObjectId(v);
        //console.log(v,typeof(v),"-----------v--------------");
        const query = {};
        query[k] =v ;
        console.log(query,"que")
        const ans = await Model.findOne(query);
        return ans;
    },
    genToken: (payload, key) => {
        const token = jwt.sign(payload, key);
        //  console.log(token)
        return token;
    },
    sendEmail: (payload) => {
       // restaurantId = payload.restaurantId;
       // console.log(restaurantId);
        sgMail.setApiKey(config.get("sendGridKey"));
        link=`http://localhost:8000/api/admin/auth/verifyRestaurant/${payload.restaurantId}`;
        const msg = {
            to: payload.to, // Change to your recipient
            from: payload.from, // Change to your verified sender
            subject: payload.subject,
           // text: 'http://localhost:8000/api/admin/auth/addRestaurant/:${restaurantId}',
            html :" <a href="+link+">Click here to verify</a>"
           // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            })
    }

};

module.exports = services;
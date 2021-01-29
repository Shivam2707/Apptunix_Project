const express = require("express");
const routes = require("../utils/routeConstants");
const middlewares = require("../middlewares")
const adminController = require("../controllers/adminController")
const router = express.Router();


//     /v/auth/register
//router.get(routes.userAuth.register, userController.register);
// router.post("/dashboard", middlewares.verifyToken ,userController.dashboard)

//router.post(routes.adminAuth.register,adminController.register);
router.post(routes.adminAuth.login,middlewares.verifyToken,adminController.login);
router.post(routes.adminAuth.addRestaurant,adminController.addRestaurant);
router.get("/verifyRestaurant/:id",adminController.verifyRestaurant);

module.exports = router;
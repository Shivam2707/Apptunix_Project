const express = require("express");
const routes = require("../utils/routeConstants");
const middlewares = require("../middlewares")
const adminController = require("../controllers/adminController")
const router = express.Router();


//     /v/auth/register
//router.get(routes.userAuth.register, userController.register);
// router.post("/dashboard", middlewares.verifyToken ,userController.dashboard)

router.post(routes.adminAuth.register,middlewares.validator,adminController.register);
router.post(routes.adminAuth.login,middlewares.verifyToken,adminController.login);
router.post(routes.adminAuth.addRestaurant,middlewares.verifyToken,middlewares.validator,adminController.addRestaurant);
router.get("/verifyRestaurant/:id",adminController.verifyRestaurant);
router.post(routes.adminAuth.forgotPassword,adminController.forgotPassword);
router.post("/resetPassword/:id",adminController.resetPassword);
router.post(routes.adminAuth.getProfile,adminController.getProfile);
router.post(routes.adminAuth.updateProfile,adminController.updateProfile);

module.exports = router;
const express = require("express");
const routes = require("../utils/routeConstants");
const middlewares = require("../middlewares")
const userController = require("../controllers/userController")
const router = express.Router();

//     /v/auth/register
router.post(routes.userAuth.login, userController.login);
router.post(routes.userAuth.getProfile, middlewares.verifyToken ,userController.getProfile);
router.post(routes.userAuth.updateProfile,userController.updateProfile);
module.exports = router;
const express = require("express");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");
const router = express.Router();


router.use("/admin/auth",adminRoutes);
router.use("/userauth",userRoutes);
module.exports = router;
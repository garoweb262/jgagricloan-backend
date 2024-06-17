const express = require("express");
const userController = require("../controllers/user.controller");
const adminAuthMiddleware = require("../middleware/admin-auth");
const router = express.Router();


router.get("/test", userController.createAdmin);
router.post("/create", userController.createUser);
router.post("/login", userController.login);
router.get("/", userController.index);
module.exports = router;

const express = require("express");
const userController = require("../controllers/user.controller");
const adminAuthMiddleware = require("../middleware/admin-auth");
const router = express.Router();

router.get("/token", userController.byToken);
router.get("/:id", userController.show);
router.get("/", userController.index);
router.put("/:id", adminAuthMiddleware.isAdmin, userController.update);

router.put(
  "/upload-photo/:id",
  adminAuthMiddleware.isAdmin,
  userController.uploadPic
);
router.delete("/delete/:id", userController.destroy);
module.exports = router;

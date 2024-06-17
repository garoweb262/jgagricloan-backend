const express = require("express");
const uploadController = require("../controllers/upload.controller");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/", upload.single("document"),  uploadController.uploadFile);

module.exports = router;

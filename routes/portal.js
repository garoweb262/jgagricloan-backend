const express = require("express");
const portalController = require("../controllers/portal.controller");
const router = express.Router();

router.post("/", portalController.createOrUpdate);
router.put("/", portalController.createOrUpdate);
router.get("/:id", portalController.getById);

module.exports = router;

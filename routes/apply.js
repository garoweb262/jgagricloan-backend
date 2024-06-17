const express = require("express");
const applyController = require("../controllers/apply.controller");
const statisticsController = require("../controllers/statistics.controller");
const router = express.Router();

router.post("/", applyController.create);
router.get("/counts", statisticsController.statistics);
router.get("/:id", applyController.getById);
router.get("/", applyController.index);

router.delete("/:id", applyController.destroy);

module.exports = router;

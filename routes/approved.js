const express = require("express");
const approvedController = require("../controllers/approved.controller");
const AdminMiddleware = require("../middleware/admin-auth");
const router = express.Router();

router.post("/", AdminMiddleware.isAdmin, approvedController.create);
router.post("/bulks", AdminMiddleware.isAdmin, approvedController.uploadStaff);
router.put("/", AdminMiddleware.isAdmin, approvedController.update);
router.get("/psn/:psn", approvedController.getByPsn);
router.put("/:psn", AdminMiddleware.isAdmin, approvedController.updateDisbursement);
router.get("/:id", approvedController.getById);
router.get("/", approvedController.index);
router.delete("/:id", AdminMiddleware.isAdmin, approvedController.destroy);

module.exports = router;

const express = require("express");
const staffController = require("../controllers/staff.controller");
const AdminMiddleware = require("../middleware/admin-auth");
const router = express.Router();

router.post("/", AdminMiddleware.isAdmin, staffController.create);
router.post("/bulks", AdminMiddleware.isAdmin, staffController.uploadStaff);
router.put("/", AdminMiddleware.isAdmin, staffController.update);
router.get("/psn/:psn", staffController.getByPsn);
router.get("/:id", staffController.getById);
router.get("/", staffController.index);
router.delete("/:id", AdminMiddleware.isAdmin, staffController.destroy);

module.exports = router;

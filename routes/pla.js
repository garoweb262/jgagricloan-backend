const express = require("express");
const plaController = require("../controllers/pla.controller");
const AdminMiddleware = require("../middleware/admin-auth");
const router = express.Router();

router.post("/", AdminMiddleware.isAdmin, plaController.create);
router.post("/bulks", AdminMiddleware.isAdmin, plaController.uploadStaff);
router.put("/", AdminMiddleware.isAdmin, plaController.update);
router.get("/pla/:pla", plaController.getByPla);
router.put("/:pla", AdminMiddleware.isAdmin, plaController.updateDisbursement);
router.get("/:id", plaController.getById);
router.get("/", plaController.index);
router.delete("/:id", AdminMiddleware.isAdmin, plaController.destroy);

module.exports = router;

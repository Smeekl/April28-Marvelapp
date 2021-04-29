import express = require("express");
import PlacementController from "../controllers/placement.controller";
const router = express.Router();

router.post("/", PlacementController.create);
router.post("/match", PlacementController.match);
router.get("/", PlacementController.getAll);
router.get("/:id", PlacementController.getById);

module.exports = router;

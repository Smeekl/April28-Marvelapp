import express = require("express");
import PlacementController from "../controllers/placement.controller";
const router = express.Router();

router.post("/", PlacementController.create);
router.get("/", PlacementController.getAll);

module.exports = router;

import express = require("express");
import FamilyController from "../controllers/family.controller";
const router = express.Router();

/* GET home page. */
router.post("/", FamilyController.create);
router.get("/", FamilyController.getAll);

module.exports = router;

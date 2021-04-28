import express = require("express");
import CriteriaController from "../controllers/criteria.controller";
const router = express.Router();

/* GET home page. */
router.post("/", CriteriaController.create);
router.get("/", CriteriaController.getAll);

module.exports = router;

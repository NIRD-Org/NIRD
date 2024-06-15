import express from "express";
import {
  getAllindicators,
  insertManyIndicator,
} from "../controllers/indicatorController.js";

const router = express.Router();

router.route("/many").post(insertManyIndicator);
router.route("/get").get(getAllindicators);

export default router;

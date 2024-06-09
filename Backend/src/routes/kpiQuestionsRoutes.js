import express from "express";
import {
  getAllKpiQuestions,
  getQuestionsById,
} from "../controllers/kpiQuestionsController.js";

const router = express.Router();

router.route("/all").get(getAllKpiQuestions);
router.route("/get").get(getQuestionsById);

export default router;

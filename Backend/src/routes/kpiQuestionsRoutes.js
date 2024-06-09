import express from "express";
import {
  createKPIQuestion,
  getAllKpiQuestions,
  getQuestionsById,
} from "../controllers/kpiQuestionsController.js";

const router = express.Router();

router.route("/all").get(getAllKpiQuestions);
router.route("/get").get(getQuestionsById);
router.route("/create").post(createKPIQuestion);

export default router;

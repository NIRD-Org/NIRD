import express from "express";
import {
  createKPIQuestion,
  deleteKPIQuestion,
  getAllKpiQuestions,
  getQuestionsById,
} from "../controllers/kpiQuestionsController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.use('/create',isAuth);
router.route("/all").get(getAllKpiQuestions);
router.route("/get").get(getQuestionsById);
router.route("/create").post(createKPIQuestion);
router.route("/delete/:id").put(deleteKPIQuestion);

export default router;

import express from "express";
import {
  createGoodPractice,
  getAllGoodPractices,
  getGoodPracticeById,
  updateGoodPractice,
  deleteGoodPractice,
  approveGoodPractice
} from "../controllers/goodPracticeController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.use('/create', isAuth);

router.route("/create").post(createGoodPractice);
router.route("/").get(getAllGoodPractices);
router.route("/:id").get(getGoodPracticeById).put(updateGoodPractice).delete(deleteGoodPractice);
router.route('/:id/approve').put(approveGoodPractice);
export default router;

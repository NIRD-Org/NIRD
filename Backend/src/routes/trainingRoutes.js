import express from "express";
import {
  createTraining,
  getAllTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
  approveTraining,
  getTrainingData,
  getAllTrainingImages,
} from "../controllers/trainingController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/create").post(isAuth, createTraining);

router.route("/all").get(isAuth, getAllTrainings);
router.route("/").get(getTrainingData);
router.route("/gallery").get(getAllTrainingImages);

router
  .route("/:id")
  .get(getTrainingById)
  .put(updateTraining)
  .delete(deleteTraining);

router.route("/:id/approve").put(approveTraining);

export default router;

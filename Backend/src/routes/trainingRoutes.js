import express from "express";
import {
    createTraining,
    getAllTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining
} from "../controllers/trainingController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.use('/create', isAuth);
router.route("/create").post(createTraining);
router.route("/").get(getAllTrainings);
router.route("/:id").get(getTrainingById).put(updateTraining).delete(deleteTraining);

export default router;

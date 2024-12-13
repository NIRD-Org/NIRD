import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createTrainingMaterial, getAllTrainingMaterial, getTrainingMaterialById } from "../controllers/trainingMaterialController.js";

const router = express.Router();
router.use("/create", isAuth);
router.route("/create").post(createTrainingMaterial);
router.route("/all").get(getAllTrainingMaterial);
router.route("/:id").get(getTrainingMaterialById);


export default router;

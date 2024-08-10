import express from "express";
import {
  getAllStates,
  createState,
  getStateById,
  deleteState,
  updateState,
  insertManyStates,
} from "../controllers/soeprStateController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();
router.use("/create", isAuth);

router.route("/all").get(getAllStates);
router.route("/create", isAuth).post(createState);
router.route("/:id").get(getStateById);
router.route("/:id").delete(deleteState);
router.route("/:id").put(updateState);
router.route("/get-state/:id").get(getStateById);
router.route("/many", isAuth).post(insertManyStates);

export default router;

import express from "express";
import {
  getAllStates,
  createState,
  getStateById,
  deleteState,
  updateState,
} from "../controllers/statesController.js";

const router = express.Router();

router.route("/all").get(getAllStates);
router.route("/create").post(createState);
router.route("/:id").get(getStateById);
router.route("/delete/:id").put(deleteState);
router.route("/:id").put(updateState);

export default router;

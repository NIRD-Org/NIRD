import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  createPmupoa,
  getAllPmupoaData,
  updatePmupoaData,
  getPmupoaData,
} from "../controllers/PmuPoaController.js";

const router = express.Router();

// Create a new Pmupoa entry
router.route("/create").post(isAuth, createPmupoa);

// Get all Pmupoa data (e.g., for Admin access)
router.route("/all").get(getAllPmupoaData);

// Update a specific Pmupoa entry by ID
router.route("/update/:poaId").post(isAuth, updatePmupoaData);

// Get all Pmupoa entries for the logged-in user
router.route("/getUserPOAs").get(isAuth, getPmupoaData);


export default router;

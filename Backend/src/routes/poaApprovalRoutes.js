import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  createPoa1,
  getAllPoa1Data,
  getPoa1DataByState,
  getPoa1s,
  getPoalData,
  updatePoa1Data,
} from "../controllers/PoaApprovalController.js";

const router = express.Router();

// Create a new POA1 (or append to existing for that month)
router.route("/create").post(isAuth, createPoa1);

// Get all POA1 data (e.g., for super admin or admin)
router.route("/all").get(getAllPoa1Data);

// Get POA1 data by state/district/user/month/year
router.route("/get").get(isAuth, getPoa1DataByState);

// Get all POAs for the logged-in user
router.route("/getUserPOAs").get(isAuth, getPoa1s);

// Update an existing POA1 (includes approval flow)
router.route("/update/:poaId").patch(isAuth, updatePoa1Data);

// Get a single POA1 record by ID (day-wise details)
router.route("/:id").get(isAuth, getPoalData);

export default router;

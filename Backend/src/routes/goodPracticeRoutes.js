import express from "express";
import {
  createGoodPractice,
  getAllGoodPractices,
  getGoodPracticeById,
  updateGoodPractice,
  deleteGoodPractice,
  approveGoodPractice,
  getGoodPractices,
} from "../controllers/goodPracticeController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();


router.route("/create").post(isAuth,createGoodPractice);
// only for admins
router.route("/all").get(isAuth,getAllGoodPractices);

// for homepage
router.route("/").get(getGoodPractices);

router
  .route("/:id")
  .get(getGoodPracticeById)
  .put(updateGoodPractice)
  .delete(deleteGoodPractice);
router.route("/:id/approve").put(approveGoodPractice);
export default router;

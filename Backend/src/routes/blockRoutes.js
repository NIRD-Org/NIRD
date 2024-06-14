import express from "express";
import {
  createblock,
  deleteblock,
  getAllblocks,
  getblockById,
  getblocksByLocation,
  updateblock,
} from "../controllers/blockController.js";

const router = express.Router();

router.route("/all").get(getAllblocks);
router.route("/get-block/:id").get(getblockById);
router.route("/get").get(getblocksByLocation);
router.route("/create").post(createblock);
router.route("/delete/:id").put(deleteblock);
router.route("/:id").put(updateblock);

export default router;

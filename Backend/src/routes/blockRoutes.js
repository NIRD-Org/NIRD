import express from "express";
import {
  createblock,
  deleteblock,
  getAllblocks,
  getblockById,
  getblocksByLocation,
  updateblock,
  getBlockById
} from "../controllers/blockController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.use('/create',isAuth);
router.route("/all").get(getAllblocks);
router.route("/get-block/:id").get(getblockById);
router.route("/get").get(getblocksByLocation);
router.route("/create").post(createblock);
router.route("/:id").delete(deleteblock);
router.route("/:id").put(updateblock);
router.route("/:id").get(getBlockById);


export default router;

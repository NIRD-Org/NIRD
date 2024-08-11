import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateMany,
} from "../controllers/userController.js";
const router = express.Router();

// router.use("/create", isAuth);
router.get("/all", isAuth, getAllUsers);
router.get("/:id", isAuth, getUserById);
router.delete("/:id", isAuth, deleteUser);
router.put("/:id", isAuth, updateUser);
router.post("/many", updateMany);

export default router;

import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/db.js";
import cors from "cors";
import { ErrorMiddleware } from "./middlewares/error.js";
import gpWiseKpiRoutes from "./routes/gpWIseKpiRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import blockRoutes from "./routes/blockRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";
import gpRoutes from "./routes/gpRoutes.js";
import kpiRoutes from "./routes/kpiRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import kpiApprovalRoutes from "./routes/kpiApprovalRoutes.js";
import authRoutes from "./routes/authRoute.js";
import userLocationRoutes from "./routes/userLocationRoutes.js";
import indicatorRoutes from "./routes/indicatorRoutes.js";
import gpWiseIndicatorRoutes from "./routes/gpWiseIndicatorRoutes.js";
import gpDetailRoutes from "./routes/gpDetailRoutes.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/v1/gp-wise-kpi", gpWiseKpiRoutes);
app.use("/api/v1/gp-wise-indicator", gpWiseIndicatorRoutes);

app.use("/api/v1/state", stateRoutes);
app.use("/api/v1/block", blockRoutes);
app.use("/api/v1/dist", districtRoutes);
app.use("/api/v1/gram", gpRoutes);
app.use("/api/v1/kpi", kpiRoutes);
app.use("/api/v1/theme", themeRoutes);
app.use("/api/v1/kpi-approvals", kpiApprovalRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user-location", userLocationRoutes);
app.use("/api/v1/indicator", indicatorRoutes);
app.use("/api/v1/gp-details", gpDetailRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use(ErrorMiddleware);
const port = process.env.PORT || 4000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch(() => {
    console.log("MongoDb connection failed");
  });

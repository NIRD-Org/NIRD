import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/db.js";
import cors from "cors";
import { ErrorMiddleware } from "./middlewares/error.js";
import gpWiseKpiRoutes from "./routes/gpWIseKpiRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import talukRoutes from "./routes/talukRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";
import gpRoutes from "./routes/gpRoutes.js";
import kpiRoutes from "./routes/kpiRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import kpiApprovalRoutes from "./routes/kpiApprovalRoutes.js";
import kpiQuestionsRoutes from "./routes/kpiQuestionsRoutes.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/v1/gp-wise-kpi", gpWiseKpiRoutes);

app.use("/api/v1/state", stateRoutes);
app.use("/api/v1/taluk", talukRoutes);
app.use("/api/v1/dist", districtRoutes);
app.use("/api/v1/gram", gpRoutes);
app.use("/api/v1/kpi", kpiRoutes);
app.use("/api/v1/theme", themeRoutes);
app.use("/api/v1/kpi-approvals", kpiApprovalRoutes);
app.use("/api/v1/kpi-questions", kpiQuestionsRoutes);
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

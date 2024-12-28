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
import userRoutes from "./routes/userRoutes.js";
import yfInsightsRoutes from "./routes/yfInsightsRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import goodPracticeRoutes from "./routes/goodPracticeRoutes.js";
import LCVARoutes from "./routes/LCVARoutes.js";
import indicatorApprovalRoutes from "./routes/indicatorApprovalRoutes.js";
import amRoutes from "./routes/amRoutes.js";
import pmRoutes from "./routes/pmRoutes.js";
import fileUpload from "express-fileupload";
import soeprThemesRoutes from "./routes/soeprThemesRoutes.js";
import soeprKpiRoutes from "./routes/soeprKpiRoutes.js";
import soeprKpiDataRoutes from "./routes/soeprKpiDataRoutes.js";
import soeprLocationRoutes from "./routes/soeprLocationRoutes.js";
import soeprStateRoutes from "./routes/soeprStateRoutes.js";
import soeprDistrictRoutes from "./routes/soeprDistrictRoutes.js";
import poa1Routes from "./routes/poa1Routes.js";
import blogRoutes from "./routes/blogRoutes.js";

import yfPoa1Routes from "./routes/YfPoa1Routes.js";
import SpcPoa1Routes from "./routes/SpcPoa1Routes.js";
import PmupoaRoutes from "./routes/pmupoaRoutes.js"
import trainingMaterialRoutes from "./routes/trainingMaterialRoutes.js";
import poaApprovalRoutes from "./routes/poaApprovalRoutes.js";
// import { migrateFilesToS3 } from "./awsMigration.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

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
app.use("/api/v1/indicator-approvals", indicatorApprovalRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user-location", userLocationRoutes);
app.use("/api/v1/soepr-location", soeprLocationRoutes);

app.use("/api/v1/indicator", indicatorRoutes);
app.use("/api/v1/gp-details", gpDetailRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/yf-insights", yfInsightsRoutes);
app.use("/api/v1/training", trainingRoutes);
app.use("/api/v1/good-practice", goodPracticeRoutes);
app.use("/api/v1/lcva", LCVARoutes);
app.use("/api/v1/am-upload", amRoutes);
app.use("/api/v1/pm-upload", pmRoutes);
app.use("/api/v1/pmu-poa", PmupoaRoutes);


// Soepr
app.use("/api/v1/soepr-theme", soeprThemesRoutes);
app.use("/api/v1/soepr-kpi", soeprKpiRoutes);
app.use("/api/v1/soepr-kpi-data", soeprKpiDataRoutes);
app.use("/api/v1/soepr-state", soeprStateRoutes);
app.use("/api/v1/soepr-dist", soeprDistrictRoutes);
app.use("/api/v1/poa1", poa1Routes);
app.use("/api/v1/poa", poaApprovalRoutes)
app.use("/api/v1/yf-poa1", yfPoa1Routes);
app.use("/api/v1/spc-poa1", SpcPoa1Routes);
app.use("/api/v1/blog",blogRoutes)
app.use("/api/v1/training-material", trainingMaterialRoutes);



app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// FIles migration from cloudinary to AWS

// app.post("/migrate-files", migrateFilesToS3);

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

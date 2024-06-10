import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { KPIApprovalModel } from "../models/kpiApprovalModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewId = async () => {
  try {
    const maxDoc = await KPIApprovalModel.findOne().sort("-id").exec();
    const maxId = parseInt(maxDoc ? maxDoc.id : 0);
    return maxId + 1;
  } catch (error) {
    return next(new Errorhandler("failed to get new id", 500));
  }
};
export const createKPIApproval = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    const newKPIApproval = new KPIApprovalModel(req.body);
    await newKPIApproval.save();
    res.status(201).json({
      success: true,
      message: "KPI Approval created successfully",
      kpiApproval: newKPIApproval,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create KPI approval", 500));
  }
});

export const getAllKPIApprovals = CatchAsyncError(async (req, res, next) => {
  try {
    const KPIApprovals = await KPIApprovalModel.find();
    if (!KPIApprovals || KPIApprovals.length === 0) {
      return next(new Errorhandler("No KPI Approvals Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Approvals Fetched Successfully",
      KPIApprovals,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get KPI approvals", 500));
  }
});

// Get kpi approvals by any of state, district, taluk and gp

export const getKPIApprovals = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, taluk, gp } = req.query;
    const query = {};

    if (state) query.state_id = state;
    if (dist) query.district_id = dist;
    if (taluk) query.taluk_id = taluk;
    if (gp) query.gp_id = gp;

    const KPIApprovals = await KPIApprovalModel.find(query);
    if (!KPIApprovals || KPIApprovals.length === 0) {
      return next(new Errorhandler("No KPI Approvals Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "KPI Approvals Fetched Successfully",
      KPIApprovals,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get KPI approvals", 500));
  }
});

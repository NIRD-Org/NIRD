import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { KPIApprovalModel } from "../models/kpiApprovalModel.js";
import { SoeprKpiDataModel } from "../models/soeprKpiDataModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewIdKPI = async () => {
  try {
    const maxDoc = await SoeprKpiDataModel.aggregate([
      {
        $addFields: {
          numericId: { $toInt: "$id" },
        },
      },
      {
        $sort: { numericId: -1 },
      },
      {
        $limit: 1,
      },
    ]).exec();

    const maxId = maxDoc.length > 0 ? maxDoc[0].numericId : 0;
    return maxId + 1;
  } catch (error) {
    return next(new Errorhandler("failed to get new id", 500));
  }
};


export const submitKpiData = CatchAsyncError(async (req, res, next) => {
  try {
    const parsedDate = new Date(req.body.date);
    // console.log(req.body)

    const existingData = await SoeprKpiDataModel.findOne({
      state_id: req.body.state_id,
      date: parsedDate,
      theme_id: req.body.theme_id,
    });

    if (existingData) {
      return next(new Errorhandler("KPI data for this theme and date already exists", 400));
    }

    let currentMaxId = await getNewIdKPI();
    req.body.id = currentMaxId.toString();
    req.body.created_by = req.body.user_id;

    console.log(req.body);
    await SoeprKpiDataModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "KPI data submitted and approval request created successfully",
    });
  } catch (error) {
    console.error("Failed to submit soepr KPI data:", error);
    return next(new Errorhandler("Failed to submit SOEPR KPI data", 500));
  }
});

// Main for getting kpi data
export const getsoeprKpi = CatchAsyncError(async (req, res, next) => {
  try {
    const limit = req.query.limit || 50;
    const pageNumber = req.query.page || 1;
    const startIndex = (pageNumber - 1) * limit;
    const { state, search, fy } = req.query;

    // filter object
    const filter = {};
    if (state) filter.state_id = state;
    if (fy) filter.financial_year = fy;
    // filter.user_id = req.user.id;
    const pipeline = [
      { $match: filter },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "state",
        },
      },
    ];

    if (search) {
      const regex = new RegExp(search, "i"); // 'i' makes it case-insensitive
      // console.log("Regex: " + regex);
      pipeline.push({
        $match: {
          $or: [{ "state.name": { $regex: regex } }],
        },
      });
    }

    // pipeline.push({ $skip: startIndex });
    // pipeline.push({ $limit: limit });
    pipeline.push({ $sort: { created_at: -1 } });

    const soeprKpiData = await SoeprKpiDataModel.aggregate(pipeline);
    if (!soeprKpiData || soeprKpiData.length === 0) {
      return next(new Errorhandler("No SOEPR KPI Data Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "SOEPR KPI Data Fetched Successfully",
      data: soeprKpiData,
    });
  } catch (error) {
    return next(new Errorhandler(error.message, 500));
  }
});

export const getsoeprKpiData = CatchAsyncError(async (req, res, next) => {
  try {
    const data = await SoeprKpiDataModel.aggregate([
      {
        $group: {
          _id: "$gp_id", // Group by gp_id
          doc: { $first: "$$ROOT" }, // Take the first document for each gp_id
        },
      },
      {
        $replaceRoot: { newRoot: "$doc" }, // Replace the root with the grouped document
      },
      {
        $limit: 30, // Limit the results to 30 documents
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    return next(new Errorhandler("Failed to get data", 500));
  }
});

// Delete gpwise data - set the status to "0"

export const deletesoeprKpiData = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const soeprKpi = await GpModel.findOneAndUpdate(id, { status: "0" }, { new: true });
    if (!soeprKpi) {
      return next(new Errorhandler("No Gram Panchayat Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "SOEPR Kpi data Deleted Successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to delete Gram Panchayat", 500));
  }
});

// Get the soeprKpi for the approver
export const getsoeprKpiForApprover = CatchAsyncError(async (req, res, next) => {
  try {
    const { submitted_id } = req.query;

    const matchStage = {
      submitted_id,
    };

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "soeprkpis",
          localField: "kpi_id",
          foreignField: "id",
          as: "kpiDetails",
        },
      },

      {
        $unwind: "$kpiDetails",
      },
      // {
      //   $lookup: {
      //     from: "kpiapprovals",
      //     localField: "submitted_id",
      //     foreignField: "submitted_id",
      //     as: "approvalDetails",
      //   },
      // },
      // {
      //   $unwind: "$approvalDetails",
      // },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "stateDetails",
        },
      },
      { $unwind: "$stateDetails" },

      {
        $lookup: {
          from: "soeprthemes",
          localField: "theme_id",
          foreignField: "id",
          as: "themeDetails",
        },
      },
      { $unwind: "$themeDetails" },

      {
        $project: {
          _id: 0,
          id: 1,
          state_id: 1,
          "stateDetails.name": 1,

          date: 1,
          theme_id: 1,
          "themeDetails.theme_name": 1,
          kpi_id: 1,
          max_range: 1,
          input_data: 1,
          score: 1,
          remarks: 1,
          financial_year: 1,
          quarter: 1,
          month: 1,
          frequency: 1,
          approver_remarks: "$approvalDetails.remarks",
          status: 1,
          submitted_id: 1,
          created_by: 1,
          modified_by: 1,
          created_at: 1,
          modified_at: 1,
          kpiDetails: 1,
        },
      },
    ];

    const soeprKpiData = await SoeprKpiDataModel.aggregate(pipeline);

    if (!soeprKpiData) {
      return next(new Errorhandler("No KPI data found for the specified filters", 404));
    }

    res.status(200).json({
      success: true,
      message: "KPI data fetched successfully",
      data: soeprKpiData,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to getSOEPR data", 500));
  }
});

// Resubmit the kpi data

// Submit the kpi data created by the young fellow
export const reSubmitKpiData = CatchAsyncError(async (req, res, next) => {
  try {
    const { formData, submitted_id } = req.body;

    // Validate if formData is empty
    if (!formData || formData.length === 0) {
      return next(new Errorhandler("Form data cannot be empty", 400));
    }

    // Check if the submitted_id exists in the KPIApprovalModel
    const existingData = await KPIApprovalModel.findOne({ submitted_id });

    if (!existingData) {
      return next(new Errorhandler("KPI data with the given submitted_id does not exist", 404));
    }

    // Prepare the updated soeprKpi documents
    const kpiDocuments = formData.map(kpi => ({
      kpi_id: kpi.kpi_id,
      score: kpi.score,
      max_range: kpi.max_range,
      input_data: kpi.input_data,
      remarks: kpi.remarks,
      submitted_id,
    }));

    // Update the KPI documents in the soeprKpi collection based on submitted_id and kpi_id
    await Promise.all(
      kpiDocuments.map(kpiDocument =>
        SoeprKpiDataModel.updateOne({ submitted_id, kpi_id: kpiDocument.kpi_id }, kpiDocument, {
          upsert: true,
        })
      )
    );

    // Update the approval request document in the KPIApprovalModel
    await KPIApprovalModel.findOneAndUpdate(
      { submitted_id },
      { decision: "0" },
      {
        new: true,
      }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "KPI data updated and approval request updated successfully",
    });
  } catch (error) {
    console.error("Failed to update KPI data:", error);
    return next(new Errorhandler("Failed to update KPI data", 500));
  }
});

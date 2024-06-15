import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpWiseIndicatorModel } from "../models/gpWiseIndicatorModel.js";
import { IndicatorApprovalModel } from "../models/indicatorApprovalModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewIdApproval = async () => {
  try {
    const maxDoc = await IndicatorApprovalModel.aggregate([
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

const getNewIdIndicator = async () => {
  try {
    const maxDoc = await GpWiseIndicatorModel.aggregate([
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

const getNewSubmittedId = async () => {
  try {
    const maxDoc = await GpWiseIndicatorModel.aggregate([
      {
        $addFields: {
          numericId: { $toInt: "$submitted_id" },
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

// Submit the kpi data created by the young fellow

export const submitIndicatorData = CatchAsyncError(async (req, res, next) => {
  try {
    const { state_id, dist_id, gp_id, block_id, date, formData } = req.body;
    const submitted_id = await getNewSubmittedId();

    // Validate if formData is empty
    if (!formData || formData.length === 0) {
      return next(new Errorhandler("Form data cannot be empty", 400));
    }
    // Prepare the GpWiseKPI documents for insertion
    let currentMaxId = await getNewIdIndicator();
    const indicatorDocuments = await Promise.all(
      formData.map(async (indicator) => ({
        id: currentMaxId++,
        state_id: state_id,
        dist_id: dist_id,
        block_id: block_id,
        gp_id: gp_id,
        date: date,
        indicator_id: indicator.indicator_id,
        max_range: indicator.max_range,
        input_data: indicator.input_data,
        remarks: indicator.remarks,
        submitted_id: submitted_id,
        created_by: req.user ? req.user.id : "1",
      }))
    );

    // Inserting the KPI documents into the gpWiseKpi collection
    await GpWiseIndicatorModel.insertMany(indicatorDocuments);
    const approvalId = await getNewIdApproval();
    // Create the approval request document
    const approvalDocument = {
      id: approvalId,
      state_id,
      dist_id,
      block_id,
      gp_id,
      submitted_id,
      created_by: req.user ? req.user.id : "1",
    };

    // // Insert the approval request into the gpWiseKpiApproval collection
    await IndicatorApprovalModel.create(approvalDocument);

    // Send success response
    res.status(201).json({
      success: true,
      message: "Indicator data submitted and sent for approval successfully",
    });
  } catch (error) {
    console.error("Failed to submit Indicator data:", error);
    return next(new Errorhandler("Failed to submit Indicator data", 500));
  }
});

const getGpWiseIndicatorDataWithPercentage = async (query) => {
  const { state, dist, block, gp } = query;
  const filter = {};
  if (state) filter.state_id = state;
  if (dist) filter.district_id = dist;
  if (block) filter.block_id = block;
  if (gp) filter.gp_id = gp;

  const gpWiseKpiData = await GpWiseIndicatorModel.aggregate([
    { $match: filter },
    {
      $group: {
        _id: {
          gp_id: "$gp_id",
          indicator_id: "$indicator_id",
        },
        doc: { $first: "$$ROOT" },
        totalInputData: { $sum: { $toDouble: "$input_data" } },
        totalMaxRange: { $sum: { $toDouble: "$max_range" } },
      },
    },
    {
      $addFields: {
        percentage: {
          $cond: {
            if: { $eq: ["$totalMaxRange", 0] },
            then: 0,
            else: {
              $multiply: [
                { $divide: ["$totalInputData", "$totalMaxRange"] },
                100,
              ],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "states",
        localField: "doc.state_id",
        foreignField: "id",
        as: "state",
      },
    },
    {
      $lookup: {
        from: "districts",
        localField: "doc.dist_id",
        foreignField: "id",
        as: "dist",
      },
    },
    {
      $lookup: {
        from: "blocks",
        localField: "doc.block_id",
        foreignField: "id",
        as: "block",
      },
    },
    {
      $lookup: {
        from: "grampanchayats",
        localField: "doc.gp_id",
        foreignField: "id",
        as: "gp",
      },
    },
    {
      $group: {
        _id: "$_id.gp_id",
        indicators: {
          $push: {
            indicator_id: "$_id.indicator_id",
            percentage: "$percentage",
          },
        },
        doc: { $first: "$$ROOT" },
      },
    },
    {
      $addFields: {
        indicators: {
          $sortArray: {
            input: "$indicators",
            sortBy: { indicator_id: 1 },
          },
        },
      },
    },
    {
      $project: {
        id: "$doc.id",
        state_name: { $arrayElemAt: ["$doc.state.name", 0] },
        dist_name: { $arrayElemAt: ["$doc.dist.name", 0] },
        block_name: { $arrayElemAt: ["$doc.block.name", 0] },
        gp_name: { $arrayElemAt: ["$doc.gp.name", 0] },
        date: "$doc.date",
        gp_percentage: "$indicators",
      },
    },
    { $sort: { "doc.created_at": 1 } },
  ]);

  if (!gpWiseKpiData || gpWiseKpiData.length === 0) {
    throw new Errorhandler("No Gp Wise KPI Data Found", 404);
  }

  return gpWiseKpiData;
};

export const getGpWiseIndicatorDataWithPercentageController = CatchAsyncError(
  async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const pageNumber = parseInt(req.query.page) || 1;
      const startIndex = (pageNumber - 1) * limit;

      const gpWiseIndicatorData = await getGpWiseIndicatorDataWithPercentage(
        req.query
      );

      const paginatedData = gpWiseIndicatorData.slice(
        startIndex,
        startIndex + limit
      );

      res.status(200).json({
        success: true,
        message: "Gp Wise KPI Data Fetched Successfully",
        data: paginatedData,
      });
    } catch (error) {
      return next(new Errorhandler(error.message, 500));
    }
  }
);

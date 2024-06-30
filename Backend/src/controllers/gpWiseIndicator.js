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
    const {
      state_id,
      dist_id,
      gp_id,
      block_id,
      date,
      formData,
      financial_year,
    } = req.body;
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
        financial_year,
        indicator_id: indicator.indicator_id,
        max_range: indicator.max_range,
        input_data: indicator.input_data,
        remarks: indicator.remarks,
        submitted_id: submitted_id,
        created_by: req.user.id,
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
      financial_year,
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

// Get the gpWiseKpi for the approver
export const getGpWiseIndicatorForApprover = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { submitted_id } = req.query;
      const matchStage = {
        submitted_id,
      };

      const pipeline = [
        { $match: matchStage },
        {
          $lookup: {
            from: "indicators",
            localField: "indicator_id",
            foreignField: "id",
            as: "indicator",
          },
        },

        {
          $unwind: "$indicator",
        },
        {
          $lookup: {
            from: "indicatorapprovals",
            localField: "submitted_id",
            foreignField: "submitted_id",
            as: "approval",
          },
        },
        {
          $unwind: "$approval",
        },
        {
          $lookup: {
            from: "states",
            localField: "state_id",
            foreignField: "id",
            as: "state",
          },
        },
        { $unwind: "$state" },
        {
          $lookup: {
            from: "districts",
            localField: "dist_id",
            foreignField: "id",
            as: "district",
          },
        },
        { $unwind: "$district" },
        {
          $lookup: {
            from: "blocks",
            localField: "block_id",
            foreignField: "id",
            as: "block",
          },
        },
        { $unwind: "$block" },
        {
          $lookup: {
            from: "grampanchayats",
            localField: "gp_id",
            foreignField: "id",
            as: "gp",
          },
        },
        { $unwind: "$gp" },
        {
          $project: {
            _id: 0,
            id: 1,
            state_id: 1,
            "state.name": 1,
            dist_id: 1,
            "district.name": 1,
            block_id: 1,
            "block.name": 1,
            gp_id: 1,
            "gp.name": 1,
            date: 1,
            indicator_id: 1,
            max_range: 1,
            input_data: 1,
            score: 1,
            remarks: 1,
            financial_year: 1,
            approver_remarks: "$approval.remarks",
            status: 1,
            submitted_id: 1,
            created_by: 1,
            modified_by: 1,
            created_at: 1,
            modified_at: 1,
            indicator: 1,
          },
        },
      ];

      const gpWiseIndicatorData = await GpWiseIndicatorModel.aggregate(
        pipeline
      );

      if (!gpWiseIndicatorData) {
        return next(
          new Errorhandler("No KPI data found for the specified filters", 404)
        );
      }

      res.status(200).json({
        success: true,
        message: "KPI data fetched successfully",
        data: gpWiseIndicatorData,
      });
    } catch (error) {
      console.log(error);
      return next(new Errorhandler("Failed to getGp wise data", 500));
    }
  }
);

// Resubmit the Indicator data
export const reSubmitIndicatorData = CatchAsyncError(async (req, res, next) => {
  try {
    const { formData, submitted_id } = req.body;

    // Validate if formData is empty
    if (!formData || formData.length === 0) {
      return next(new Errorhandler("Form data cannot be empty", 400));
    }

    // Check if the submitted_id exists in the KPIApprovalModel
    const existingData = await IndicatorApprovalModel.findOne({ submitted_id });

    if (!existingData) {
      return next(
        new Errorhandler(
          "KPI data with the given submitted_id does not exist",
          404
        )
      );
    }

    // Prepare the updated GpWiseKPI documents
    const indicatorDocuments = formData.map((indicator) => ({
      indicator_id: indicator.indicator_id,
      max_range: indicator.max_range,
      input_data: indicator.input_data,
      remarks: indicator.remarks,
      submitted_id: submitted_id,
    }));

    // Update the KPI documents in the gpWiseKpi collection based on submitted_id and kpi_id
    await Promise.all(
      indicatorDocuments.map((indicatorDocument) =>
        GpWiseIndicatorModel.updateOne(
          { submitted_id, indicator_id: indicatorDocument.indicator_id },
          indicatorDocument,
          { upsert: true }
        )
      )
    );

    // Update the approval request document in the KPIApprovalModel
    await IndicatorApprovalModel.findOneAndUpdate(
      { submitted_id },
      { decision: "0" },
      {
        new: true,
      }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message:
        "Indicator data updated and approval request updated successfully",
    });
  } catch (error) {
    console.error("Failed to update Indicator data:", error);
    return next(new Errorhandler("Failed to update Indicator data", 500));
  }
});

const getGpWiseIndicatorDataWithPercentage = async (query) => {
  const { state, dist, block, gp, search, fy } = query;
  const filter = {};
  if (state) filter.state_id = state;
  if (dist) filter.dist_id = dist;
  if (block) filter.block_id = block;
  if (gp) filter.gp_id = gp;
  if (fy) filter.financial_year = fy;

  const pipeline = [
    { $match: filter },
    {
      $group: {
        _id: {
          gp_id: "$gp_id",
          indicator_id: "$indicator_id",
        },
        original_id: { $first: "$_id" },
        doc: { $first: "$$ROOT" },
        totalInputData: { $first: { $toDouble: "$input_data" } },
        totalMaxRange: { $first: { $toDouble: "$max_range" } },
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
      $unwind: "$state",
    },
    {
      $unwind: "$dist",
    },
    {
      $unwind: "$block",
    },
    {
      $unwind: "$gp",
    },
    {
      $group: {
        _id: "$_id.gp_id",
        indicators: {
          $push: {
            indicator_id: "$_id.indicator_id",
            input_data: "$totalInputData",
            max_range: "$totalMaxRange",
            percentage: "$percentage",
          },
        },
        original_id: { $first: "$original_id" },
        state_name: { $first: "$state.name" },
        dist_name: { $first: "$dist.name" },
        block_name: { $first: "$block.name" },
        gp_name: { $first: "$gp.name" },
        date: { $first: "$doc.date" },
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
        _id: 0,
        id: "$original_id",
        state_name: 1,
        dist_name: 1,
        block_name: 1,
        gp_name: 1,
        date: 1,
        gp_percentage: "$indicators",
      },
    },
  ];

  if (search) {
    const regex = new RegExp(search, "i"); // 'i' makes it case-insensitive
    pipeline.push({
      $match: {
        $or: [
          { state_name: { $regex: regex } },
          { dist_name: { $regex: regex } },
          { block_name: { $regex: regex } },
          { gp_name: { $regex: regex } },
        ],
      },
    });
  }

  pipeline.push({ $sort: { id: 1 } });
  const gpWiseKpiData = await GpWiseIndicatorModel.aggregate(pipeline);

  if (!gpWiseKpiData || gpWiseKpiData.length === 0) {
    throw new Errorhandler("No Gp Wise Indicator Data Found", 404);
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

      const paginatedData = gpWiseIndicatorData;

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

// Get the ranking of the gp

import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpWiseKpiModel } from "../models/gpWiseKpiModel.js";
import { KPIApprovalModel } from "../models/kpiApprovalModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewIdKPI = async () => {
  try {
    const maxDoc = await GpWiseKpiModel.aggregate([
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

const getNewIdApproval = async () => {
  try {
    const maxDoc = await KPIApprovalModel.aggregate([
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

// Generate new submitted id

const getNewSubmittedId = async () => {
  try {
    const maxDoc = await KPIApprovalModel.aggregate([
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

export const submitKpiData = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      state_id,
      dist_id,
      gp_id,
      block_id,
      date,
      theme_id,
      user_id,
      formData,
    } = req.body;

    // Validate if formData is empty
    if (!formData || formData.length === 0) {
      return next(new Errorhandler("Form data cannot be empty", 400));
    }

    // Parse the date from the request body to a Date object
    const parsedDate = new Date(date);

    // Check for existing data for the same date and theme_id
    const existingData = await GpWiseKpiModel.findOne({
      state_id: state_id,
      dist_id: dist_id,
      block_id: block_id,
      gp_id: gp_id,
      date: parsedDate,
      theme_id: theme_id,
    });

    if (existingData) {
      return next(
        new Errorhandler("KPI data for this theme and date already exists", 400)
      );
    }

    // Generate new submitted_id and currentMaxId
    const submitted_id = await getNewSubmittedId();
    let currentMaxId = await getNewIdKPI();

    // Prepare the GpWiseKPI documents for insertion
    const kpiDocuments = await Promise.all(
      formData.map(async (kpi) => ({
        id: currentMaxId++,
        state_id: state_id,
        dist_id: dist_id,
        block_id: block_id,
        gp_id: gp_id,
        date: parsedDate,
        theme_id: theme_id,
        kpi_id: kpi.kpi_id,
        score: kpi.score,
        max_range: kpi.max_range,
        input_data: kpi.input_data,
        remarks: kpi.remarks,
        submitted_id: submitted_id,
        created_by: user_id,
      }))
    );

    // Inserting the KPI documents into the gpWiseKpi collection
    await GpWiseKpiModel.insertMany(kpiDocuments);

    // Generate new approvalId
    const approvalId = await getNewIdApproval();

    // Create the approval request document
    const approvalDocument = {
      id: approvalId,
      state_id,
      dist_id,
      block_id,
      gp_id,
      theme_id,
      submitted_id,
      created_by: user_id,
      date: parsedDate,
    };

    // Insert the approval request into the gpWiseKpiApproval collection
    await KPIApprovalModel.create(approvalDocument);

    // Send success response
    res.status(201).json({
      success: true,
      message: "KPI data submitted and approval request created successfully",
    });
  } catch (error) {
    console.error("Failed to submit KPI data:", error);
    return next(new Errorhandler("Failed to submit KPI data", 500));
  }
});

// Main for getting kpi data
export const getGpWiseKpi = CatchAsyncError(async (req, res, next) => {
  try {
    const limit = req.query.limit || 50;
    const pageNumber = req.query.page || 1;
    const startIndex = (pageNumber - 1) * limit;
    const { state, dist, block, gp, search } = req.query;

    // filter object
    const filter = {};
    if (state) filter.state_id = state;
    if (dist) filter.dist_id = dist;
    if (block) filter.block_id = block;
    if (gp) filter.gp_id = gp;

    const pipeline = [
      { $match: filter },
      {
        $group: {
          _id: "$gp_id",
          doc: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$doc" },
      },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "districts",
          localField: "dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "block_id",
          foreignField: "id",
          as: "block",
        },
      },
      {
        $lookup: {
          from: "grampanchayats",
          localField: "gp_id",
          foreignField: "id",
          as: "gp",
        },
      },
      {
        $project: {
          id: 1,
          state: { $arrayElemAt: ["$state", 0] },
          district: { $arrayElemAt: ["$district", 0] },
          block: { $arrayElemAt: ["$block", 0] },
          gp: { $arrayElemAt: ["$gp", 0] },
          date: 1,
          theme_id: 1,
          kpi_id: 1,
          question_id: 1,
          max_range: 1,
          input_data: 1,
          score: 1,
          remarks: 1,
          status: 1,
          submitteed_id: 1,
          created_by: 1,
          created_at: 1,
          modified_by: 1,
          modified_at: 1,
        },
      },
    ];

    if (search) {
      const regex = new RegExp(search, "i"); // 'i' makes it case-insensitive
      console.log("Regex: " + regex);
      pipeline.push({
        $match: {
          $or: [
            { "state.name": { $regex: regex } },
            { "district.name": { $regex: regex } },
            { "block.name": { $regex: regex } },
            { "gp.name": { $regex: regex } },
          ],
        },
      });
    }

    // pipeline.push({ $skip: startIndex });
    // pipeline.push({ $limit: limit });
    pipeline.push({ $sort: { created_at: -1 } });

    const gpWiseKpiData = await GpWiseKpiModel.aggregate(pipeline);
    if (!gpWiseKpiData || gpWiseKpiData.length === 0) {
      return next(new Errorhandler("No Gp Wise KPI Data Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Gp Wise KPI Data Fetched Successfully",
      data: gpWiseKpiData,
    });
  } catch (error) {
    return next(new Errorhandler(error.message, 500));
  }
});

export const getGpWiseKpiData = CatchAsyncError(async (req, res, next) => {
  try {
    const data = await GpWiseKpiModel.aggregate([
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

// Charts for different KPIs
export const getGpWiseKpiChart = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, block, theme, gp, kpi } = req.query;

    // 1. Calculate Quarterly Data
    const matchStageQuarterly = {
      theme_id: theme,
    };
    if (state) matchStageQuarterly.state_id = state;
    if (dist) matchStageQuarterly.dist_id = dist;
    if (block) matchStageQuarterly.block_id = block;
    if (gp) matchStageQuarterly.gp_id = gp;
    if (kpi) matchStageQuarterly.kpi_id = kpi;

    const pipelineQuarterly = [
      { $match: matchStageQuarterly },
      {
        $group: {
          _id: "$submitted_id",
          totalInputData: { $sum: "$input_data" },
          totalMaxRange: { $sum: "$max_range" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const quarterlyResults = await GpWiseKpiModel.aggregate(pipelineQuarterly);

    const quarterlyPercentage = {};
    quarterlyResults.forEach((result, index) => {
      const quarterInputData = result.totalInputData || 0;
      const quarterMaxRange = result.totalMaxRange || 1;

      const quarterPercentage =
        quarterMaxRange !== 0 ? (quarterInputData / quarterMaxRange) * 100 : 0;
      quarterlyPercentage[`quarter${index + 1}`] = quarterPercentage.toFixed(2);
    });

    // 2. Calculate Yearly Data
    const matchStageYearly = {
      theme_id: theme,
    };
    if (state) matchStageYearly.state_id = state;
    if (gp) matchStageYearly.gp_id = gp;
    if (kpi) matchStageYearly.kpi_id = kpi;

    // For GP Yearly Data
    const pipelineGP = [
      { $match: matchStageYearly },
      {
        $group: {
          _id: {
            state_id: "$state_id",
            gp_id: "$gp_id",
            theme_id: theme,
            kpi_id: kpi,
          },
          totalInputData: { $sum: "$input_data" },
          totalMaxRange: { $sum: "$max_range" },
        },
      },
      {
        $project: {
          _id: 0,
          gp_id: "$_id.gp_id",
          state_id: "$_id.state_id",
          theme_id: "$_id.theme_id",
          kpi_id: "$_id.kpi_id",
          totalInputData: 1,
          totalMaxRange: 1,
          percentage: {
            $cond: [
              { $eq: ["$totalMaxRange", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$totalInputData", "$totalMaxRange"] },
                  100,
                ],
              },
            ],
          },
        },
      },
    ];

    const gpYearlyData = await GpWiseKpiModel.aggregate(pipelineGP);

    // For State Yearly Data
    const pipelineState = [
      { $match: { state_id: state, theme_id: theme, kpi_id: kpi } },
      {
        $group: {
          _id: {
            state_id: state,
            theme_id: theme,
            kpi_id: kpi,
          },
          totalInputData: { $sum: "$input_data" },
          totalMaxRange: { $sum: "$max_range" },
        },
      },
      {
        $project: {
          _id: 0,
          state_id: "$_id.state_id",
          theme_id: "$_id.theme_id",
          kpi_id: "$_id.kpi_id",
          totalInputData: 1,
          totalMaxRange: 1,
          percentage: {
            $cond: [
              { $eq: ["$totalMaxRange", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$totalInputData", "$totalMaxRange"] },
                  100,
                ],
              },
            ],
          },
        },
      },
    ];

    const stateYearlyData = await GpWiseKpiModel.aggregate(pipelineState);

    // For Country Yearly Data
    const pipelineCountry = [
      { $match: { theme_id: theme, kpi_id: kpi } },
      {
        $group: {
          _id: null,
          totalInputData: { $sum: "$input_data" },
          totalMaxRange: { $sum: "$max_range" },
        },
      },
      {
        $project: {
          _id: 0,
          theme_id: theme,
          kpi_id: kpi,
          totalInputData: 1,
          totalMaxRange: 1,
          percentage: {
            $cond: [
              { $eq: ["$totalMaxRange", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$totalInputData", "$totalMaxRange"] },
                  100,
                ],
              },
            ],
          },
        },
      },
    ];

    const countryYearlyData = await GpWiseKpiModel.aggregate(pipelineCountry);

    const response = {
      quarterlyPercentage,
      yearlyData: {
        gp: gpYearlyData,
        state: stateYearlyData.length > 0 ? stateYearlyData[0] : {},
        country: countryYearlyData.length > 0 ? countryYearlyData[0] : {},
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get KPI data", 500));
  }
});

// Delete gpwise data - set the status to "0"

export const deleteGpWiseKpiData = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const gpWiseKpi = await GpModel.findOneAndUpdate(
      id,
      { status: "0" },
      { new: true }
    );
    if (!gpWiseKpi) {
      return next(new Errorhandler("No Gram Panchayat Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "GP Wise Kpi data Deleted Successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to delete Gram Panchayat", 500));
  }
});

// Get the gpWiseKpi for the approver
export const getGpWiseKpiForApprover = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { state, dist, block, gp, theme, submitted_id } = req.query;

      const matchStage = {
        gp_id: gp,
        theme_id: theme,
        submitted_id,
      };

      if (state) matchStage.state_id = state;
      if (dist) matchStage.dist_id = dist;
      if (block) matchStage.block_id = block;

      const pipeline = [
        { $match: matchStage },
        {
          $lookup: {
            from: "kpis",
            localField: "kpi_id",
            foreignField: "id",
            as: "kpiDetails",
          },
        },
        {
          $unwind: "$kpiDetails",
        },
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
            from: "districts",
            localField: "dist_id",
            foreignField: "id",
            as: "districtDetails",
          },
        },
        { $unwind: "$districtDetails" },
        {
          $lookup: {
            from: "blocks",
            localField: "block_id",
            foreignField: "id",
            as: "blockDetails",
          },
        },
        { $unwind: "$blockDetails" },
        {
          $lookup: {
            from: "grampanchayats",
            localField: "gp_id",
            foreignField: "id",
            as: "gpDetails",
          },
        },
        { $unwind: "$gpDetails" },
        {
          $project: {
            _id: 0,
            id: 1,
            state_id: 1,
            "stateDetails.name": 1,
            dist_id: 1,
            "districtDetails.name": 1,
            block_id: 1,
            "blockDetails.name": 1,
            gp_id: 1,
            "gpDetails.name": 1,
            date: 1,
            theme_id: 1,
            kpi_id: 1,
            max_range: 1,
            input_data: 1,
            score: 1,
            remarks: 1,
            status: 1,
            submitted_id: 1,
            created_by: 1,
            modified_by: 1,
            created_at: 1,
            modified_at: 1,
            kpiDetails: 1, // Include KPI details
          },
        },
      ];

      const gpWiseKpiData = await GpWiseKpiModel.aggregate(pipeline);

      if (!gpWiseKpiData) {
        return next(
          new Errorhandler("No KPI data found for the specified filters", 404)
        );
      }

      res.status(200).json({
        success: true,
        message: "KPI data fetched successfully",
        data: gpWiseKpiData,
      });
    } catch (error) {
      console.log(error);
      return next(new Errorhandler("Failed to getGp wise data", 500));
    }
  }
);

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
      return next(
        new Errorhandler(
          "KPI data with the given submitted_id does not exist",
          404
        )
      );
    }

    // Prepare the updated GpWiseKPI documents
    const kpiDocuments = formData.map((kpi) => ({
      kpi_id: kpi.kpi_id,
      score: kpi.score,
      max_range: kpi.max_range,
      input_data: kpi.input_data,
      remarks: kpi.remarks,
      submitted_id,
    }));

    // Update the KPI documents in the gpWiseKpi collection based on submitted_id and kpi_id
    await Promise.all(
      kpiDocuments.map((kpiDocument) =>
        GpWiseKpiModel.updateOne(
          { submitted_id, kpi_id: kpiDocument.kpi_id },
          kpiDocument,
          { upsert: true }
        )
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

// Get the ranking of the gps
export const getRankingController = CatchAsyncError(async (req, res, next) => {
  try {
    const { keyword } = req.query;

    const pipeline = [
      {
        $group: {
          _id: "$gp_id",
          totalScore: { $sum: "$score" },
          state_id: { $first: "$state_id" },
          dist_id: { $first: "$dist_id" },
          block_id: { $first: "$block_id" },
        },
      },
      {
        $sort: { totalScore: -1 },
      },
      {
        $lookup: {
          from: "grampanchayats",
          localField: "_id",
          foreignField: "id",
          as: "gp",
        },
      },
      {
        $unwind: "$gp",
      },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $unwind: "$state",
      },
      {
        $lookup: {
          from: "districts",
          localField: "dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $unwind: "$district",
      },
      {
        $lookup: {
          from: "blocks",
          localField: "block_id",
          foreignField: "id",
          as: "block",
        },
      },
      {
        $unwind: "$block",
      },
      {
        $addFields: {
          gp_name: "$gp.name",
          state_name: "$state.name",
          dist_name: "$district.name",
          block_name: "$block.name",
        },
      },
      {
        $unset: ["gp", "state", "district", "block"],
      },
    ];

    let ranking = await GpWiseKpiModel.aggregate(pipeline);

    // Add ranks to the sorted results manually
    ranking.forEach((item, index) => {
      item.rank = index + 1;
    });

    // search Functionality
    if (keyword) {
      const regex = new RegExp(keyword, "i");
      ranking = ranking.filter(
        (item) =>
          regex.test(item.gp_name) ||
          regex.test(item.state_name) ||
          regex.test(item.dist_name) ||
          regex.test(item.block_name)
      );
    }

    res.status(200).json({
      success: true,
      message: "Ranking fetched successfully",
      total: ranking.length,
      data: ranking,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get ranking", 500));
  }
});

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
      financial_year,
      frequency,
      quarter,
      month,
      gp_id,
      block_id,
      date,
      theme_id,
      user_id,
      remark,
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
        financial_year,
        frequency,
        quarter: quarter ?? "",
        month: month ?? "",
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
      financial_year,
      frequency,
      quarter: quarter ?? "",
      month: month ?? "",
      remarks: remark,
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
    const { state, dist, block, gp, search, fy } = req.query;

    // filter object
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
          financial_year: 1,
          quarter: 1,
          month: 1,
          frequency: 1,
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
      // console.log("Regex: " + regex);
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
    const { state, dist, block, theme, gp, kpi, financial_year } = req.query;

    // Helper function to calculate cumulative mean
    const calculateCumulativeMean = (data) => {
      const monthCount = data.length;
      const totalInputData = data.reduce(
        (sum, value) => sum + value.totalInputData,
        0
      );
      const totalMaxRange = data.reduce(
        (sum, value) => sum + value.totalMaxRange,
        0
      );
      const mean =
        totalMaxRange !== 0 ? (totalInputData / totalMaxRange) * 100 : 0;
      return mean.toFixed(2);
    };

    // 1. Calculate Quarterly Data
    const matchStageQuarterly = {
      theme_id: theme,
    };
    if (state) matchStageQuarterly.state_id = state;
    if (dist) matchStageQuarterly.dist_id = dist;
    if (block) matchStageQuarterly.block_id = block;
    if (gp) matchStageQuarterly.gp_id = gp;
    if (kpi) matchStageQuarterly.kpi_id = kpi;
    if (financial_year) {
      matchStageQuarterly.financial_year = financial_year;
    } else {
      // If no financial_year from frontend, use the latest year
      const latestYear = await GpWiseKpiModel.findOne()
        .sort({ financial_year: -1 })
        .select("financial_year")
        .lean();
      matchStageQuarterly.financial_year = latestYear.financial_year;
    }

    const pipelineQuarterly = [
      { $match: matchStageQuarterly },
      {
        $group: {
          _id: {
            frequency: "$frequency",
            quarter: {
              $switch: {
                branches: [
                  {
                    case: { $in: ["$month", ["January", "February", "March"]] },
                    then: "Q1",
                  },
                  {
                    case: { $in: ["$month", ["April", "May", "June"]] },
                    then: "Q2",
                  },
                  {
                    case: { $in: ["$month", ["July", "August", "September"]] },
                    then: "Q3",
                  },
                  {
                    case: {
                      $in: ["$month", ["October", "November", "December"]],
                    },
                    then: "Q4",
                  },
                ],
                default: "$quarter",
              },
            },
            month: "$month",
            financial_year: "$financial_year",
          },
          totalInputData: { $sum: "$input_data" },
          totalMaxRange: { $sum: "$max_range" },
        },
      },
      {
        $group: {
          _id: {
            frequency: "$_id.frequency",
            quarter: "$_id.quarter",
            financial_year: "$_id.financial_year",
          },
          monthsData: {
            $push: {
              totalInputData: "$totalInputData",
              totalMaxRange: "$totalMaxRange",
            },
          },
        },
      },
      {
        $sort: { "_id.quarter": 1 },
      },
    ];

    const quarterlyResults = await GpWiseKpiModel.aggregate(pipelineQuarterly);

    console.log(
      "Quarterly Results:",
      JSON.stringify(quarterlyResults, null, 2)
    ); // Debugging statement

    const quarterlyPercentage = {};
    quarterlyResults.forEach((result) => {
      if (result._id.quarter) {
        // Check if the quarter is not null
        const monthsData = result.monthsData;
        quarterlyPercentage[result._id.quarter] =
          calculateCumulativeMean(monthsData);
      }
    });

    // 2. Calculate Yearly Data
    const matchStageYearly = {
      theme_id: theme,
    };
    if (state) matchStageYearly.state_id = state;
    if (gp) matchStageYearly.gp_id = gp;
    if (kpi) matchStageYearly.kpi_id = kpi;
    if (financial_year) {
      matchStageYearly.financial_year = financial_year;
    } else {
      // If no financial_year from frontend, use the latest year
      const latestYear = await GpWiseKpiModel.findOne()
        .sort({ financial_year: -1 })
        .select("financial_year")
        .lean();
      matchStageYearly.financial_year = latestYear.financial_year;
    }

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
            financial_year: "$financial_year",
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
          financial_year: "$_id.financial_year",
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
    console.log("GP Yearly Data:", JSON.stringify(gpYearlyData, null, 2)); // Debugging statement

    // For State Yearly Data
    const pipelineState = [
      {
        $match: {
          state_id: state,
          theme_id: theme,
          kpi_id: kpi,
          financial_year: matchStageYearly.financial_year,
        },
      },
      {
        $group: {
          _id: {
            state_id: state,
            theme_id: theme,
            kpi_id: kpi,
            financial_year: matchStageYearly.financial_year,
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
          financial_year: "$_id.financial_year",
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
    console.log("State Yearly Data:", JSON.stringify(stateYearlyData, null, 2)); // Debugging statement

    // For Country Yearly Data
    const pipelineCountry = [
      {
        $match: {
          theme_id: theme,
          kpi_id: kpi,
          financial_year: matchStageYearly.financial_year,
        },
      },
      {
        $group: {
          _id: {
            theme_id: theme,
            kpi_id: kpi,
            financial_year: matchStageYearly.financial_year,
          },
          totalInputData: { $sum: "$input_data" },
          totalMaxRange: { $sum: "$max_range" },
        },
      },
      {
        $project: {
          _id: 0,
          theme_id: "$_id.theme_id",
          kpi_id: "$_id.kpi_id",
          financial_year: "$_id.financial_year",
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
    console.log(
      "Country Yearly Data:",
      JSON.stringify(countryYearlyData, null, 2)
    ); // Debugging statement

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
    return next(new Errorhandler("Failed to get KPI Chart data", 500));
  }
});

export const getAchievementsChart = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, block, theme, gp, financial_year } = req.query;

    let currentFY;
    let lastFY;

    if (!financial_year) {
      // Fetch distinct financial years from the database
      let financialYears = await GpWiseKpiModel.distinct("financial_year");

      // Extract start year and sort in descending order
      financialYears.sort((a, b) => {
        const yearA = parseInt(a.split("-")[0].substring(2), 10);
        const yearB = parseInt(b.split("-")[0].substring(2), 10);
        return yearB - yearA;
      });

      if (financialYears.length === 0) {
        return next(new Errorhandler("No financial year data available", 400));
      }

      [currentFY, lastFY] =
        financialYears.length > 1
          ? financialYears.slice(0, 2)
          : [financialYears[0], null];
    } else {
      currentFY = financial_year;
      lastFY = null;
    }

    // Helper function to build match stages for different financial years
    const buildMatchStage = (financialYear) => {
      const matchStage = {
        theme_id: theme,
        financial_year: financialYear,
      };
      if (state) matchStage.state_id = state;
      if (dist) matchStage.dist_id = dist;
      if (block) matchStage.block_id = block;
      if (gp) matchStage.gp_id = gp;
      return matchStage;
    };

    // Calculate Yearly Data for Current Financial Year and, if available, Last Financial Year
    const matchStageYearlyCurrent = buildMatchStage(currentFY);
    const pipelineYearly = (matchStage) => [
      { $match: matchStage },
      {
        $group: {
          _id: {
            state_id: "$state_id",
            dist_id: "$dist_id",
            block_id: "$block_id",
            gp_id: "$gp_id",
            theme_id: "$theme_id",
            kpi_id: "$kpi_id",
          },
          totalInputData: { $sum: "$input_data" },
          totalMaxRange: { $sum: "$max_range" },
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "_id.state_id",
          foreignField: "id",
          as: "state_info",
        },
      },
      {
        $lookup: {
          from: "districts",
          localField: "_id.dist_id",
          foreignField: "id",
          as: "district_info",
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "_id.block_id",
          foreignField: "id",
          as: "block_info",
        },
      },
      {
        $lookup: {
          from: "gps",
          localField: "_id.gp_id",
          foreignField: "id",
          as: "gp_info",
        },
      },
      {
        $lookup: {
          from: "themes",
          localField: "_id.theme_id",
          foreignField: "id",
          as: "theme_info",
        },
      },
      {
        $lookup: {
          from: "kpis",
          localField: "_id.kpi_id",
          foreignField: "id",
          as: "kpi_info",
        },
      },
      {
        $project: {
          _id: 0,
          gp_id: "$_id.gp_id",
          gp_name: { $arrayElemAt: ["$gp_info.name", 0] },
          state_name: { $arrayElemAt: ["$state_info.name", 0] },
          dist_name: { $arrayElemAt: ["$district_info.name", 0] },
          block_name: { $arrayElemAt: ["$block_info.name", 0] },
          theme_id: "$_id.theme_id",
          theme_name: { $arrayElemAt: ["$theme_info.theme_name", 0] },
          kpi_id: "$_id.kpi_id",
          kpi_name: { $arrayElemAt: ["$kpi_info.name", 0] },
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

    const currentYearData = await GpWiseKpiModel.aggregate(
      pipelineYearly(matchStageYearlyCurrent)
    );

    let lastYearData = [];
    if (lastFY) {
      const matchStageYearlyLast = buildMatchStage(lastFY);
      lastYearData = await GpWiseKpiModel.aggregate(
        pipelineYearly(matchStageYearlyLast)
      );
    }

    // Combine current and last year data by theme
    const combinedData = {};

    currentYearData.forEach((current) => {
      if (!combinedData[current.theme_id]) {
        combinedData[current.theme_id] = {
          theme_id: current.theme_id,
          theme_name: current.theme_name,
          gp_name: current.gp_name,
          state_name: current.state_name,
          dist_name: current.dist_name,
          block_name: current.block_name,
          chartData: [],
        };
      }
      const last = lastYearData.find(
        (last) => last.gp_id === current.gp_id && last.kpi_id === current.kpi_id
      );
      combinedData[current.theme_id].chartData.push({
        kpi_id: current.kpi_id,
        kpi_name: current.kpi_name,
        currentPercentage: {
          financial_year: currentFY,
          percentage: current.percentage.toFixed(2),
        },
        lastPercentage: last
          ? {
              financial_year: lastFY,
              percentage: last.percentage.toFixed(2),
            }
          : null,
      });
    });

    console.log(currentFY);

    // Sort according to kpi
    Object.values(combinedData).forEach((themeData) => {
      themeData.chartData.sort((a, b) => {
        const kpiIdA = parseInt(a.kpi_id, 10);
        const kpiIdB = parseInt(b.kpi_id, 10);
        return kpiIdA - kpiIdB;
      });
    });

    res.json(Object.values(combinedData));
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get KPI data", 500));
  }
});

// export const getAchievementsChart = CatchAsyncError(async (req, res, next) => {
//   try {
//     const { state, dist, block, theme, gp, dataType = "gp" } = req.query;

//     // Fetch distinct financial years
//     let financialYears = await GpWiseKpiModel.distinct("financial_year");

//     // Extract start year and sort in descending order
//     financialYears.sort((a, b) => {
//       const yearA = parseInt(a.split("-")[0].substring(2), 10);
//       const yearB = parseInt(b.split("-")[0].substring(2), 10);
//       return yearB - yearA;
//     });

//     if (financialYears.length === 0) {
//       return next(new Errorhandler("No financial year data available", 400));
//     }

//     const [currentFY, lastFY] =
//       financialYears.length > 1
//         ? financialYears.slice(0, 2)
//         : [financialYears[0], null];

//     // Helper function to build match stages for different financial years
//     const buildMatchStage = (financialYear) => {
//       const matchStage = {
//         theme_id: theme,
//         financial_year: financialYear,
//       };
//       if (state) matchStage.state_id = state;
//       if (dist) matchStage.dist_id = dist;
//       if (block) matchStage.block_id = block;
//       if (gp) matchStage.gp_id = gp;
//       return matchStage;
//     };

//     const buildPipeline = (matchStage) => [
//       { $match: matchStage },
//       {
//         $group: {
//           _id: {
//             state_id: "$state_id",
//             dist_id: "$dist_id",
//             block_id: "$block_id",
//             gp_id: "$gp_id",
//             theme_id: "$theme_id",
//             kpi_id: "$kpi_id",
//           },
//           totalScore: { $sum: "$score" },
//         },
//       },
//       {
//         $lookup: {
//           from: "states",
//           localField: "_id.state_id",
//           foreignField: "id",
//           as: "state_info",
//         },
//       },
//       {
//         $lookup: {
//           from: "districts",
//           localField: "_id.dist_id",
//           foreignField: "id",
//           as: "district_info",
//         },
//       },
//       {
//         $lookup: {
//           from: "blocks",
//           localField: "_id.block_id",
//           foreignField: "id",
//           as: "block_info",
//         },
//       },
//       {
//         $lookup: {
//           from: "gps",
//           localField: "_id.gp_id",
//           foreignField: "id",
//           as: "gp_info",
//         },
//       },
//       {
//         $lookup: {
//           from: "themes",
//           localField: "_id.theme_id",
//           foreignField: "id",
//           as: "theme_info",
//         },
//       },
//       {
//         $lookup: {
//           from: "kpis",
//           localField: "_id.kpi_id",
//           foreignField: "id",
//           as: "kpi_info",
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           gp_id: "$_id.gp_id",
//           gp_name: { $arrayElemAt: ["$gp_info.name", 0] },
//           state_name: { $arrayElemAt: ["$state_info.name", 0] },
//           dist_name: { $arrayElemAt: ["$district_info.name", 0] },
//           block_name: { $arrayElemAt: ["$block_info.name", 0] },
//           theme_id: "$_id.theme_id",
//           theme_name: { $arrayElemAt: ["$theme_info.theme_name", 0] },
//           kpi_id: "$_id.kpi_id",
//           kpi_name: { $arrayElemAt: ["$kpi_info.name", 0] },
//           totalScore: 1,
//         },
//       },
//     ];

//     const matchStageYearlyCurrent = buildMatchStage(currentFY);
//     const pipelineYearlyCurrent = buildPipeline(matchStageYearlyCurrent);
//     const currentYearData = await GpWiseKpiModel.aggregate(
//       pipelineYearlyCurrent
//     );

//     let lastYearData = [];
//     if (lastFY) {
//       const matchStageYearlyLast = buildMatchStage(lastFY);
//       const pipelineYearlyLast = buildPipeline(matchStageYearlyLast);
//       lastYearData = await GpWiseKpiModel.aggregate(pipelineYearlyLast);
//     }

//     // Calculate reference score based on dataType
//     const calculateReferenceScore = async (dataType, financialYear) => {
//       const matchStage = { theme_id: theme, financial_year: financialYear };
//       switch (dataType) {
//         case "gp":
//           if (gp) matchStage.gp_id = gp;
//           break;
//         case "state":
//           if (state) matchStage.state_id = state;
//           break;
//         case "country":
//           // No additional filter needed for country level
//           break;
//       }
//       const pipeline = [
//         { $match: matchStage },
//         {
//           $group: {
//             _id: null,
//             totalScore: { $sum: "$score" },
//           },
//         },
//       ];
//       const result = await GpWiseKpiModel.aggregate(pipeline);
//       return result.length > 0 ? result[0].totalScore : 0;
//     };

//     const referenceScoreCurrent = await calculateReferenceScore(
//       dataType,
//       currentFY
//     );
//     const referenceScoreLast = lastFY
//       ? await calculateReferenceScore(dataType, lastFY)
//       : 0;

//     // Helper function to calculate percentages based on dataType
//     const calculatePercentage = (totalScore, referenceScore) => {
//       return referenceScore === 0 ? 0 : (totalScore / referenceScore) * 100;
//     };

//     // Combine current and last year data by theme
//     const combinedData = {};

//     currentYearData.forEach((current) => {
//       if (!combinedData[current.theme_id]) {
//         combinedData[current.theme_id] = {
//           theme_id: current.theme_id,
//           theme_name: current.theme_name,
//           gp_name: current.gp_name,
//           state_name: current.state_name,
//           dist_name: current.dist_name,
//           block_name: current.block_name,
//           chartData: [],
//         };
//       }

//       const last = lastYearData.find(
//         (last) => last.gp_id === current.gp_id && last.kpi_id === current.kpi_id
//       );

//       combinedData[current.theme_id].chartData.push({
//         kpi_id: current.kpi_id,
//         kpi_name: current.kpi_name,
//         currentPercentage: {
//           financial_year: currentFY,
//           percentage: calculatePercentage(
//             current.totalScore,
//             referenceScoreCurrent
//           ).toFixed(2),
//         },
//         lastPercentage: last
//           ? {
//               financial_year: lastFY,
//               percentage: calculatePercentage(
//                 last.totalScore,
//                 referenceScoreLast
//               ).toFixed(2),
//             }
//           : null,
//       });
//     });

//     // Sort according to kpi
//     Object.values(combinedData).forEach((themeData) => {
//       themeData.chartData.sort((a, b) => {
//         const kpiIdA = parseInt(a.kpi_id, 10);
//         const kpiIdB = parseInt(b.kpi_id, 10);
//         return kpiIdA - kpiIdB;
//       });
//     });

//     res.json(Object.values(combinedData));
//   } catch (error) {
//     console.error(error);
//     return next(new Errorhandler("Failed to get KPI data", 500));
//   }
// });

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
      const { submitted_id } = req.query;

      const matchStage = {
        submitted_id,
      };

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
            from: "kpiapprovals",
            localField: "submitted_id",
            foreignField: "submitted_id",
            as: "approvalDetails",
          },
        },
        {
          $unwind: "$approvalDetails",
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
            from: "themes",
            localField: "theme_id",
            foreignField: "id",
            as: "themeDetails",
          },
        },
        { $unwind: "$themeDetails" },
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
    const { keyword, theme, fy } = req.query;
    const matchStage = {};
    if (theme) matchStage.theme_id = theme;
    if (fy) matchStage.financial_year = fy;
    const pipeline = [
      {
        $match: matchStage,
      },
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
        $addFields: {
          totalScore: { $trunc: { $divide: ["$totalScore", 4] } },
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

// Get Block ranking

export const getBlockRankingController = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { keyword, fy } = req.query;
      const matchStage = {};

      if (fy) matchStage.financial_year = fy;

      const pipeline = [
        {
          $match: matchStage,
        },
        {
          $group: {
            _id: "$block_id",
            totalScore: { $sum: "$score" },
            state_id: { $first: "$state_id" },
            dist_id: { $first: "$dist_id" },
          },
        },
        {
          $lookup: {
            from: "grampanchayats",
            localField: "_id",
            foreignField: "block_id",
            as: "gps",
          },
        },
        {
          $addFields: {
            gpCount: { $size: "$gps" },
          },
        },
        {
          $addFields: {
            totalScore: {
              $cond: {
                if: { $eq: ["$gpCount", 0] },
                then: 0,
                else: {
                  $trunc: {
                    $divide: [{ $divide: ["$totalScore", 4] }, "$gpCount"],
                  },
                },
              },
            },
          },
        },
        {
          $sort: { totalScore: -1 },
        },
        {
          $lookup: {
            from: "blocks",
            localField: "_id",
            foreignField: "id",
            as: "block",
          },
        },
        {
          $unwind: "$block",
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
          $addFields: {
            block_name: "$block.name",
            state_name: "$state.name",
            dist_name: "$district.name",
          },
        },
        {
          $unset: ["block", "state", "district", "gps"],
        },
      ];

      let ranking = await GpWiseKpiModel.aggregate(pipeline);

      // Add ranks to the sorted results manually
      ranking.forEach((item, index) => {
        item.rank = index + 1;
      });

      // Apply advanced regex filtering on the ranked results
      if (keyword) {
        const regex = new RegExp(keyword, "i"); // 'i' for case-insensitive
        ranking = ranking.filter(
          (item) =>
            regex.test(item.block_name) ||
            regex.test(item.state_name) ||
            regex.test(item.dist_name)
        );
      }

      res.status(200).json({
        success: true,
        message: "Block ranking fetched successfully",
        total: ranking.length,
        data: ranking,
      });
    } catch (error) {
      return next(new Errorhandler("Failed to get block ranking", 500));
    }
  }
);

import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpWiseKpiModel } from "../models/gpWiseKpiModel.js";
import { KPIApprovalModel } from "../models/kpiApprovalModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

// export const createGpWiseKpiData = CatchAsyncError(async (req, res, next) => {
//   try {
//     const gpWiseKpiData = await GpWiseKpiModel.create(req.body);
//     if (!gpWiseKpiData) {
//       return next(new Errorhandler("Failed to create  GpWiseKpi data", 500));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Gp Wise KPI Data Created Successfully",
//       data: gpWiseKpiData,
//     });
//   } catch (error) {
//     return next(new Errorhandler("Failed to create  GpWiseKpi data", 500));
//   }
// });

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
      submitteed_id,
      formData,
    } = req.body;

    // Validate if formData is empty
    if (!formData || formData.length === 0) {
      return next(new Errorhandler("Form data cannot be empty", 400));
    }

    // Prepare the GpWiseKPI documents for insertion
    const kpiDocuments = formData.map((kpi) => ({
      state_id: state_id,
      dist_id: dist_id,
      block_id: block_id,
      gp_id: gp_id,
      date: date,
      theme_id: theme_id,
      kpi_id: kpi.kpi_id,
      question_id: kpi.question_id,
      max_range: kpi.max_range,
      input_data: kpi.input_data,
      remarks: kpi.remarks,
      submitteed_id,
      created_by: user_id,
    }));

    // Inserting the KPI documents into the gpWiseKpi collection
    await GpWiseKpiModel.insertMany(kpiDocuments);

    // Create the approval request document
    const approvalDocument = {
      id,
      state_id,
      dist_id,
      block_id,
      gp_id,
      theme_id,
      submitteed_id: user_id,
      created_by: user_id,
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

export const getGpWiseKpi = CatchAsyncError(async (req, res, next) => {
  try {
    const limit = req.query.limit || 50;
    const pageNumber = req.query.page || 1;
    const startIndex = (pageNumber - 1) * limit;
    const { state, dist, block, gp } = req.query;

    // filter object
    const filter = {};
    if (state) filter.state_id = state;
    if (dist) filter.district_id = dist;
    if (block) filter.block_id = block;
    if (gp) filter.gp_id = gp;

    const gpWiseKpiData = await GpWiseKpiModel.aggregate([
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
          localField: "district_id",
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
      { $skip: startIndex },
      { $limit: limit },
      { $sort: { created_at: -1 } },
    ]);
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
    const { state, dist, gp, kpi } = req.query;
    const gpData = await GpWiseKpiModel.findOne({
      kpi_id: kpi,
      state_id: state,
      district_id: dist,
      gp_id: gp,
      theme_id: "1",
    });

    // console.log(gpData);
    if (!gpData || gpData.length === 0) {
      return next(new Errorhandler("No Gp Wise KPI Data Found", 404));
    }

    let gpPercentage = (gpData.input_data / gpData.max_range) * 100;

    const stateData = await GpWiseKpiModel.find({
      kpi_id: kpi,
      state_id: state,
    });

    const stateTotalInputData = stateData.reduce(
      (total, gp) => total + gp.input_data,
      0
    );
    const stateTotalMaxRange = stateData.reduce(
      (total, gp) => total + gp.max_range,
      0
    );

    let statePercentage = (stateTotalInputData / stateTotalMaxRange) * 100;

    const countryData = await GpWiseKpiModel.find({ kpi_id: kpi });
    const countryTotalInputData = countryData.reduce(
      (total, gp) => total + gp.input_data,
      0
    );
    const countryTotalMaxRange = countryData.reduce(
      (total, gp) => total + gp.max_range,
      0
    );

    let countryPercentage =
      (countryTotalInputData / countryTotalMaxRange) * 100;

    // console.log(
    //   statePercentage,
    //   "      countryPercentage: ",
    //   countryPercentage,
    //   "gp:  ",
    //   gpPercentage
    // );
    const totalPercentage = gpPercentage + statePercentage + countryPercentage;
    const adjustmentFactor = 100 / totalPercentage;

    gpPercentage *= adjustmentFactor;
    statePercentage *= adjustmentFactor;
    countryPercentage *= adjustmentFactor;

    res.json({
      gp: {
        gp_id: gpData.gp_id,
        percentage: gpPercentage.toFixed(2),
      },
      state: {
        state_id: state,
        percentage: statePercentage.toFixed(2),
      },
      country: {
        percentage: countryPercentage.toFixed(2),
      },
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get kpi data", 500));
  }
});

const getGpWiseKpiDataWithPercentage = async (query) => {
  const { state, dist, block, gp, kpi } = query;
  const filter = {};
  if (state) filter.state_id = state;
  if (dist) filter.district_id = dist;
  if (block) filter.block_id = block;
  if (gp) filter.gp_id = gp;
  if (kpi) filter.kpi_id = kpi;
  filter.theme_id = "10";

  const gpWiseKpiData = await GpWiseKpiModel.aggregate([
    { $match: filter },
    {
      $group: {
        _id: {
          gp_id: "$gp_id",
          kpi_id: "$kpi_id",
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
        localField: "doc.district_id",
        foreignField: "id",
        as: "district",
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
        kpis: {
          $push: {
            kpi_id: "$_id.kpi_id",
            percentage: "$percentage",
          },
        },
        doc: { $first: "$$ROOT" },
      },
    },
    {
      $addFields: {
        kpis: {
          $sortArray: {
            input: "$kpis",
            sortBy: { kpi_id: 1 },
          },
        },
      },
    },
    {
      $project: {
        id: "$doc.id",
        state_name: { $arrayElemAt: ["$doc.state.name", 0] },
        district_name: { $arrayElemAt: ["$doc.district.name", 0] },
        block_name: { $arrayElemAt: ["$doc.block.name", 0] },
        gp_name: { $arrayElemAt: ["$doc.gp.name", 0] },
        date: "$doc.date",
        theme_id: "$doc.theme_id",
        gp_percentage: "$kpis",
      },
    },
  ]);

  if (!gpWiseKpiData || gpWiseKpiData.length === 0) {
    throw new Errorhandler("No Gp Wise KPI Data Found", 404);
  }

  return gpWiseKpiData;
};

export const getGpWiseKpiDataWithPercentageController = CatchAsyncError(
  async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const pageNumber = parseInt(req.query.page) || 1;
      const startIndex = (pageNumber - 1) * limit;

      const gpWiseKpiData = await getGpWiseKpiDataWithPercentage(req.query);

      const paginatedData = gpWiseKpiData.slice(startIndex, startIndex + limit);

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

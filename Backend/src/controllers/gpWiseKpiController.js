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
    const { state, dist, block, gp } = req.query;

    // filter object
    const filter = {};
    if (state) filter.state_id = state;
    if (dist) filter.dist_id = dist;
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
      dist_id: dist,
      gp_id: gp,
      theme_id: "1",
    });

    // console.log(gpData);
    if (!gpData || gpData.length === 0) {
      return next(new Errorhandler("No Gp Wise KPI Data Found", 404));
    }

    let gpPercentage = (gpData.input_data / gpData.max_range) * 100;
    console.log(gpPercentage);
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
    // const totalPercentage = gpPercentage + statePercentage + countryPercentage;
    // const adjustmentFactor = 100 / totalPercentage;

    // gpPercentage *= adjustmentFactor;
    // statePercentage *= adjustmentFactor;
    // countryPercentage *= adjustmentFactor;

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
    { $sort: { "doc.created_at": 1 } },
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
      const { state, dist, block, gp, theme, date } = req.query;
      // Ensure the incoming date is parsed correctly and set to midnight UTC
      const parsedDate = new Date(date);
      parsedDate.setUTCHours(0, 0, 0, 0);

      // Constructing the match stage
      const matchStage = {
        gp_id: gp,
        theme_id: theme,
        $expr: {
          $eq: [
            { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            { $dateToString: { format: "%Y-%m-%d", date: parsedDate } },
          ],
        },
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

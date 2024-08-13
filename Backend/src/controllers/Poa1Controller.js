import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { Poa1Model } from "../models/Poa1Model.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";

const getNewId = async () => {
  try {
    const maxDoc = await Poa1Model.aggregate([
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

export const createPoa1 = CatchAsyncError(async (req, res, next) => {
  try {
    const poaData = Object.keys(req.body)
      .filter((key) => key.startsWith("poaData"))
      .reduce((acc, key) => {
        const [, index, field] = key.match(/poaData\[(\d+)\]\[(\w+)\]/);
        acc[index] = acc[index] || {};
        acc[index][field] = req.body[key];
        return acc;
      }, {});

    const user_id = req?.user?.id;

    for (const [index, entry] of Object.entries(poaData)) {
      const photoKey = `poaData[${index}][photo]`;

      if (req.files && req.files[photoKey]) {
        // Access the buffer data from req.files
        const photoBuffer = req.files[photoKey].data;

        // Upload the photo to Cloudinary
        const result = await uploadFile(photoBuffer);

        // Replace the photo field in poaData with the Cloudinary URL
        poaData[index].photo = result.secure_url;
      }
    }

    let poa1 = await Poa1Model.findOne({ user_id });

    if (poa1) {
      const existingDates = poa1.poaData.map((item) => item.date.toString());
      const newEntries = Object.values(poaData).filter(
        (entry) => !existingDates.includes(new Date(entry.date).toISOString())
      );

      if (newEntries.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "No new data to add. Data for the provided dates already exists.",
        });
      }

      poa1.poaData.push(...newEntries);
      poa1.status = "1";
      await poa1.save();
    } else {
      poa1 = new Poa1Model({
        id: (await getNewId()).toString(),

        user_id,
        status: "1",
        poaData: Object.values(poaData),
      });
      await poa1.save();
    }

    res.status(201).json({
      success: true,
      message: "POA1 data successfully saved",
      data: poa1,
    });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to submit POA1 Data", 500));
  }
});

export const getPoa1s = CatchAsyncError(async (req, res, next) => {
  try {
    const poa1Data = await Poa1Model.find({ user_id: req?.user?.id });

    res.status(200).json({ success: true, data: poa1Data });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to get POA1 Data", 500));
  }
});

export const getPoalData = CatchAsyncError(async (req, res, next) => {
  try {
    const poa1Data = await Poa1Model.aggregate([
      {
        $match: {
          id: req.params.id,
        },
      },
      {
        $unwind: {
          path: "$poaData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "soeprstates",
          localField: "poaData.state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "soeprdistricts",
          localField: "poaData.dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $addFields: {
          "poaData.state": {
            $arrayElemAt: ["$state", 0], // Ensure that the correct state is associated
          },
          "poaData.district": {
            $arrayElemAt: ["$district", 0], // Ensure that the correct district is associated
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          id: { $first: "$id" },
          user_id: { $first: "$user_id" },
          status: { $first: "$status" },
          poaData: { $push: "$poaData" },
          created_at: { $first: "$created_at" },
          modified_at: { $first: "$modified_at" },
        },
      },
    ]);

    if (!poa1Data || poa1Data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No POA1 Data Found" });
    }
    res.status(200).json({ success: true, data: poa1Data[0] });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to get POA1 Data", 500));
  }
});

// Get the state wise data ---- Admin

export const getPoa1DataByState = CatchAsyncError(async (req, res, next) => {
  try {
    const { state_id, user_id, month, year } = req.query;

    const poa1Data = await Poa1Model.aggregate([
      {
        $unwind: {
          path: "$poaData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          poaMonth: {
            $month: {
              $dateFromString: {
                dateString: "$poaData.date",
                format: "%d/%m/%Y",
              },
            },
          },
          poaYear: {
            $year: {
              $dateFromString: {
                dateString: "$poaData.date",
                format: "%d/%m/%Y",
              },
            },
          },
        },
      },
      {
        $match: {
          poaMonth: parseInt(month),
          poaYear: parseInt(year),
          "poaData.state_id": state_id,
          user_id: user_id,
        },
      },
      {
        $lookup: {
          from: "soeprstates",
          localField: "poaData.state_id",
          foreignField: "id",
          as: "stateDetails",
        },
      },
      {
        $lookup: {
          from: "soeprdistricts",
          localField: "poaData.dist_id",
          foreignField: "id",
          as: "districtDetails",
        },
      },
      {
        $addFields: {
          "poaData.state": {
            $arrayElemAt: ["$stateDetails", 0],
          },
          "poaData.district": {
            $arrayElemAt: ["$districtDetails", 0],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          user_id: { $first: "$user_id" },
          poaData: { $push: "$poaData" },
          created_at: { $first: "$created_at" },
          modified_at: { $first: "$modified_at" },
        },
      },
      {
        $project: {
          stateDetails: 0,
          districtDetails: 0,
        },
      },
    ]);

    if (!poa1Data || poa1Data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No POA1 Data Found for this State" });
    }

    res.status(200).json({ success: true, data: poa1Data[0] });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to Get POA1 Data", 500));
  }
});

// Get all poa1 data --- Super admin
export const getAllPoa1Data = CatchAsyncError(async (req, res, next) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res
        .status(400)
        .json({ success: false, message: "Month and Year are required" });
    }

    const poa1Data = await Poa1Model.aggregate([
      {
        $unwind: {
          path: "$poaData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          poaMonth: {
            $month: {
              $dateFromString: {
                dateString: "$poaData.date",
                format: "%d/%m/%Y",
              },
            },
          },
          poaYear: {
            $year: {
              $dateFromString: {
                dateString: "$poaData.date",
                format: "%d/%m/%Y",
              },
            },
          },
        },
      },
      {
        $match: {
          poaMonth: parseInt(month),
          poaYear: parseInt(year),
        },
      },
      {
        $lookup: {
          from: "soeprstates",
          localField: "poaData.state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $addFields: {
          "poaData.state": {
            $arrayElemAt: ["$state", 0], // Ensure that the correct state is associated
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          id: { $first: "$id" },
          user_id: { $first: "$user_id" },
          status: { $first: "$status" },
          poaData: { $push: "$poaData" },
          created_at: { $first: "$created_at" },
          modified_at: { $first: "$modified_at" },
        },
      },
    ]);

    if (!poa1Data || poa1Data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No POA1 Data Found for the specified month and year",
      });
    }
    res.status(200).json({ success: true, data: poa1Data });
  } catch (error) {
    next(new Errorhandler("Failed to Retrieve POA1 Data", 500));
  }
});

export const updatePoa1Data = CatchAsyncError(async (req, res, next) => {
  try {
  } catch (error) {
    next(new Errorhandler("Failed to Update POA1 Data", 500));
  }
});

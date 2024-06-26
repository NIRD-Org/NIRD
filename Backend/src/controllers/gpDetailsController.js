import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpDetailsModel } from "../models/gpDetailsModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await GpDetailsModel.aggregate([
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

export const createPanchayatDetails = CatchAsyncError(
  async (req, res, next) => {
    try {
      const {
        state_id,
        dist_id,
        block_id,
        gp_id,
        panchayatDetails,
        demography,
        panchayatArea,
        sarpanchDetails,
        secretaryDetails,
        health,
        education,
        others,
        sports,
        wardDetails,
        general,
      } = req.body;
      const id = await getNewId();

      //   Check if data already exist

      const existingData = await GpDetailsModel.findOne({
        state_id,
        dist_id,
        block_id,
        gp_id,
      });

      if (existingData) {
        return next(new Errorhandler("GP Data already exists!", 400));
      }

      const panchayat = new GpDetailsModel({
        id,
        state_id,
        dist_id,
        block_id,
        gp_id,
        panchayatDetails,
        demography,
        panchayatArea,
        sarpanchDetails,
        secretaryDetails,
        health,
        education,
        others,
        sports,
        wardDetails,
        general,
      });
      await panchayat.save();
      res
        .status(201)
        .json({ success: true, message: "Panchayat Data saved successfully" });
    } catch (error) {
      console.log("Error", error);
      return next(new Errorhandler("Failed to create panchayat data", 500));
    }
  }
);

// update the panchayat data

export const updatePanchayatDetails = CatchAsyncError(
  async (req, res, next) => {
    try {
      const {
        state_id,
        dist_id,
        block_id,
        gp_id,
        panchayatDetails,
        demography,
        panchayatArea,
        sarpanchDetails,
        secretaryDetails,
      } = req.body;

      console.log(req.body);

      const panchayat = await GpDetailsModel.findOneAndUpdate(
        { state_id, dist_id, block_id, gp_id },
        {
          panchayatDetails,
          demography,
          panchayatArea,
          sarpanchDetails,
          secretaryDetails,
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Panchayat Data updated successfully",
      });
    } catch (error) {
      return next(new Errorhandler("Failed to Update panchayat data", 500));
    }
  }
);

// Get the panchayat data

export const getPanchayatDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, block, gp } = req.query;

    const match = {
      gp_id: gp,
    };

    if (state) match.state_id = state;
    if (dist) match.dist_id = dist;
    if (block) match.block_id = block;

    const panchayat = await GpDetailsModel.findOne(match);

    if (!panchayat) {
      return next(new Errorhandler("Panchayat data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Panchayat Data Fetched Successfully",
      data: panchayat,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get panchayat data", 500));
  }
});

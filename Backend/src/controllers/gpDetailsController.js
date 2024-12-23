import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpDetailsModel } from "../models/gpDetailsModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";
import path from "path";
import fs from "fs";
import { UserLocationModel } from "../models/userLocationModel.js";
const __dirname = path.resolve();
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
        wardDetails, // Expecting this to be an array
        general,
      } = req.body;

      // Validate wardDetails
      if (!Array.isArray(wardDetails)) {
        return next(new Errorhandler("Ward details must be an array", 400));
      }

      const sarpanchPhoto = req.body.sarpanchPhoto;
      const secretaryPhoto = req.body.secretaryPhoto;

      if (sarpanchPhoto) {
        const sarpanchUrl = await uploadFile(sarpanchPhoto);
        req.body.sarpanchDetails.sarpanchPhoto = sarpanchUrl;
      }

      if (secretaryPhoto) {
        const secretaryUrl = await uploadFile(secretaryPhoto);
        req.body.secretaryDetails.secretaryPhoto = secretaryUrl;
      }

      // Check if data already exists for the given GP identifiers
      const existingData = await GpDetailsModel.findOne({
        state_id,
        dist_id,
        block_id,
        gp_id,
      });

      if (existingData) {
        // Update existing record
        Object.assign(existingData, {
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
          updated_by: req.user.id, // Track the user who made the update
        });

        await existingData.save();

        return res.status(200).json({
          success: true,
          message: "Panchayat Data updated successfully",
        });
      } else {
        // Create a new record
        const id = await getNewId();

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
          created_by: req.user.id,
        });

        await panchayat.save();

        return res.status(201).json({
          success: true,
          message: "Panchayat Data created successfully",
        });
      }
    } catch (error) {
      console.log("Error", error);
      return next(
        new Errorhandler("Failed to create or update panchayat data", 500)
      );
    }
  }
);

export const updatePanchayatDetails = CatchAsyncError(
  async (req, res, next) => {
    try {
      const {
        panchayatDetails,
        demography,
        panchayatArea,
        sarpanchDetails,
        secretaryDetails,
        wardDetails, // Expecting this to be an array
      } = req.body;

      // Validate wardDetails
      if (wardDetails && !Array.isArray(wardDetails)) {
        return next(new Errorhandler("Ward details must be an array", 400));
      }

      const panchayat = await GpDetailsModel.findOneAndUpdate(
        { id: req.params.id },
        {
          panchayatDetails,
          demography,
          panchayatArea,
          sarpanchDetails,
          secretaryDetails,
          wardDetails, // Updating wardDetails as an array
          decision: 0,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Panchayat Data updated successfully",
      });
    } catch (error) {
      return next(new Errorhandler("Failed to Update panchayat data", 500));
    }
  }
);

// only for admin
export const getAllPanchayatDetails = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { decision, state_id, dist_id, block_id, gp_id } = req.query;
      const filter = {};

      if (decision) filter.decision = parseInt(decision);
      if (state_id) filter.state_id = state_id;
      if (block_id) filter.block_id = block_id;
      if (gp_id) filter.gp_id = gp_id;
      if (dist_id) filter.dist_id = dist_id;
      if (req.user.role == 3) filter.created_by = req.user.id;
      if (req.user.role == 2 && !req.query.state_id) {
        const { userLocations } = await UserLocationModel.findOne({
          user_id: req.user.id,
        });
        const stateIds = userLocations.state_ids;
        filter.state_id = { $in: stateIds };
      }
      // const gpDetails = await GpDetailsModel.find(filter);
      const gpDetails = await GpDetailsModel.aggregate([
        { $match: filter },
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
        { $unwind: "$state" },
        { $unwind: "$block" },
        { $unwind: "$district" },
        { $unwind: "$gp" },
        {
          $addFields: {
            state_name: "$state.name",
            block_name: "$block.name",
            dist_name: "$district.name",
            gp_name: "$gp.name",
          },
        },
      ]);

      res.status(200).json({
        success: true,
        message: "GpDetails fetched successfully",
        data: gpDetails,
      });
    } catch (error) {
      console.error(error);
      return next(new Errorhandler("Failed to fetch GpDetails", 500));
    }
  }
);

// approved one only
export const getPanchayatDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, block, gp } = req.query;

    const match = {
      gp_id: gp,
    };
    // match.decision = "1";

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

export const approvePanchayatDetails = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { decision, remarks } = req.body;

      const panchayat = await GpDetailsModel.findOneAndUpdate(
        { id },
        { decision, remarks },
        { new: true }
      );

      if (!panchayat) {
        return next(new Errorhandler("Panchayat data not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Panchayat Data Approved Successfully",
        data: panchayat,
      });
    } catch (error) {
      return next(new Errorhandler("Failed to approve panchayat data", 500));
    }
  }
);

export const getPanchayatDetailsById = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const pipeline = [
        {
          $match: { id },
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
          $lookup: {
            from: "grampanchayats",
            localField: "gp_id",
            foreignField: "id",
            as: "gp",
          },
        },
        {
          $unwind: "$gp",
        },
      ];

      const [panchayat] = await GpDetailsModel.aggregate(pipeline);

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
  }
);

export const approveGpDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { decision, remarks } = req.body;
    console.log(req.body);

    const updatedGpDetails = await GpDetailsModel.findOneAndUpdate(
      { id },
      { decision, remarks },
      { new: true }
    );

    if (!updatedGpDetails) {
      return next(new Errorhandler("Good Practice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practice approved successfully",
      data: updatedGpDetails,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to approve Good Practice", 500));
  }
});

import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpDetailsModel } from "../models/gpDetailsModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";
import path from "path";
import fs from "fs";
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

// export const createPanchayatDetails = CatchAsyncError(
//   async (req, res, next) => {
//     try {
//       const {
//         state_id,
//         dist_id,
//         block_id,
//         gp_id,
//         panchayatDetails,
//         demography,
//         panchayatArea,
//         sarpanchDetails,
//         secretaryDetails,
//         health,
//         education,
//         others,
//         sports,
//         wardDetails,
//         general,
//       } = req.fields;
//       const id = await getNewId();

//       console.log(req.fields);

//       if (req.files) {
//         const { sarpanchPhoto, secretaryPhoto } = req.files;

//         if (sarpanchPhoto) {
//           const { url: sarpanchUrl } = await uploadFile(sarpanchPhoto.data);
//           sarpanchDetails.sarpanchPhoto = sarpanchUrl;
//         }

//         if (secretaryPhoto) {
//           const { url: secretaryUrl } = await uploadFile(secretaryPhoto.data);
//           secretaryDetails.secretaryPhoto = secretaryUrl;
//         }
//       }

//       const existingData = await GpDetailsModel.findOne({
//         state_id,
//         dist_id,
//         block_id,
//         gp_id,
//       });

//       if (existingData) {
//         return next(new Errorhandler("GP Data already exists!", 400));
//       }

//       const panchayat = new GpDetailsModel({
//         id,
//         state_id,
//         dist_id,
//         block_id,
//         gp_id,
//         panchayatDetails,
//         demography,
//         panchayatArea,
//         sarpanchDetails,
//         secretaryDetails,
//         health,
//         education,
//         others,
//         sports,
//         wardDetails,
//         general,
//       });
//       await panchayat.save();
//       res
//         .status(201)
//         .json({ success: true, message: "Panchayat Data saved successfully" });
//     } catch (error) {
//       console.log("Error", error);
//       return next(new Errorhandler("Failed to create panchayat data", 500));
//     }
//   }
// );

export const createPanchayatDetails = async (req, res, next) => {
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

    // Parse sarpanchDetails and secretaryDetails from JSON strings to objects
    const parsedSarpanchDetails = sarpanchDetails;
    const parsedSecretaryDetails = secretaryDetails;

    const id = await getNewId();

    // Handle file uploads if they exist
    if (req.files) {
      const { sarpanchPhoto, secretaryPhoto } = req.files;

      // Upload sarpanch photo to Cloudinary
      if (sarpanchPhoto) {
        const sarpanchUploadResult = await uploadFile(sarpanchPhoto.data);
        parsedSarpanchDetails.sarpanchPhoto = sarpanchUploadResult.url;
      }

      // Upload secretary photo to Cloudinary
      if (secretaryPhoto) {
        const secretaryUploadResult = await uploadFile(secretaryPhoto.data);
        parsedSecretaryDetails.secretaryPhoto = secretaryUploadResult.url;
      }
    }

    // Check if data already exists
    const existingData = await GpDetailsModel.findOne({
      state_id,
      dist_id,
      block_id,
      gp_id,
    });

    if (existingData) {
      return res
        .status(400)
        .json({ success: false, message: "GP Data already exists!" });
    }

    // Create new instance of GpDetailsModel
    const newPanchayat = new GpDetailsModel({
      id,
      state_id,
      dist_id,
      block_id,
      gp_id,
      panchayatDetails,
      demography,
      panchayatArea,
      sarpanchDetails: parsedSarpanchDetails,
      secretaryDetails: parsedSecretaryDetails,
      health,
      education,
      others,
      sports,
      wardDetails,
      general,
    });

    // Save to database
    await newPanchayat.save();

    // Respond with success message
    res
      .status(201)
      .json({ success: true, message: "Panchayat Data saved successfully" });
  } catch (error) {
    console.error("Error creating panchayat data:", error);
    return next(new Errorhandler("Failed to create panchayat data", 500));
  }
};

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

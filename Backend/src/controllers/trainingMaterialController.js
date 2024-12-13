import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { TrainingMaterial } from "../models/trainingMaterialModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import {  uploadPDF } from "../utils/uploadFile.js";

// Controller to create a trainingMaterial post
export const createTrainingMaterial = CatchAsyncError(async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const { file } = req.files;

    if (!title  || !req.files) {
      return next(
        next(new Errorhandler("Title, content, and image are required.", 400))
      );
    }

    const filePath = await uploadPDF(file.data);

    const trainingMaterialPost = await TrainingMaterial.create({
      title,
      file: filePath,
      created_by:req.user?.id
    });

    res.status(201).json({
      success: true,
      message: "Training Material created successfully",
      trainingMaterialPost,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to create Training Material ", 500));
  }
});

// Get all trainingMaterial posts with user details
export const getAllTrainingMaterial = CatchAsyncError(async (req, res, next) => {
  try {
    const trainingMaterials = await TrainingMaterial.aggregate([
      {
        $lookup: {
          from: "users", 
          localField: "created_by", 
          foreignField: "id",
          as: "createdBy",
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true, // Keeps trainingMaterials even if no user matches
        },
      },
    ]);

    if (!trainingMaterials || trainingMaterials.length === 0) {
      return next(new Errorhandler("No Training Material Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Training materials retrieved successfully",
      data: trainingMaterials,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Training Material", 500));
  }
});


// export const getSoeprBlogs = CatchAsyncError(async (req, res, next) => {
//   try {
//     const trainingMaterials = await TrainingMaterial.find({created_by:req.user?.id});

//     if (!trainingMaterials || trainingMaterials.length == 0) {
//       return next(new Errorhandler("No Training Material  Found", 404));
//     }
//     res.status(201).json({
//       success: true,
//       message: "Blog post created successfully",
//       data: trainingMaterials,
//     });
//   } catch (error) {
//     console.error(error);
//     return next(new Errorhandler("Failed to get Training Material ", 500));
//   }
// });

// Get all trainingMaterial post by id

export const getTrainingMaterialById = CatchAsyncError(async (req, res, next) => {
  try {
    const trainingMaterial = await TrainingMaterial.findById(req.params.id);

    if (!trainingMaterial) {
      return next(new Errorhandler("No Training Material  Found", 404));
    }
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: trainingMaterial,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Training Material ", 500));
  }
});
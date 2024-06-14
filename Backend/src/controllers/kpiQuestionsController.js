import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { KPIQuestionsModel } from "../models/kpiQuestionsModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewId = async () => {
  try {
    const maxDoc = await KPIQuestionsModel.aggregate([
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
export const createKPIQuestion = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    const newKPIQuestion = new KPIQuestionsModel(req.body);
    await newKPIQuestion.save();
    res.status(201).json({
      success: true,
      message: "KPI Question created successfully",
      kpiQuestion: newKPIQuestion,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create KPI question", 500));
  }
});

export const getAllKpiQuestions = CatchAsyncError(async (req, res, next) => {
  try {
    const questions = await KPIQuestionsModel.find();
    if (questions.length === 0) {
      return next(new Errorhandler("No Questions Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Questions Fetched Successfully",
      questions,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get all questions", 500));
  }
});

// Get Questoins by kpiID

export const getQuestionsById = CatchAsyncError(async (req, res, next) => {
  try {
    const { theme, kpi } = req.query;
    const query = {};

    if (theme) query.theme_id = theme;
    if (kpi) query.kpi_id = kpi;

    const questions = await KPIQuestionsModel.find(query);

    if (questions.length === 0) {
      return next(new Errorhandler("No Questions Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Questions Fetched Successfully",
      questions,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get all questions", 500));
  }
});

// Delete the kpi questions - set status to "0"

export const deleteKPIQuestion = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await KPIQuestionsModel.findOneAndUpdate(
      id,
      {
        status: "0",
      },
      { new: true }
    );
    if (!question) {
      return next(new Errorhandler("Question not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to delete question", 500));
  }
});

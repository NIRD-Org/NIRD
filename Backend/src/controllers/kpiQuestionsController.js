import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { KPIQuestionsModel } from "../models/kpiQuestionsModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const createKPIQuestion = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      id,
      theme_id,
      kpi_id,
      question_name,
      input_type,
      max_range,
      question_type,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
      flag,
    } = req.body;

    const newKPIQuestion = new KPIQuestionsModel({
      id,
      theme_id,
      kpi_id,
      question_name,
      input_type,
      max_range,
      question_type,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
      flag,
    });

    await newKPIQuestion.save();

    res.status(201).json({
      success: true,
      message: "KPI Question created successfully",
      kpiQuestion: newKPIQuestion,
    });
  } catch (error) {
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

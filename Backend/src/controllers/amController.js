import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import AmModel from "../models/amModel.js";
import { UserLocationModel } from "../models/userLocationModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { location_pipeline } from "../utils/pipeline.js";
import { uploadFile } from "../utils/uploadFile.js";
import PmModel from "../models/pmModel.js";
import { User } from "../models/userModel.js";
const getNewId = async () => {
  try {
    const maxDoc = await AmModel.aggregate([
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

export const getAllAM = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    const { state_id, dist_id, block_id, gp_id } = req.query;
    if (state_id) filter.state_id = state_id;
    if (dist_id) filter.dist_id = dist_id;
    if (block_id) filter.block_id = block_id;
    if (gp_id) filter.gp_id = gp_id;
    if (req.user.role == 3) filter.created_by = req.user.id;
    if (req.user.role == 2 && !req.query.state_id) {
      const { userLocations } = await UserLocationModel.findOne({
        user_id: req.user.id,
      });
      const stateIds = userLocations.state_ids;
      filter.state_id = { $in: stateIds };
    }

    // const am = await AmModel.aggregate([{$match:filter,...location_pipeline}]);
    const am = await AmModel.find(filter);

    res.status(200).json({
      status: "success",
      data: am,
    });
  } catch (error) {
    console.log(error);
  }
});

export const getAMById = CatchAsyncError(async (req, res, next) => {
  console.log(req.params.id);
  // const [am] = await AmModel.aggregate([{ $match: { id: req.params.id } }]);
  const am = await AmModel.findOne({ id: req.params.id });
  console.log(am);

  if (!am) {
    return res.status(404).json({
      status: "fail",
      message: "No AM found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: am,
  });
});

export const createAM = CatchAsyncError(async (req, res, next) => {
  // Check if the attendance is already done

  const exisingData = await AmModel.findOne({
    created_by: req?.user?.id,
    date: req.body.date,
  });

  if (exisingData) {
    return res.status(400).json({
      status: "fail",
      message: "Attendance already Uploaded",
    });
  }

  const { am_upload_file } = req.files;
  const { url: fileUrl } = await uploadFile(am_upload_file.data);
  req.body.file = fileUrl;
  req.body.created_by = req?.user?.id;
  req.body.id = await getNewId();

  const newAM = await AmModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      am: newAM,
    },
  });
});

export const deleteAM = CatchAsyncError(async (req, res, next) => {
  const am = await AmModel.findOneAndDelete({ id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      am,
    },
  });
});

export const updateAM = CatchAsyncError(async (req, res, next) => {
  const am = await AmModel.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      am,
    },
  });
});

export const getAllAttendaceData = CatchAsyncError(async (req, res, next) => {
  try {
    const { role, fromDate, toDate } = req.query;

    const userRole = parseInt(role, 10);
    // Fetch employees with the given role
    const employees = await User.find({ role: userRole });

    if (!employees || employees.length === 0) {
      return next(
        new Errorhandler("No employees found with the given role", 404)
      );
    }

    const employeeIds = employees.map((employee) => employee.id);

    // AM Attendance Aggregation
    const amAttendance = await AmModel.aggregate([
      {
        $match: {
          created_by: { $in: employeeIds },
          date: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "stateInfo",
        },
      },
      { $unwind: "$stateInfo" },
      {
        $group: {
          _id: "$created_by",
          state: { $first: "$stateInfo.name" },
          amWorkingDays: { $sum: 1 },
        },
      },
    ]);

    // PM Attendance Aggregation
    const pmAttendance = await PmModel.aggregate([
      {
        $match: {
          created_by: { $in: employeeIds },
          date: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "stateInfo",
        },
      },
      { $unwind: "$stateInfo" },
      {
        $group: {
          _id: "$created_by",
          state: { $first: "$stateInfo.name" },
          pmWorkingDays: { $sum: 1 },
        },
      },
    ]);
    console.log("PM Attendance:", pmAttendance); // Debug log

    // Create maps for AM and PM attendance
    const amAttendanceMap = amAttendance.reduce((acc, record) => {
      acc[record._id] = record;
      return acc;
    }, {});

    const pmAttendanceMap = pmAttendance.reduce((acc, record) => {
      acc[record._id] = record;
      return acc;
    }, {});

    // Combine data
    const attendanceData = employees.map((employee) => {
      const { id, employee_id, name } = employee;
      const amData = amAttendanceMap[id] || { amWorkingDays: 0, state: "" };
      const pmData = pmAttendanceMap[id] || { pmWorkingDays: 0, state: "" };
      return {
        employeeId: employee_id,
        name,
        state: amData.state || pmData.state, // Assuming state will be the same for AM and PM
        role: userRole,
        amWorkingDays: amData.amWorkingDays,
        pmWorkingDays: pmData.pmWorkingDays,
      };
    });

    res.status(200).json({
      success: true,
      data: attendanceData,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get Attendance data", 500));
  }
});

export const getAmAttendance = CatchAsyncError(async (req, res, next) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return next(new Errorhandler("Month and Year are required", 400));
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    console.log(req?.user?.id);
    console.log(startDate.toString().split("T")[0]);

    const attendanceData = await AmModel.find({
      date: {
        $gt: startDate.toString().split("T")[0],
        $lte: endDate.toString().split("T")[0],
      },
      created_by: req?.user?.id,
    });

    res.status(200).json({
      success: true,
      attendanceData,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get Attendance data", 500));
  }
});

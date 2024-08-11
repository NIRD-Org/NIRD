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
    console.log(req.body);
    const poaData = Object.keys(req.body)
      .filter(key => key.startsWith("poaData"))
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
      const existingDates = poa1.poaData.map(item => item.date.toISOString());
      const newEntries = Object.values(poaData).filter(
        entry => !existingDates.includes(new Date(entry.date).toISOString())
      );

      if (newEntries.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No new data to add. Data for the provided dates already exists.",
        });
      }

      poa1.poaData.push(...newEntries);
      poa1.status = "1";
      await poa1.save();
    } else {
      poa1 = new Poa1Model({
        id: (await getNewId()).toString(),
        // id:"1",
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
    const poa1Data = await Poa1Model.findOne({ id: req.params.id });
    if (!poa1Data) {
      return res.status(404).json({ success: false, message: "No POA1 Data Found" });
    }
    res.status(200).json({ success: true, data: poa1Data });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to get POA1 Data", 500));
  }
});

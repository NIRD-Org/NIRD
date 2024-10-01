// import AWS from "aws-sdk";
// import cloudinary from "cloudinary";
// import axios from "axios";
// import path from "path";
// import GoodPracticeModel from "./models/goodPracticeModel.js";
// import AmModel from "./models/amModel.js";
// import LCVAModel from "./models/LCVAModel.js";
// import { User } from "./models/userModel.js";
// import { GpDetailsModel } from "./models/gpDetailsModel.js";
// import { YfInsightsModel } from "./models/yfInsightsModel.js";
// import { Poa1Model } from "./models/Poa1Model.js";
// import { YfPoa1Model } from "./models/YfPoa1Model.js";
// import PmModel from "./models/pmModel.js";

// // AWS S3
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const extractPublicIdFromUrl = (cloudinaryUrl) => {
//   try {
//     const urlParts = cloudinaryUrl.split("/upload/");
//     if (urlParts.length < 2) throw new Error("Invalid Cloudinary URL");

//     const filePath = urlParts[1];
//     const publicId = filePath.substring(0, filePath.lastIndexOf(".")); // It Removes the file extension
//     return publicId;
//   } catch (error) {
//     console.error("Error extracting publicId from URL:", error);
//     return null;
//   }
// };

// // Upload a file to AWS S3
// const uploadToS3 = async (fileUrl, publicId) => {
//   try {
//     console.log(`\n\nProcessing File: ${fileUrl}`);
//     console.log(`Extracted Public ID: ${publicId}`);
//     const fileExt = path.extname(fileUrl);
//     if (fileExt.includes("pdf")) {
//       return;
//     }
//     const response = await axios.get(fileUrl, { responseType: "arraybuffer" });

//     const fileBuffer = Buffer.from(response.data, "binary");
//     if (!publicId || !fileExt || fileExt.includes("pdf")) {
//       return;
//     }
//     console.log(`Uploading to S3 with Key: ${publicId}${fileExt} \n\n`);

//     const params = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: `nirdpr_backup/${publicId}${fileExt}`,
//       Body: fileBuffer,
//       ContentType: response.headers["content-type"],
//       ACL: "public-read",
//     };

//     const s3Response = await s3.upload(params).promise();

//     return s3Response.Location;
//   } catch (error) {
//     console.error("Error uploading to S3:", error);
//     throw error;
//   }
// };

// export const migrateFilesToS3 = async (req, res) => {
//   try {
//     const records = await PmModel.find({
//       $or: [
//         { file: { $exists: true } },
//         // { document: { $exists: true } },
//         // { video: { $exists: true } },
//       ],
//     });

//     for (const record of records) {
//       let updateFields = {};

//       if (record.file && record.file.includes("res.cloudinary.com")) {
//         const publicId = extractPublicIdFromUrl(record.file);
//         const s3Url = await uploadToS3(record.file, publicId);
//         updateFields.file = s3Url;
//       }

//       //   if (record.document) {
//       //     const publicId = extractPublicIdFromUrl(record.document);
//       //     const s3Url = await uploadToS3(record.document, publicId);
//       //     updateFields.document = s3Url;
//       //   }

//       // if (record.video) {
//       //   const publicId = extractPublicIdFromUrl(record.video);
//       //   const s3Url = await uploadToS3(record.video, publicId);
//       //   updateFields.video = s3Url;
//       // }

//       if (record.file && record.file.includes("res.cloudinary.com")) {
//         await PmModel.updateOne({ id: record.id }, { $set: updateFields });
//       }
//       console.log("=================> Database updated\n", record.id);
//     }

//     res.status(200).send("Migration successful");
//   } catch (error) {
//     console.error("Migration error:", error);
//     res.status(500).send("Error during migration");
//   }
// };

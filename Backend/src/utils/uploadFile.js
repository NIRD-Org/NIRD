// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadFile = async (
//   buffer,
//   folder = "user/uploads",
//   format = "jpg"
// ) => {
//   try {
//     return new Promise((resolve, reject) => {
//       const cld_upload_stream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "auto",
//           folder: folder,
//         },
//         (error, result) => {
//           if (error) {
//             console.error(error);
//             reject(error);
//           } else {
//             // console.log(result);
//             resolve(result);
//           }
//         }
//       );

//       streamifier.createReadStream(buffer).pipe(cld_upload_stream);
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const uploadPDF = async (buffer, folder = "user/uploads") => {
//   try {
//     return new Promise((resolve, reject) => {
//       const cld_upload_stream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "raw",
//           folder: folder,
//         },
//         (error, result) => {
//           if (error) {
//             console.error(error);
//             reject(error);
//           } else {
//             console.log(result);
//             resolve(result);
//           }
//         }
//       );

//       streamifier.createReadStream(buffer).pipe(cld_upload_stream);
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import dotenv from "dotenv";
import { fileTypeFromBuffer } from "file-type";
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = async (
  buffer,
  folder = "user/uploads",
  format = "jpg"
) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${folder}/${Date.now()}.${format}`,
      Body: buffer,
      ContentType: `image/${format}`,
    };

    const upload = new Upload({
      client: s3Client,
      params,
    });

    const result = await upload.done();
    return result.Location;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

// export const uploadPDF = async (buffer, folder = "user/uploads") => {
//   try {
//     const params = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: `${folder}/${Date.now()}.pdf`,
//       Body: buffer,
//       ContentType: "application/pdf",
//     };

//     const upload = new Upload({
//       client: s3Client,
//       params,
//     });

//     const result = await upload.done();
//     return result.Location;
//   } catch (error) {
//     console.error("Error uploading PDF to S3:", error);
//     throw error;
//   }
// };

export const uploadPDF = async (buffer, folder = "user/uploads") => {
  try {
    // Detect the file type (based on the buffer content)
    const detectedType = await fileTypeFromBuffer(buffer);

    if (!detectedType) {
      throw new Error("File type not supported or could not be detected.");
    }

    const fileExtension = detectedType.ext;
    const mimeType = detectedType.mime;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${folder}/${Date.now()}.${fileExtension}`,
      Body: buffer,
      ContentType: mimeType,
    };

    const upload = new Upload({
      client: s3Client,
      params,
    });

    const result = await upload.done();
    return result.Location;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

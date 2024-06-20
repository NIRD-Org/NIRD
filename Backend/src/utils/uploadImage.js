import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (buffer, width) => {
  try {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "user/uploads",
          format: "jpg",
        },
        (error, result) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// response type
// {
//   asset_id: '52504cf2832f7c8d352efee5a13bf66d',
//   public_id: 'user/uploads/qhejhfuyldrvl0ahhq8w',
//   version: 1710755118,
//   version_id: 'd735668261ebc026ce072a55f0e7f191',
//   signature: '22e8832e321ba7d8df8579e3f16bf3dfb75adfdc',
//   width: 32,
//   height: 32,
//   format: 'webp',
//   resource_type: 'image',
//   created_at: '2024-03-18T09:45:18Z',
//   tags: [],
//   pages: 1,
//   bytes: 774,
//   type: 'upload',
//   etag: '8c41411f0d1ae4767911ced1a108ef0a',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dt0h1catc/image/upload/v1710755118/user/uploads/qhejhfuyldrvl0ahhq8w.webp',
//   secure_url: 'https://res.cloudinary.com/dt0h1catc/image/upload/v1710755118/user/uploads/qhejhfuyldrvl0ahhq8w.webp',
//   folder: 'user/uploads',
//   original_filename: 'file',
//   api_key: '744251838659272'
// }

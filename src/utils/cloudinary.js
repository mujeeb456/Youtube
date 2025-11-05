import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


cloudinary.config({ 
  cloud_name:"dsncm6bal", 
  api_key: "769524693999348", 
  api_secret: "PnNGlg33Se95-7W7FrX--42Iqic"
});



console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "exists" : "missing"
});

const uploadCloundinary = async function (filepath) {
  try {
    if (!filepath) return null;

    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto"
    });

    fs.unlinkSync(filepath); 
    return response;

  } catch (err) {
    console.log("cloudinary error",err)
    fs.unlinkSync(filepath);
    return null;
  }
};

export {uploadCloundinary}
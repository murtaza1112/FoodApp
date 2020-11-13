const keys = require("./keys");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: keys.CLOUD_NAME,
  api_key: keys.CLOUD_API_KEY,
  api_secret: keys.CLOUD_SECRET,
});

module.exports = { cloudinary };

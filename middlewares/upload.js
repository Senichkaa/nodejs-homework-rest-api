const multer = require("multer");
const path = require("path");

const temporaryDirectory = path.join(__dirname, "../", "temp");

const storage = multer.diskStorage({
  destination: temporaryDirectory,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;

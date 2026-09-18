const multer = require("multer");
const path = require("path");

const diskstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniquename = Date.now() + path.extname(file.originalname);
    cb(null, uniquename);
  },
});

const upload = multer({ diskStorage: diskstorage });

module.exports=upload;
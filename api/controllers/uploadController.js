const uploadController = require("express").Router();

const multer = require("multer");
const { verifyToken } = require("../middlewares/verifyToken")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename:(req,file,cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({ storage });

//verifyToken,
uploadController.post("/image",  upload.single("file"), (req, res) => {
    try {
        return res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = uploadController;
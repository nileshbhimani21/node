const multer = require("multer");
const path = require("path");
const { errorHandler } = require("../utils/handler");
const fs = require('fs')

const maxSize = 2000000 //2Mb

const checkFileType = function (req, file, cb) {
    //Allowed file size
    const fileSize = parseInt(req.headers["content-length"])
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName && fileSize <= maxSize) {
        if (req.user?.profilePic?.filename) {
            fs.unlink("uploads/" + req.user.profilePic.filename, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file removed
            })
        }
        return cb(null, true);
    } else {
        return cb(new Error('Please valid image upload.'));
    }
};

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

//initializing multer
const uploadFile = multer({
    storage: storageEngine,
    limits: { fileSize: maxSize }, // 2MB
    fileFilter: (req, file, cb) => {
        checkFileType(req, file, cb);
    },
});

const uploadSingleProfilePic = uploadFile?.single('profilePic', 1)

module.exports.uploadSingle = async (req, res, next) => {
    uploadSingleProfilePic(req, res, (err) => {
        if (err) return res.status(500).send(errorHandler('Please valid image upload.'))
        next()
    })
}
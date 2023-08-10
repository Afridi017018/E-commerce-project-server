const multer = require('multer');
const createError = require('http-errors');
const path = require('path');
const { UPLOAD_IMAGE_DIR, MAX_FIRE_SIZE, ALLOWED_FILE_TYPES } = require('../../config');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_IMAGE_DIR);
    },
    filename: function (req, file, cb) {
        // const extname = path.extname(file.originalname);
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req,file,cb)=>{
    const extname = path.extname(file.originalname);

    if(!ALLOWED_FILE_TYPES.includes(extname.substring(1)))
    {
        cb(createError(400, 'File type not allowed'));
        return;
    }

    cb(null, true);
}

const upload = multer({ 
    storage: storage,
    limits: {fileSize: MAX_FIRE_SIZE},
    fileFilter 
})

module.exports = upload;
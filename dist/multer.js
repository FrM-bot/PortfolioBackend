"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../public/images'),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path_1.default.extname(file.originalname));
    }
});
const upload = multer_1.default({
    storage,
    dest: path_1.default.join(__dirname, '../public/images'),
    limits: {
        fileSize: (1000 * 1000) * 3
    },
    fileFilter: (req, file, callback) => {
        const imageTypes = /jpeg|jpg|png/;
        const mineTypes = imageTypes.test(file.mimetype);
        const extType = imageTypes.test(path_1.default.extname(file.originalname));
        console.log(path_1.default.extname(file.originalname), file.mimetype);
        console.log(extType, mineTypes);
        if (mineTypes && extType) {
            return callback(null, true);
        }
        callback(null, false);
    }
}).single('image');
exports.default = upload;
//# sourceMappingURL=multer.js.map
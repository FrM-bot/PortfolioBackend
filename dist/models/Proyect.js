"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const proyectSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    image: {
        publicId: { type: String, required: true },
        imgUrl: { type: String, required: true }
    },
    date: { type: Date },
    proyectURL: { type: String, required: true },
    userID: {
        ref: 'USER',
        type: mongoose_1.default.Schema.Types.ObjectId
    },
    technologies: { type: String, required: true }
});
proyectSchema.set('toJSON', {
    transform: (_document, proyect) => {
        proyect.id = proyect._id;
        delete proyect._id;
        delete proyect.__v;
    }
});
const PROYECT = mongoose_1.default.model('PROYECT', proyectSchema);
exports.default = PROYECT;
//# sourceMappingURL=Proyect.js.map
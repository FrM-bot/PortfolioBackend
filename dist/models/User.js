"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true, minLength: 5, maxLength: 50 },
    password: { type: String, minLength: 5, maxLength: 140 },
    proyectsIDs: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'PROYECT'
        }]
});
userSchema.set('toJSON', {
    transform: (_document, user) => {
        user.id = user._id;
        delete user._id;
        delete user.__v;
    }
});
const USER = mongoose_1.default.model('USER', userSchema);
exports.default = USER;
//# sourceMappingURL=User.js.map
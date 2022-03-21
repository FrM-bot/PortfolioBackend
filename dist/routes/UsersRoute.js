"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersRoute = express_1.default.Router();
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
UsersRoute.post('/signin', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (username === process.env.MAIL && password.trim() !== '') {
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const Admin = new User_1.default({
                email: username,
                password: passwordHash
            });
            const adminAdded = Admin.save();
            console.log('New user: ', adminAdded);
        }
        res.status(406).end();
    }
    catch (error) {
        next(error);
    }
}));
UsersRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email: username });
        console.log(password);
        const passwordIs = user ? (yield bcrypt_1.default.compare(password, user.password)) : (false);
        if (!(passwordIs && user)) {
            return res.status(406);
        }
        const dataForToken = {
            uId: user._id
        };
        const minutes = 20;
        const token = jsonwebtoken_1.default.sign(dataForToken, process.env.JWT, {
            expiresIn: 60 * minutes
        });
        res.status(200).send({ token });
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = UsersRoute;
//# sourceMappingURL=UsersRoute.js.map
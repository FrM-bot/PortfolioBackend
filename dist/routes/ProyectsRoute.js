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
const cloudinary = require('cloudinary').v2;
const promises_1 = __importDefault(require("fs/promises"));
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const multer_1 = __importDefault(require("../multer"));
const userExtractor_1 = __importDefault(require("../middlewares/userExtractor"));
const RouterProyects = express_1.default.Router();
const Proyect_1 = __importDefault(require("../models/Proyect"));
const User_1 = __importDefault(require("../models/User"));
RouterProyects.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proyects = yield Proyect_1.default.find({}).populate('userID', {
            _id: 0,
            email: 0,
            password: 0
        });
        res.json(proyects).status(200).end();
    }
    catch (error) {
        next(error);
    }
}));
RouterProyects.post('/add', userExtractor_1.default, multer_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { body, userToken } = req;
    const { title, proyectURL, technologies } = body;
    try {
        const user = yield User_1.default.findOne({ _id: userToken });
        if (!user) {
            return res.status(400).json({ error: 'The user not exists' }).end();
        }
        const { public_id: publicId, secure_url: imgUrl } = yield cloudinary.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        yield promises_1.default.unlink((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
        const date = new Date();
        const newProyect = new Proyect_1.default({
            title,
            image: {
                publicId,
                imgUrl
            },
            proyectURL,
            technologies,
            date,
            userID: user._id
        });
        const proyectAdded = yield newProyect.save();
        user.proyectsIDs = user.proyectsIDs.concat(proyectAdded._id);
        user.save();
        res.json(proyectAdded).status(200).end();
    }
    catch (error) {
        console.debug('Error in get proyect');
        next(error);
    }
}));
RouterProyects.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const proyect = yield Proyect_1.default.findOne({ _id: id }).populate('userID', {
            email: 1,
            _id: 0
        });
        if (!proyect) {
            return res.status(404).end();
        }
        res.json(proyect).status(200).end();
    }
    catch (error) {
        res.status(404).end();
        next(error);
    }
}));
RouterProyects.delete('/delete/:id', userExtractor_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { params, userToken } = req;
    const { id } = params;
    console.log(id);
    try {
        yield Proyect_1.default.findOneAndDelete({ _id: id });
        const user = yield User_1.default.findOne({ _id: userToken });
        user.proyectsIDs = user.proyectsIDs.filter((idProyect) => idProyect.toString() !== id);
        user.save();
        console.log(user.proyectsIDs);
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}));
RouterProyects.put('/edit/:id', userExtractor_1.default, multer_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { id } = req.params;
    const { title, imageOld, proyectURL, technologies } = req.body;
    let proyect = {};
    try {
        if (req.file) {
            cloudinary.uploader.destroy(imageOld.publicId, function (error, result) {
                console.log(result, error);
            });
            const { public_id: publicId, secure_url: imgUrl } = yield cloudinary.uploader.upload((_c = req.file) === null || _c === void 0 ? void 0 : _c.path);
            yield promises_1.default.unlink((_d = req.file) === null || _d === void 0 ? void 0 : _d.path);
            proyect = {
                title,
                image: {
                    publicId,
                    imgUrl
                },
                proyectURL,
                technologies
            };
        }
        else {
            proyect = {
                title,
                image: JSON.parse(imageOld),
                proyectURL,
                technologies
            };
        }
        console.log({ proyect });
        const proyectUpdated = yield Proyect_1.default.findOneAndUpdate({ _id: id }, proyect, { new: true });
        console.debug({ proyectUpdated });
        res.json(proyectUpdated).status(200).end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}));
exports.default = RouterProyects;
//# sourceMappingURL=ProyectsRoute.js.map
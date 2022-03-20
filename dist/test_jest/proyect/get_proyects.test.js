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
const mongoose_1 = __importDefault(require("mongoose"));
const PROYECT = require('../../models/Proyect');
const { server } = require('../../index');
const { api, arrOfProyects, getProyects } = require('../helpers');
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Running test...');
    yield PROYECT.deleteMany({});
    for (const proyect of arrOfProyects) {
        const saveProyect = new PROYECT(proyect);
        yield saveProyect.save();
    }
}));
describe('Test get method:', () => {
    test('-get all proyects', () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get('/proyects').expect(200).expect('Content-Type', /application\/json/);
        const { proyects } = yield getProyects();
        expect(proyects).toHaveLength(arrOfProyects.length);
    }));
    test('-check notes added', () => __awaiter(void 0, void 0, void 0, function* () {
        const { proyects } = yield getProyects();
        const proyectsWithoutIDsAndDate = proyects.map((proyect) => {
            return {
                proyectURL: proyect.proyectURL,
                imgURL: proyect.imgURL,
                title: proyect.title
            };
        });
        expect(proyectsWithoutIDsAndDate).toEqual(arrOfProyects);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield PROYECT.deleteMany({});
    mongoose_1.default.connection.close();
    server.close();
}));
//# sourceMappingURL=get_proyects.test.js.map
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
const Proyect_1 = __importDefault(require("../models/Proyect"));
const resolvers = {
    Query: {
        allProyects: () => __awaiter(void 0, void 0, void 0, function* () {
            const proyects = yield Proyect_1.default.find({}).populate('userID', {
                _id: 0,
                email: 0,
                password: 0
            });
            return proyects;
        }),
        findProyect: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const proyect = yield Proyect_1.default.findOne({ _id: id }).populate('userID', {
                email: 1,
                _id: 0
            });
            if (!proyect)
                return;
            return proyect;
        })
    },
    Proyect: {
        date: (root) => {
            const newFormatDate = new Date(root.date).toDateString();
            return newFormatDate;
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map
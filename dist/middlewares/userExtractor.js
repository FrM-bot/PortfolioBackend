"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const authorization = req.get('authorization');
    let Token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        Token = authorization.split(' ')[1];
    }
    if (Token === null) {
        res.status(401).json({ error: 'Token not exists' }).end();
    }
    try {
        const decodeToken = jsonwebtoken_1.default.verify(Token, process.env.JWT);
        const { uId } = decodeToken;
        req.userToken = uId;
    }
    catch (error) {
        res.status(401).json({ error: 'Token invalid' }).end();
        next(error);
    }
    next();
};
//# sourceMappingURL=userExtractor.js.map
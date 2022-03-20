"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
require('dotenv').config();
require("./connectionMongoDB");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
exports.app = app;
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(compression_1.default());
app.use(morgan_1.default('dev'));
app.use(helmet_1.default());
const errorHandlers_1 = __importDefault(require("./middlewares/errorHandlers"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const ProyectsRoute_1 = __importDefault(require("./routes/ProyectsRoute"));
const UsersRoute_1 = __importDefault(require("./routes/UsersRoute"));
app.get('/', (req, res) => {
    res.status(200).send('Connected...');
});
app.use('/proyects', ProyectsRoute_1.default);
app.use('/users', UsersRoute_1.default);
app.use(errorHandlers_1.default);
app.use(notFound_1.default);
const PORT = process.env.PORT || 8080;
require("./graphQL/apolloServer");
const server = app.listen(PORT, () => {
    console.debug(`Server: ${process.env.NODE_ENV}`);
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
exports.server = server;
//# sourceMappingURL=index.js.map
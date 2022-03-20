"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { CONNECTION_DB_TEST, CONNECTION_DB, NODE_ENV, CONNECTION_DB_DEVELOPMENT } = process.env;
const Connection = NODE_ENV === 'test' ? (CONNECTION_DB_TEST) : NODE_ENV === 'development' ? (CONNECTION_DB_DEVELOPMENT) : (CONNECTION_DB);
mongoose_1.default.connect(Connection, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Cenected(MongoDB)...');
}).catch((error) => {
    console.log(error);
});
process.on('uncaughtException', (error) => {
    console.debug(error);
    mongoose_1.default.disconnect();
});
//# sourceMappingURL=connectionMongoDB.js.map
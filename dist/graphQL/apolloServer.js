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
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = __importDefault(require("http"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const express_1 = __importDefault(require("express"));
function startApolloServer(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        const httpServer = http_1.default.createServer(app);
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
            plugins: [apollo_server_core_1.ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        yield server.start();
        const port = process.env.PORT_GRAPHQL || 4000;
        server.applyMiddleware({ app });
        httpServer.listen({ port });
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
}
startApolloServer(typeDefs_1.default, resolvers_1.default);
//# sourceMappingURL=apolloServer.js.map
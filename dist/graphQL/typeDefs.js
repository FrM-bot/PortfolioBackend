"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = apollo_server_express_1.gql `
	type User {
		id: ID!
		email: String!
		password: String!,
		proyectsIDs: [ID]!
	}

	type ProyectIDs { 
		proyectsIDs: [ID]!
	}

	type Image {
		publicId: String!
		imgUrl:String!
	}
	type Proyect {
		id: ID!
		title: String!
		image: Image!
		date: String!
		proyectURL: String!
		userID: ProyectIDs!
		technologies: String!
	}

	type Query {
		allProyects: [Proyect]!
		findProyect(id: String!): Proyect
  	}
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map
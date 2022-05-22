import { gql } from 'apollo-server-express'

const typeDefs = gql`
	scalar Upload

	type User {
		id: ID!
		email: String!
		password: String!,
		proyectsRef: [Proyect]!
	}

	type Image {
		publicId: String!
		imgUrl: String!
	}

	type Proyect {
		id: ID!
		title: String!
		image: Image!
		date: String!
		proyectURL: String!
		userRef: User!
		technologies: String!
	}

	type Query {
		allProyects: [Proyect]
		findProyect(id: String!): Proyect
		me: User
	}
	
	type Mutation {
		login(
			email: String!, 
			password: String!
		): String
		addUser(
			email: String!, 
			password: String!
		): String
		removeUser(email: String!): String
		addProyect(
			file: Upload!
			title: String!
			proyectURL: String!
			technologies: String!
			): Proyect!
		removeProyect(id: String!): String!
		editProyect(
			id: ID!
			title: String!
			file: Upload
			proyectURL: String!
			technologies: String!
			publicIdOld: String!
			imgUrlOld: String!
		): Proyect
	}
`

export default typeDefs
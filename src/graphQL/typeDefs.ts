import { gql } from 'apollo-server-express'
const typeDefs = gql`
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
`

export default typeDefs
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import http from 'http'

import { ApolloServer } from 'apollo-server-express'
import { IProyect } from '../interfaces/IProyect'
import type { DocumentNode } from 'graphql'

import resolvers from './resolvers'

import typeDefs from './typeDefs'

import express from 'express'

async function startApolloServer(typeDefs: DocumentNode, resolvers: { Query: { allProyects: () => Promise<any>; findProyect: (root: IProyect, args: IProyect) => Promise<any> }; Proyect: { date: (root: IProyect) => string } }) {
	const app = express()
	const httpServer = http.createServer(app)
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	})
	await server.start()
	
	server.applyMiddleware({ app })
	httpServer.listen({ port: 4000 })
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
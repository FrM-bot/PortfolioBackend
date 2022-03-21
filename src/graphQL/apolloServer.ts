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
	const port = process.env.PORT_GRAPHQL || 4000
	server.applyMiddleware({ app })
	httpServer.listen({ port })
	// console.log({ })
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
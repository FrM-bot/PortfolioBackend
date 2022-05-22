import dotenv from 'dotenv'

dotenv.config()

import './connectionMongoDB.js'

import cors from 'cors'

// Types

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import http from 'http'

import { ApolloServer } from 'apollo-server-express'

import resolvers from './graphQL/resolvers.js'

import typeDefs from './graphQL/typeDefs.js'

import express from 'express'

import graphqlUploadExpress from 'graphql-upload/public/graphqlUploadExpress.js'

import jwt from 'jsonwebtoken'

const context = async ({ req }) => {
	const auth = req ? req.headers.authorization : null

	if (auth && auth.toLowerCase().startsWith('bearer')) {
		const Token = auth.split(' ')[1]
		if (!Token) return new Error('Token not exists')
		
		try {
			const decodeToken = jwt.verify(Token, process.env.JWT)
			const { uId } = decodeToken
			return { uId }
		} catch (error) {
			return new Error('Token invalid')
		}
	}
}

async function startApolloServer() {
	const app = express()
	const httpServer = http.createServer(app)
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	})
	await server.start()

	app.use(graphqlUploadExpress())

	const port = process.env.PORT || 4000
	
	server.applyMiddleware({ app, csrfPrevention: true })
	httpServer.listen({ port })
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startApolloServer()

// export {
// 	app,
// 	server
// }

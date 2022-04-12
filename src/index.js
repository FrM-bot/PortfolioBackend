import dotenv from 'dotenv'

dotenv.config()

import './connectionMongoDB.js'

import cors from 'cors'

import morgan from 'morgan'

import compression from 'compression'

import helmet from 'helmet'

// Types

// use


import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import http from 'http'

import { ApolloServer } from 'apollo-server-express'

import resolvers from './graphQL/resolvers.js'

import typeDefs from './graphQL/typeDefs.js'

import express from 'express'

import graphqlUploadExpress from "graphql-upload/public/graphqlUploadExpress.js"

import jwt from 'jsonwebtoken'

async function startApolloServer() {
	const app = express()

	const httpServer = http.createServer(app)
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null
		
			if (auth && auth.toLowerCase().startsWith('bearer')) {
				const Token = auth.split(' ')[1]
				if (Token === null) {
					return new Error('Token not exists')
				}
				try {
					const decodeToken = jwt.verify(Token, process.env.JWT)
					const { uId } = decodeToken
					return { uId }
				} catch (error) {
					return new Error('Token invalid')
				}
			}
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	})
	await server.start()
	
	app.use(cors())
	app.use(graphqlUploadExpress())

	const port = process.env.PORT || 4000
	server.applyMiddleware({ app })
	httpServer.listen({ port })

	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startApolloServer()

// const server = app.listen(PORT, () => {
// 	console.debug(`Server: ${process.env.NODE_ENV}`)
// 	console.log(`🚀 Server ready at http://localhost:${PORT}`)
// })

// export {
// 	app,
// 	server
// }
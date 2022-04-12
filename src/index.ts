require('dotenv').config()

import './connectionMongoDB'

import express from 'express'

const app = express()

import cors from 'cors'

import morgan from 'morgan'

import compression from 'compression'

import helmet from 'helmet'

// Types
import type { Request, Response } from 'express'

// use
const { NODE_ENV } = process.env

app.use(cors())

app.use(express.json())

app.use(compression())

app.use(morgan('dev'))

app.use(helmet())

// import middlewares
import handlerErrors from './middlewares/errorHandlers'

import notFound from './middlewares/notFound'

// import routes
import RouterProyects from './routes/ProyectsRoute'

import UsersRoute from './routes/UsersRoute'

// use routes

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Connected...')
})

app.use('/proyects', RouterProyects)

app.use('/users', UsersRoute)

// use middlewares
app.use(handlerErrors)

app.use(notFound)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
	console.debug(`Server: ${process.env.NODE_ENV}`)
	console.log(`🚀 Server ready at http://localhost:${PORT}`)
})

export {
	app,
	server
}
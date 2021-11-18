require('dotenv').config()

require('./connectionMongoDB')

// require('./connectionMySQL')

const express = require('express')

const app = express()

const cors = require('cors')

const  morgan = require('morgan')

const compression = require('compression')

const helmet = require('helmet')

// Types
import { NextFunction, Request, Response } from 'express'

// use

app.use(cors())

app.use(express.json())

app.use(compression())

app.use(morgan('dev'))

app.use(helmet())

// import middlewares
const handlerErrors = require('./middlewares/errorHandlers')

const notFound = require('./middlewares/notFound')

// import routes
const RouterProyects = require('./routes/ProyectsRoute')

const UsersRoute = require('./routes/UsersRoute')

// app.use((req: Request, res: Response, next: NextFunction) => {

// Dominio que tengan acceso (ej. 'http://example.com')
//    res.setHeader('Access-Control-Allow-Origin', '*')
	
// Metodos de solicitud que deseas permitir
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	
// Encabecedados que permites (ej. 'X-Requested-With,content-type')
//    res.setHeader('Access-Control-Allow-Headers', '*')
	
// next()
// })

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log('new req')
	console.log('Params: ', req.params)
	console.log('Body: ', req.body)
	console.log('Method: ', req.method)
	console.log('Path: ', req.path)
	// console.log('File: ', req)
	next()
})


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
	console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = {
	app,
	server
}

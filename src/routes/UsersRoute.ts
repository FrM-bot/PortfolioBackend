import { NextFunction } from 'express'
import { Response, Request } from 'express-serve-static-core'

const { Router } = require('express')

const UsersRoute = Router()

const { USER } = require('../models/User')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

// const pool = require('../connectionMySQL')

// const userExtractor = require('../middlewares/userExtractor')

interface IFormInput {
	name?: string;
	mail: string;
	message?: string;
}

// save user
UsersRoute.post('/SignIn', async (req: Request, res: Response, next: NextFunction) => {

	const message: IFormInput = req.body

	try {

		if (message.mail === process.env.MAIL && message.message.trim() !== '') {

			const passwordHash = await bcrypt.hash(message.message, 10)

			const Admin = new USER({
				email: message.mail,
				password: passwordHash
			})

			const adminAdded = await Admin.save()
			console.log('New user: ', adminAdded)

		}

		res.status(406).end()

	} catch (error) {

		next(error)

	}
})

// get user
UsersRoute.post('/LogIn', async (req: Request, res: Response) => {

	const message: IFormInput = req.body
	console.log('login')
	try {
		const user = await USER.findOne({ email: message.mail })
		console.log(message)
		const passwordIs = user ? (await bcrypt.compare(message.message, user.password)) : ( false )

		if (!( passwordIs && user )) {
			return res.status(406)
		}

		const dataForToken = {
			id: user._id,
		}

		const token = jwt.sign(dataForToken, process.env.JWT, {
			expiresIn: '24h'
		})

		console.log(token)

		res.status(200).json({
			token
		})

	} catch (error) {

		console.error(error)

	}

})

module.exports = UsersRoute

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

interface session {
	session: {
		user: string
		password: string
	}
}

// save user
UsersRoute.post('/signin', async (req: Request & session, res: Response, next: NextFunction) => {

	const { mail, message }: IFormInput = req.body

	try {

		if (mail === process.env.MAIL && message.trim() !== '') {

			const passwordHash = await bcrypt.hash(message, 10)

			const Admin = new USER({
				email: mail,
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
UsersRoute.post('/login', async (req: Request & session, res: Response) => {
	const { mail, message }: IFormInput = req.body
	try {



		const user = await USER.findOne({ email: mail })
		console.log(message)
		const passwordIs = user ? (await bcrypt.compare(message, user.password)) : ( false )

		if (!( passwordIs && user )) {
			return res.status(406)
		}

		console.log(req.session)
		const dataForToken = {
			uId: user._id
		}

		const minutes = 20

		const token = await jwt.sign(dataForToken, process.env.JWT, {
			expiresIn: 60 * minutes
		})

		// console.log(token)

		// res.status(200).json({
		// 	token
		// })

		res.status(200).send({token, tokenEx: minutes})

	} catch (error) {

		console.error(error)

	}

})

module.exports = UsersRoute

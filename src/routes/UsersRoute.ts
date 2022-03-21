import { NextFunction } from 'express'
import { Response, Request } from 'express-serve-static-core'

import express from 'express'

const UsersRoute = express.Router()

import USER from '../models/User'

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

interface IFormInput {
	username: string;
	password: string;
}

// save user
UsersRoute.post('/signin', async (req: Request, res: Response, next: NextFunction) => {

	const { username, password }: IFormInput = req.body

	try {

		if (username === process.env.MAIL && password.trim() !== '') {

			const passwordHash = await bcrypt.hash(password, 10)

			const Admin = new USER({
				email: username,
				password: passwordHash
			})

			const adminAdded = Admin.save()
			console.log('New user: ', adminAdded)

		}

		res.status(406).end()

	} catch (error) {
		next(error)
	}
})



// get user
UsersRoute.post('/login', async (req: Request, res: Response) => {
	const { username, password }: IFormInput = req.body
	try {
		const user = await USER.findOne({ email: username })
		console.log(password)
		const passwordIs = user ? (await bcrypt.compare(password, user.password)) : ( false )

		if (!( passwordIs && user )) {
			return res.status(406)
		}

		const dataForToken = {
			uId: user._id
		}

		const minutes = 20

		const token = jwt.sign(dataForToken, process.env.JWT, {
			expiresIn: 60 * minutes
		})

		res.status(200).send({token})

	} catch (error) {
		console.error(error)
	}

})

export default UsersRoute
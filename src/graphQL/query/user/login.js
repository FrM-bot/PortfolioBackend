import User from '../../../models/User.js'

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

export default async (root, args) => {
	const { email, password } = args

	const user = await User.findOne({ email: email })

	const passwordIs = user ? (await bcrypt.compare(password, user.password)) : ( false )

	if (!( passwordIs && user )) {
		return new Error('User or password are invalid')
	}

	const dataForToken = {
		uId: user._id
	}

	const token = jwt.sign(dataForToken, process.env.JWT, {
		expiresIn: 60 * 60
	})

	return token
}
import User from '../../../models/User.js'
import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server'

export default async (root, args) => {
	const {email, password} = args

	const passwordHash = await bcrypt.hash(password, 10)

	const newUser = new User({
		email,
		password: passwordHash
	})

	try {
		const userAdded = await newUser.save()

		return userAdded.email
	} catch (error) {
		throw new UserInputError('Invalid email', {
			invalidArgs: email
		})
	}

}
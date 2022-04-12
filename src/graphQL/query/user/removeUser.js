import User from '../../../models/User.js'

export default async (root, args) => {
	const {email} = args

	await User.findOneAndDelete({ email })
}
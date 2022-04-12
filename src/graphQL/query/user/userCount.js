import User from '../../../models/User.js'

// addUser: async (root, args) => {
// 	const {username, password} = args
// 	const passwordHash = await bcrypt.hash(password, 10)

// 	const newUser = new User({
// 		email: username,
// 		password: passwordHash
// 	})

// 	const newUserAdded = await newUser.save()

// 	return newUserAdded
// }

export default async (root, args, context) => {
	const {req, userToken} = context
	console.log(req)
	const users = await User.find({_id: userToken})
	return users.length
}
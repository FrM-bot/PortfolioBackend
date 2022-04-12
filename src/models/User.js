import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, minLength: 5, maxLength: 50  },
	password: { type: String, minLength: 5, maxLength: 140  },
	proyectsIDs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PROYECT'
	}]
})

userSchema.set('toJSON', {
	transform: (_document, user) => {
		user.id = user._id
		delete user._id
		delete user.__v
	}
})

const USER = mongoose.model('USER', userSchema)

export default USER
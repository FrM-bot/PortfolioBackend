import mongoose from 'mongoose'

import { IUser } from 'src/interfaces/IUser'

const userSchema = new mongoose.Schema<IUser>({
	email: { type: String, unique: true, minLength: 5, maxLength: 50  },
	password: { type: String, minLength: 5, maxLength: 140  },
	proyectsIDs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PROYECT'
	}]
})

userSchema.set('toJSON', {
	transform: (_document: DocumentType, user: { id: mongoose.Schema.Types.ObjectId; _id: mongoose.Schema.Types.ObjectId; __v: number }) => {
		user.id = user._id
		delete user._id
		delete user.__v
	}
})

const USER = mongoose.model<IUser>('USER', userSchema)

export default USER
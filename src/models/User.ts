import { Schema, model, Model } from 'mongoose'

import { IUser } from 'src/interfaces/IUser'

const userSchema = new Schema<IUser, Model<IUser>>({
	email: { type: String, unique: true, minLength: 5, maxLength: 50  },
	password: { type: String, minLength: 5, maxLength: 140  },
	proyectsIDs: [{
		type: Schema.Types.ObjectId,
		ref: 'PROYECT'
	}]
})

userSchema.set('toJSON', {
	transform: (_document: DocumentType, user: { id: Schema.Types.ObjectId; _id: Schema.Types.ObjectId; __v: number }) => {
		user.id = user._id
		delete user._id
		delete user.__v
	}
})

const USER = model<IUser>('USER', userSchema)

module.exports = { USER }

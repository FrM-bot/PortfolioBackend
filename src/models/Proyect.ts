import { Schema, model } from 'mongoose'

import { IProyect } from 'src/interfaces/IProyect'

const proyectSchema = new Schema<IProyect>({
	title: { type: String, required: true },
	image: {
		publicId: { type: String, required: true },
		imgUrl: { type: String, required: true }
	},
	date: { type: Date },
	proyectURL: { type: String, required: true },
	userID: {
		ref: 'USER',
		type: Schema.Types.ObjectId
	},
	technologies: { type: String, required: true }
})

proyectSchema.set('toJSON', {
	transform: (_document: DocumentType, proyect: { id: Schema.Types.ObjectId; _id: Schema.Types.ObjectId; __v: number }) => {
		proyect.id = proyect._id
		delete proyect._id
		delete proyect.__v
	}
})

const PROYECT = model('PROYECT', proyectSchema)

module.exports = PROYECT

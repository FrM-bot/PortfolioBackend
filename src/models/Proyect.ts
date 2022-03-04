import mongoose from 'mongoose'

import { IProyect } from 'src/interfaces/IProyect'

const proyectSchema = new mongoose.Schema<IProyect>({
	title: { type: String, required: true },
	image: {
		publicId: { type: String, required: true },
		imgUrl: { type: String, required: true }
	},
	date: { type: Date },
	proyectURL: { type: String, required: true },
	userID: {
		ref: 'USER',
		type: mongoose.Schema.Types.ObjectId
	},
	technologies: { type: String, required: true }
})

proyectSchema.set('toJSON', {
	transform: (_document: DocumentType, proyect: { id: mongoose.Schema.Types.ObjectId; _id: mongoose.Schema.Types.ObjectId; __v: number }) => {
		proyect.id = proyect._id
		delete proyect._id
		delete proyect.__v
	}
})

const PROYECT = mongoose.model('PROYECT', proyectSchema)


export default PROYECT
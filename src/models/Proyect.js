import mongoose from 'mongoose'

const proyectSchema = new mongoose.Schema({
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
	transform: (_document, proyect) => {
		proyect.id = proyect._id
		delete proyect._id
		delete proyect.__v
	}
})

const PROYECT = mongoose.model('PROYECT', proyectSchema)


export default PROYECT
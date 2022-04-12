import Proyect from '../../../models/Proyect.js'

export default async () => {
	try {
		const proyects = await Proyect.find({}).populate('userID', {
			_id: 0,
			email: 0,
			password: 0
		})
		return proyects
	} catch (error) {
		console.error(error)
		return
	}
}
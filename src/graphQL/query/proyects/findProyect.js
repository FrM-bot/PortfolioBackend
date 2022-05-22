import Proyect from '../../../models/Proyect.js'

export default async (_root, args) => {
	const {id} = args
	try {
		const proyect = await Proyect.findOne({ _id: id }).populate('userRef', {
			email: 1,
			_id: 0
		})
		if (!proyect) return
		console.log(proyect)
		return proyect
	} catch (error) {
		console.error(error)
		return 
	}
}

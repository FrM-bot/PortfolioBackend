import { IProyect } from "../interfaces/IProyect"
import PROYECT from "../models/Proyect"

const resolvers = {
	Query: {
		allProyects: async () => {
			const proyects = await PROYECT.find({}).populate('userID', {
				_id: 0,
				email: 0,
				password: 0
			})
			return proyects
		},
		findProyect: async (root: IProyect, args:IProyect) => {
			const {id} = args
			const proyect = await PROYECT.findOne({ _id: id }).populate('userID', {
				email: 1,
				_id: 0
			})
		
			if (!proyect) return
		
			return proyect
		}
	},
	Proyect: {
		date: (root: IProyect) => {
			const newFormatDate = new Date(root.date).toDateString()
			return newFormatDate
		}
	}
}

export default resolvers
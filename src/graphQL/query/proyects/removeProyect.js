import User from '../../../models/User.js'

import Proyect from '../../../models/Proyect.js'

export default async (_root, args, context) => {
    if (!context.uId) {
        return new Error('Token not exists')
    } 
    const { id } = args
    try {
        await Proyect.findOneAndDelete({ _id: id })
    
        const user = await User.findOne({ _id: context.uId })

        user.proyectsIDs = user.proyectsIDs.filter((idProyect) => idProyect.toString() !== id)

        user.save()

        return id
    } catch (error) {
        return new Error(error)
    }
}

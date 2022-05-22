
import User from '../../../models/User.js'


export default async (_parent, _args, context) => {
    if (!context.uId) {
        return new Error('Token not exists')
    }
    try {
        const user = await User.findOne({ _id: context.uId }).populate('proyectsRef', {})
        console.log(user)
        return user
    } catch (error) {
        return new Error(error)
    }
}
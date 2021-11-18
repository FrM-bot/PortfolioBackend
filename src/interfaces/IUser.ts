import { ObjectId, SaveOptions } from 'mongoose'

export interface IUser {
    id: ObjectId
    email: string
    password: string,
	proyectsIDs: Array<ObjectId>
    save: () => SaveOptions
}

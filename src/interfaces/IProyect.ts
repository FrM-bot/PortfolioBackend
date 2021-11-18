import { ObjectId } from 'mongoose'

export interface IProyect {
	_id: ObjectId
	title: string
	imgURL: File
	date: Date
	proyectURL: string
	userID: ObjectId
	technologies: string
}

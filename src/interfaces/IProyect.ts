import { ObjectId } from 'mongoose'

export interface IProyect {
	id?: ObjectId
	_id?: ObjectId
	title: string
	imgURL: File
	date: Date
	proyectURL: string
	userID: ObjectId
	technologies: string
}

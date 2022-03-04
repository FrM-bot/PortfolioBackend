import type { Response, Request } from 'express-serve-static-core'

import express from 'express'

import mongoose from 'mongoose'

const cloudinary = require('cloudinary').v2

import fs from 'fs/promises'

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})

import update from '../multer'

// interfaces
import { IToken } from 'src/interfaces/IToken'
import { IProyect } from 'src/interfaces/IProyect'
import { IUser } from 'src/interfaces/IUser'
import { NextFunction } from 'express'

import userExtractor from '../middlewares/userExtractor'

const RouterProyects = express.Router()

import PROYECT from '../models/Proyect'

import USER from '../models/User'

// get all proyects
RouterProyects.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// const user = await USER.findOne({ email: process.env.MAIL })
		const proyects: IProyect[] = await PROYECT.find({}).populate('userID', {
			_id: 0,
			email: 0,
			password: 0
		})
		res.json(proyects).status(200).end()

	} catch (error) {
		next(error)
	}
})
interface IFile {
	file: {
		path: string
	}
}
// save a proyect
RouterProyects.post('/add', userExtractor, update, async (req: Request & IToken & IFile, res: Response, next: NextFunction) => {
	const { body, userToken } = req
	const { title, proyectURL, technologies } = body
	try {
		const user = await USER.findOne({ _id: userToken })

		if(!user) {
			return res.status(400).json({error: 'The user not exists'}).end()
		}
		
		const { public_id: publicId, secure_url: imgUrl } = await cloudinary.uploader.upload(req.file?.path)
		
		await fs.unlink(req.file?.path)
		
		const date = new Date()
		
		const newProyect = new PROYECT({
			title,
			image: {
				publicId,
				imgUrl
			},
			proyectURL,
			technologies,
			date,
			userID: user._id
		})

		const proyectAdded: IProyect = await newProyect.save()

		user.proyectsIDs = user.proyectsIDs.concat(proyectAdded._id)

		user.save()

		res.json(proyectAdded).status(200).end()

	} catch (error) {
		console.debug('Error in get proyect')
		next(error)

	}
})

// get one proyects
RouterProyects.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	try {
		const proyect: IProyect = await PROYECT.findOne({ _id: id }).populate('userID', {
			email: 1,
			_id: 0
		})

		if (!proyect) {
			return res.status(404).end()
		}

		res.json(proyect).status(200).end()

	} catch (error) {
		res.status(404).end()
		next(error)

	}
})

// delete one proyect
RouterProyects.delete('/delete/:id', userExtractor, async (req: Request & IToken, res: Response, next: NextFunction) => {
	const { params, userToken } = req
	const { id } = params
	console.log(id)

	try {
		await PROYECT.findOneAndDelete({ _id: id })
		
		const user: IUser = await USER.findOne({ _id: userToken })

		// console.log(user.proyectsIDs)

		user.proyectsIDs = user.proyectsIDs.filter((idProyect: mongoose.ObjectId) => idProyect.toString() !== id)
		// console.log(user.proyectsIDs)
		user.save()
		console.log(user.proyectsIDs)
		res.status(204).end()

	} catch (error) {
		console.error(error)
		next(error)

	}
})

// edit one proyect
RouterProyects.put('/edit/:id', userExtractor, update, async (req: Request & IToken & IFile, res: Response, next: NextFunction) => {
	const { id } = req.params
	const { title, imageOld, proyectURL, technologies } = req.body

	let proyect = {}
	try {
		if (req.file) {
			cloudinary.uploader.destroy(imageOld.publicId, function(error: any ,result: any ) {
				console.log(result, error) })
			const { public_id: publicId, secure_url: imgUrl } = await cloudinary.uploader.upload(req.file?.path)
			await fs.unlink(req.file?.path)
			proyect = {
				title,
				image: {
					publicId,
					imgUrl
				},
				proyectURL,
				technologies
			}
		} else {
			proyect = {
				title,
				image: JSON.parse(imageOld),
				proyectURL,
				technologies
			}
		}
		console.log({proyect})
		const proyectUpdated = await PROYECT.findOneAndUpdate({_id: id}, proyect, { new: true })

		console.debug({proyectUpdated})

		res.json(proyectUpdated).status(200).end()
		

	} catch (error) {
		console.error(error)
		next(error)
	}
})

export default RouterProyects

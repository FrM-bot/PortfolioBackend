import { Response, Request } from 'express-serve-static-core'

const { Router } = require('express')
import { ObjectId } from 'mongoose'

const cloudinary = require('cloudinary').v2

const fs = require('fs/promises')

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})


const update = require('../multer')

// interfaces
import { IToken } from 'src/interfaces/IToken'
import { IProyect } from 'src/interfaces/IProyect'
import { IUser } from 'src/interfaces/IUser'
import { NextFunction } from 'express'

const userExtractor = require('../middlewares/userExtractor')

const RouterProyects = Router()

const PROYECT = require('../models/Proyect')

const { USER } = require('../models/User')

// get all proyects
RouterProyects.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// const user = await USER.findOne({ email: process.env.MAIL })
		const proyects: Array<IProyect> = await PROYECT.find({}).populate('userID', {
			_id: 0,
			email: 0,
			password: 0
		})
		res.json(proyects).status(200).end()

	} catch (error) {
		next(error)

	}
})

// save a proyect
RouterProyects.post('/add', userExtractor, update, async (req: Request & IToken, res: Response, next: NextFunction) => {
	const { body, userToken } = req
	const { title, proyectURL, technologies } = body

	console.log(title, proyectURL, technologies)

	try {
		const user = await USER.findOne({ _id: userToken })

		if(!user) {
			return res.status(400).json({error: 'The user not exists'}).end()
		}

		const { public_id: publicId, secure_url: imgUrl } = await cloudinary.uploader.upload(req.file?.path)
		
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

		await user.save()

		await fs.unlink(req.file?.path)

		res.json(proyectAdded).status(200).end()

	} catch (error) {
		console.debug('Error in get proyect')
		next(error)

	}
})

// get one proyects
RouterProyects.get('/p/:id', async (req: Request, res: Response, next: NextFunction) => {
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
RouterProyects.delete('/p/:id', userExtractor, async (req: Request & IToken, res: Response, next: NextFunction) => {
	const { params, userToken } = req
	const { id } = params
	console.log(id)

	try {
		await PROYECT.findOneAndDelete({ _id: id })
		
		const user: IUser = await USER.findOne({ _id: userToken })

		// console.log(user.proyectsIDs)

		user.proyectsIDs = user.proyectsIDs.filter((idProyect: ObjectId) => idProyect.toString() !== id)
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
RouterProyects.put('/p/:id', userExtractor, update, async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params
	const { title, imgURL, proyectURL, technologies } = req.body

	const proyect = {
		title,
		imgURL,
		proyectURL,
		technologies
	}

	try {
		const proyectUpdated = await PROYECT.findOneAndUpdate({_id: id}, proyect, { new: true })
		res.json(proyectUpdated).status(200).end()

	} catch (error) {
		next(error)
	}
})

module.exports = RouterProyects

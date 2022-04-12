import User from '../../../models/User.js'

import Proyect from '../../../models/Proyect.js'

import { v2 } from 'cloudinary'

const cloudinary = v2

import { createWriteStream } from 'fs'

import { unlink } from 'fs/promises'

import streamPromises from 'stream/promises'

import path from 'path'

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})

const {pathname} = new URL('../../../../', import.meta.url)
const newPath = pathname.slice(1, pathname.length)

export default async (_parent, args, context) => {
	if (!context.uId) {
		return new Error('Token not exists')
	} 
	const { file, title, proyectURL, technologies } = args
	try {
		const { createReadStream, filename, mimetype } = await file

		const imageTypes = /jpeg|jpg|png/

		const mineTypes = imageTypes.test(mimetype)
	
		const extType = imageTypes.test(path.extname(filename))
		if (!mineTypes && !extType) {
			return new Error('Solo se admiten imagenes')
		}
		const stream = await createReadStream()
		const pathFile = newPath + `public/images/${filename}`
		const out = createWriteStream(pathFile)
		stream.pipe(out)
		await streamPromises.finished(out)

		const { public_id: publicId, secure_url: imgUrl } = await cloudinary.uploader.upload(pathFile)

		await unlink(pathFile)

		const date = new Date()

		const user = await User.findOne({ _id: context.uId })

		const newProyect = new Proyect({
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

		const proyectAdded = await newProyect.save()

		user.proyectsIDs = user.proyectsIDs.concat(proyectAdded._id)

		user.save()

		return proyectAdded
	} catch (error) {
		return new Error(error)
	}

}
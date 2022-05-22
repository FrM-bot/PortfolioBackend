import Proyect from '../../../models/Proyect.js'

import { v2 } from 'cloudinary'

const cloudinary = v2

import { createWriteStream } from 'fs'

import streamPromises from 'stream/promises'

import path from 'path'

const {pathname} = new URL('../../../../', import.meta.url)

const pathFiles = pathname.slice(1, pathname.length)

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})

export default async (_parent, args, context) => {
    if (!context.uId) {
        return new Error('Token not exists')
    }
    const { file, title, proyectURL, technologies, publicIdOld, imgUrlOld, id } = args
    try {
        if (await file) {
            const { createReadStream, filename, mimetype } = await file

            const imageTypes = /jpeg|jpg|png/
    
            const mineTypes = imageTypes.test(mimetype)
        
            const extType = imageTypes.test(path.extname(filename))
            if (!mineTypes && !extType) return new Error('Solo se admiten imagenes')
            
            const stream = await createReadStream()

            const pathFile = pathFiles + `public/images/${filename}`

            const out = createWriteStream(pathFile)

            stream.pipe(out)

            await streamPromises.finished(out)

            cloudinary.uploader.destroy(publicIdOld, (error ,result) => {
				console.log(result, error)
                if (error) return new Error(error)
            })

			const { public_id: publicId, secure_url: imgUrl } = await cloudinary.uploader.upload(pathFile)

            const proyect = {
                title,
                technologies,
                proyectURL,
                image: {
                    publicId,
                    imgUrl
                }
            }
            const proyectUpdated = await Proyect.findOneAndUpdate({_id: id}, proyect, { new: true })
            return proyectUpdated
        } else {
            const proyect = {
                title,
                technologies,
                proyectURL,
                image: {
                    publicId: publicIdOld,
                    imgUrl: imgUrlOld
                }
            }
            const proyectUpdated = await Proyect.findOneAndUpdate({_id: id}, proyect, { new: true })
            return proyectUpdated
        }
    } catch (error) {
        return new Error(error)
    }
}

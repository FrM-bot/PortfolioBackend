import path from 'path'

import multer from 'multer'

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../public/images'),
	filename: (req, file, callback) => {
		callback(null, new Date().getTime() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage,
	dest: path.join(__dirname, '../public/images'),
	limits: {
		fileSize: (1000 * 1000) * 3
	},
	fileFilter: (req, file, callback) => {
		const imageTypes = /jpeg|jpg|png/

		const mineTypes = imageTypes.test(file.mimetype)

		const extType = imageTypes.test(path.extname(file.originalname))

		console.log(path.extname(file.originalname), file.mimetype)
		console.log(extType, mineTypes)

		if (mineTypes && extType) {
			return callback(null, true)
		}
		// new Error('Solo se admiten imagenes')
		callback(null, false)
	}
}).single('image')

export default upload
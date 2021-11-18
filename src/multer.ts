const path = require('path')

const multer = require('multer')

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../public/images'),
	filename: (req: Request, file: { originalname: string }, callback: (arg0: null, arg1: string) => void) => {
		callback(null, new Date().getTime() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage,
	dest: path.join(__dirname, '../public/images'),
	limits: {
		fileSize: (1000 * 1000) * 3
	},
	fileFilter: (req: Request, file: { mimetype: string; originalname: string }, callback: (arg0: string | null, arg1: boolean | undefined) => void) => {
		const imageTypes = /jpeg|jpg|png/

		const mineTypes = imageTypes.test(file.mimetype)

		const extType = imageTypes.test(path.extname(file.originalname))

		console.log(path.extname(file.originalname), file.mimetype)
		console.log(extType, mineTypes)

		if (mineTypes && extType) {
			return callback(null, true)
		}
		// new Error('Solo se admiten imagenes')
		callback('Solo se adminnten imaages', false)
	}
}).single('image')

module.exports = upload
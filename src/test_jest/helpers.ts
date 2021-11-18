const { app } = require('../index')

const supertest = require('supertest')

const api = supertest(app)

interface proyect {
	proyectURL: string
	imgURL: string
	title: string
	date?: string
	id?: string
}

const arrOfProyects: proyect[] = [
	{
		proyectURL: 'https://www.artstation.com/artwork/oOGvJW',
		imgURL: 'https://cdna.artstation.com/p/assets/images/images/022/391/524/large/arseniy-chebynkin-ocean-beachside.jpg?1575282994',
		title: 'Proyect 1'
	},
	{
		proyectURL: 'https://www.artstation.com/artwork/8lZK06',
		imgURL: 'https://cdna.artstation.com/p/assets/images/images/017/879/976/large/arseniy-chebynkin-nikki-room.jpg?1557700403',
		title: 'Proyect 2'
	},
	{
		proyectURL: 'https://www.artstation.com/artwork/9kxLL',
		imgURL: 'https://cdnb.artstation.com/p/assets/images/images/002/613/321/large/arseniy-chebynkin-lmrbg.jpg?1463653475',
		title: 'Proyect 3'
	},
	{
		proyectURL: 'https://www.artstation.com/artwork/ykLagJ',
		imgURL: 'https://cdna.artstation.com/p/assets/images/images/039/537/838/large/arseniy-chebynkin-pgein.jpg?1626197162',
		title: 'Proyect 4'
	},
	{
		proyectURL: 'https://www.artstation.com/artwork/WqPYG',
		imgURL: 'https://cdnb.artstation.com/p/assets/images/images/008/964/537/large/arseniy-chebynkin-elihouse.jpg?1516337451',
		title: 'Proyect 5'
	},
	{
		proyectURL: 'https://www.artstation.com/artwork/qAaVLN',
		imgURL: 'https://cdna.artstation.com/p/assets/images/images/026/203/798/large/arseniy-chebynkin-imperial-city.jpg?1588173051',
		title: 'Proyect 6'
	},
	{
		proyectURL: 'https://www.artstation.com/artwork/N5e1nd',
		imgURL: 'https://cdna.artstation.com/p/assets/images/images/019/640/442/large/arseniy-chebynkin-modern-metropolis-twilight.jpg?1564402720',
		title: 'Proyect 7'
	},
	{
		proyectURL: 'https://www.artstation.com/artwork/aR94P0',
		imgURL: 'https://cdnb.artstation.com/p/assets/images/images/017/445/513/large/arseniy-chebynkin-night-port.jpg?1556026392',
		title: 'Proyect 8'
	}
]

const getProyects = async () => {
	const { body } = await api.get('/proyects')

	return {
		title: body.map((proyect: proyect) => proyect.title),
		imgURL: body.map((proyect: proyect) => proyect.imgURL),
		proyectURL: body.map((proyect: proyect) => proyect.proyectURL),
		proyects: body
	}
}

module.exports = {
	api,
	arrOfProyects,
	getProyects
}
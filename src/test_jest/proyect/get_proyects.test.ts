// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const PROYECT = require('../../models/Proyect')

const { server } = require('../../index')

const { api, arrOfProyects, getProyects } = require('../helpers')

interface proyect {
    proyectURL: string
    imgURL: string
    title: string
    date?: string
    id?: string
}

beforeEach( async () => {
	console.log('Running test...')
	await PROYECT.deleteMany({})

	for (const proyect of arrOfProyects) {
		const saveProyect = new PROYECT(proyect)
		await saveProyect.save()
	}
})

describe('Test get method:', () => {
	test('-get all proyects', async () => {
		await api.get('/proyects').expect(200).expect('Content-Type', /application\/json/)

		const { proyects } = await getProyects()

		expect(proyects).toHaveLength(arrOfProyects.length)
	})

	test('-check notes added', async () => {
		const { proyects } = await getProyects()

		const proyectsWithoutIDsAndDate = proyects.map((proyect: proyect) => {
			return {
				proyectURL: proyect.proyectURL,
				imgURL: proyect.imgURL,
				title: proyect.title
			}
		})

		expect(proyectsWithoutIDsAndDate).toEqual(arrOfProyects)
	})
})

afterAll( async () => {
	await PROYECT.deleteMany({})
	mongoose.connection.close()
	server.close()
})

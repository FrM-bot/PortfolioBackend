import PROYECT from "../models/Proyect.js"
import User from "../models/User.js"

import allProyects from './query/proyects/allProyects.js'
import findProyect from './query/proyects/findProyect.js'
import login from './query/user/login.js'
import removeProyect from "./query/proyects/removeProyect.js"

import addProyect from './query/proyects/addProyect.js'

import editProyect from "./query/proyects/editProyect.js"

import GraphQLUpload from "graphql-upload/public/GraphQLUpload.js"
import { v2 } from 'cloudinary'

const cloudinary = v2

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		allProyects,
		findProyect,
	},
	Mutation: {
		login,
		addProyect,
		removeProyect,
		editProyect
	},
	Proyect: {
		date: (root) => {
			const newFormatDate = new Date(root.date).toDateString()
			return newFormatDate
		}
	}
}

export default resolvers
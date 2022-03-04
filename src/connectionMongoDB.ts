import mongoose from 'mongoose'

const { CONNECTION_DB_TEST, CONNECTION_DB, NODE_ENV, CONNECTION_DB_DEVELOPMENT } = process.env

const Connection = NODE_ENV === 'test' ? (CONNECTION_DB_TEST) : NODE_ENV === 'development' ? (CONNECTION_DB_DEVELOPMENT) : (CONNECTION_DB)

mongoose.connect(Connection ,{
	useCreateIndex: true,
	useFindAndModify: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Cenected(MongoDB)...')
}).catch((error: ErrorEvent) => {
	console.log(error)
})

process.on('uncaughtException', (error) => {
	console.debug(error)
	mongoose.disconnect()
})

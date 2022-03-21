import { ErrorRequestHandler } from 'express'

import { Response, Request } from 'express-serve-static-core'

// const handlerErrors = {
// 	notFound: (res: Response) => res.status(404).send('<p>No se ha encontrado la pagina solicitada.</p>').end()
// }

export default (req: Request, res: Response, error: ErrorRequestHandler) => {
	console.debug('ERROR: ', error.toString())
	if (error.name === 'CastError') {
		res.status(400).json({ error: 'Datos no encontrados' }).end()
	}
	// handlerErrors[error.name]

	// const handler = handlerErrors[error.name]
}

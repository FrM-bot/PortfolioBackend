import { Response, Request } from 'express-serve-static-core'

module.exports = (req: Request, res: Response) =>  {
	res.status(404).send('<p>No se ha encontrado la pagina solicitada.</p>').end()
}

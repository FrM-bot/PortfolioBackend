import { Response, Request } from 'express-serve-static-core'

export default (req: Request, res: Response) =>  {
	res.status(404).send('<p>No se ha encontrado la pagina solicitada.</p>').end()
}

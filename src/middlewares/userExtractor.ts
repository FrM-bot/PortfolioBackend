import { NextFunction, Request, Response } from 'express'

// interface { IToken } = require('../interfaces/token')

import { IToken } from 'src/interfaces/IToken'

// interface IToken {
// 	userToken: string
// }

import jwt from 'jsonwebtoken'

export default (req: Request & IToken, res: Response, next: NextFunction) => {
	const auth = req.get('authorization')
	let Token = null 

	if (auth && auth.toLowerCase().startsWith('bearer')) {
		Token = auth.split(' ')[1]
	}

	if (Token === null) {
		res.status(401).json({ error: 'Token not exists' }).end()
	}
    
	try {
		const decodeToken = jwt.verify(Token, process.env.JWT)
		const { uId } = decodeToken
		req.userToken = uId

	} catch (error) {
		res.status(401).json({error: 'Token invalid'}).end()
		next(error)
	}

	next()
}
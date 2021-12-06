import { NextFunction, Request, Response } from 'express'

// interface { IToken } = require('../interfaces/token')

import { IToken } from 'src/interfaces/IToken'

// interface IToken {
// 	userToken: string
// }

const jwt = require('jsonwebtoken')

module.exports = (req: Request & IToken, res: Response, next: NextFunction) => {
	const authorization = req.get('authorization')
	let Token = null 

	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		Token = authorization.split(' ')[1]
	}

	if (Token === null) {
		return res.status(401).json({ error: 'Token not exists' }).end()
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
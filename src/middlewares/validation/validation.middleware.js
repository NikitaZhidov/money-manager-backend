const { validationResult } = require('express-validator');
const { ResponseDto, getMessageArray } = require('../../helpers');

function validationMiddleware(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(new ResponseDto({}, getMessageArray(errors.array())));
	}

	return next();
}

module.exports = validationMiddleware;

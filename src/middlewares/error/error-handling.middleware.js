const { ResponseDto } = require('../../helpers');
const { ApiError } = require('../../helpers');

// eslint-disable-next-line no-unused-vars
function errorHandlingMiddleware(err, req, res, next) {
	if (err instanceof ApiError) {
		return res.status(err.status).json(new ResponseDto({}, [err.message]));
	}

	return res.status(500).json(new ResponseDto({}, 'Непредвиденная ошибка'));
}

module.exports = errorHandlingMiddleware;

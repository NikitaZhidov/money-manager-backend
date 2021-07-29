const { ERR_MSG } = require('../../constants/messages-constants');

const { ApiError } = require('../../helpers');
const { tokenService } = require('../../services');

function authMiddleware(req, res, next) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			throw ApiError.unauthorized(ERR_MSG.UNAUTHORIZED);
		}

		const accessToken = authHeader.split(' ')[1];

		if (!accessToken) {
			throw ApiError.unauthorized(ERR_MSG.UNAUTHORIZED);
		}

		const userData = tokenService.validateAccessToken(accessToken);

		if (!userData) {
			throw ApiError.unauthorized(ERR_MSG.UNAUTHORIZED);
		}

		req.user = userData;
		return next();
	} catch (e) {
		return next(e);
	}
}

module.exports = authMiddleware;

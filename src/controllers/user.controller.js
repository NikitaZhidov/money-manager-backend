const { ResponseDto } = require('../helpers');
const { userService } = require('../services');

const MAX_AGE_COOKIE = 30 * 24 * 60 * 60 * 1000;

class UserController {
	async registration(req, res, next) {
		try {
			const { email, password, name } = req.body;
			const userData = await userService.registration(email, password, name);
			res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: MAX_AGE_COOKIE, httpOnly: true });
			return res.json(new ResponseDto(userData));
		} catch (e) {
			return next(e);
		}
	}

	async activate(req, res, next) {
		try {
			const { link } = req.params;
			userService.activate(link);

			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			return next(e);
		}
	}
}

module.exports = new UserController();

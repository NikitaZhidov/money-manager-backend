const { MSG } = require('../constants/messages-constants');
const { ResponseDto } = require('../helpers');
const { userService } = require('../services');

const COOKIE_CONFIG = {
	maxAge: 30 * 24 * 60 * 60 * 1000,
	httpOnly: true,
};

class UserController {
	async registration(req, res, next) {
		try {
			const { email, password, name } = req.body;
			const userData = await userService.registration(email, password, name);
			res.cookie('refreshToken', userData.tokens.refreshToken, COOKIE_CONFIG);
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

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			res.cookie('refreshToken', userData.tokens.refreshToken, COOKIE_CONFIG);
			return res.json(new ResponseDto(userData));
		} catch (e) {
			return next(e);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			res.clearCookie('refreshToken');
			await userService.logout(refreshToken);
			return res.json(new ResponseDto({ message: MSG.OK }));
		} catch (e) {
			return next(e);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData.tokens.refreshToken, COOKIE_CONFIG);
			return res.json(new ResponseDto(userData));
		} catch (e) {
			return next(e);
		}
	}
}

module.exports = new UserController();

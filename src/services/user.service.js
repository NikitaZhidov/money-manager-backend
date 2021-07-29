const bcrypt = require('bcrypt');
const uuid = require('uuid');

const { ERR_MSG } = require('../constants/messages-constants');
const { ApiError, UserDto } = require('../helpers');
const { UserModel } = require('../models');
const mailService = require('./mail.service');
const tokenService = require('./token.service');

class UserService {
	async registration(email, password, name) {
		const candidate = await UserModel.findOne({ where: { email } });

		if (candidate) {
			throw ApiError.badRequest(ERR_MSG.EMAIL_EXISTS);
		}

		const hashPassword = await bcrypt.hash(password, 5);
		const activationLink = uuid.v4();

		const user = await UserModel.create({
			email,
			password: hashPassword,
			name,
			activationLink,
		});
		await mailService.sendActivationLink(user.email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

		const userData = this._authorizeUser(user);

		return userData;
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ where: { activationLink } });
		if (!user) {
			throw ApiError.badRequest(ERR_MSG.INVALID_ACTIVATED_LINK);
		}

		user.isActivated = true;
		await user.save();
	}

	async login(email, password) {
		const user = await UserModel.findOne({ where: { email } });
		if (!user) {
			throw ApiError.badRequest(ERR_MSG.WRONG_AUTH_INFO);
		}

		const isEqualPass = await bcrypt.compare(password, user.password);

		if (!isEqualPass) {
			throw ApiError.badRequest(ERR_MSG.WRONG_AUTH_INFO);
		}

		const userData = await this._authorizeUser(user);

		return userData;
	}

	async logout(refreshToken) {
		if (!refreshToken) {
			throw ApiError.unauthorized(ERR_MSG.UNAUTHORIZED);
		}
		await tokenService.removeToken(refreshToken);
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.unauthorized(ERR_MSG.UNAUTHORIZED);
		}

		const verifiedUserData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = tokenService.findToken(refreshToken);
		if (!verifiedUserData || !tokenFromDb) {
			throw ApiError.unauthorized(ERR_MSG.SESSION_EXPIRES);
		}

		const user = await UserModel.findOne({ where: { id: verifiedUserData.id } });
		const userData = this._authorizeUser(user);

		return userData;
	}

	async _authorizeUser(user) {
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(tokens.refreshToken, user.id);

		return {
			user: userDto,
			tokens,
		};
	}
}

module.exports = new UserService();

const bcrypt = require('bcrypt');
const uuid = require('uuid');

const { ApiError, UserDto } = require('../helpers');
const { UserModel } = require('../models');
const mailService = require('./mail.service');
const tokenService = require('./token.service');

class UserService {
	async registration(email, password, name) {
		const candidate = await UserModel.findOne({ where: { email } });

		if (candidate) {
			throw ApiError.badRequest(`Email ${email} уже зарегистрирован`);
		}

		const hashPassword = await bcrypt.hash(password, 5);
		const activationLink = uuid.v4();

		const tokens = tokenService.generateTokens({ email, password, name });
		const user = await UserModel.create({
			email,
			password: hashPassword,
			name,
			activationLink,
		});
		await mailService.sendActivationLink(user.email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

		const userDto = new UserDto(user);

		await tokenService.saveToken(tokens.refreshToken, user.id);

		return {
			user: userDto,
			tokens,
		};
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ where: { activationLink } });
		if (!user) {
			throw ApiError.badRequest('Некорректная ссылка активации аккаунта');
		}

		user.isActivated = true;
		await user.save();
	}
}

module.exports = new UserService();

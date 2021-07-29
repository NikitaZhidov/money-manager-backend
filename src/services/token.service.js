const jwt = require('jsonwebtoken');

const { TokenModel } = require('../models');

const EXPIRES_IN_ACCESS = '15m';
const EXPIRES_IN_REFRESH = '30d';

class TokenService {
	generateTokens(payload) {
		const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
		const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: EXPIRES_IN_ACCESS });
		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: EXPIRES_IN_REFRESH });

		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(refreshToken, userId) {
		const tokenData = await TokenModel.findOne({ where: { userId } });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			await tokenData.save();
			return tokenData;
		}
		const token = await TokenModel.create({ userId, refreshToken });

		return token;
	}

	async removeToken(refreshToken) {
		const tokenData = await TokenModel.findOne({ where: { refreshToken } });
		if (tokenData) {
			await tokenData.destroy();
		}
	}

	async findToken(refreshToken) {
		const tokenData = await TokenModel.findOne({ where: { refreshToken } });
		return tokenData;
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}
}

module.exports = new TokenService();

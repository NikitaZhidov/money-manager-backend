const jwt = require('jsonwebtoken');

const { TokenModel } = require('../models');

class TokenService {
	generateTokens(payload) {
		const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
		const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });

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
}

module.exports = new TokenService();

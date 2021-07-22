const { DataTypes } = require('sequelize');
const sequilize = require('../db/db');

const TokenModel = sequilize.define('token', {
	refresh_token: {
		type: DataTypes.STRING, allowNull: false,
	},
});

module.exports = TokenModel;

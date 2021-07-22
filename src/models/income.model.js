const { DataTypes } = require('sequelize');
const sequilize = require('../db/db');

const IncomeModel = sequilize.define('income', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		allowNull: false,
	},
	sum: {
		type: DataTypes.DECIMAL, allowNull: false,
	},
	date: {
		type: DataTypes.DATE, allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
	},
}, { updatedAt: false, createdAt: false });

module.exports = IncomeModel;

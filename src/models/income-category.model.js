const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const IncomeModel = require('./income.model');

const IncomeCategoryModel = sequelize.define('income_category', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING, allowNull: false,
	},
}, { updatedAt: false, createdAt: false });

IncomeCategoryModel.hasMany(IncomeModel);

module.exports = IncomeCategoryModel;

const { DataTypes } = require('sequelize');
const sequilize = require('../db/db');
const ExpenseCategoryModel = require('./expense-category.model');
const IncomeCategoryModel = require('./income-category.model');

const IconModel = sequilize.define('icon', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		allowNull: false,
	},
	src: {
		type: DataTypes.STRING, allowNull: false, unique: true,
	},
}, { updatedAt: false, createdAt: false });

IconModel.hasMany(ExpenseCategoryModel);
IconModel.hasMany(IncomeCategoryModel);

module.exports = IconModel;

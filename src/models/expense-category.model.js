const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const ExpenseModel = require('./expense.model');

const ExpenseCategoryModel = sequelize.define('expense_category', {
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

ExpenseCategoryModel.hasMany(ExpenseModel);

module.exports = ExpenseCategoryModel;

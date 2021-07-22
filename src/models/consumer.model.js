const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const ExpenseModel = require('./expense.model');
const IncomeModel = require('./income.model');

const ConsumerModel = sequelize.define('consumer', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING, allowNull: false, unique: true,
	},
}, { createdAt: false, updatedAt: false });

ConsumerModel.hasMany(ExpenseModel);
ConsumerModel.hasMany(IncomeModel);

module.exports = ConsumerModel;

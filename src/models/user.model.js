const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const ConsumerModel = require('./consumer.model');
const ExpenseCategoryModel = require('./expense-category.model');
const IncomeCategoryModel = require('./income-category.model');
const TokenModel = require('./token.model');

const UserModel = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING, allowNull: false, unique: true,
	},
	password: {
		type: DataTypes.STRING, allowNull: false,
	},
	name: {
		type: DataTypes.STRING, allowNull: false,
	},
	activationLink: {
		type: DataTypes.STRING,
	},
	isActivated: {
		type: DataTypes.BOOLEAN, defaultValue: false,
	},
});

UserModel.hasMany(IncomeCategoryModel);
UserModel.hasMany(ConsumerModel);
UserModel.hasMany(ExpenseCategoryModel);
UserModel.hasOne(TokenModel);

module.exports = UserModel;

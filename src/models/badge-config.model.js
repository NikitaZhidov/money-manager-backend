const { DataTypes } = require('sequelize');
const sequilize = require('../db/db');

const ConsumerModel = require('./consumer.model');
const IconModel = require('./icon.model');

const BadgeConfigModel = sequilize.define('badge_config', {
	color: {
		type: DataTypes.STRING, allowNull: false,
	},
	background: {
		type: DataTypes.STRING,
	},
}, { updatedAt: false, createdAt: false });

BadgeConfigModel.hasMany(ConsumerModel);
BadgeConfigModel.hasMany(IconModel);

module.exports = BadgeConfigModel;

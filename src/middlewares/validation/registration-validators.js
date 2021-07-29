const { check } = require('express-validator');

const {
	NAME_MIN_LENGTH,
	NAME_MAX_LENGTH,
} = require('../../constants/validation-constants');

const authValidators = require('./auth-validators');

const registrationValidators = [
	...authValidators,
	check('name')
		.isLength({ min: NAME_MIN_LENGTH })
		.withMessage(`Минимальная длина имени ${NAME_MIN_LENGTH}`)
		.isLength({ max: NAME_MAX_LENGTH })
		.withMessage(`Максимальная длина имени ${NAME_MAX_LENGTH}`),
];

module.exports = registrationValidators;

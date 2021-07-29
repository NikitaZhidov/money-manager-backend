const { check } = require('express-validator');
const { PASS_MIN_LENGTH, PASS_MAX_LENGTH } = require('../../constants/validation-constants');

const authValidators = [
	check('email')
		.isEmail()
		.withMessage('Некорректный email'),
	check('password')
		.isLength({ min: PASS_MIN_LENGTH })
		.withMessage(`Минимальная длина пароля ${PASS_MIN_LENGTH}`)
		.isLength({ max: PASS_MAX_LENGTH })
		.withMessage(`Максимальная длина пароля ${PASS_MAX_LENGTH}`),
];

module.exports = authValidators;

const { check, validationResult } = require('express-validator');

const {
	NAME_MIN_LENGTH,
	PASS_MIN_LENGTH,
	PASS_MAX_LENGTH,
	NAME_MAX_LENGTH,
} = require('../../constants/validation-constants');
const { ResponseDto } = require('../../helpers');
const { getMessageArray } = require('../../helpers');

const registrationValidators = [
	check('email')
		.isEmail()
		.withMessage('Некорректный email'),
	check('password')
		.isLength({ min: PASS_MIN_LENGTH })
		.withMessage(`Минимальная длина пароля ${PASS_MIN_LENGTH}`)
		.isLength({ max: PASS_MAX_LENGTH })
		.withMessage(`Максимальная длина пароля ${PASS_MAX_LENGTH}`),
	check('name')
		.isLength({ min: NAME_MIN_LENGTH })
		.withMessage(`Минимальная длина имени ${NAME_MIN_LENGTH}`)
		.isLength({ max: NAME_MAX_LENGTH })
		.withMessage(`Максимальная длина имени ${NAME_MAX_LENGTH}`),
];

function registrationValidationMiddleware(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(new ResponseDto({}, getMessageArray(errors.array())));
	}

	return next();
}

module.exports = {
	registrationValidators,
	registrationValidationMiddleware,
};

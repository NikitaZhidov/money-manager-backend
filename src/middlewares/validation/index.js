const {
	registrationValidationMiddleware,
	registrationValidators,
} = require('./registration-validation.middleware');

module.exports = {
	registrationValidators,
	registrationValidationMiddleware,
};

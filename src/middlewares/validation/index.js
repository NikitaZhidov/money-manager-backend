const registrationValidators = require('./registration-validators');
const authValidators = require('./auth-validators');

const validationMiddleware = require('./validation.middleware');

module.exports = {
	registrationValidators,
	authValidators,
	validationMiddleware,
};

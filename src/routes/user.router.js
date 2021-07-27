const { Router } = require('express');

const { userController } = require('../controllers');
const {
	registrationValidators,
	registrationValidationMiddleware,
} = require('../middlewares/validation');

const router = Router();

router.post(
	'/registration',
	registrationValidators,
	registrationValidationMiddleware,
	userController.registration,
);

router.get(
	'/activate/:link',
	userController.activate,
);

module.exports = router;

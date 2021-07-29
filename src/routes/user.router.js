const { Router } = require('express');

const { userController } = require('../controllers');
const {
	registrationValidators,
	authValidators,
	validationMiddleware,
} = require('../middlewares/validation');

const router = Router();

router.post(
	'/registration',
	registrationValidators,
	validationMiddleware,
	userController.registration,
);

router.get(
	'/activate/:link',
	userController.activate,
);

router.post(
	'/login',
	authValidators,
	validationMiddleware,
	userController.login,
);

router.post(
	'/logout',
	userController.logout,
);

router.get(
	'/refresh',
	userController.refresh,
);

module.exports = router;

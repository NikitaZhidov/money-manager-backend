const { Router } = require('express');

const userRouter = require('./user.router');

const router = Router();

router.use('/user', userRouter);

module.exports = router;

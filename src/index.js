require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./db/db');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const start = async () => {
	await sequelize.authenticate();
	await sequelize.sync();

	app.listen(PORT, () => {
		console.log(`Server started on ${PORT} port...`);
	});
};

start();

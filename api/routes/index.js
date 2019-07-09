const weatherRouter = require('./weather.route');

const api = (app) => {
	const baseUrl = '/api';
	app.use(`${baseUrl}/weather`, weatherRouter);
};

module.exports = api;
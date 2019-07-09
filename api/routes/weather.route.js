const express = require('express');
const api = express.Router();
const WeatherService = require('../services/weather.service');
const service = new WeatherService();

api.get('/city', async (req, res, next) => {
	try {
		const city = req.query['city'];
		const lat = req.query['lat'];
		const long = req.query['long'];
		const response = await service.getInfo(city, lat, long);
		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
});

module.exports = api;
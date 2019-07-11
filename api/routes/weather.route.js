const express = require('express');
const api = express.Router();
const WeatherService = require('../services/weather.service');
const service = new WeatherService();

api.get('/city', async (req, res, next) => {
	try {
		const city = req.query['city'];
		const lat = req.query['lat'];
		const lng = req.query['lng'];
		const response = await service.getInfo(city, lat, lng);
		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
});

module.exports = api;
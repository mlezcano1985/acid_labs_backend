const axios = require('axios');
const redisService = require('./redis.service');
const config = require('../../config');

axios.defaults.baseURL = `${config.url}/${config.apiKey}`;

class WeatherService {
	constructor() {}

	/**
	 * 
	 * @param {string} city 
	 * @param {number} lat 
	 * @param {number} long 
	 */
	async getInfo(city, lat, long) {
		try {
			const data = await this.request(city, lat, long);
			return data;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * 
	 * @param {string} city 
	 * @param {number} lat 
	 * @param {number} long 
	 */
	async request(city, lat, long) {
		if (Math.random() < 0.1) {
			await this.registerError(city);
			return this.request(city);
		}
		else {
			try {
				let c = await redisService.get(city);
				if(!c) {
					const url = `/${lat},${long}`;
					const response = await axios.default.get(url);
					await redisService.set(city, JSON.stringify(response.data));
					return response.data;
				}
				else {
					c = JSON.parse(c);
					return c;
				}
			} catch (err) {
				await this.registerError(city);
				throw err;
			}
		}
	}

	/**
	 * 
	 * @param {string} city 
	 */
	async registerError(city) {
		let errors = await redisService.get('api.errors') || {};
		errors[new Date().toISOString()] = `How unfortunate! The API Request Failed for city: ${city}`;
		redisService.set('api.errors', errors);
	}
}

module.exports = WeatherService;
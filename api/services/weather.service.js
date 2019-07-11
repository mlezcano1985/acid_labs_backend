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
	 * @param {number} lng 
	 */
	async getInfo(city, lat, lng) {
		try {
			const data = await this.request(city, lat, lng);
			return data;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * 
	 * @param {string} city 
	 * @param {number} lat 
	 * @param {number} lng 
	 */
	async request(city, lat, lng) {
		if (Math.random() < 0.1) {
			await this.registerError(city);
			return await this.request(city);
		}
		else {
			try {
				let c = await redisService.get(city);
				if(!c) {
					const url = `/${lat},${lng}`;
					const response = await axios.default.get(url, {
						params: {
							'lang': 'es'
						}
					});
					console.log(response);
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
		let errors = await redisService.get('api.errors');
		if(errors) {
			try {
				errors = JSON.parse(errors);
				errors[new Date().toISOString()] = `How unfortunate! The API Request Failed for city: ${city}`;
				redisService.set('api.errors', JSON.stringify(errors));
			} catch (err) {
				console.log(err);
			}
		}
		else {
			errors = {};
			errors[new Date().toISOString()] = `How unfortunate! The API Request Failed for city: ${city}`;
			redisService.set('api.errors', JSON.stringify(errors));
		}
		
	}
}

module.exports = WeatherService;
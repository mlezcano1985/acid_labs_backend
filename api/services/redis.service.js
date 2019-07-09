const redis = require('redis');

let client = null;
const init = async () => {
	const dbHost = process.env['DB_HOST'];
	if(dbHost) {
		client = redis.createClient(dbHost);
	}
	else {
		client = redis.createClient();
	}
	
	client.on('error', (err) => {
		console.log(`Error: ${err}`);
		client.quit();
	});

	client.on('connect', () => {
		console.log('Redis client connected');
	});
};

init();

class RedisService {
	
	/**
	 * 
	 * @param {string} key 
	 */
	static async get(key) {
		return new Promise((resolve, reject) => {
			client.get(key, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					reply = reply ? reply.toString() : '';
					resolve(reply.toString());
				}
			});
		});
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} value 
	 */
	static async set(key, value) {
		client.set(key, value);
	}
}

module.exports = RedisService;
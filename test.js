/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('NodeJS Articles', () => {
	describe('GET /api/weather/city', () => {
		it('should get Chile weather', (done) => {
			chai.request(app)
				.get('/api/weather/city?city=CL&lat=-33.4372&long=-70.6506')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});
});
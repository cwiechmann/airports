const { expect } = require('chai');
const { startApiBuilder, stopApiBuilder, requestAsync } = require('./_base');
const envLoader = require('dotenv');
const path = require('path');
const fs = require('fs');

describe('Endpoints', function () {
	this.timeout(30000);
	let server;

	/**
	 * Start API Builder.
	 */
	before(() => {
		const envFilePath = path.join(__dirname, '.test-env');
		if (fs.existsSync(envFilePath)) {
			envLoader.config({ path: envFilePath });
		}
		server = startApiBuilder();
		return server.started;
	});

	/**
	 * Stop API Builder after the tests.
	 */
	after(() => stopApiBuilder(server));

	describe('Airports API', () => {
		it('[Airports Endpoint-0001] validate airports response', () => {
			var jsonResponse = JSON.parse(require('fs').readFileSync('./test/testDocuments/airports.json', 'utf8'));
			const auth = {
				user: server.apibuilder.config.apikey || 'test',
				password: ''
			};
			return requestAsync({
				method: 'GET',
				uri: `http://localhost:${server.apibuilder.port}/api/airports/location/78687687/90798789/30`,
				auth: auth,
				json: true
			}).then(({ response, body }) => {
				debugger;
				expect(response.statusCode).to.equal(200);
				expect(body).to.deep.equal(jsonResponse);
			});
		});
	});
});

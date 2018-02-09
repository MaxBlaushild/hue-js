'use strict';

const huejay = require('huejay');
const username = 'rqurux0ALCrWNCh7RqiS9dx9ez-hFy3xLebkcqJC';
const debouncePromise = require('debounce-promise')

let _client;

const connect = () => {
	return new Promise((resolve, reject) => {
		if (_client) {
			resolve(_client);
		}

		return huejay
			.discover()
			.then((bridges) => {
				_client = new huejay.Client({ 
					host: bridges[0].ip,
					username
				});

				return _client;
			})
			.then(resolve)
			.catch(reject);
	});
}


const createUser = () => {
	let user = new client.users.User;
	return new Promise((resolve, reject) => {
		return connect().then((client) => {
			return client.users
				.create(user)
  			.then(resolve)
  			.catch(reject);
		});
	});
};

const getLights = () => {
	return connect().then((client) => {
		return client.lights.getAll();
	});
}

const setLights = (lightSettings) => {
	console.log('DOING IT')
	return connect().then((client) => {
		return getLights().then((lights) => {
			lights.forEach((light) => {
				let newLight = Object.assign(light, lightSettings);
				client.lights.save(newLight);
			});
		});
	});
};

const toggleLights = () => {
		return connect().then((client) => {
		return getLights().then((lights) => {
			lights.forEach((light) => {
				light.on = !light.on
				client.lights.save(light);
			});
		});
	});
};

const debouncedToggleLights = debouncePromise(toggleLights, 2000);
const debounceSetLights = debouncePromise(setLights, 2000);

module.exports = {
	connect,
	createUser,
	getLights,
	setLights,
	debounceSetLights,
	toggleLights,
	debouncedToggleLights
};
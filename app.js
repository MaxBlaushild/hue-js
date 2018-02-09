'use strict';

const express = require('express');
const hue = require('./services/hue');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/lights', function (req, res) {
	const lightSettings = req.body;
	
  hue
  	.debouncedSetLights(lightSettings)
  	.then(() => {
  		res.send({});
  	})
  	.catch((err) => {
  		res.status(400).send({ err });
  	});
});

app.post('/lights/toggle', (req, res) => {
	  hue
  	.debouncedToggleLights()
  	.then(() => {
  		res.send({});
  	})
  	.catch((err) => {
  		res.status(400).send({ err });
  	});
});

app.listen(3000);
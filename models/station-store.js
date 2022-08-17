'use strict';

const logger = require('../utils/logger');

const station = {
  name: 'Tramore',
  readings: [
    {
      code: '800',
      temp: '0.5',
      windspeed: '3.5',
      pressure: '1002',
    },
    {
      title: 'Piano Sonata No. 7',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Sonata No. 10',
      artist: 'Beethoven',
    },
  ],
};

module.exports = station;
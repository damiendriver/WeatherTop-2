'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const weatherAnalytics = require("../utils/weather-analytics");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);
    const station = stationStore.getStation(stationId);
        const latestWeather = weatherAnalytics.updateWeather(station);
    const viewData = {
      name: 'Station',
      station: stationStore.getStation(stationId),
    };
    response.render('station', viewData);
  },
};

module.exports = station;
"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const weatherAnalytics = require("../utils/weather-analytics.js");
const uuid = require('uuid');


const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info("Station id = " + stationId);
    
    const station = stationStore.getStation(stationId);
    logger.info("Station id = " + station);
    
    const latestWeather = weatherAnalytics.updateWeather(station);
    
    const viewData = {
      name: "Station",
      station: stationStore.getStation(stationId),
      latestWeather: weatherAnalytics.updateweather,
    };
    response.render("station", viewData);
  },
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.info(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
  
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      windDir: request.body.windDir,
      date: new Date().toISOString(),
    };
      logger.info('New Reading = ', newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
  
};

module.exports = station;
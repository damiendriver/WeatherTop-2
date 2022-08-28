"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const weatherAnalytics = require("../utils/weather-analytics.js");
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");

    const stations = stationStore.getAllStations();
    for (const station of stationStore.getAllStations()) {
      const latestWeather = weatherAnalytics.updateWeather(station);
    }

    const viewData = {
      title: "WeatherTop 2 Dashboard",
      stations: stationStore.getAllStations(),
      latestReadings: weatherAnalytics.updateWeather.stations,
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },
  
   deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;

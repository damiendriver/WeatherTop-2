"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const weatherAnalytics = require("../utils/weather-analytics");

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
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;

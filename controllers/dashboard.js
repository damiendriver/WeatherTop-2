"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const weatherAnalytics = require("../utils/weather-analytics.js");
const uuid = require("uuid");
const axios = require("axios");
const accounts = require("./accounts.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);

    const allstations = stationStore.getAllStations();
    const stations = allstations.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < stations.length; i++) {
      let station = stations[i];
      if (station.readings.length > 0) {
        weatherAnalytics.updateWeather(station);
      }
    }

    const viewData = {
      title: "WeatherTop 2 Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
      latestReadings: weatherAnalytics.updateWeather.stations,
    };
    logger.info("about to render", stationStore.getUserStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: [],
    };
    logger.info("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;

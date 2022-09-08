"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const weatherAnalytics = require("../utils/weather-analytics.js");
const uuid = require("uuid");
const axios = require("axios");

const station = {
  async index(request, response) {
    const stationId = request.params.id;
    logger.info("Station id = " + stationId);
    const station = stationStore.getStation(stationId);
    logger.info("Station id = " + station);
    const latestWeather = weatherAnalytics.updateWeather(station);
    
   
    let report = {};
      const lat = station.lat;
      const lng = station.lng;
      const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=67b4ce4fa77b091cd7f792ad413c1998`;
      const result = await axios.get(requestUrl);
      if (result.status == 200) {
        console.log(result.data);
        const reading = result.data.current;
        report.id = uuid.v1();
        report.code = reading.weather[0].id;
        report.temp = reading.temp;
        report.windSpeed = reading.wind_speed;
        report.pressure = reading.pressure;
        report.windDir = reading.wind_deg;
        report.date = new Date().toISOString();
        report.tempTrend = [];
        report.trendLabels = [];
        const trends = result.data.daily;
        console.log(trends);
        for (let i = 0; i < trends.length; i++) {
          report.tempTrend.push(trends[i].temp.day);
          const date = new Date(trends[i].dt * 1000);
          console.log(date.toISOString());
          report.trendLabels.push(
            `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
          );
        }
      }
    
    
    const viewData = {
      name: "Station",
      station: stationStore.getStation(stationId),
      latestWeather: weatherAnalytics.updateweather,
      
      reading: report,
      
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.info(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
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
    logger.info("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  async addreport(request, response) {
    try {
      const stationId = request.params.id;
      const station = stationStore.getStation(stationId);
      logger.info("rendering new report");
      let report = {};
      const lat = station.lat;
      const lng = station.lng;
      const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=67b4ce4fa77b091cd7f792ad413c1998`;
      const result = await axios.get(requestUrl);
      if (result.status == 200) {
        console.log(result.data);
        const reading = result.data.current;
        report.id = uuid.v1();
        report.code = reading.weather[0].id;
        report.temp = reading.temp;
        report.windSpeed = reading.wind_speed;
        report.pressure = reading.pressure;
        report.windDir = reading.wind_deg;
        report.date = new Date().toISOString();

        report.tempTrend = [];
        report.trendLabels = [];

        const trends = result.data.daily;
        console.log(trends);
        for (let i = 0; i < trends.length; i++) {
          report.tempTrend.push(trends[i].temp.day);
          const date = new Date(trends[i].dt * 1000);
          console.log(date.toISOString());
          report.trendLabels.push(
            `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
          );
        }
      }
      console.log(report);
      stationStore.addReading(stationId, report);
      const viewData = {
        name: "Station",
        station: stationStore.getStation(stationId),
        latestWeather: weatherAnalytics.updateweather,
        reading: report,
      };
      response.render("station", viewData);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = station;
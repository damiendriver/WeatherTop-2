"use strict";

const logger = require("../utils/logger");
const station = require('../models/station-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop 2 Dashboard",
       station: station,
    };
    logger.info('about to render', station);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;

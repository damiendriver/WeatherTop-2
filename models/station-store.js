"use strict";

const logger = require("../utils/logger");

const station = {
  name: "Tramore",
  readings: [
    {
      code: "800",
      temp: "0.5",
      windspeed: "3.5",
      pressure: "1002",
    },
    {
      code: "600",
      temp: "6.0",
      windspeed: "2.0",
      pressure: "1004",
    },
    {
      code: "700",
      temp: "8.0",
      windspeed: "1.0",
      pressure: "1005",
    },
  ],
};

module.exports = station;
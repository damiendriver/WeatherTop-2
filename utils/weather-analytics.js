"use strict";

const weatherAnalytics = {
  updateWeather(station) {
    
    if (station.readings.length > 0) {
      const latestReading = this.getLatestReading(station.readings);
      station.latestReading = latestReading;
      station.code = latestReading.code;
      station.windBft = weatherAnalytics.beafourt(latestReading.windSpeed);
      station.tempF = weatherAnalytics.tempF(latestReading.temp).toFixed(2);
      station.pressure = latestReading.pressure;
      station.tempC = latestReading.temp;
      station.degreesToCompass = weatherAnalytics.degreesToCompass(latestReading.windDir);
      station.windChill = weatherAnalytics.windChill(latestReading.temp, latestReading.windSpeed).toFixed(2);
      station.codeIcon = this.codeIcon(latestReading.code);
      station.codeWeather = this.codeWeather(latestReading.code);
      station.maxTemp = weatherAnalytics.getMaxTemp(station);
      station.minTemp = weatherAnalytics.getMinTemp(station);
      station.maxWindSpeed = weatherAnalytics.getMaxWindSpeed(station);
      station.minWindSpeed = weatherAnalytics.getMinWindSpeed(station);
      station.maxPressure = weatherAnalytics.getMaxPressure(station);
      station.minPressure = weatherAnalytics.getMinPressure(station);
      
      return latestReading;
    }
  },

  getLatestReading(readings) {
    return readings[readings.length - 1];
  },

  windChill(temp, windSpeed) {
    return (
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(windSpeed, 0.16) +
      0.3965 * temp * Math.pow(windSpeed, 0.16)
    );
  },

  convertToWindSpeedBFT(windSpeed) {
    if (windSpeed == 1) return 0;
    else if (windSpeed >= 1 && windSpeed <= 5) return 1;
    else if (windSpeed >= 6 && windSpeed <= 11) return 2;
    else if (windSpeed >= 12 && windSpeed <= 19) return 3;
    else if (windSpeed >= 20 && windSpeed <= 28) return 4;
    else if (windSpeed >= 29 && windSpeed <= 38) return 5;
    else if (windSpeed >= 39 && windSpeed <= 49) return 6;
    else if (windSpeed >= 50 && windSpeed <= 61) return 7;
    else if (windSpeed >= 62 && windSpeed <= 74) return 8;
    else if (windSpeed >= 75 && windSpeed <= 88) return 9;
    else if (windSpeed >= 89 && windSpeed <= 102) return 10;
    else if (windSpeed >= 103 && windSpeed <= 117) return 11;
    else return 0;
  },

  beafourt(windSpeed) {
    if (windSpeed == 0) {
      return 0;
    } else if (windSpeed >= 1 && windSpeed <= 6) {
      return 1;
    } else if (windSpeed >= 7 && windSpeed <= 11) {
      return 2;
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return 3;
    } else if (windSpeed >= 20 && windSpeed <= 29) {
      return 4;
    } else if (windSpeed >= 30 && windSpeed <= 39) {
      return 5;
    } else if (windSpeed >= 40 && windSpeed <= 50) {
      return 6;
    } else if (windSpeed >= 51 && windSpeed <= 62) {
      return 7;
    } else if (windSpeed >= 63 && windSpeed <= 75) {
      return 8;
    } else if (windSpeed >= 76 && windSpeed <= 87) {
      return 9;
    } else if (windSpeed >= 88 && windSpeed <= 102) {
      return 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return 11;
    } else if (windSpeed >= 117) {
      return 12;
    }
    return -1;
  },

  tempF(tempC) {
    return tempC * 1.8 + 32;
  },

  degreesToCompass(deg) {
    if (deg > 11.25 && deg <= 33.75) {
      return "North North East";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "East North East";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "East";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "East South East";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "East South East";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "South East";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "South South East";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "South";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "South South West";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "South West";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "West South West";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "West";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "West North West";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "North West";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },

  codeWeather(code) {
    let weather = null;
        if (code <= 100) {
            weather = "Clear";
        } else if (code > 100 && code <= 200) {
            weather = "Partial Clouds";
        } else if (code > 200 && code <= 300) {
            weather = "Cloudy";
        } else if (code > 300 && code <= 400) {
            weather = "Light Showers";
        } else if (code > 500 && code <= 600) {
            weather = "Heavy Showers";
        } else if (code > 600 && code <= 700) {
            weather = "Rain";
        } else if (code > 700 && code <= 800) {
            weather = "Snow";
        } else if (code > 800) {
            weather = "Thunder";
        }
        return weather;
    },
  
  codeIcon(code) {
    let icon = null;
        if (code <= 100) {
            icon = "ui inverted yellow sun outline icon";
        } else if (code > 100 && code <= 200) {
            icon = "ui yellow cloud sun icon";
        } else if (code > 200 && code <= 300) {
            icon = "ui grey cloud icon";
        } else if (code > 300 && code <= 400) {
            icon = "ui blue cloud sun rain icon";
        } else if (code > 500 && code <= 600) {
            icon = "ui blue cloud showers heavy icon";
        } else if (code > 600 && code <= 700) {
            icon = "ui blue cloud rain icon";
        } else if (code > 700 && code <= 800) {
            icon = "ui inverted white snowflake outline icon";
        } else if (code > 800) {
            icon = "ui red bolt icon";
        }
        return icon;
    },
  
   getMaxTemp(station) {
    let maxTemp = 0;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0].temp;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temp > maxTemp) {
          maxTemp = station.readings[i].temp;
        }
      }
    }
    return maxTemp;
  },

  getMinTemp(station) {
    let minTemp = 0;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temp;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temp < minTemp) {
          minTemp = station.readings[i].temp;
        }
      }
    }
    return minTemp;
  },
  
   getMaxWindSpeed(station) {
    let maxWindSpeed = 0;
    if (station.readings.length > 0) {
      maxWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWindSpeed) {
          maxWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return maxWindSpeed;
  },
  
  getMinWindSpeed(station) {
    let minWindSpeed = 0;
    if (station.readings.length > 0) {
      minWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWindSpeed) {
          minWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return minWindSpeed;
  },
  
  getMaxPressure(station) {
    let maxPressure = 0;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
    }
    return maxPressure;
  },
  
  getMinPressure(station) {
    let minPressure = 0;
    if (station.readings.length > 0) {
      minPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
    }
    return minPressure;
  },
  
};

module.exports = weatherAnalytics;
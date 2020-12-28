const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f80166e6f03350b39f5285f00c7122b2&query=${latitude},${longitude}`;
  
  request(url, {
    method: 'GET',
    json: true,
  }, (error, { body } = {}) => {
    if (error) {
      return callback('Unable to connect to weather service', null);
    } else if (body.error) {
      return callback(body.error.info, null)
    }
  
    const data = body.current;

    return callback(null, {
      description: data.weather_descriptions[0],
      temperature: data.temperature,
      feelslike: data.feelslike,
      humidity: data.humidity,
    });
  });
};

module.exports = forecast;

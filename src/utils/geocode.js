const request = require('request');

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1Ijoicm9nYWwtMTk4MSIsImEiOiJja2dqN2FrMDQwYXF2MnduZjd2dmZ5bG5jIn0.dI4Z7vuvKAu2Y8EDZq1_aQ`;
  
  request(geocodeURL, {
    method: 'GET',
    json: true
  }, (error, { body: { features = [] } } = {}) => {
    if (error) {
      callback('Unable to connect with the location server', null);
    } else if (features.length === 0) {
      callback('Unable to find the location', null)
    } else {
      callback(null, {
        longitude: features[0].center[0],
        latitude: features[0].center[1],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

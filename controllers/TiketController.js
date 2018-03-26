const axios = require('axios');

module.exports = {
  fetchAirports: function(req,res) {
    axios.get('https://api-sandbox.tiket.com/flight_api/all_airport?token=0bd1872a4ea98001c9d1af23cae9d013e09d865c&output=json').then(function(response) {
      res.status(200).json(response.data);
    }).catch(err => res.status(500).json(err))
  },
  searchFlight: function(req,res) {
    const { departure, arrived, date, ret_date } = req.body;
    axios.get(`http://api-sandbox.tiket.com/search/flight?d=${departure}&a=${arrived}&date=${date}&ret_date=${ret_date}&adult=1&child=0&infant=0&token=0bd1872a4ea98001c9d1af23cae9d013e09d865c&v=3&output=json`).then(function(response) {
      res.status(200).json(response.data);
    }).catch(err => res.status(500).json(err))
    
  }
}

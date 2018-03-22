const { fetchAirports, searchFlight } = require('../controllers/TiketController.js')
var express = require('express');
var router = express.Router();

router.get('/airports', fetchAirports);
router.post('/search', searchFlight);

module.exports = router;

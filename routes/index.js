const express = require('express');
const router = express.Router();

// test server and router connection
router.get('/', function(req, res, next) {
  res.send({ status: 'connected!', router: 'index.js' });
});

module.exports = router;

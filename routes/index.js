var express = require('express');
var router = express.Router();

const {cekAuth,forwardAuth} =require('../config/auth');

// halaman welcome
router.get('/',forwardAuth, function(req, res, next) {
  res.render('welcome', { title: 'Halaman Welcome' });
});

// halaman dashboard
router.get('/dashboard', cekAuth,function(req, res, next) {
  res.render('dashboard', { title: 'Halaman Dashboard' });
});



module.exports = router;

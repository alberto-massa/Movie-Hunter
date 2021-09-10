const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => res.render('user/profile'));

router.get('/search', (req, res) => {
  res.render('user/search');
});


module.exports = router;

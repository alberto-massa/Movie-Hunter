const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('movies/search'))


module.exports = router;

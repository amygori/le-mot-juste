const express = require('express');
const router = express.Router();
const parseurl = require('parseurl');
const session = require('express-session');
const rp = require('request-promise');
const wordsUrl = 'https://wordsapiv1.p.mashape.com/words/'

const requestOptions = {
  url: wordsUrl,
  headers: {
    'X-Mashape-Key': 'j4f7A2KxjsmshzQOJrMrFZXsq7Lcp12dKS7jsnR81ZZZrrviS4',
    'Accept': 'application/json'
  },
  qs: {
    letters: 8,
    random: true
  },
  json: true
};

/* GET home page. */
router.get('/', function(req, res, next) {
    rp(requestOptions)
      .then(function(apiRes){
        req.session.word = apiRes.word
        res.render('index')
      })
      .catch(function(error){
        console.log(error)
      });
});

module.exports = router;

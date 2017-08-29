const express = require('express');
const router = express.Router();
const parseurl = require('parseurl');
const session = require('express-session');
const rp = require('request-promise');
const game = require('../word.js')
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
  if(!req.session.word){
    rp(requestOptions)
    .then(function(apiRes){
      req.session.word = apiRes.word
      console.log(`the word is ${ apiRes.word }`)
      game.setup(apiRes.word, req.session)
      res.render('index', { word: apiRes.word })
    })
    .catch(function(error){
      console.log(error)
    });
  } else {
    res.render('index', {
      guesses: [],
      display: req.session.displayArray
    })
  }
});

router.post('/', function(req, res, next) {
  guessedLetter = req.body.guess;
  game.play(letterGuess, req.session);
  res.redirect('/');
})

module.exports = router;

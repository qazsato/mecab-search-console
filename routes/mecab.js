'use strict';

const express = require('express');
const router = express.Router();
const Mecab = require('mecab-async');
const mecab = new Mecab();

router.get('/', (req, res, next) => {
  let text = req.query.text;
  mecab.parse(text, function(err, result) {
    res.send(result);
  });
});

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const Mecab = require('mecab-async');
const mecab = new Mecab();

router.post('/', (req, res, next) => {
  let data = req.body.data;
  mecab.parse(data, function(err, result) {
    let json = {};
    result.forEach(function(element){
      if (element[1] == '名詞') {
        var key = element[0].trim();
        if (json[key]) {
          json[key] = json[key] + 1;
        } else {
          json[key] = 1;
        }
      }
    });
    res.render('result', {
      title: 'Mecab Search Console',
      data: json
    });
  });
});

module.exports = router;

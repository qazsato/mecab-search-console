'use strict';

const express = require('express');
const router = express.Router();
const Mecab = require('mecab-async');
const mecab = new Mecab();

router.post('/', (req, res, next) => {
  mecab.parse(req.body.data, function(err, result) {
    let json = {};
    result.forEach(function(element){
      if (element[1] === '名詞') {
        let key = element[0].trim();
        if (json[key]) {
          json[key] = json[key] + 1;
        } else {
          json[key] = 1;
        }
      }
    });
    let data = [];
    for (var key in json) {
      data.push({
        'word': key,
        'num': json[key]
      });
    }
    data.sort(function(a,b){return a.num - b.num;});
    data.reverse();

    res.render('result', {
      title: 'Mecab Search Console',
      data: data
    });
  });
});

module.exports = router;

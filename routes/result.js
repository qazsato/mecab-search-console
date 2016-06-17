'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const Mecab = require('mecab-async');
const mecab = new Mecab();

let json;

router.post('/', (req, res, next) => {
  json = {};  // リクエスト時に初期化
  let jsonArr = csv2json(req.body.data);
  let tasks = [];
  let data = [];
  for (let i = 0; i < jsonArr.length; i++) {
    let word = jsonArr[i]['クエリ数'];
    let clickNum = jsonArr[i]['クリック数'];
    let dispNum = jsonArr[i]['表示回数'];
    let task = getMecabTask(word, clickNum, dispNum);
    tasks.push(task);
  }
  async.waterfall(tasks, function () {
    for (var key in json) {
      var ctr = (json[key].clickNum / json[key].dispNum * 100).toFixed(2);
      data.push({
        'word': key,
        'clickNum': json[key].clickNum,
        'dispNum': json[key].dispNum,
        'ctr': ctr + '%'
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

/**
 * 形態素解析を実施するタスクを取得します
 * @param  {String} word クエリ数
 * @param  {String} clickNum  クリック数
 * @param  {String} dispNum  表示回数
 * @return async用タスク
 */
let getMecabTask = (word, clickNum, dispNum) => {
  return function (nextFetch) {
    mecab.parse(word, function(err, result) {
      result.forEach(function(element){
        if (element[1] === '名詞') {
          let key = element[0].trim();
          if (json[key]) {
            json[key] = {
              'clickNum': parseInt(json[key].clickNum) + parseInt(clickNum),
              'dispNum': parseInt(json[key].dispNum) + parseInt(dispNum)
            };
          } else {
            json[key] = {
              'clickNum': parseInt(clickNum),
              'dispNum': parseInt(dispNum)
            };
          }
        }
      });
      nextFetch();
    });
  };
}

/**
 * CSVをJSONArrayに変換します。
 * @param  {String} csv
 * @return {JSON}
 */
let csv2json = csv => {
  var csvArray = csv.split('\n');
  var jsonArray = [];

  var items = csvArray[0].split(',');
  for (var i = 1; i < csvArray.length; i++) {
    var item = {};
    var csvArrayD = csvArray[i].split(',');
    for (var j = 0; j < items.length; j++) {
      item[items[j]] = csvArrayD[j];
    }
    jsonArray.push(item);
  }
  return jsonArray;
}

module.exports = router;

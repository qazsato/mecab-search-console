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
    let num = jsonArr[i]['クリック数'];
    let task = getMecabTask(word, num);
    tasks.push(task);
  }
  async.waterfall(tasks, function () {
    for (var key in json) {
      data.push({'word': key, 'num': json[key]});
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
 * @param  {String} num  クリック数
 * @return async用タスク
 */
let getMecabTask = (word, num) => {
  return function (nextFetch) {
    mecab.parse(word, function(err, result) {
      result.forEach(function(element){
        if (element[1] === '名詞') {
          let key = element[0].trim();
          if (json[key]) {
            json[key] = parseInt(json[key]) + parseInt(num);
          } else {
            json[key] = parseInt(num);
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

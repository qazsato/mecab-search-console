'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');
const async = require('async');

/* GET home page. */
router.get('/', (req, res, next) => {

  async.series(
    [
      callback => {
        // twitter API
        let url = 'http://urls.api.twitter.com/1/urls/count.json?url=https://www.google.com/';
        request(url, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));
          }
          callback();
        });
      },
      callback => {
        // Facebook API
        let url = 'http://graph.facebook.com/?id=https://www.google.com/';
        request(url, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));
          }
          callback();
        });
      }
    ],
    (err, results) => {
      if (err) throw err;
      res.render('index', { title: 'Express' });
    });
});

module.exports = router;

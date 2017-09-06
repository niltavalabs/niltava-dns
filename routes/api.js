//TODO: Filtering request body.

var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var util = require('util');

//Save Below Variable at memcached
var sessionStorage = {};
var verificationCodes = {};

router.use(function (req, res, next) {
  req.authorized = false;
  var authorization = req.headers.authorization;
  if(!authorization) return next();

  var userId = authorization.split(':')[0];
  if(sessionStorage[userId] && sessionStorage[userId].indexOf(authorization) > -1) {
    req.authorized = true;
    req.userId = userId;
  }
  next();
});

router.put('/domain', function(req, res, next) {
  res.status(200).send({msg: 'Success'});
});

router.get('/domain', function(req, res, next) {
  res.status(200).send({msg: 'Success'});
});

router.put('/domain/:domain/record', function(req, res, next) {
  res.status(200).send({msg: 'Success'});
});

router.get('/domain/:domain/record', function(req, res, next) {
  res.send({});
});

module.exports = router;
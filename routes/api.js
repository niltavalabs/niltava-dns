//TODO: Filtering request body.

var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var util = require('util');

var Domain = require('../models/domain');
var Record = require('../models/record');

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

  if(process.env.DEVELOPMENT) {
    req.authorized = true;
    req.userId = 'dkflepxcmd';    
  }

  next();
});

router.put('/domain', function(req, res, next) {
  if(!req.authorized) return res.status(403).send({msg: 'Invalid authorization'});

  var domain = new Domain(req.body.domain);
  domain.account = req.userId;
  domain.save(function (err, domain, numAffected) {
    if (!err) {
      res.status(200).send({msg: 'Success', domain: domain});
    }
    else return res.status(500).send(err);
  });
});

router.get('/domain', function(req, res, next) {
  if(!req.authorized) return res.status(403).send({msg: 'Invalid authorization'});

  Domain.findByAccount(req.userId, function(err, domains) {
    res.send({domains: domains});
  });
});

router.put('/domain/:domain/record', function(req, res, next) {
  if(!req.authorized) return res.status(403).send({msg: 'Invalid authorization'});
  var record = new Record(req.body.record);
  record.domain = req.params.domain;
  record.account = req.userId;
  record.save(function (err, record, numAffected) {
    if (!err) {
      res.status(200).send({msg: 'Success', record: record});
    }
    else return res.status(500).send(err);
  });
});

router.get('/domain/:domain/record', function(req, res, next) {
  if(!req.authorized) return res.status(403).send({msg: 'Invalid authorization'});
  Record.findByDomain(req.params.domain, function(err, records) {
    res.send({records: records});
  });
});

router.get('/record/:name', function(req, res, next) {
  if(!req.authorized) return res.status(403).send({msg: 'Invalid authorization'});
  Record.findByName(req.params.name, function(err, records) {
    res.send({records: records});
  });
});

module.exports = router;
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

var DEVELOPMENT_MODE = process.env.NODE_ENV == 'development';

router.use(function (req, res, next) {
  if(DEVELOPMENT_MODE) {
    req.authorized = true;
    req.userId = 'dkflepxcmd';    
    return next();
  }

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
  if(!req.authorized) return res.status(403).send({msg: 'Invalid authorization'});

  var domain = new Domain(req.body.domain);
  domain.account = req.userId;
  domain.save(function (err, domain, numAffected) {
    var recordSOAData = {
      domain: domain.name,
      name: domain.name,
      type: 'SOA',
      value: {
        ttl: 180000,
        type: 'SOA',
        primary: 'ns.mapmu.com.',
        admin: 'info.mapmu.com.',
        serial: 2009010351,
        refresh: 43200,
        retry: 3600,
        expiration: 1209600,
        minimum: 180
      }
    }
    var recordSOA = new Record(recordSOAData);
    recordSOA.save();

    var recordNSData = {
      domain: domain.name,
      name: domain.name,
      type: 'NS',
      value: {
        ttl: 600,
        data: 'ns.mapmu.com'
      }
    }
    var recordNS = new Record(recordNSData);
    recordNS.save();
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
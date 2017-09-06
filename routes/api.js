//TODO: Filtering request body.

var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var util = require('util');

var niltava = require('niltava');
var Venue = niltava.Model.Venue;
var VenueOrder = niltava.Model.VenueOrder;
var VenueAdmin = niltava.Model.VenueAdmin;
var idGenerator = niltava.Util.IdGenerator;
var User = niltava.Model.User;
var Team = niltava.Model.Team;

var Activity = niltava.Model.Activity;
var ActivityOrder = niltava.Model.ActivityOrder;

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

router.put('/', function(req, res, next) {
  req.body.team.sid = idGenerator.generateShortId();
  var team = new Team(req.body.team);
  team.save(function (err, team, numAffected) {
    if (!err) {
      res.status(200).send({msg: 'Success', team: team});
    }
    else return res.status(500).send(err);
  });
});

router.get('/', function(req, res, next) {
  Team.findAll(function(err, teams) {
    res.send({teams: teams});
  });
});

router.get('/category/:category', function(req, res, next) {
  Team.findByCategory(req.params.category, function(err, teams) {
    res.send({teams: teams});
  });
});

router.get('/event/:event', function(req, res, next) {
  Team.findByEvents(req.params.event, function(err, teams) {
    res.send({teams: teams});
  });
});

router.post('/event/:eventId/join', function(req, res, next) {
  Team.findBySid(req.body.team.sid, function(err, team) {
    if(team.events) team.events.push(req.params.eventId);
    else team.events = [req.params.eventId];
    team.save(function(err, team) {
      if (!err) {
        res.status(200).send({msg: 'Success', team: team});
      }
      else return res.status(500).send(err);
    });
  });
});


router.get('/id/:id', function(req, res, next) {
  Team.findBySid(req.params.id, function(err, team) {
    res.send({team: team});
  });
});

module.exports = router;
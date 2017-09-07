var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var dbname = process.env.DB_NAME || 'niltava-dns';
var dbhost = process.env.DB_HOST || 'localhost';
var dbport = process.env.DB_PORT || '27017';

mongoose.connect('mongodb://' + dbhost + ':' + dbport + '/' + dbname, { config: { } });

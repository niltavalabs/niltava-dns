var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/nilnews', { config: { autoIndex: false } });
mongoose.Promise = require('q').Promise;

var dbname = process.env.DB_NAME || 'niltava';

mongoose.connect('mongodb://localhost/' + dbname, { config: { } });

require('./connector');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var recordSchema = new Schema({
  domain: String,
  name: String,
  type: String,
  value: Schema.Types.Mixed
});

recordSchema.index({
  domain: 1
});

recordSchema.index({
  name: 1
});

recordSchema.statics.findByDomain = function(domain, cb) {
  return this.find({ domain: domain }, cb);
};

recordSchema.statics.findByName = function(name, cb) {
  return this.find({ name: name }, cb);
};

var Record = mongoose.model('Record', recordSchema);

module.exports = Record;

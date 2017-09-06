require('./connector');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var domainSchema = new Schema({
  name: String,
  type: String,
  account: String
});

domainSchema.index({
  account: 1
});

domainSchema.index({
  name: 1
});

domainSchema.statics.findByAccount = function(account, cb) {
  return this.find({ account: account }, cb);
};

var Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
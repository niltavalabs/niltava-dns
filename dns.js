var dns = require('native-dns');
var server = dns.createServer();
var Record = require('./models/record');

server.on('request', function (request, response) {
  console.log(request)

  response.answer.push(dns.SOA({
  	ttl: 180000,
  	type: 'SOA',
  	name: '@',
  	primary: 'ns.mapmu.com.',
  	admin: 'info.mapmu.com.',
  	serial: 2009010351,
  	refresh: 43200,
  	retry: 3600,
  	expiration: 1209600,
  	minimum: 180}));

  response.answer.push(dns.NS({
    name: 'mapmu.com',
    data: 'ns.mapmu.com',
    ttl: 600,
  }));

  response.answer.push(dns.A({
    name: 'ns.mapmu.com',
    address: '103.11.252.86',
    ttl: 600,
  }));

  Record.findByName(req.params.name, function(err, records) {
    for(var i = 0; i < records.length; i++) {
      var record = records[i];
      var dnsValue = record.value;
      dnsValue.type = record.type;
      dnsValue.name = record.name;
      var dnsRecord = dns[record.type](dnsValue);
      response.answer.push(dnsRecord);
    }
    response.send();
  });


  // response.answer.push(dns.SOA({
  //   ttl: 180000,
  //   type: 'SOA',
  //   name: 'niltava.co.id',
  //   primary: 'ns.mapmu.com.',
  //   admin: 'info.mapmu.com.',
  //   serial: 2009010351,
  //   refresh: 43200,
  //   retry: 3600,
  //   expiration: 1209600,
  //   minimum: 180}));

  // response.answer.push(dns.NS({
  //   name: 'niltava.co.id',
  //   data: 'ns.mapmu.com',
  //   ttl: 600,
  // }));

  // response.answer.push(dns.A({
  //   name: 'niltava.co.id',
  //   address: '127.0.0.2',
  //   ttl: 600,
  // }));

  // response.answer.push(dns.A({
  //   name: 's.niltava.co.id',
  //   address: '127.0.0.3',
  //   ttl: 600,
  // }));

});

server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

module.exports = server;

# niltava-dns, RESTful-based managed DNS

* [Installation](#installation)
* [API Documentations](#api-documentations)

## Installation
TODO

## API Documentations

### API Resources

  - [PUT /domain](#put-domain)
  - [GET /domain](#get-domain)
  - [PUT /domain/[domain]/record](#put-domaindomainrecord)
  - [GET /domain/[domain]/record](#get-domaindomainrecord)
  - [GET /record/[name]](#get-recordname)

### PUT /domain

Example: https://niltava.co.id/api/v1/domain

Header:

	- Authorization: userid:auth
	- Content-Type: application/json

Request body:

```json
  {
    "domain": {
      "name": "niltava.co.id",
      "type": "public"
    }
  }
```

### GET /domain

Example: https://niltava.co.id/api/v1/domain

Header:

	- Authorization: userid:auth
	- Content-Type: application/json

Response body:

```json
  {
    "domains": [
      {
        "_id": "59b119dd69c0506830f49207",
        "account": "dkflepxcmd",
        "name": "niltava.co.id",
        "type": "public",
        "__v": 0
      }
    ]
  }
```

### PUT /domain/[domain]/record

Example: https://niltava.co.id/api/v1/domain/niltava.co.id/record

Header:

	- Authorization: userid:auth
	- Content-Type: application/json

Request body:

```json
  {
    "record": {
      "name": "andi.niltava.co.id",
      "type": "A",
      "value": {
        "address": "192.168.2.111",
        "ttl": 600
      }
    }
  }
```

### GET /domain/[domain]/record

Example: https://niltava.co.id/api/v1/domain/niltava.co.id/record

Header:

	- Authorization: userid:auth
	- Content-Type: application/json

Response body:

```json
  {
      "records": [
          {
              "_id": "59b119dd69c0506830f49208",
              "domain": "niltava.co.id",
              "name": "niltava.co.id",
              "type": "SOA",
              "value": {
                  "ttl": 180000,
                  "type": "SOA",
                  "primary": "ns.mapmu.com.",
                  "admin": "info.mapmu.com.",
                  "serial": 2009010351,
                  "refresh": 43200,
                  "retry": 3600,
                  "expiration": 1209600,
                  "minimum": 180
              },
              "__v": 0
          },
          {
              "_id": "59b119dd69c0506830f49209",
              "domain": "niltava.co.id",
              "name": "niltava.co.id",
              "type": "NS",
              "value": {
                  "ttl": 600,
                  "data": "ns.mapmu.com"
              },
              "__v": 0
          },
          {
              "_id": "59b11bed69c0506830f4920a",
              "domain": "niltava.co.id",
              "name": "nil.niltava.co.id",
              "type": "A",
              "value": {
                  "address": "192.168.2.220"
              },
              "__v": 0
          },
          {
              "_id": "59b11c3969c0506830f4920b",
              "domain": "niltava.co.id",
              "name": "niltava.co.id",
              "type": "A",
              "value": {
                  "address": "192.168.2.200"
              },
              "__v": 0
          }
      ]
  }
```

### GET /record/[name]

Example: https://niltava.co.id/api/v1/record/andi.niltava.co.id

Header:

	- Authorization: userid:auth
	- Content-Type: application/json

Response body:

```json
  {
    "records": [
        {
            "_id": "59b126abdceb5a7215515268",
            "domain": "niltava.co.id",
            "name": "andi.niltava.co.id",
            "type": "A",
            "value": {
                "address": "192.168.2.111",
                "ttl": 600
            },
            "__v": 0
        }
    ]
}
```

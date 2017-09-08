# niltava-dns, RESTful-based managed DNS

* [Installation](#installation)
* [API Documentations](#api-documentations)

## Installation


## API Documentations

### API Resources

  - [PUT /domain](#put-domain)
  - [GET /domain](#get-domain)
  - [PUT /domain/[domain]/record](#put-domain-record)
  - [GET /domain/[domain]/record](#get-domain-record)
  - [GET /record/[name]](#get-record)

### PUT /domain

Example: https://niltava.co.id/api/v1/domain

Header:
	
	- Authorization: userid:auth
	- Content-Type: application/json

Request body:

    {
		"domain": {
			"name": "niltava.co.id",
			"type": "public"
		}
	}

### GET /domain

Example: https://niltava.co.id/api/v1/domain

Header:

	- Authorization: userid:auth
	- Content-Type: application/json

Response body:

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
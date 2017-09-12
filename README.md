# niltava-dns, RESTful-based managed DNS server

* [Installation](#installation)
* [What's next](#whats-next)
* [API Documentations](#api-documentations)
* [Development progress](#development-progress)

## Installation

### Install prerequisites
You need to have ```nodejs``` and ```npm``` installed to run ```niltava-dns```. If you have not installed the apps before, you can follow [this instruction](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04).

If you want to deploy or run the service in background, install ```forever``` module from ```npm```

```bash
sudo npm install -g forever
```

### Clone the repository
```bash
git clone https://github.com/niltavalabs/niltava-dns.git
```

### Install packages
```bash
cd niltava-dns
npm install
```

### Start or deploy service
You can just start the service in foreground or deploy it in background. For start in foreground, you can execute ```npm start```.

You need to be a ```sudoer``` to deploy it since opening DNS server port (53) requires super user permission. These are complete commands

```bash
sudo bash
npm deploy
```

## What's next?
Your name server should now be started. However, you still need to delegate authority for your domain to your name server.

To do this, you will have to go to the website where you purchased your domain name. The interface and perhaps the terminology will be different depending on the domain name registrar that you used. Create ```A``` record to specify name servers domain and its IP address where the name server runs.

![alt text](https://raw.githubusercontent.com/niltavalabs/niltava-dns/master/readme/img/1.png)

Now, you should be able to use the service as your domain's name server.
Here, you can tell it to use the name servers you added as the authoritative servers for your site:

![alt text](https://raw.githubusercontent.com/niltavalabs/niltava-dns/master/readme/img/2.png)

The changes might take awhile to propagate, but you should see the data from your name servers being used within the next 24-48 hours for most registrars.

Finally, you can manage your domain with a RESTful API. By default, niltava-dns RESTful API uses port ```3303```, you can specify manually by editing package.json start script and deploy it again.

## API Documentations

### API Resources

  - [PUT /domain](#put-domain)
  - [GET /domain](#get-domain)
  - [PUT /domain/[domain]/record](#put-domaindomainrecord)
  - [GET /domain/[domain]/record](#get-domaindomainrecord)
  - [GET /record/[name]](#get-recordname)

### PUT /domain

Example: https://ns.mapmu.com/api/v1/domain

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

Example: https://ns.mapmu.com/api/v1/domain

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

Example: https://ns.mapmu.com/api/v1/domain/niltava.co.id/record

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

Example: https://ns.mapmu.com/api/v1/domain/niltava.co.id/record

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

Example: https://ns.mapmu.com/api/v1/record/andi.niltava.co.id

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

## Development progress
### Todo
  - User admin account
  - Security
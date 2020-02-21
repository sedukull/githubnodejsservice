# Example Application

RESTful Node js service for github organization comments API. Uses Node.js, Express and MongoDB.

## prerequisites

Mongodb has to be installed and configured: Ref database.config.json

## Setup Information

1. Install dependencies

```bash
npm install
```

2. Run the service

```bash
node app.js
```

You can browse the apis at <http://localhost:3000>


## Assumptions and additional Information
1. For POST /orgs/<org>/comments operation, the solution will validate the given org(case insensitive) against the github.
2. The input comment length is fixed at max 100 chars. This will help to constraint the comment payload against huge inputs. This validation is currently controlled through config setting.
3. For pagination of results, use query args viz., page and limit per page: EX: ?page=1&limit=1.
4. By default all comments are retrieved and not limited by a given number.
5. If we want to limit the number of comments to be retrieved for GET operation, mention as follows:
 GET /orgs/<org>/comments/<number_of_comments>
6. DEL /orgs/<org>/comments is a soft delete operation. It won't remove the comments from DB.

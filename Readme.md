# node js service for github org comments.

## RESTful Node js service for github organization comments API. Uses Node.js, Express and MongoDB.

## List of API's:

### GET /orgs/:org/comments
    -Retrieves the list of all comments against the given organization. It will only provide the comments which are not soft deleted.

### GET /orgs/:org/comments/:limit
    -Retrieves the comments for a given limited by the <limit>
 
### GET /orgs/:org/comments?limit=1&page=1
    -Helps in paginating the results.Retrieves the comments for a given org limited by input limit and paged through page numbers. Leverages the mongo limit and skip logic for server side pagination.
    
### POST /orgs/:org/comments
  - {'comment': <comment info>}
   Posts the comments against the given org.
 Validations:
   1. Validates whether the input org is empty and is available in the github org listing.
   2. If validated correctly for input org, persists the comment in mongodb.
   3. The comment size is limited to 100 characters. The input validation for comment, can be controleld through config setting. Refer /config/app.config.json.
  
  
### DELETE /orgs/:org/comments
- Deletes the comments against the given org. Its a soft delete operation. The comments are still available in DB for audit. 
 
 

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

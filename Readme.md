# Summary.
-- RESTful Node js service wrapper for github organization comments. 
-- API's to persist, retrieve comments for a given organization. 
-- Comments are persisted in mongodb.
-- Comments are still available post delete.
-- Uses Node.js, express and MongoDB.

## List of API's and use cases:

** GET /orgs/:org/comments **
   - Retrieves the list of all comments against the given github organization. 
   - Returns the comments which are not soft deleted. 
   - Returns all the comments for the given organization.
   - However, the number of comments to be returned can be configured by default. Please check app.config.json

** GET /orgs/:org/comments/:limit **
   - Retrieves the given number of comments for the given organization. 
   - Number of comments are limited by the <limit> request param.
 
** GET /orgs/:org/comments?limit=1&page=1 **
   - Returns the comments for a given org paginated with given page size.
   - Retrieves the comments for the given org.
   - Number of comments per page are limited by <limit> request param.
   - Leverages the mongo limit and skip logic for server side pagination.
    
** POST /orgs/:org/comments {'comment': <comment info>} **
   - Posts the comments against the given org.
   - Comments are persisted, only 1. if the input org is not empty and 2. Input org is available in the github org listing.
   - If validated correctly for input org, persists the comment in mongodb.
   - The input comment size is limited to 100 characters. 
   - The validation for comment size to 100 characters can be controleld through config setting. Refer /config/app.config.json.
  
  
** DELETE /orgs/:org/comments **
  - Deletes the comments against the given org. Its a soft delete operation. The comments are still available in MongoDB for audit. 
 

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

## Assumptions and additional Information
1. For POST /orgs/<org>/comments operation, the solution will validate the given org(case insensitive) against the github.
2. The input comment length is fixed at max 100 chars. This will help to constraint the comment payload against huge inputs. This validation is currently controlled through config setting.
3. For pagination of results, use query args viz., page and limit per page: EX: ?page=1&limit=1.
4. By default all comments are retrieved and not limited by a given number.
5. If we want to limit the number of comments to be retrieved for GET operation, mention as follows:
 GET /orgs/<org>/comments/<number_of_comments>
6. DEL /orgs/<org>/comments is a soft delete operation. It won't remove the comments from DB.

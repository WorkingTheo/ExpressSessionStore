To run this, first you need to:
  - Install postgresql
  - Set password as `abc` for user `postgres` 
  - Create database `express-store-test`
      - Create table `session`
          - [PK] `sid`: character varying, non-null
          - `sess`: json, non-null
          - `expire`: timestamp+timezone, length 6, non-null
  - Run  `node postgresql.js`

Once this is up and running, you can use Postman to query the endpoints. 

Read endpoint: `http://localhost:3000/test/read/:id` 
Write endpoint: `http://localhost:3000/test/write/:id` 

Id can be from 1 to 100, representing the 100 users found in `../users` folder (stored as JSON).


To run this, first you need to:
  - Install memcached:
      - Download the latest version of memcached server 
      - Extract folder 
      - Run cmd as admin, and navigate to the location of the extracted memcached.exe 
      - Run `memcached.exe -d install` 
      - Run `memcached.exe -d start` 
      - If done correctly, the server should be visible with task manager, under services tab
  - Navigate into this folder 
  - Run `node memcached.js` 

Once this is up and running, you can use Postman to query the endpoints. 

Read endpoint: `http://localhost:3000/test/read/:id` 
Write endpoint: `http://localhost:3000/test/write/:id` 

Id can be from 1 to 100, representing the 100 users found in `../users` folder (stored as JSON).


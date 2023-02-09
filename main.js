import express from 'express';
import session from 'express-session';

import genFunc from 'connect-memcached';

const app = express();

const MemcachedStore = genFunc(session);
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MemcachedStore({
    hosts: ["127.0.0.1:11211"],
    secret: "123, easy as ABC. ABC, easy as 123" // Optionally use transparent encryption for memcached session data
  })
}))

app.get("/", function(req, res, next) {
  console.log('here');
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
  }
  res.send("Viewed <strong>" + req.session.views + "</strong> times.");
  next();
});

app.listen(3000, function() {
  console.log("Listening on %d", this.address().port);
});
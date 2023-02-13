import express from 'express';
import session from 'express-session';

export default function createApp({
  sessionStore
}) { 
  const app = express();
  app.use(express.json());

  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  }));

  app.get('/test/read/:id', (req, res, next) => {
    const id = req.params.id;
    const response = { id, val: req.session[id] };
    res.send(JSON.stringify(response));
  });

  app.post('/test/write/:id', (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    req.session[id] = data;
    res.send('saved ' + id);
  });

  return app;
}
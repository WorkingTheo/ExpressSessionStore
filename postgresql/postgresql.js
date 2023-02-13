import session from 'express-session';

import genFunc from 'connect-pg-simple';

import createApp from '../app.js';

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: 'postgres://postgres:abc@localhost:5432/express-store-test',
});

const app = createApp({ sessionStore });
app.listen(3000, () => (console.log('running on port 3000')));
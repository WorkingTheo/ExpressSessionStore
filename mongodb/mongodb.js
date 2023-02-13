import session from 'express-session';

import MongoStore from 'connect-mongo';

import createApp from '../app.js';

const sessionStore = MongoStore.create({
  mongoUrl: 'mongodb://localhost:27017',
  dbName: 'express-store-test',
  collectionName: 'session',
});
const app = createApp({ sessionStore });
app.listen(3000, () => (console.log('running on port 3000')));
import session from 'express-session';

import genFunc from 'session-file-store';

import createApp from '../app.js';

const SessionFileStore = genFunc(session);
const sessionStore = new SessionFileStore();

const app = createApp({ sessionStore });
app.listen(3000, () => (console.log('running on port 3000')));
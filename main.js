import session from 'express-session';

import genFunc from 'connect-memcached';

import createApp from './app.js';

function testWithMemcached() {
  const MemcachedStore = genFunc(session);
  const sessionStore = new MemcachedStore({
    hosts: ["127.0.0.1:11211"],
    secret: "secret"
  });

  const app = createApp({ sessionStore });
  app.listen(3000, () => (console.log('running on port 3000')));
}

testWithMemcached();
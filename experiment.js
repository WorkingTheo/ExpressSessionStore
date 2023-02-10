import fetch from 'node-fetch';
import { Headers } from 'node-fetch';
import fs from 'fs';

function readUserJson(id, callback) {
  fs.readFile('./users/' + id + '.json', async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    await callback(data.toString());
  })
}

async function testReadAndWrite(id) {
  readUserJson(id, async (data) => {
    const res = await fetch('http://localhost:3000/test/write/' + id, {
      method: 'POST',
      body: JSON.parse(data),
      credentials: 'same-origin',
    });
    const setCookie = res.headers.get('set-cookie');
    const connectSid = setCookie.split(';')[0];
    console.log(setCookie);

    await testRead(id);
  });
}

async function testRead(id, cookie) {
  var myHeaders = new Headers();
  myHeaders.append('Cookie', cookie);
  console.log('reading');
  const res = await fetch('http://localhost:3000/test/read/' + id, {
    method: 'GET',
    headers: myHeaders,
    credentials: 'include',
  });
  const jsn = await res.json();
  console.log(jsn);
  return jsn;
}

async function poop() {
  testReadAndWrite(3);
}

poop();

// async function testWrite() {
//   const rawResponse = await fetch('localhost:3000/test/write/' + id, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({a: 1, b: 'Textual content'})
//   });
//   const content = await rawResponse.json();
// }
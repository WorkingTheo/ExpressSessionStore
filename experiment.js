import axios from 'axios';
import fs from 'fs';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
  headers: {
    "Connection": "keep-alive"
  }
});

function readUserData(id) {
  const path = './users/' + id + '.json';
  const user = fs.readFileSync(path).toString();
  const json = JSON.parse(user);
  return json;
}

function getCookie(response) {
  const headers = response.headers;
  const cookie = headers.get('set-cookie');

  // get connect.sid bit
  const sid = cookie[0].split(";")[0];
  return sid;
}

async function postUser(id, userData, sid) {
  const config = sid ? {headers: { Cookie: sid }} : undefined;
  const resp = await instance.post('/test/write/' + id, userData, config );
  return resp;
}

async function getUser(id, sid) {
  const resp = await instance.get('/test/read/' + id, {
    headers: { Cookie: sid }
  });
  return resp;
}

async function test() {
  var sid;
  for (let i = 0; i < 3; i++) {
    const userId = i + 1;
    const userData = readUserData(userId);
    const resp = await postUser(userId, userData, sid);

    if (!sid) {
      sid = getCookie(resp);
    }
  }

  for (let i = 0; i < 3; i++) {
    const userId = i + 1;
    const userData = await getUser(userId, sid);
  }
}

test();
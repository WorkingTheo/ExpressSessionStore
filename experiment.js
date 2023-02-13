import axios from 'axios';
import fs from 'fs';
import { performance } from 'perf_hooks';

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
  const config = sid ? { headers: { Cookie: sid } } : undefined;
  const resp = await instance.post('/test/write/' + id, userData, config);
  return resp;
}

async function updateUser(id, userData, sid) {
  const config = { headers: { Cookie: sid } };
  const resp = await instance.post('/test/update/' + id, userData, config);
  return resp;
}

async function getUser(id, sid) {
  const resp = await instance.get('/test/read/' + id, {
    headers: { Cookie: sid }
  });
  return resp;
}

async function postLoop(i, sid, times, sums) {
  const userId = i + 1;
  const userData = readUserData(userId);

  const start = performance.now();
  const resp = await postUser(userId, userData, sid.value);
  const end = performance.now();
  const diff = end - start;

  times[userId] = { post: diff };
  sums.sPost += diff;

  if (!sid.value) {
    sid.value = getCookie(resp);
  }
}

async function updateLoop(i, sid, times, sums) {
  const userId = i + 1;
  const userData = {
    email: "newemail@mail.com"
  };

  const start = performance.now();
  const resp = await updateUser(userId, userData, sid.value);
  const end = performance.now();
  const diff = end - start;

  times[userId].update = diff;
  sums.sUpdate += diff;
}

async function getLoop(i, sid, times, sums) {
  const userId = i + 1;

  const start = performance.now();
  const userData = await getUser(userId, sid.value);
  const end = performance.now();
  const diff = end - start;

  times[userId].get = diff;

  sums.sGet += diff;
}

async function test2() {
  var sid = {};
  var times = {};
  var sums = { sPost: 0, sGet: 0, sUpdate: 0 };

  const num = 100;

  for (let i = 0; i < num; i++) {
    await postLoop(i, sid, times, sums);
  }

  for (let i = 0; i < num; i++) {
    await updateLoop(i, sid, times, sums);
  }

  for (let i = 0; i < num; i++) {
    await getLoop(i, sid, times, sums);
  }

  console.log(times);
  const avgPost = sums.sPost / num;
  const avgGet = sums.sGet / num;
  const avgUpdate = sums.sUpdate / num;
  console.log({ avgPost, avgGet, avgUpdate });
}

test2();
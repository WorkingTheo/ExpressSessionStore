import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
app.use(express.json());

const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();
db.data ||= { posts: [
  {"id":1, "value": "hello world!"}
]};

const { posts } = db.data;

app.get('/posts/:id', async (req, res) => {
  const postId = req.params.id*1;
  const post = posts.find(p => p.id === postId);
  res.send(post);
})

app.post('/posts', async (req, res, next) => {
  const post = { "id": req.body.id*1, "value": req.body.value};
  console.log(post);

  posts.push(post);

  await db.write();
  res.send(post);
})

app.listen(3000, () => {
  console.log('listening on port 3000');
});
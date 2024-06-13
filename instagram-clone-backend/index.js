const express = require('express');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

let posts = [];

app.post('/upload', upload.single('photo'), (req, res) => {
  const description = req.body.description;
  const photo = req.file.filename;
  const newPost = {
    id: Date.now(),
    description,
    photo,
    likes: 0,
    comments: []
  };
  posts.push(newPost);
  io.emit('new-post', newPost);
  res.json({ success: true, post: newPost });
});

app.post('/like', (req, res) => {
  const { id } = req.body;
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes += 1;
    io.emit('update-post', post);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.post('/comment', (req, res) => {
  const { id, comment } = req.body;
  const post = posts.find(p => p.id === id);
  if (post) {
    post.comments.push(comment);
    io.emit('update-post', post);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

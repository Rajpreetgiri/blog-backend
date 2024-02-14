// src/index.ts
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const allRoutes = require("./src/routes/index")

const app = express();
const port = 4000;

app.use(cors({
  origin: 'https://blog-frontend-task.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware for parsing JSON
mongoose.connect(
  `mongodb+srv://demo:UOts5zRv5cdeJKLn@cluster0.jhgvb.mongodb.net/`,
  {

  },
).then(() => {
  console.log('Mongodb connected!');
}).catch((err) => console.log(err));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({
  extended: true,
}));


// Sample route
app.get('/api', (req, res) => {
  return res.send('Hello world');
});

app.use('/api', allRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

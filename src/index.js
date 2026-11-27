import 'dotenv/config';
console.log(`Hello ${process.env.DB_USER} from .env file!`);
import express from 'express';
import router from './api/main.js';
import requestTime from './middlewares/reqTime.js';
import {notFoundHandler, errorHandler} from './middlewares/errorHandler.js';
import cors from 'cors';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.static('public'));
//app.use('/public', express.static('public'));
app.use(requestTime);
// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', router);

// Default for all routes not handled by routers above
app.use(notFoundHandler);
// Add error handler middleware as the last middleware in the chain
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

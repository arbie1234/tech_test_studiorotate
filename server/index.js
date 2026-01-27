const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

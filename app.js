const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('express-async-errors');

const usersRouter = require('./routes/users.js');
const httpLogger = require('./utils/httpLogger.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.json({ message: "hello world!" });
});

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.error("err: ", err);
  res.status(500).send(err.message);
});

app.use('*', (req, res) => {
  res.status = 404;
  res.json({ error: 'NOT_FOUND', message: '유효하지 않은 요청입니다.' });
})

module.exports = app;
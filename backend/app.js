require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const { errors } = require('celebrate');
const router = require('./routes');
const corsMiddleware = require('./middlewares/cors');
const { reqLogger, errLogger } = require('./middlewares/loger');
const err = require('./middlewares/error');

const { PORT = 3000 } = process.env;
const app = express();

app.use(corsMiddleware);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(reqLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errLogger);

app.use(errors());
app.use(err);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

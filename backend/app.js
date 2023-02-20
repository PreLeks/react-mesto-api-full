require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const {
  signUp, signIn,
} = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { connectDb } = require('./db');

const { PORT = 3000 } = process.env;
const app = express();

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Started API service on port: ${PORT}`);
  });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

// подключаем логгер запросов
app.use(requestLogger);

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', signUp, createUser);
app.post('/signin', signIn, login);

app.use(auth);
// роуты, которым нужна авторизация
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// запрос к несуществующему роуту
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

connectDb()
  .on('error', console.log)
  .on('disconnect', connectDb)
  .once('open', startServer);

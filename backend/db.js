const mongoose = require('mongoose');
const { db } = require('./utils/configs');

module.exports.connectDb = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

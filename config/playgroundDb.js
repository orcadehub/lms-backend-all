const mongoose = require('mongoose');

let playgroundDb = null;

const getPlaygroundDb = () => {
  if (!playgroundDb) {
    playgroundDb = mongoose.connection.useDb('lms_playground');
  }
  return playgroundDb;
};

module.exports = { getPlaygroundDb };

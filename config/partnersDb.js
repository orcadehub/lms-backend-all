const mongoose = require('mongoose');

let partnersDb = null;

const getPartnersDb = () => {
  if (!partnersDb) {
    // This reuses the main connection but targets the 'partners' database
    partnersDb = mongoose.connection.useDb('partners');
  }
  return partnersDb;
};

module.exports = { getPartnersDb };

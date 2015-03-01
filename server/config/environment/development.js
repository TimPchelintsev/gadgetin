'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/gadgetinapp-dev'
    // uri: 'mongodb://gadgetin:gadgetin@ds053370.mongolab.com:53370/gadgetin-dev'
  },

  seedDB: true
};

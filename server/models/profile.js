const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the ProfileSchema model schema
const ProfileSchema = new mongoose.Schema({
  living_factors: {
    uid: {
        type: String,
        index: { unique: true }
      },
    type: [Number]
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);

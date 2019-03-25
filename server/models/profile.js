const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the ProfileSchema model schema
const ProfileSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        index: { unique: true }
    },
    living_factors: {
        type: [Number]
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);

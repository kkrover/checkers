/* eslint-disable no-use-before-define, func-names */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String,
          required: true,
          minlength: 2 },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Player', playerSchema);

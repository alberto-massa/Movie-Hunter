const validator = require('validator');

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid']
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [ validator.isEmail, 'Invalid email']
  },

  role: {
    type: String,
    enum: ['Admin', 'Mod', 'User'],
    default: 'User'
  },

  useravatar: {
    type: String,
    default: 'Image', //TODO
  },

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],

  favouriteMovies: {
    type: Array,
  },

  friends: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
},
{
  timestamps: true
});

const User = model("User", userSchema);

module.exports = User;
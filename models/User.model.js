const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid']
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid']
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
  }
});

const User = model("User", userSchema);

module.exports = User;
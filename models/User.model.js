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
    trim: true
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'is invalid']
  },

  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Mod', 'User'],
    default: 'User'
  },

  avatar: {
    type: String,
    default: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png',
  },

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],


  favouriteMovies: {
    type: Array,
  },

  friends: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  signUpDate: {
    type: Date,
    required: true,
    default: Date.now()
  }
},
{
  timestamps: true
});

const User = model("User", userSchema);

module.exports = User;
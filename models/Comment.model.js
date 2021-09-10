const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        min: 0,
        max: 10
    },

    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Comment = model("Comment", commentSchema);

module.exports = Comment;
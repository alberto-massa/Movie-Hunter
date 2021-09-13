const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    
    movieRef: {
        type: Number,

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
},
{
    timestamps: true
})

const Comment = model("Comment", commentSchema);

module.exports = Comment
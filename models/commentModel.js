const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post' 
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
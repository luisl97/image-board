const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    post_title: {
        type: String,
        required: true
    },
    post_description: {
        type: String
    },
    post_image: {
        type: String
    }
})

module.exports =  mongoose.model('Post', Post)
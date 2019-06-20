var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    });

var heroSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    comments: [commentSchema]
}, {
        timestamps: true
    });

var Heroes = mongoose.model('Hero', heroSchema);
module.exports = Heroes;
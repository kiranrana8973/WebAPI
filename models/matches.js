var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    hero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hero',
        required: true
    },
    villain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Villain',
        required: true
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Hero', 'Villain']
    }
}, {
        timestamps: true
    });

var Matches = mongoose.model('Match', matchSchema);
module.exports = Matches;
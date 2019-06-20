var express = require('express');
var Matches = require('../models/matches');

var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Matches.find({})
            .populate('hero', 'name')
            .populate('villain', 'name')
            .populate('winner')
            .then((matches) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(matches);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log(req.body);
        Matches.create(req.body)
            .then((match) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(match);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported!');
    });

router.route('/:id')
    .get((req, res, next) => {
        Matches.findById(req.params.id)
            .populate('hero')
            .populate('villain')
            .then((match) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(match);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    });

module.exports = router;
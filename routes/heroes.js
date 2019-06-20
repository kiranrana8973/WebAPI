var express = require('express');
var Heroes = require('../models/heroes');
var verify = require('../verify');
// var fs = require('fs');
var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Heroes.find({})
            .then((heroes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(heroes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Heroes.create(req.body)
            .then((hero) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hero);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported!');
    })
    .delete((req, res, next) => {
        Heroes.deleteMany({})
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('/:id')
    .get((req, res, next) => {
        Heroes.findById(req.params.id)
            .then((hero) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hero);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        Heroes.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((hero) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hero);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        // Heroes.findById(req.params.id)
        //     .then((hero) => {
        //         let path = './public/uploads/' + hero.image;
        //         fs.unlink(path, (err) => {
        //             if (err) console.log(err);
        //         })
        //         hero.delete()
        //             .then((reply) => {
        //                 res.statusCode = 200;
        //                 res.setHeader('Content-Type', 'application/json');
        //                 res.json(reply);
        //             })
        //     }).catch((err) => next(err));

        Heroes.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


router.route('/:id/comments')
    .get((req, res, next) => {
        Heroes.findById(req.params.id)
            .then((hero) => {
                if (hero != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(hero.comments);
                }
                else {
                    err = new Error('Hero ' + req.params.id + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Heroes.findById(req.params.id)
            .then((hero) => {
                if (hero != null) {
                    hero.comments.push(req.body);
                    hero.save()
                        .then((hero) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(hero);
                        }, (err) => next(err));
                } else {
                    err = new Error('Hero ' + req.params.id + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router;
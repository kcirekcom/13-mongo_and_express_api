'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Board = require('../model/board.js');
const Pin = require('../model/pin.js');
const createError = require('http-errors');
const debug = require('debug')('pin:pin-route');

const pinRouter = module.exports = new Router();

pinRouter.post('/api/board/:boardID/pin', jsonParser, function(req, res, next) {
  debug('POST: /api/board/:boardID/pin');

  Board.findByIdAndAddPin(req.params.boardID, req.body)
  .then(pin => res.json(pin))
  .catch(next);
});

pinRouter.get('/api/pin/:id', function(req, res, next) {
  debug('GET: /api/pin/:id');

  Pin.findById(req.params.id)
  .then(pin => res.json(pin))
  .catch(err => next(createError(404, err.message)));
});

pinRouter.put('/api/pin/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/pin/:id');

  req.body.timestamp = new Date();
  Pin.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(pin => res.json(pin))
  .catch(err => next(createError(404, err.message)));
});

pinRouter.delete('/api/pin/:id', function(req, res, next) {
  debug('DELETE: /api/pin/:id');

  Pin.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});

'use strict';

var User = require('./user.model');
var Comment = require('./comment').model;
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.getAll(function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.getOne(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.getOne(userId, function(err, user) {
    if (err) return next(err);
    res.json(200, user);
  });
};


// Creates a new user product.
exports.createUserProduct = function(req, res, next) {
  var userId = req.user._id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    user.products.unshift(req.body);
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.json(201, _.first(user.products));
    })
  });
};


// Updates user product.
exports.updateUserProduct = function(req, res, next) {
  var userId = req.user._id;
  var productId = req.params.productId;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    delete req.body.comments;  //NOTE: need to clarify this logic
    var product = user.products.id(productId);
    product = _.merge(product, req.body);
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.json(200, user.products.id(productId));
    })
  });
};


exports.createUserProductComment = function(req, res, next) {
  var userId = req.params.userId;
  var productId = req.params.productId;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    user.products.id(productId).comments.push(req.body);
    user.save(function(err) {
      if (err) return validationError(res, err);
      var comment = _.last(user.products.id(productId).comments);
      Comment.populate(comment, {path: 'author', select: '-salt -hashedPassword', model: 'User'}, function(err, comment) {
        if (err) return validationError(res, err);
        res.json(201, comment);
      })
    });
  });
}


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

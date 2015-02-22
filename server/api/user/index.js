'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var multer = require('multer');

var router = express.Router();

// router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', controller.show);
router.post('/', controller.create);
// router.get('/:id/products', auth.isAuthenticated(), controller.showUserProducts);
router.post('/me/products', auth.isAuthenticated(), controller.createUserProduct);
// router.get('/:id/wishes', auth.isAuthenticated(), controller.showUserWishes);
router.post('/:userId/products/:productId/comments', auth.isAuthenticated(), controller.createUserProductComment);

// router.post('/:id/avatar',[
router.post('/uploads',[
  multer({
    dest: './uploads/',
    limits: { files: 1 },
    rename: function (fieldname, filename) {
      return filename+Date.now();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
  }),
  function(req, res) {
    console.log(req.body) // form fields
    console.log(req.files) // form files
    res.status(204).end()
}]);

module.exports = router;

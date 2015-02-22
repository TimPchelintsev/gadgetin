'use strict';

var fs = require('fs');
var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var multer = require('multer');
var cloudinary = require('cloudinary');

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
router.put('/me/products/:productId', auth.isAuthenticated(), controller.updateUserProduct);
// router.get('/:id/wishes', auth.isAuthenticated(), controller.showUserWishes);
router.post('/:userId/products/:productId/comments', auth.isAuthenticated(), controller.createUserProductComment);

// router.post('/:id/avatar',[
router.post('/uploads',[
  auth.isAuthenticated(),
  multer({
    dest: './client/assets/uploads/',
    limits: { files: 1 },
    rename: function (fieldname, filename, req, res) {
      return filename+Date.now();
    },
    changeDest: function(dest, req, res) {
      dest += req.user.id;
      if (!fs.existsSync(dest)) fs.mkdirSync(dest);
      return dest;
    },
    onFileUploadStart: function (file, req, res) {
      console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file, req, res) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
      console.log(req.user.name);
      cloudinary.uploader.upload(file.path, function(result) {
        console.log(result)
        req.user.imageUrl = cloudinary.url(result.public_id,
          {width: 210, height: 210, crop: 'thumb', gravity: 'face', radius: 'max'});
        req.user.save(function(err) {
          if (err) return res.json(422, err);
        })
      });
    }
  }),
  function(req, res) {
    console.log(req.body) // form fields
    console.log(req.files) // form files
    res.status(204).end()

}]);

module.exports = router;

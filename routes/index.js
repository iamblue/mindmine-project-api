var express = require('express');
var router = express.Router();
var noteModel = require('./../models/note')
var photoModel = require('./../models/photo')
var routineModel = require('./../models/routine')
var staticModel = require('./../models/static')
var storyModel = require('./../models/story')
var textModel = require('./../models/text')
var videoModel = require('./../models/video')
var webModel = require('./../models/web')
var listModel = require('./../models/list')
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/list/:id', function(req, res) {
  // listModel.find({})
  res.render('index', { title: 'Express' });
});

router.post('/list', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/list/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/note/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/note', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/note/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/photo/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/photo', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/photo/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/routine/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/routing', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/routing/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/static/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/static', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/static/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/story/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/story', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/story/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/text', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/text/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/text/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/users/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/users', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/users/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/vedio/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/vedio', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/vedio/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/web/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/web', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.put('/web/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

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

router.get('/users/:userid/list/:id', function(req, res) {
  listModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.post('/users/:userid/list', function(req, res) {
  listModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      listModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.put('/users/:userid/list/:id', function(req, res) {
  var data = req.body.data;
  listModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.get('/users/:userid/note/:id', function(req, res) {
  noteModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.post('/users/:userid/note', function(req, res) {
  noteModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      noteModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.put('/users/:userid/note/:id', function(req, res) {
  var data = req.body.data;
  noteModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.get('/users/:userid/photo/:id', function(req, res) {
  photoModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.post('/users/:userid/photo', function(req, res) {
  photoModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      photoModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.put('/users/:userid/photo/:id', function(req, res) {
  var data = req.body.data;
  photoModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.get('/users/:userid/routine/:id', function(req, res) {
  routineModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.post('/users/:userid/routine', function(req, res) {
  routineModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      routineModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.put('/users/:userid/routine/:id', function(req, res) {
  var data = req.body.data;
  routineModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.get('/users/:userid/static/:id', function(req, res) {
  staticModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.post('/users/:userid/static', function(req, res) {
  staticModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      staticModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.put('/users/:userid/static/:id', function(req, res) {
  var data = req.body.data;
  staticModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.get('/users/:userid/story/:id', function(req, res) {
  storyModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.post('/users/:userid/story', function(req, res) {
  storyModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      storyModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.put('/users/:userid/story/:id', function(req, res) {
  var data = req.body.data;
  storyModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.post('/users/:userid/text', function(req, res) {
  textModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      textModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.get('/users/:userid/text/:id', function(req, res) {
  textModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.put('/users/:userid/text/:id', function(req, res) {
  var data = req.body.data;
  textModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.get('/users/:userid/vedio/:id', function(req, res) {
  vedioModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.post('/users/:userid/vedio', function(req, res) {
  vedioModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      vedioModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.put('/users/:userid/vedio/:id', function(req, res) {
  var data = req.body.data;
  vedioModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.get('/users/:userid/web/:id', function(req, res) {
  webModel
  .find({ where: {id : req.params.id} })
  .then(function(data){
    if(data == null){
      res.send(200, {data: null});
    }else{
      res.send(200, {data: data.data});
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(400, 'error')
  });
});

router.post('/users/:userid/web', function(req, res) {
  webModel
  .find({where: {userid: req.params.userid}})
  .then(function(data){
    if (data == null){
      var data = req.body.data;
      webModel
      .create({
        data: data,
        userid: req.params.userid
      }).then(function(data) {
        res.send(200, {id: data.dataValues.id});
      })
    }else{
      throw 'This user has own listframes.'
    }
  })
  .catch(function(err){
    res.send(400, err)
  });
});

router.put('/users/:userid/web/:id', function(req, res) {
  var data = req.body.data;
  webModel
  .update({data: data},{where:{id: req.params.id}})
  .then(function(data){
    res.send(200, 'success');
  })
  .catch(function(err){
    res.send(400, err)
  });
});

module.exports = router;

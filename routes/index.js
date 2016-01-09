var express = require('express');
var router = express.Router();

// models
var posts = require('../models/posts');
var users = require('../models/users');
var onlines = require('../models/onlines');
var friends = require('../models/friends');
var categories = require('../models/categories');
var topics = require('../models/topics');
var msgpools = require('../models/msgpools');
var albums = require('../models/albums');
var images = require('../models/images');

// controller

// var publicMsgPools = require('../models/publicMsgPools');
var checkFriendLists = require('../models/checkFriendLists');

// libs
var Promise = require('bluebird');
var awsSdk = require('aws-sdk');
var crypto = require('crypto');
var connectMultiparty = require('connect-multiparty')();
var fs = require('fs');

// configs
var s3Config = require('../s3');

function encodePassword(password) {
  var hmac = crypto.createHmac('sha512', 'yoyoyo');
  hmac.update(password);
  return hmac.digest('hex').substr(3)
}

//get all user's album
router.get('/users/:userId/albums', function(req, res, next) {

  return albums.findAll({
    where: {
      userId: req.params.userId,
      status: true,
    },
    attributes: ['id','name','description'],
  }).then(function(data) {
    return res.send(200, {data:data});
  }).catch(function(err) {
    return res.send(401, err);
  });

});

//edit album
router.put('/users/:userId/albums/:albumId', function(req, res, next) {

  return albums.update({
    name: req.body.name,
    description: req.body.description,
  },{
    where: {
      id: req.params.albumId,
    },
  }).then(function(data) {
    return res.send(200, 'success');
  }).catch(function(err) {
    return res.send(401, err);
  });

});

//delete album
router.delete('/users/:userId/albums/:albumId', function(req, res, next) {
  return albums.update({
    status: false,
  },{
    where: {
      id: req.params.albumId,
    },
  }).then(function(data) {
    return res.send(200, 'success');
  }).catch(function(err) {
    return res.send(401, err);
  });
});

// add new album
router.post('/users/:userId/albums', function(req, res, next) {
  return albums.create({
    name: req.body.name,
    userId: req.params.userId,
    status: true,
  }).then(function(data) {
    return res.send(200, {albumId: data.get('id')});
  }).catch(function(err) {
    return res.send(401, err);
  })
});

// get all images in this albums
router.get('/users/:userId/albums/:albumId/images', function(req, res, next) {
  return images.findAll({
    where: {
      albumId: req.params.albumId,
      status: true,
    },
    attributes: ['id', 'name', 'description', 'imageUrlId'],
  }).then(function(data) {
    return res.send(200, { data: data });
  });
});

// delete images
router.delete('/users/:userId/albums/:albumId/images/:imageId', function(req, res, next) {
  return images.update({
    status: false,
  },{
    where: {
      id: req.params.imageId,
    },
  }).then(function(data) {
    return res.send(200, 'success');
  }).catch(function(err) {
    return res.send(400, err);
  })
});

// edit images
router.put('/users/:userId/albums/:albumId/images/:imageId', function(req, res, next) {
  return images.update({
    name: req.body.name,
    description: req.body.description,
  },{
    where: {
      id: req.params.imageId,
    },
  }).then(function(data) {
    return res.send(200, 'success');
  }).catch(function(err) {
    return res.send(401, err);
  })
});

// upload image
router.post('/users/:userId/albums/:albumId/images', function(req, res, next) {
  s3 = new awsSdk.S3({
    credentials: {
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey
    },
    endpoint: s3Config.endpoint,
    signatureVersion: s3Config.signatureVersion,
    region: s3Config.region
  });

  var _now = new Date();
  var sArray = req.files.file.name.split(/(.jpg|.gif|.png|.jpeg)/);
  var _re = crypto.createHash('md5').update(sArray[0] + _now).digest("hex");
  _re = _re + sArray[1];

  fs.readFile('/' + req.files.file.path, function(_err, data){
    var params = {
      Bucket: 'mtk.linkit',
      Key: 'device/' + _re,
      Body: data,
      ACL: 'public-read'
    };

    s3.putObject(params, function(err, data){
      if (!err) {
        fs.unlink('/' + req.files.file.path, function(){
          if (err) {
            throw err;
          }
          return images.create({
            name: req.body.name,
            description: req.body.description,
            albumId: req.params.albumId,
            status: true,
            imageUrlId: _re,
          }).then(function(data) {
            return res.send(200, {
              imageId: data.get('id'),
              name: _re,
            });
          });
        });
      } else {
        res.send(400, err);
      }
    });
  });
});


// router

// 新增 topic
// 這個不用丟 msg pools
router.post('/topics', function(req, res, next) {
  var topicName = req.body.topicName;
  var status = true;

  return topics
  .find({
    where: {
      topicName: topicName,
      status: true,
    }
  })
  .then(function(data) {
    if (data === null) {
      return topics.create({
        topicName: topicName,
        status: status
      }).then(function(data) {
        return res.send(200, { topicId: data.id });
      }).catch(function(err) {
        return res.send(400, err);
      });
    } else {
      return res.send(400, 'This topic was used!')
    }
  })
  .catch(function(err) {
    return res.send(400, err);
  });
});

// 取得全部 topics 列表
router.get('/topics', function(req, res, next) {
  return topics.findAll({
    where:{
      status: true,
    },
    attributes: [ 'id', 'topicName' ]
  }).then(function(data) {
    if(data === null) {
      return res.send(200, { data: [] });
    } else {
      console.log(data);
      var tmp = []
      for (var i = data.length - 1; i >= 0; i--) {
        tmp.push({ topicId: data[i].get('id'), topicName: data[i].get('topicName') })
      };
      return res.send(200, {data: tmp})
    }
  });
});

// 更新 topic
router.put('/topics/:topicId', function(req, res, next) {
  var status = req.body.status;
  var topicName = req.body.topicName;

  return topics.update({
    status: status,
    topicName: topicName,
  }, {
    where: {
      id: req.params.topicId
    }
  }).then(function(data) {
    return res.send(200, 'success');
  }).catch(function(err) {
    return res.send(400, err);
  });

});

// 刪除 topic
router.delete('/topics/:topicId', function(req, res, next) {
  return topics.update({
    status: false,
  },{
    where: {
      id: req.params.topicId
    }
  }).then(function(data) {
    return res.send(200, 'success');
  }).catch(function(err) {
    return res.send(400, err);
  });
});

// 新增這個 topic 下的某一 category 列表
router.post('/topics/:topicId/categories', function(req, res, next) {
  if (!req.body.categoryName) {
    return res.send(400, 'Missing categoryName')
  }

  return topics.find({
    where:{
      id: req.params.topicId,
    }
  })
  .then(function(data) {
    if (data != null) {
      categories.create({
        topicId: req.params.topicId,
        categoryName: req.body.categoryName,
        status: true
      }).then(function(data) {
        return res.send(200, { categoryId: data.id, categoryName: data.categoryName });
      }).catch(function(err) {
        return res.send(400, err);
      });
    } else {
      if (!req.body.categoryName) {
        return res.send(400, 'This topic Id is not available.');
      }
    }
  });
});

// 取的這個 topics 下的所有 categories
router.get('/topics/:topicId/categories', function(req, res, next) {
  return categories.findAll({
    where: {
      topicId: req.params.topicId,
      status: true,
    },
    attributes: ['id', 'categoryName'],
  }).then(function(data) {
    if (data != null) {
      var tmp = [];
      for (var i = data.length - 1; i >= 0; i--) {
        tmp.push({ categoryId: data[i].get('id'), categoryName: data[i].get('categoryName') })
      };
      return res.send(200, { data: tmp });
    } else {
      return res.send(200, { data: [] });
    }
  }).catch(function(err) {
    return res.send(400, err);
  });
});

router.put('/topics/:topicId/categories/:categoryId', function(req, res, next) {
  if (!req.body.categoryName) {
    return res.send(400, 'Missing categoryName')
  }
  return categories.update({
    categoryName: req.body.categoryName
  }, {
    where: {
      topicId: req.params.topicId,
      id: req.params.categoryId
    }
  }).then(function(data) {
    return res.send(200, 'success');
  }).catch(function(err) {
    return res.send(400, err);
  });
});

router.delete('/topics/:topicId/categories/:categoryId', function(req, res, next) {
  return categories.update({
    status: false,
  }, {
    where: {
      topicId: req.params.topicId,
      id: req.params.categoryId
    }
  }).then(function(data) {
    return res.send(200, { data: 'success' });
  }).catch(function(err) {
    return res.send(400, err);
  });
});

//讀取這個類別的所有user 文章
router.get('/topics/:topicId/categories/:categoryId/all', function(req,res, next) {
  var categoryId = req.params.categoryId;
  return posts.findAll({
    order: 'createdAt DESC',
    where: {
      categoryId: categoryId,
      status: true
    }
  }).then(function(data) {
    return res.send(200, { data: data });
  }).catch(function(err) {
    return res.send(400, err);
  })
});

router.post('/signin', function(req, res, next) {
  return users.find({
    where: {
      email: req.body.email,
      password: encodePassword(req.body.password),
    },
  }).then(function(data) {
    console.log(data);
    if (data == null) {
      return res.send(401, 'Authorzation failed.')
    } else {
      return onlines.find({
        where: {
          userId: data.get('userId'),
        },
      }).then(function(_data) {

        // 去更改上線狀態
        if (_data != null) {
          onlines.update({
            status: true
          },{
            where: {
              userId: data.get('userId'),
            },
          });
        } else {
          onlines.create({
            userId: data.get('userId'),
            status: true,
          });
        }

        // 搜尋全部 msg pools 給這個 user
        console.log('==================')
        console.log(data.get('userId'))
        console.log('==================')

        return msgpools.findAll({
          where: {
            userId: data.get('userId'),
            status: true,
          },
        }).then(function(msgdata) {
          console.log(msgdata)
          var newData = []
          for (var i = msgdata.length - 1; i >= 0; i--) {
            var msg = JSON.parse(msgdata[i].content);
            var keys = [];
            Object.keys(msg).forEach(function(key) {
              console.log(key);
              if (key != 'msg') {
                keys.push(key);
              }
            });
            for (var i = keys.length - 1; i >= 0; i--) {
              var reg = '\$\{' + keys[i] + '\}'
              msg.msg = msg.msg.replace(reg, msg[keys[i]]);
            };
            console.log(msg.msg);
            newData.push({ content: msg.msg, status: true })
          };
          return res.send(200, { message: newData, userId: data.get('userId'), email: data.get('email') });
        });

      });
    }
  });
});

router.post('/signup', function(req, res, next) {
  users.find({
    where: {
      email: req.body.email,
    }
  }).then(function(data) {
    if (data == null) {
      return users.create({
        email: req.body.email,
        password: encodePassword(req.body.password),
        status: true,
      }).then(function(data) {
        users.update({
          userId: 100000000 + data.get('id')
        },{
          where: {
            email: req.body.email
          }
        }).then(function(data) {
          return res.send(200, 'success');
        });
      });
    } else {
      return res.send(200, 'This email had registed.')
    };
  });
});

//新增 user 的 topics
router.post('/users/:userId/topics', function(req, res, next) {
  var topicName = req.body.topicName;
  var categoryId = req.body.categoryId;
  topics.create({
    categoryId: req.body.categoryId,
    topicName:  req.body.topicName,
  }).then(function(data) {

    var msgPoolsContent = {
      msg: '${userid} send a message to you!',
      userid: sendInvitionUserId
    };

    msgpools.create({
      userId: req.params.userId,
      content: JSON.stringify({
        msg: 'You create a topic \' ${topicName} \' at ${categoryId}.',
        topicName: topicName,
        categoryId: categoryId,
      }),
      status: true,
    });

    res.send(200, 'success');
  }).catch(function(err) {
    res.send(400, err);
  });
});

// 這個user的所有朋友清單
router.get('/users/:userId/friends', function(req, res, next) {
  return friends.findAll({
    where: {
      userId: req.params.userId,
      status: true,
    },
    attributes: [ 'invitedUserId' ]
  }).then(function(data) {
    if (data != null) {
      tmpArr = [];
      userIds = [];

      for(var i = 0; i< data.length; i++) {
        tmpArr.push({userId: data[i].invitedUserId});
        userIds.push(data[i].invitedUserId);
      }

      return onlines.findAll({
        where: {
          userId: userIds,
        },
        attributes: [ 'userId', 'status' ]

      }).then(function(_data) {
        return res.send(200, { data: tmpArr });
      }).catch(function(err) {
        return res.send(400, err);
      });

    } else {
      return res.send(200, { data: [] });
    }
  }).catch(function(err) {
    return res.send(400, err);
  });
});

// 列出所有這個user的待審核清單
router.get('/users/:userId/checkfriends', function(req, res, next) {
  return checkFriendLists.findAll({
    where: {
      userId: req.params.userId,
      status: false,
    },
    attributes: [ 'sendInvitedUserId' ]
  }).then(function(data) {
    return res.send(200, {data: data});
  }).catch(function(err) {
    return res.send(400, err);
  });
});

// 發送交友邀請
router.post('/users/:userId/invite', function(req, res, next) {
  var beInviteduserId = req.body.userId;
  var sendInvitionUserId = req.params.userId;

  return checkFriendLists.find({
    where: {
      userId: beInviteduserId,
      sendInvitedUserId: sendInvitionUserId,
    }
  })
  .then(function(data) {
    if (data == null) {
      var msgPoolsContent = {
        msg: '${userId} send a message to you!',
        userId: sendInvitionUserId
      };

      msgpools.create({
        userId: beInviteduserId,
        content: JSON.stringify(msgPoolsContent),
        status: true,
      });

      return checkFriendLists.create({
        userId: beInviteduserId,
        sendInvitedUserId: sendInvitionUserId,
        status: false,
      }).then(function(data) {

        return res.send(200, "success");

      }).catch(function(err) {

        return res.send(400, err);

      });
    } else {

      return res.send(200, "you had send invitions!");

    }
  }).catch(function(err) {

    return res.send(400, err);

  });
});

//確認交友邀請
router.post('/users/:userId/invite/active', function(req, res, next) {
  var userId = req.params.userId;
  var sendInvitedUserId = req.body.userId;

  return checkFriendLists
  .update({
    status: true,
  },{
    where: {
      sendInvitedUserId: sendInvitedUserId,
      userId: userId,
    }
  })
  .then(function(data) {

    friends.create({
      userId: userId,
      invitedUserId: sendInvitedUserId,
      status: true,
    });

    friends.create({
      userId: sendInvitedUserId,
      invitedUserId: userId,
      status: true,
    });

    return res.send(200, 'success');
  })
  .catch(function(err) {
    console.log(err);
    return res.send(400, err)
  });
})

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/users/:userId/upload', connectMultiparty, function(req, res) {

  s3 = new awsSdk.S3({
    credentials: {
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey
    },
    endpoint: s3Config.endpoint,
    signatureVersion: s3Config.signatureVersion,
    region: s3Config.region
  });

  var _now = new Date();
  var sArray = req.files.file.name.split(/(.jpg|.gif|.png|.jpeg)/);
  var _re = crypto.createHash('md5').update(sArray[0] + _now).digest("hex");
  _re = _re + sArray[1];

  fs.readFile('/' + req.files.file.path, function(_err, data){
    var params = {
      Bucket: 'mtk.linkit',
      Key: 'device/' + _re,
      Body: data,
      ACL: 'public-read'
    };

    s3.putObject(params, function(err, data){
      if (!err) {
        fs.unlink('/' + req.files.file.path, function(){
          if (err) {
            throw err;
          }
          return res.send({
            name: _re
          });
        });
      } else {
        res.send(400, err);
      }
    });
  });

});

//獲取這 user 在這類別全部文章
router.get('/users/:userId/topics/:topicId/categories/:categoryId', function(req, res) {

  posts.findAll({
    where:{
      categoryId: req.params.categoryId,
      userId: req.params.userId,
      status: true
    },
    attributes:[
      'id',
      'rightContent',
      'rightContentConfig',
      'leftContent',
      'leftContentConfig',
      'createdAt',
      'updatedAt'
    ]
  }).then(function(data) {
    if (data != null){
      return res.send(200, { data: data, userId: req.params.userId });
    }
  });

});

//發新文章
router.post('/users/:userId/topics/:topicId/categories/:categoryId', function(req, res) {

  var rightContent = req.body.rightContent || '';
  var leftContent = req.body.leftContent || '';
  var rightContentConfig = req.body.rightContentConfig || '';
  var leftContentConfig = req.body.leftContentConfig || '';
  var categoryId = req.params.categoryId;
  var userId = req.params.userId;

  return posts.create({
    userId:              userId,
    categoryId:          categoryId,
    rightContent:        rightContent,
    leftContent:         leftContent,
    rightContentConfig:  rightContentConfig,
    leftContentConfig:   leftContentConfig,
    status:              true,
  }).then(function(data) {

    categories.find({
      where: {
        id: categoryId,
        status: true,
      },
      attributes:[ 'categoryName' ],
    }).then(function(categoryData) {
      console.log(categoryData);
      return msgpools.create({
        userId: req.params.userId,
        content: JSON.stringify({
          msg: 'You post a new article, under the ${categoryName} category.',
          categoryId: categoryId,
          categoryName: categoryData.get('categoryName'),
        }),
        status: true,
      });
    });

    return res.send(200, {
      postId: data.get('id'),
      userId: userId,
    });

  }).catch(function(err) {
    console.log(err);
    return res.send(400, err);
  });

});

//取得單篇文章
router.get('/users/:userId/topics/:topicId/categories/:categoryId/posts/:postId', function(req, res) {

  posts.find({
    where: {
      postId:     req.params.postId,
      categoryId: req.params.categoryId,
      status:     true
    },
    attributes: [
      'id',
      'userId',
      'rightContent',
      'rightContentConfig',
      'leftContent',
      'leftContentConfig',
      'createdAt',
      'updatedAt',
    ]
  }).then(function(data) {

    return res.send(200, data);

  }).catch(function(err) {

    return res.send(400, err);

  });

});

// 更新文章
router.put('/users/:userId/topics/:topicId/categories/:categoryId/posts/:postId', function(req, res) {

  var data = {};
  var leftContent = req.body.leftContent;
  var rightContent = req.body.rightContent;
  var leftContentConfig = req.body.leftContentConfig;
  var rightContentConfig = req.body.rightContentConfig;

  if (!req.params.postId) {
    return res.send(400, "Miss postId!")
  }

  if (leftContent) {
    data.leftContent = leftContent;
  }
  if (rightContent) {
    data.rightContent = rightContent;
  }
  if (leftContentConfig) {
    data.leftContentConfig = leftContentConfig;
  }
  if (rightContentConfig) {
    data.rightContentConfig = rightContentConfig;
  }

  posts.update(data, {
    where: {
      userId: req.params.userId,
      categoryId: req.params.categoryId,
      id: req.params.postId,
    }
  }).then(function(data) {

    return res.send(200, {
      status: 'success',
      postId: req.params.postId,
    });

  }).catch(function(err) {

    return res.send(400, err);

  });

});

//刪除文章
router.delete('/users/:userId/topics/:topicId/categories/:categoryId/posts/:postId', function(req, res) {

  posts.update({
    status: false
  }, {
    where: {
      categoryId: req.params.categoryId,
      userId: req.params.userId,
      id: req.params.postId,
    }
  }).then(function(data){

    return res.send(200, {
      status: 'success',
      postId: req.params.postId,
    });

  }).catch(function(err){

    return res.send(400, err);

  });

});

module.exports = router;

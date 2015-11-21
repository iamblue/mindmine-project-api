# mindmine-main-api

##  編輯相簿
* 方法: PUT
* url: http://127.0.0.1:3999/users/:userId/albums/:albumId
* body:
  {
    name: '1231231233',
    description: 'asdasdasdd',
  }

* response:
  'success'

* 舉例 example:
  userId : 10001

##  刪除相簿
* 方法: Delete
* url: http://127.0.0.1:3999/users/:userId/albums/:albumId

* response:
  'success'

* 舉例 example:
  userId : 10001

##  新增相簿
* 方法: POST
* url: http://127.0.0.1:3999/users/:userId/albums
* body:
  {
    name: '1231231233',
    description: 'qweqwqweqweqew',
  }

* response:
  {
    "albumId": 12313123,
  }

* 舉例 example:
  userId : 10001

##  編輯相簿
* 方法: PUT
* url: http://127.0.0.1:3999/users/:userId/albums
* body:
  {
    name: '1231231233',
    description: 'asdasdasdd',
  }

* response:
  'success'

* 舉例 example:
  userId : 10001

##  取得相簿相片列表
* 方法: GET
* url: http://127.0.0.1:3999/users/:userId/albums

* response:
  {
    "data": [],
  }

* 舉例 example:
  userId : 10001


##  編輯相片
* 方法: PUT
* url: http://127.0.0.1:3999/users/:userId/albums/:albumId/images/:imagesId
* body: {
    name: '1231231233',
    description: 'asdasdasdd',
  }
* response:
  'success'

* 舉例 example:
  userId : 10001

##  刪除相片
* 方法: DELETE
* url: http://127.0.0.1:3999/users/:userId/albums/:albumId/images/:imagesId

* response:
  'success'

* 舉例 example:
  userId : 10001

## 上傳圖片
* 方法: POST
* url: http://127.0.0.1:3999/users/:userId/albumId/:albumId/images

* response:
  {
    "id": "1"
    "name": "057ff7a9275e7d302c2ae2894d66354b.jpg",
  }

* 舉例 example:
  userId : 10001



## 獲取這個 user 的某一 category 內的文章列表

* 方法: GET
* url: http://127.0.0.1:3999/users/{userId}/topics/{topicId}/categories/{categoryId}
* response:
  {
    "data": [ // 文章列表
      {
        "id": 文章編號
        "rightContent": 右邊文章內容
        "leftContent": 左邊文章內容
        "createdAt": 新增文章時間
        "updatedAt": 更新文章時間
        "rightContentConfig": <- 先不管
        "leftContentConfig": <- 先不管
      },
      ... //  其他文章
    ]
    "userId": "10001"
  }

* 舉例 example:
  userId : 10001
  categoryId : 1
  則打: http://127.0.0.1:3999/users/10001/categories/1
  吐出:
    {"data":[{"id":"2","rightContent":"kerker123","rightContentConfig":"","leftContent":"qweqwe","leftContentConfig":"","createdAt":"2015-07-12T06:20:58.443Z","updatedAt":"2015-07-12T06:50:35.399Z"},{"id":"3","rightContent":"kerker123","rightContentConfig":"","leftContent":"qweqwe","leftContentConfig":"","createdAt":"2015-07-12T06:21:23.740Z","updatedAt":"2015-07-12T06:50:35.399Z"},{"id":"4","rightContent":"kerker123","rightContentConfig":"","leftContent":"qweqwe","leftContentConfig":"","createdAt":"2015-07-12T06:21:27.718Z","updatedAt":"2015-07-12T06:50:35.399Z"},{"id":"5","rightContent":"kerker123","rightContentConfig":"","leftContent":"qweqwe","leftContentConfig":"","createdAt":"2015-07-12T06:21:31.520Z","updatedAt":"2015-07-12T06:50:35.399Z"},{"id":"7","rightContent":"kerker123","rightContentConfig":"","leftContent":"qweqwe","leftContentConfig":"","createdAt":"2015-07-12T06:22:38.793Z","updatedAt":"2015-07-12T06:50:35.399Z"},{"id":"6","rightContent":"kerker1231232131","rightContentConfig":"","leftContent":"qweqwe","leftContentConfig":"","createdAt":"2015-07-12T06:21:59.988Z","updatedAt":"2015-07-12T06:52:16.558Z"}],"userId":"10001"}

## 編輯文章

* 方法: PUT
* url: http://127.0.0.1:3999/users/{userId}/topics/{topicId}/categories/{categoryId}/posts/{postId}
* response:
  {
    "status": "success",
    "postId": "6"
  }

* 舉例 example:
  userId : 10001
  categoryId: 1
  postsId: 6
  則打: http://127.0.0.1:3999/users/10001/categories/1/posts/6
  method: PUT

  response:
    {
      "status": "success",
      "postId": "6"
    }

## 刪除文章

* 方法: delete
* url: http://127.0.0.1:3999/users/{userId}/topics/{topicId}/categories/{categoryId}/posts/{postId}
* response:
  {
    "status": "success",
    "postId": "6"
  }

* 舉例 example:
  userId : 10001
  categoryId : 1
  postId: 6
  response:
    {
      "status": "success",
      "postId": "6"
    }

## 發表文章

* 方法: delete
* url: http://127.0.0.1:3999/users/{userId}/topics/{topicId}/categories/{categoryId}
* body:
  rightContent: JOSN format
  leftContent: JOSN format

* response:
  {
    "status": "success",
    "postId": "6"
  }
* 舉例 example:
  userId: 10001
  categoryId: 1
  url: http://127.0.0.1:3999/users/10001/categories/1
  response:
    {
      "postId": "9",
      "userId": "10001",
      "categoryId": "1"
    }
  此時就會新增好一筆 id 為 9 的文章


## 發送交友邀請

* 方法: post
* url: http://127.0.0.1:3999/users/{userId}/invite
* body:
  userId: 要發送邀請的userId

## 列出所有這個user的待審核清單

* 方法: get
* url: http://127.0.0.1:3999/users/{userId}/checkfriends

* example:

## 確認交友邀請
* 方法: post
* url: http://127.0.0.1:3999/users/{userId}/invite/active
* body:
  userId: 審核通過的userId

## 這個user的所有朋友清單

* 方法: get
* url: http://127.0.0.1:3999/users/{userId}/friends

## 取得所有 Topic List
* 方法: get
* url: http://127.0.0.1:3999/topics

* response:
{
  "data": [...]
}

## 新增 Topic List
* 方法: post
* url: http://127.0.0.1:3999/topics
* body:
  topicName: 主題名稱
* response:
{
  "topicId": "9"
}

## 更新某一 Topic List 內容
* 方法: put
* url: http://127.0.0.1:3999/topics/{ topicId }
* body:
  topicName: 主題名稱

## 刪除某一 Topic
* 方法: delete
* url: http://127.0.0.1:3999/topics/{ topicId }

## 新增這個 topic 下的某一 category 列表
* 方法: post
* url: http://127.0.0.1:3999/topics/{topicId}/categories
* response:
{
  categoryId: data.id,
  categoryName: data.categoryName
}

## 取得這個 topics 下的所有 categories
* 方法: get
* url: http://127.0.0.1:3999/topics/:topicId/categories
* response: {
    data: []
  }

## 編輯這個 topics 下的某一 categories
* 方法: put
* url: http://127.0.0.1:3999/topics/:topicId/categories/{categoryId}
* body: {
  categoryName:
}

## 刪除這個 topics 下的某一 category
* 方法: delete
* url: http://127.0.0.1:3999/topics/{topicId}/categories/{categoryId}

## 取得 category 全部 user 文章
* 方法: get
* url: http://127.0.0.1:3999/topics/{topicId}/categories/{categoryId}/all
* response: {
    data: []
  }

## 註冊一位 user
* 方法: post
* url: http://127.0.0.1:3999/signup
* body: {
  email: email
  password: user的密碼
}

## user 登入
* 方法: post
* url: http://127.0.0.1:3999/signin
* body: {
  email: email,
  password: user的密碼
}
* response: {
  message: 這個 user 的訊息 pools
  userId: 這個 user的 Id
  email: 這個 user 的 email
}


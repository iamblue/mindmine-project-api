
//為user id 為: 1001的人新增 listframe 的 data
$.ajax({
  method: "POST",
  url: "127.0.0.1:3999/users/1001/list",
  data: { data: "12313123123" }
})
.done(function( msg ) {
    alert( "listframe id: " + msg.id );
})
.fail(function(err) {
  alert( err );
})

//取得user id 為: 1001的人的 listframe id 為 10 的 data

$.ajax({
  method: "GET",
  url: "127.0.0.1:3999/users/1001/list/10"
})
.done(function( data ) {
    alert( "data: " + data.data );
})
.fail(function(err) {
  alert( err );
})

//更新user id 為: 1001 的人的 listframe id 為 10 的 data

$.ajax({
  method: "PUT",
  url: "127.0.0.1:3999/users/1001/list/10",
  data: {
    data: "123213123123129389012381"
  }
})
.done(function( data ) {
    alert(data);
})
.fail(function(err) {
  alert( err );
})

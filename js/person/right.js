//绑定删除操作
function bindUser(user_id,bike_id,userPhone,actionStatus) {
var form = new FormData();
form.append("time", "time_token()[0]");
form.append("token", "time_token()[1]");
form.append("user_id", user_id);
form.append("simno", bike_id);
form.append("user_phone", userPhone);
form.append("action", actionStatus);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://www.8gps8.cn:8011/bikePublic/api/site/addUserBike",
  "method": "POST",
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (res) {
  var res=JSON.parse(res);
  console.log(res);
  if(res.ret==0){
  	 if(res.data.result==1){
  	 	layer.msg("绑定成功");
  	 }else{
  	 	layer.msg("绑定失败");
  	 }
  }else{

  }
});
}
$(".bindPhone").click(function() {
    var user_id = getSession()[2];
    var actionStatus=$(this).attr("name");
    var bike_id=$(this).parent().parent().attr("bikeid");
    layer.prompt({ title: '请输入绑定手机号:', formType:0 }, function(userPhone, index) {
        layer.close(index);
        var user_phone = userPhone;

        console.log(user_id+"-"+bike_id+"-"+user_phone+"-"+actionStatus);
       bindUser(user_id,bike_id,user_phone,actionStatus);
    });

});
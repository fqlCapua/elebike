

function lock_string(str) {
    var newLocker;
    newLocker = hex_md5(str);
    return newLocker;
}
function time_token() {
    var timestamp, md_token, timeArr = [];
    timestamp = Date.parse(new Date()) / 1000;
    md_token = lock_string(timestamp);
    timeArr.push(timestamp);
    timeArr.push(md_token);
    return timeArr;
}



//绑定删除操作
function setUser(user_id,bike_id,userPhone,actionStatus) {
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
 
  if(res.ret==0){
  	 if(res.data.result==1){
  	 	layer.msg("操作成功");
  	 }else{
  	 	layer.msg("操作失败");
  	 }
  }else{
     requestStatus(res.ret);
  }
});
}

// function userInfoSession(){
//    var form = new FormData();
//     form.append("time", time_token()[0]);
//     form.append("token", time_token()[1]);
//     form.append("id",getSession[2]);

//     var settings = {
//         "async": false,
//         "crossDomain": true,
//         "url": "http://www.8gps8.cn:8011/bikePublic/api/user/userInfo",
//         "method": "POST",
//         "processData": false,
//         "contentType": false,
//         "mimeType": "multipart/form-data",
//         "data": form
//     }

//     $.ajax(settings).done(function(res) {
//        var res=JSON.parse(res);
//        console(res);
//        if(res.ret==0){
//         var  userInfo=res.data;
//          var ss=window.sessionStorage;
//          if(ss.getItem("io")){
//            ss.removeItem("io");
//           }
//          ss.setItem("io",JSON.stringify(userInfo));
//        }else{
//          requestStatus(res.ret);
//        }  
//     });


// }

// function refreshInfo(){
//  userInfoSession();
  

// }

 
//绑定手机号
$(".bindPhone").click(function() {
    var user_id = getSession()[2];
    var actionStatus=$(this).attr("name");
    var bike_id=$(this).parent().parent().attr("bikeid");
    layer.prompt({ title: '请输入绑定手机号:', formType:0 }, function(userPhone, index) {
        layer.close(index);
       
        console.log(user_id+"-"+bike_id+"-"+userPhone+"-"+actionStatus);
        setUser(user_id,bike_id,userPhone,"0");
       
        window.location.reload();
    });

});

//解除绑定
$(".releasePhone").click(function() {
    var user_id = getSession()[2];
    var actionStatus=$(this).attr("name");
    var bike_id=$(this).parent().parent().attr("bikeid");
    var phone=getSession()[1];
    if(phone!=""){
      layer.confirm("你确定要解除绑定么?",{
        btn:["是","否"]
      },function(){
         setUser(user_id,bike_id,phone,"1");
 
         
      } ,function(){
        
    })
    }else{
      layer.msg("这个车辆没有绑定用户");
    }
    

});

//管理员增加车辆
 $(".addbtn").click(function(){
  var user_id=getSession()[2];
  var phone=getSession()[1];
  layer.prompt({ title:'请输入电车编号', formType:0 }, function(num, index){
        layer.close(index);
        setUser(user_id,num,phone,"0");
           
    });
  });
    



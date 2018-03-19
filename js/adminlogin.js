
    /*
*user:Capua
*email:13523450460@sina.cn
*content:登录部分
*/ 
var ReqUrl = "http://47.104.94.216/api/public/";

function lock_string(str) {
    var newLocker;
    newLocker = hex_md5("my58_" + hex_md5("my58_" + str));
    return newLocker;
}
function time_token() {
    var timestamp,md_token,timeArr=[];
    timestamp=Date.parse(new Date())/1000;
    md_token=lock_string(timestamp);
    timeArr.push(timestamp);
    timeArr.push(md_token);
    return timeArr;
}
  var loginApp=angular.module("adminApp",[]);
     loginApp.controller("adCtr",function($scope,$http){
     	
          $scope.subLogin=function() {
          	console.log("111")
          	  // $.ajax({
          	  // 	url:  ReqUrl,
          	  // 	type: "POST",
          	  // 	data: {
             //       service:"App.User.Login",
             //       time:time_token()[0],
             //       token:time_token()[1],
             //       user_phone:$scope.username,
             //       user_password:$scope.userpwd
          	  // 	},
          	  // })
          	  // .done(function(res) {
          	  //    if(res.ret==200){
          	  //    	layer.msg("登录成功");
          	  //    	var ss=window.sessionStorage;
          	  //    	var JSONStr=JSON.stringify(res.data);
          	  //       	ss.setItem("io",JSONStr);
          	  //    	parent.$("#header").attr("src",parent.$("#header").attr("src"));
             //      parent.$("#main").attr("src","home.html");
          	  //    }else{
          	  //    	layer.msg(res.msg)
          	  //    }
          	  // })
          	  // .fail(function() {
          	  // 	console.log("error");
          	  // })
          	  // .always(function() {
          	  	
          	  // });
          	  

          }
     })
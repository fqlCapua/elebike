
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

function check_phone(Phone) {
    var flag;
    var reg = /^1[34578]\d{9}$/;
    if (Phone!="") {

        if (reg.test(Phone)) {
            flag = true;
        } else {
            flag = false;
            layer.tips("格式错误", ".phone", {
                tips: [1, "#4082D4"],
                tipsMore: true
            });
        }
    } else {

        flag = false;
        layer.tips("不能为空", ".phone", {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
    }

    return flag;
}

function Send_code() {
    var Code;
    var phone = $(".phone").val();
    if (phone != "") {
        var timeStamp = Date.parse(new Date) / 1000;
        var md_token = hex_md5("my58_" + hex_md5("my58_" + timeStamp));
        $.ajax({
                url: 'http://www.8gps8.cn:8011/bikePublic/api/user/getCode',
                type: 'POST',
                async: false,
                data: {
                    time: time_token()[0],
                    token: time_token()[1],
                    user_phone: phone
                },
            })
            .done(function(res) {
                if (res.ret == 200) {
                  layer.msg("验证码已发送");
                    Code = res.data.code;
                   
                } else {
                    layer.msg(res.msg);
                }


            })
            .fail(function(err) {

            })
            .always(function() {

            });
    } else {
       layer.tips("不能为空", ".phone", {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
    }

    return Code;
}

//检查验证码
function check_vCode() {
    var flag;
   if ($(".vCode").val() != "") {
        var phoneCode = $(".vCode").val();
        var phoneLocker = lock_string(phoneCode);
       // console.log("手机加密后:"+ phoneLocker);
       var pclocker=get_session();
         //console.log(pclocker)
        if (phoneLocker==pclocker){
            flag = true;

        }else {
            layer.tips("验证码错误", ".vCode", {
                tips: [1, "#4082D4"],
                tipsMore: true
            });
            flag = false;
        }
    } else {
        flag = false;
        layer.tips("不能为空", ".vCode", {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
    }

    return flag;
}
function set_session(sval) {
  var ss=window.sessionStorage;
  var val="zcxvbas%j%d%s%a%o%p%w%q%o%p%1%3%1%31%4%1%4%4%4%1&"+sval;
  ss.setItem("ylzxmmm",val);
}


function get_session(){
   var ss=window.sessionStorage;
   if(ss!=""){
      var code=ss.getItem("ylzxmmm").split("&")[1];
   }else{
     
   }
  return code;
}
//验证码

var count=10;
var curCount;
function  Noclick(){
  var phone=$(".phone").val();
   if(check_phone(phone)){
            //获取验证码函数
   // set_session(sval)
   curCount=count;
   $(".getCode").attr("disabled",true);
    $(".getCode").val(curCount+"s后重新发送");
    timer1=window.setInterval("remainTime()",1000);
}else{

}


}


function remainTime(){
   if(curCount==0){
    clearInterval(timer1);
     $(".getCode").val("免费获取验证码");
     $(".getCode").removeAttr('disabled');

}else{
    curCount--;
   $(".getCode").val(curCount + "s后重新发送");
}

function adminLogin(username,userpwd){
   $.ajax({
     url: '/path/to/file',
     type: 'default GET (Other values: POST)',
     dataType:'default: Intelligent Guess (Other values: xml, json, script, or html)',
     data: {param1: 'value1'},
   })
   .done(function(res) {
     console.log("success");
   })
   .fail(function(err) {
     console.log("error");
   })
   .always(function() {
     console.log("complete");
   });
   
}

/*
 *user:13523450460@sina.cn
 *date:2018/3/20
 *admin:Capua
 */
$(".adminLoginBtn").click(function(){
   adminLogin()
});
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
     })}

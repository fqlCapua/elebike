/*
 *user:Capua
 *email:13523450460@sina.cn
 *content:登录部分
 */


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

function check_phone(obj) {
    var flag;
    var reg = /^1[34578]\d{9}$/;
    var Phone=$(obj).val()
    if (Phone!= "") {

        if (reg.test(Phone)) {
            flag = true;
        } else {
            flag = false;
            layer.tips("格式错误", obj, {
                tips: [1, "#4082D4"],
                tipsMore: true
            });
        }
    } else {

        flag = false;
        layer.tips("不能为空", obj, {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
    }

    return flag;
}

function set_session(sval) {
    var ss = window.sessionStorage;
    var val = "zcxvbas%j%d%s%a%o%p%w%q%o%p%1%3%1%31%4%1%4%4%4%1&" + sval;
    ss.setItem("ylzxmmm", val);
}


function get_session() {
    var ss = window.sessionStorage;
    if (ss != "") {
        var code = ss.getItem("ylzxmmm").split("&")[1];
    } else {

    }
    return code;
}

function Send_code() {
    var Code;
    
     var phone = $(".phone1").val();
    if (phone!="") {
        var timeStamp = Date.parse(new Date) / 1000;
        var md_token = hex_md5("my58_" + hex_md5("my58_" + timeStamp));
        $.ajax({
                url: 'https://www.8gps8.cn:8011/bikePublic/api/user/getCode',
                type: 'POST',
                async: false,
                data: {
                    time: time_token()[0],
                    token: time_token()[1],
                    phone: phone
                },
            })
            .done(function(res) {
                if (res.ret == 0) {
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
/*
 *user:13523450460@sina.cn
 *date:2018/3/20
 *admin:Capua
 */
//检查验证码
function check_vCode() {
    var flag;
    if ($(".vCode").val() != "") {
        // var phoneCode = $(".vCode").val();
        // var phoneLocker = lock_string(phoneCode);
        // console.log("手机加密后:" + phoneLocker);
        // var pclocker = get_session();
        //  console.log(pclocker)
        // if (phoneLocker == pclocker) {
        flag = true;

        // } else {
        //     layer.tips("验证码错误", ".vCode", {
        //         tips: [1, "#4082D4"],
        //         tipsMore: true
        //     });
        //     flag = false;
        // }
    } else {
        flag = false;
        layer.tips("不能为空", ".vCode", {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
    }

    return flag;
}

//验证码

var count = 60;
var curCount;

function Noclick() {
    var phone = $(".phone1").val();
     
    if (check_phone(".phone1")) {
        var serviceCode = Send_code() //获取验证码函数
        //set_session(serviceCode);
        curCount = count;
        $(".getCode").attr("disabled", true);
        $(".getCode").val(curCount + "s后重新发送");
        timer1 = window.setInterval("remainTime()", 1000);
    } else {

    }


}
function Noclick1() {
    var phone = $(".phone3").val();
     
    if (check_phone(".phone3")) {
        var serviceCode = Send_code() //获取验证码函数
        //set_session(serviceCode);
        curCount = count;
        $(".getCode").attr("disabled", true);
        $(".getCode").val(curCount + "s后重新发送");
        timer1 = window.setInterval("remainTime()", 1000);
    } else {

    }


}

function remainTime() {
    if (curCount == 0) {
        clearInterval(timer1);
        $(".getCode").val("免费获取验证码");
        $(".getCode").removeAttr('disabled');

    } else {
        curCount--;
        $(".getCode").val(curCount + "s后重新发送");
    }

}

function userInfoSession(userid) {
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("id", userid);

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/user/userInfo",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
       
        var res=JSON.parse(res);
        var userInfo=res.data;
         var ss=window.sessionStorage;
        ss.setItem("io",JSON.stringify(userInfo));
     
    });
}

function subAdminForm() {
    var phone1 = $(".phone1").val();
    var phone2 = $(".phone2").val();
    if(phone1!=""){
        var phone=phone1;
    }else if(phone2!=""){
        var phone=phone2;
    }
    var vCode = $(".vCode").val();
    var pwd=$(".userpwd").val();
    var form = new FormData();
    form.append("time",time_token()[0]);
    form.append("token",time_token()[0]);
    form.append("phone", phone);
    form.append("code",vCode);
    form.append("password",pwd);
    form.append("auth", "1");

    var settings = {
        "async":false,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/user/userLogin",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
      var res=JSON.parse(res);
      console.log(res);
        if (res.ret == 0) {
            layer.msg("登录成功");
            var userid=res.data.user_id;
            userInfoSession(userid);
            window.location.href="main.html#/admin";
        } else {
            layer.msg("登录失败");
        }
    });


}

$(".adminLogin1").click(function() {

    var phone = $(".phone1").val();
    var vCode = $(".vCode").val();
    if(check_phone(".phone1")) {
        subAdminForm();
    } else {

    }
});
$(".adminLogin2").click(function() {

    var phone = $(".phone2").val();
    
    if(check_phone(".phone2")) {
        subAdminForm();
    } else {

    }
});

$(".pwdBox,.changePwdBox").hide();
$(".pwdLogin").click(function(){
    $("input[type=text]").val("");
    $(".vCodeBox").hide();
    $(".pwdBox").show();
});
$(".vCodeLogin").click(function(){
    $("input[type=text]").val("");
    $(".pwdBox").hide();
    $(".vCodeBox").show();
});
$(".forgotBtn").click(function() {
    $("input[type=text]").val("");
   $("form").hide();
   $(".changePwdBox").show();
});
$(".goLogin").click(function() {
    $("input[type=text]").val("");
   $("form").hide();
   $(".pwdBox").show();
});
function ptp() {
    var flag;
    var pwd1=$(".pwd1").val();
    var pwd2=$(".pwd2").val();
   if(pwd1==pwd2){
flag=true;
   }else{
     flag = false;
        layer.tips("两次输入不一致", ".pwd2", {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
   }
   return flag;
}
function changePwdFuc() {
    
    var phone= $(".phone3").val();
   
    var vCode = $(".pwd_vCode").val();
    var pwd=$(".pwd2").val();
    var form = new FormData();
    form.append("time",time_token()[0]);
    form.append("token",time_token()[0]);
    form.append("phone", phone);
    form.append("password",pwd);
     form.append("code",vCode);
     var settings = {
        "async":false,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/user/changePassword",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
      var res=JSON.parse(res);
        if (res.ret == 0) {
            layer.msg("设置成功");
            
        } else {
            layer.msg("设置失败");
        }
    });


};
$(".setPwd").click(function() {
  
    if(check_phone(".phone3")&&ptp()) {
        changePwdFuc();
    } else {

    }
});
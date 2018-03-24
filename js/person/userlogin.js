/*
 *user:Capua
 *email:13523450460@sina.cn
 *content:用户登录部分
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
    var Phone=$(obj).val();
    var flag;
    var reg = /^1[34578]\d{9}$/;
    if (Phone != "") {
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

function Send_code1(obj) {
    var Code;
    var phone = $(obj).val();
    if (phone != "") {
        var timeStamp = Date.parse(new Date) / 1000;
        var md_token = hex_md5(timeStamp);
        $.ajax({
                url: 'http://www.8gps8.cn:8011/bikePublic/api/user/getCode',
                type: 'POST',
                async: false,
                data: {
                    time: time_token()[0],
                    token: time_token()[1],
                    phone:phone
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
        layer.tips("不能为空", obj, {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
    }

    return Code;
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


/*
 *user:13523450460@sina.cn
 *date:2018/3/20
 *admin:Capua
 */
//检查验证码
function check_vCode1(obj) {
    var flag;
    if ($(obj).val()!= "") {
        flag = true;
    } else {
        flag = false;
        layer.tips("不能为空", obj, {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
    }

    return flag;
}
function userInfoSession(userid) {
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("id", userid);

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://www.8gps8.cn:8011/bikePublic/api/user/userInfo",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
        console.log(res);
        var res=JSON.parse(res);
        var userInfo=res.data;
         var ss=window.sessionStorage;
        ss.setItem("io",JSON.stringify(userInfo));
     
    });
}
function subLoginForm(phone,code) {
 
    var form = new FormData();
    form.append("time",time_token()[0]);
    form.append("token",time_token()[0]);
    form.append("phone", phone);
    //  form.append("truename", name);
    // form.append("id",id);
     form.append("code",code);
    form.append("auth", "0");

    var settings = {
        "async":false,
        "crossDomain": true,
        "url": "http://www.8gps8.cn:8011/bikePublic/api/user/userLogin",
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
          //  window.location.href="main.html#/user";
        } else {
            layer.msg("登录失败");
        }
    });


}






//注册

var count = 60;
var curCount;


function NoLoginclick() {
    var phone = $(".loginPhone").val();
    
    if (check_phone(".loginPhone")){
          Send_code1(".loginPhone");
        curCount=count;
        $(".getLogin").attr("disabled", true);
        $(".getLogin").val(curCount + "s后重新发送");
        timer1 = window.setInterval("remainTime()", 1000);
    } else {

    }


}


function remainTime() {
    if (curCount == 0) {
        clearInterval(timer1);
        $(".getLogin").val("免费获取验证码");
        $(".getLogin").removeAttr('disabled');

    } else {
        curCount--;
        $(".getLogin").val(curCount + "s后重新发送");
    }

}
$(".loginBtn").click(function() {
    var phone = $(".loginPhone").val();
    var vCode = $(".loginCode").val();
    if (check_phone(".loginPhone") && check_vCode1(".loginCode")) {
        subLoginForm(phone,vCode);
    } else {

    }
});
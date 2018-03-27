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

function check_phone(Phone) {
    var flag;
    var reg = /^1[34578]\d{9}$/;
    if (Phone != "") {

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
    var phone = $(".phone").val();
    if (phone != "") {
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
    var phone = $(".phone").val();
    if (check_phone(phone)) {
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
    var phone = $(".phone").val();
    var vCode = $(".vCode").val();
    var form = new FormData();
    form.append("time",time_token()[0]);
    form.append("token",time_token()[0]);
    form.append("phone", phone);
    form.append("code",vCode);
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

$(".adminLogin").click(function() {

    var phone = $(".phone").val();
    var vCode = $(".vCode").val();
    if (check_phone(phone) && check_vCode()) {
        subAdminForm();
    } else {

    }
});
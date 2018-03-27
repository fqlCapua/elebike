function reinitIframe(obj) {
    var iframe = document.getElementById(obj);

    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;

        var height = Math.max(bHeight, dHeight);
        iframe.height = height;
    } catch (e) {}
}
// window.setInterval("reinitIframe('footer')", 100);

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

//发送验证码
function Send_code(){
    var Code;
    var phone = $(".redPhone").val();
    if (phone != "") {
        
        $.ajax({
                url: 'https://www.8gps8.cn/bikePublic/api/user',
                type: 'POST',
                async: false,
                data: {
                    time: time_token()[0],
                    token:time_token()[1],
                    user_phone: phone
                },
            })
            .done(function(res) {
                if (res.ret ==0) {
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
var count=60;
var curCount;//当前时间

function forbidenBtn() {
    curCount=count;
    Send_code();
    $(".getRegCode").attr("disabled",true);
     $(".getRegCode").val(curCount+"s后重新发送");
    timer = window.setInterval("remainTime()",1000);

}

function remainTime(){
    if(curCount==0){
        clearInterval(timer);
        $(".getRegCode").val("获取验证码");
        $(".getRegCode").removeAttr('disabled');
    }else{
        curCount--;
      
        $(".getRegCode").val(curCount + "s后重新发送");
    }
}
$(".getRegCode").click(function() {
    forbidenBtn();
});


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
    var Phone = $(obj).val();
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

function check_code(obj) {
    var code = $(obj).val();
    var flag;
    if (code != "") {

    } else {
        flag = false;
        layer.tips("不能为空", obj, {
            tips: [1, "#4082D4"],
            tipsMore: true
        });
    }

    return flag;
}
//绑定删除操作
function setUser(user_id, bike_id, userPhone, actionStatus) {
    var index = layer.load(1, {
        shade: [0.1, '#000']
    });
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);
    form.append("vehicle_id", bike_id);
    form.append("user_phone", userPhone);
    form.append("action", actionStatus);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/addUserBike",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
            if (res.ret == 0) {
                if (res.data.result == 1) {
                    layer.msg("操作成功");
                } else {
                    layer.msg("操作失败");
                }
            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("绑定失败");
            console.log("error");
        })
        .always(function() {
            layer.close(index);
        });

}



//绑定手机号
$(".addbtn").click(function() {

    var user_id = getSession()[2];
    var simno = $(".addsimno").val();
    var phone = $(".addphone").val();


    if (simno != "" && phone != "") {
        setUser(user_id, simno, phone, "0");
    } else {
        layer.msg("请完善信息！");
    }

});

//解除绑定
$(".delbtn").click(function() {
    var user_id = getSession()[2];
    var simno = $(".delsimno").val();
    var phone = $(".delphone").val();
    if (simno != "" && phone != "") {
        layer.confirm("你确定要解除绑定么?", {
            btn: ["是", "否"]
        }, function() {
            setUser(user_id, simno, phone, "1");
        }, function() {

        })
    }
});
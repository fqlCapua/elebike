function loadAType(url, obj) {
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {

            var res = JSON.parse(res);

            if (res.ret == 0) {
                var list = res.data;
                $.each(list, function(index, el) {
                    var option = $("<option title='" + el.id + "'>" + el.name + "</option>");
                    $(obj).append(option);
                });

            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            console.log("error");
        })
        .always(function() {

        });
}


function loadAllType(url, obj) {
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {

            var res = JSON.parse(res);

            if (res.ret == 0) {
                var list = res.data;
                $.each(list, function(index, el) {
                    var option = $("<option title='" + el.name + "'>" + el.id + "</option>");
                    $(obj).append(option);
                });

            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            console.log("error");
        })
        .always(function() {

        });
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
}

function check_code(obj) {
    var code = $(obj).val();
    var flag;

    if (code != "") {
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

$(function() {
    if (getSession()[4] != 1) {
        $(".addFirm,addFirmBox").hide();
    }
})
/*
 *email:13523450460@sina.cn 
 *name:capua
 *date:2018/3/28
 *part:设置用户类型
 */


/*获取隶属公司信息*/
function getCompany(usertype) {
    var opnum;
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);
    form.append("user_type", usertype);
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/getCompany",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
            $(".type_ownerid").empty();
            var res = JSON.parse(res);


            if (res.ret == 0) {
                var list = res.data;
                opnum = list.length;

                // $(".type_ownerid").append($("<option>请选择</option>"));
                $.each(list, function(index, el) {
                    var option = $("<option name='" + el.id + "'>" + el.name + "</option>");
                    $(".type_ownerid").append(option);
                });
            } else {
                requestStatus(res.ret);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {

        });
    return opnum;
}

function setType(a, b, c, d) {

    var index = layer.load(1, {
        shade: [0.1, '#000']
    });
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("manager_id", a);
    form.append("user_id", b);
    form.append("owner_id", c);
    form.append("user_type", d);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/setUserType",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
            layer.close(index);
            var res = JSON.parse(res);

            if (res.ret == 0) {
                layer.msg("设置成功");
            } else {
                requestStatus(res.ret);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            layer.close(index);
        });
};
$(".type_type").change(function(event) {
    var user_type = $(".type_type").children('option:selected').attr("name");

    var opnum1 = getCompany(user_type);

    // $(".type_ownerid").children('option').eq(0).attr("selected",true);
    if (opnum1 == 0) {
        $(".type_ownerid").parent().parent().parent().hide();
    } else {
        $(".type_ownerid").parent().parent().parent().show();
    }


});
$(".usertypeBtn").click(function() {
    var manager_id = getSession()[2];
    var user_id = $(".type_userid").val();

    var user_type = $(".type_type").children('option:selected').attr("name");
    var owner_id = $(".type_ownerid").children('option:selected').attr("name");

    if (owner_id == undefined) {
        var owner_id = "";

    } else {

    }
    //console.log(manager_id+"-"+owner_id+"-"+user_id+"-"+user_type);
    if (user_id != "") {

        setType(manager_id, user_id, owner_id, user_type);
    } else {
        layer.msg("完善信息");
    }
});



/*
 *email:13523450460@sina.cn 
 *name:capua
 *date:2018/3/28
 *part:添加车辆
 */

$(function() {
    var owner_id = getSession()[5]
    $(".ad_host").val(owner_id);
})

function addBike(a, b) {
    var index = layer.load(1, {
        shade: [0.1, '#000']
    });
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", a);
    form.append("info", b);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/addBike",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
            layer.close(index);
            var res = JSON.parse(res);
            if (res.ret == 0) {
                layer.msg("添加车辆成功");
            } else {
                requestStatus(res.ret);
            }
        })
        .fail(function() {
            console.log("error");
            layer.msg("添加失败");
        })
        .always(function() {
            layer.close(index);
        });
}




$(".ad_btn").click(function() {

    var Info = $(".addbikeForm").serializeArray();
    var user_id = getSession()[2];
    var Inf = "[{";
    $.each(Info, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}]").split(",}]")[0] + "}]";

    if ($(".ad_id").val() != "") {

        //  console.log(Infos);
        addBike(user_id, Infos);
    } else {

    }


});
/*
 *email:13523450460@sina.cn
 *name:capua
 *date:2018/3/28
 *part:添加分销商行/添加用户
 */

function addUser() {

    var user_id = getSession()[2];
    var user_type = getSession()[4];
    var phone = $(".ct_phone").val();
    var truename = $(".ct_uname").val();
    var id = $(".ct_uid").val();
    var type = $(".ct_utype").children("option:selected").attr("name");


    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);
    form.append("user_type", user_type);
    form.append("phone", phone);
    form.append("truename", truename);
    form.append("id", id);
    form.append("type", type);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/addUser",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
            if (res.ret == 0) {
                layer.msg("添加成功");
                $("input[type=text]").val("");

            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            console.log("error");
        })
        .always(function() {

        });
}


$(".ct_submit").click(function() {

    if (check_code(".ct_phone") && check_code(".ct_uname") && check_code(".ct_uid")) {
        addUser();

    }


});



//车辆列表

function returnBikeStr(JSON) {
    var str = "<td class='bike_id'><ul class='bike_idul'>";
    $.each(JSON, function(index, el) {
        str += "<li>" + el.vehicle_id + "</li>";
    });
    str += "</ul></td>";
    return str;
}

function returnBikeBtn(JSON) {
    var str = "<td><ul>";
    $.each(JSON, function(index, el) {
        str += "<li class='text-primary bike_detailBtn'>详情 </li>";
    });
    str += "</ul></td>";

    return str;
}
//返回选中车辆
function getcheckedBike() {
    var checkArr = new Array();
    var trs = $('.bikeList_cont tr .uncheckedbox_bike');

    $.each(trs, function(index, el) {
        if ($(el).is(":checked")) {
            var bike_id = $(el).parent().siblings('.bike_user_id').html();
            checkArr.push(Number(bike_id));
        } else {

        }
    });
    //.join(',')
    return checkArr;
}
//移库给经销商
function sendToDelaer(duid, vids) {

    var user_id = getSession()[2];
  


    $.ajax({
            "url": "https://www.8gps8.cn:8011/bikePublic/api/factory/assign/vehicle",
            "method": "POST",
            "data": {
                time: time_token()[0],
                token: time_token()[1],
                fuid: user_id,
                did: duid,
                vids: vids
            }
        })
        .done(function(res) {
            //var res = JSON.parse(res);
                if (res.ret == 0) {
               
                layer.msg("移库成功");
            window.location.reload();
            } else {
                requestStatus(res.ret);
            }
        })
        .fail(function() {
             layer.msg("移库失败");
        })
        .always(function() {
            console.log("complete");
        });

};



$(".Allchecked").click(function() {

    var xxx = document.getElementsByName("bikdck");

    var obj = document.getElementsByClassName('Allchecked')[0];
    if (obj.checked) {
        for (var i = 0; i < xxx.length; i++) {
            xxx[i].checked = true;
        }
    } else {
        for (var i = 0; i < xxx.length; i++) {
            xxx[i].checked = false;
        }
    }



});


$(function() {
    loadAType("https://www.8gps8.cn:8011/bikePublic/api/site/getDealerList", ".deaderchecked");
})
$(".sendTodealer").click(function(event) {
    var duid = $(".deaderchecked").children('option:selected').attr("title");
    var vids = JSON.stringify(getcheckedBike());
    console.log(duid + "/" + vids);
    sendToDelaer(duid, vids)
});

function getBikelist() {

    var user_id = getSession()[2];

    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/bike/getBikeList",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);

            if (res.ret == 0) {

                if (res.data.length == 0) {
                    layer.msg("数据为空");
                } else {
                    var bikelist = res.data;
                    $.each(bikelist, function(index, el) {
                        if (el.dealer != '') {
                            var tr = $("<tr><td class='checkedbox_bike text-success'>已移库</td><td class='bike_user_id'>" + el.vehicle_id + "</td><td>" + el.brand + "</td><td>" + el.version + "</td><td>" + el.delegater + "</td><td class='bike_dealer'>" + el.dealer + "</td><td>" + el.firm + "</td><td>" + el.investor + "</td><td>" + el.inNetDate + "</td><td>" + el.saleDate + "</td><td>" + el.maintenance + "</td><td>" + el.sale_status + "</td><td>" + el.bike_user_id + "</td><td>" + el.bike_user_name + "</td><td><a class='check_traval'>查看轨迹</a></td></tr>");
                        } else {
                            var tr = $("<tr><td ><input class='uncheckedbox_bike' name='bikdck'  type='checkbox'/></td><td class='bike_user_id'>" + el.vehicle_id + "</td><td>" + el.brand + "</td><td>" + el.version + "</td><td>" + el.delegater + "</td><td class='bike_dealer'>" + el.dealer + "</td><td>" + el.firm + "</td><td>" + el.investor + "</td><td>" + el.inNetDate + "</td><td>" + el.saleDate + "</td><td>" + el.maintenance + "</td><td>" + el.sale_status + "</td><td>" + el.bike_user_id + "</td><td>" + el.bike_user_name + "</td><td><a class='check_traval'>查看轨迹</a></td></tr>");
                        }
                        $(".bikeList_cont").append(tr);

                    });
                    $(".tablelist").trigger("update");

                }


            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("请求失败");
        })
        .always(function() {

        });
};

//车辆详情
function getBikeDetail(bikeid) {


    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("vehicle_id", bikeid);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/bike/bikeDetail",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);

            if (res.ret == 0) {
                var bikeInfo = res.data;
                var cont = "<ul   style='padding:30px 20px;letter-spacing:1px;color:blue;'><li>电车ID:" + bikeInfo.vehicle_id + "</li><li>电车电量:" + bikeInfo.battery + ";</li><li>电车电压:" + bikeInfo.voltage + ";</li><li>电车寿命:" + bikeInfo.remain + ";</li><li>车辆状态:(1开,0关)" + bikeInfo.lock_status + ";</li><li>累计骑行公里数:" + (bikeInfo.distance).toFixed(2) + ";</li><li>预计需要支付的金额:" + bikeInfo.cost + ";</li><li>满电续航里程:" + bikeInfo.full_power_distance + ";</li></ul>";
                layer.open({
                    type: 1,
                    title: '车辆实时详情',
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '440px'], //宽高
                    content: cont
                });
            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("请求失败");
        })
        .always(function() {

        });
};
$(".bikeList_cont").on('click', '.bike_detailBtn', function() {
    var index = $(this).index();

    var bikeid = $(this).parent().parent().siblings(".bike_id").children().children().eq(index).html();

    getBikeDetail(bikeid);
});

//投资商收益报表

function returnBikearrStr(Str) {
    var JSONstr = JSON.parse(Str);
    var strObj = "<table style='margin:10px;width:100%;' class='bike_Info tablelist' border='0'><tr><th>电车ID</th><th>电车品牌:</th><th>充电桩ID:</th><th>充电桩品牌:</th>";
    $.each(JSONstr, function(index, el) {

        strObj += "</tr><tr><td>" + el.vehicle_id + "</td><td>" + el.bike_brand + "</td><td> " + el.pile_id + "</td><td>" + el.pile_position + "</td></tr>";
    });
    strObj += "</table>";
    return strObj;
}

function investorReportList() {
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/investorReport",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);


            if (res.ret == 0) {
                if (res.data[0].length == 0) {
                    layer.msg("数据为空");
                } else {
                    var investorList = res.data;
                    $.each(investorList, function(index, el) {
                        var investor = $("<tr><td>" + el.investor_id + "</td><td> " + el.investor_name + "</td><td> " + el.investor_address + "</td><td> " + el.phone + "</td><td> " + el.bank_name + "</td><td> " + el.bank_account + "</td><td> " + el.weixin_id + "</td><td> " + el.alipay_id + "</td><td name='" + JSON.stringify(el.bike_list) + "' class='checkBikeInfo'><a href='#' style='color:blue;'>查看列表</a></td><td>" + el.investor_number + "</td><td>" + el.bonus_id + "</td><td>" + el.bonus_ration + "</td></tr>");
                        $(".investor_cont").append(investor);
                    });
                }


            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("请求失败");
        })
        .always(function() {

        });
}
$(".investor_cont").on('click', '.checkBikeInfo', function() {
    var Bikestr = $(this).attr('name');
    var Str = returnBikearrStr(Bikestr);
    layer.open({
        type: 1,
        title: '车辆列表',

        skin: 'layui-layer-lan',
        area: ['80%', '640px'],
        offset: ['50px', '10%'], //宽高
        content: Str
    });
})
//经销商销售报表
function returnAgent_repairStr(Str) {
    var JSONstr = JSON.parse(Str);
    var strObj = "<table style='margin:10px;width:100%;' class='bike_Info tablelist' border='0'><tr><th>维保站ID</th><th>维保站名称</th></tr>";
    $.each(JSONstr, function(index, el) {

        strObj += "<tr><td>" + el.repairer_id + "</td><td>" + el.repairer_name + "</td></tr>";
    });
    strObj += "</table>";
    return strObj;
}

function returnAgent_invetorStr(Str) {
    var JSONstr = JSON.parse(Str);
    var strObj = "<table style='margin:10px;width:100%;' class='bike_Info tablelist' border='0'><tr><th>投资商ID</th><th>投资商名称</th></tr>";
    $.each(JSONstr, function(index, el) {

        strObj += "<tr><td>" + el.investor_id + "</td><td>" + el.investor_name + "</td></tr>";
    });
    strObj += "</table>";
    return strObj;
}

function agentReportList() {
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/agentReport",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);


            if (res.ret == 0) {
                if (res.data[0].length == 0) {
                    layer.msg("数据为空");
                } else {
                    var investorList = res.data;
                    $.each(investorList, function(index, el) {
                        var agent = $("<tr><td>" + el.agent_id + "</td><td> " + el.agent_name + "</td><td> " + el.agent_brand + "</td><td> " + el.bank_name + "</td><td> " + el.alipay_id + "</td><td> " + el.weixin_id + "</td><td> " + el.agent_leader + "</td><td>" + el.agent_address + "</td><td>" + el.service_phone + "</td><td>" + el.bank_account + "</td><td name='" + JSON.stringify(el.investor_list) + "' class='investor_list_btn'><a href='#' style='color:blue;'>查看列表</a></td><td name='" + JSON.stringify(el.repairer_list) + "' class='repairer_list_btn'><a href='#' style='color:blue;'>查看列表</a></td></tr>");
                        $(".agentReport_cont").append(agent);
                    });
                }


            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("请求失败");
        })
        .always(function() {

        });
}
$(".agentReport_cont").on('click', '.repairer_list_btn', function() {
    var Bikestr = $(this).attr('name');
    var Str = returnAgent_repairStr(Bikestr);
    layer.open({
        type: 1,
        title: '维保站列表',
        skin: 'layui-layer-lan',
        area: ['80%', '640px'],

        offset: ['50px', '10%'], //宽高
        content: Str
    });
})

$(".agentReport_cont").on('click', '.investor_list_btn', function() {
    var Bikestr = $(this).attr('name');
    var Str = returnAgent_invetorStr(Bikestr);
    layer.open({
        type: 1,
        title: '投资商列表',
        skin: 'layui-layer-lan',
        area: ['80%', '640px'],
        offset: ['50px', '10%'], //宽高
        content: Str
    });
})
//维保站维修报表

function returnAgent_repairRecordStr(Str) {
    var JSONstr = JSON.parse(Str);
    var strObj = "<table style='margin:10px;width:100%;' class='bike_Info tablelist' border='0'><tr><th>维修人员ID</th><th>维修人员名称</th><th>电车ID</th><th>维修描述</th><th>维修时间</th></tr>";
    $.each(JSONstr, function(index, el) {

        strObj += "<tr><td>" + el.worker_id + "</td><td>" + el.worker_name + "</td><td>" + el.vehicle_id + "</td><td>" + el.repair_desc + "</td><td>" + el.repair_time + "</td></tr>";
    });
    strObj += "</table>";
    return strObj;
}

function repairerReportList() {
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/repairerReport",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);


            if (res.ret == 0) {
                if (res.data[0].length == 0) {
                    layer.msg("数据为空");
                } else {
                    var repairerList = res.data;
                    $.each(repairerList, function(index, el) {
                        var repairer = $("<tr><td>" + el.repairer_id + "</td><td> " + el.repairer_name + "</td><td> " + el.repairer_address + "</td><td> " + el.repairer_position + "</td><td> " + el.repairer_brand + "</td><td> " + el.repairer_leader + "</td><td> " + el.repairer_phone + "</td><td>" + el.repairer_operate + "</td><td name='" + JSON.stringify(el.repairer_record) + "' class='repairer_record_btn'><a href='#' style='color:blue;'>维修列表</a></td></tr>");
                        $(".repairer_cont").append(repairer);
                    });
                }


            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("请求失败");
        })
        .always(function() {

        });
}
$(".repairer_cont").on('click', '.repairer_record_btn', function() {
    var repairer_record = $(this).attr('name');
    var Str = returnAgent_repairRecordStr(repairer_record);
    layer.open({
        type: 1,
        title: '维保站列表',
        skin: 'layui-layer-lan',
        area: ['80%', '640px'],
        offset: ['50px', '10%'], //宽高
        content: Str
    });
})



//车辆运行信息报表

function returnRepairWorkingStr(Str) {
    var JSONstr = JSON.parse(Str);
    var strObj = "<table style='margin:10px;width:100%;' class='bike_Info tablelist' border='0'><tr><th>维修ID号</th><th>维修人</th><th>维修人ID</th><th>维修时间</th>";
    $.each(JSONstr, function(index, el) {

        strObj += "</tr><tr><td>" + el.repair_id + "</td><td>" + el.worker_name + "</td><td> " + el.worker_id + "</td><td>" + el.repair_time + "</td></tr>";
    });
    strObj += "</table>";
    return strObj;
}

function bikeWorkingReportList() {
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/bikeWorkingReport",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
            if (res.ret == 0) {
                if (res.data[0].length == 0) {
                    layer.msg("数据为空");
                } else {
                    var bikeWorkingList = res.data;
                    $.each(bikeWorkingList, function(index, el) {
                        var bikeWorking = $("<tr><td>" + el.SIM + "</td><td> " + el.agent_name + "</td><td> " + el.investor_name + "</td><td> " + el.brand + "</td><td> " + el.enter_time + "</td><td> " + el.sale_time + "</td><td> " + el.type + "</td><td> " + el.pile_id + "</td><td name='" + JSON.stringify(el.repaired_record) + "' class='bikeWorkbtn'><a href='#' style='color:blue;'>查看记录</a></td></tr>");
                        $(".bikeWorkingReport_cont").append(bikeWorking);
                    });
                    $(".tablelist").trigger("update");
                }


            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("请求失败");
        })
        .always(function() {

        });
}

$(".bikeWorkingReport_cont").on('click', '.bikeWorkbtn', function() {
    var repairer_record = $(this).attr('name');
    var Str = returnRepairWorkingStr(repairer_record);
    layer.open({
        type: 1,
        title: '维保记录',
        skin: 'layui-layer-lan',
        area: ['80%', '640px'],
        offset: ['50px', '10%'], //宽高
        content: Str
    });
})

/*
 *email:13523450460@sina.cn 
 *name:capua
 *date:2018/4/10
 *part:私人电动车报表
 */

function returnRide_recordStr(Str) {
    var JSONstr = JSON.parse(Str);

    var strObj = "<table style='margin:10px;width:100%;' class='tablelist' border='0'><tr><th>电车ID</th><th>骑行开始时间</th><th>骑行开始时间</th><th>骑行时长(分钟)</th><th>骑行距离(米)</th>";
    $.each(JSONstr[0], function(index, el) {

        strObj += "</tr><tr><td>" + el.vehicle_id + "</td><td>" + timestampToTime(el.start_time) + "</td><td> " + timestampToTime(el.end_time) + "</td><td>" + ((el.ride_time - el.start_time) / 60).toFixed(2) + "</td><td>" + el.distance + "</td></tr>";
    });
    strObj += "</table>";
    return strObj;
}

function userReportList() {
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/userReport",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);


            if (res.ret == 0) {
                if (res.data[0].length == 0) {
                    layer.msg("数据为空");
                } else {
                    var userList = res.data;
                    $.each(userList, function(index, el) {
                        var user = $("<tr><td>" + el.user_id + "</td><td> " + el.user_name + "</td><td> " + el.primary_phone + "</td><td> " + el.vice_phone1 + "</td><td name='" + JSON.stringify(el.ride_record) + "' class='checkRide_record'><a href='#' style='color:blue;'>查看列表</a></td></tr>");
                        $(".userReport_cont").append(user);
                    });
                    $(".tablelist").trigger("update");
                }
            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("请求失败");
        })
        .always(function() {

        });
}


$(".userReport_cont").on('click', '.checkRide_record', function() {
    var str1 = $(this).attr('name');
    var Str = returnRide_recordStr(str1)
    layer.open({
        type: 1,
        title: '骑行信息',
        skin: 'layui-layer-lan',
        area: ['80%', '640px'],
        offset: ['50px', '10%'], //宽高
        content: Str
    });
})
/*
 *email:13523450460@sina.cn 
 *name:capua
 *date:2018/4/10
 *part:添加经销商
 */

function addDelegater(a, b) {

    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", a);
    form.append("delegater_info", b);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/addDelegater",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {

            var res = JSON.parse(res);
            if (res.ret == 0) {
                layer.msg("添加成功");
                $(".addDelegaterForm input[type=text]").val("");

            } else {
                requestStatus(res.ret);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {

        });
}




$(".Delegater_btn").click(function() {

    var Info = $(".addDelegaterForm").serializeArray();
    var user_id = getSession()[2];
    var Inf = "{";
    $.each(Info, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}").split(",}")[0] + "}";

    if ($(".Delegater_name").val() != "") {

        addDelegater(user_id, Infos);
    } else {

    }


});

/*
 *email:13523450460@sina.cn 
 *name:capua
 *date:2018/4/10
 *part:添加厂商
 */

function addFirm(a, b) {

    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", a);
    form.append("firm_info", b);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/addFirm",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {

            var res = JSON.parse(res);
            if (res.ret == 0) {
                layer.msg("添加成功");
                $(".addDelegaterForm input[type=text]").val("");

            } else {
                requestStatus(res.ret);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {

        });
}




$(".Firm_btn").click(function() {

    var Info = $(".addFirmForm").serializeArray();
    var user_id = getSession()[2];
    var Inf = "{";
    $.each(Info, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}").split(",}")[0] + "}";

    if ($(".addfirm_name").val() != "") {

        addFirm(user_id, Infos);
    } else {

    }


});

/*
 *email:13523450460@sina.cn 
 *name:capua
 *date:2018/4/10
 *part:添加维修站
 */

function addFixstation(a, b) {

    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", a);
    form.append("fixstation_info", b);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/addFixstation",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {

            var res = JSON.parse(res);
            if (res.ret == 0) {
                layer.msg("添加成功");
                $(".addFixstationForm input[type=text]").val("");

            } else {
                requestStatus(res.ret);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {

        });
}




$(".Fixstation_btn").click(function() {

    var Info = $(".addFixstationForm").serializeArray();
    var user_id = getSession()[2];
    var Inf = "{";
    $.each(Info, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}").split(",}")[0] + "}";

    if ($(".addFixstation_name").val() != "") {

        addFixstation(user_id, Infos);
    } else {

    }


});


/*
 *email:13523450460@sina.cn 
 *name:capua
 *date:2018/4/10
 *part:添加投资商
 */

function addInvestor(a, b) {

    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", a);
    form.append("investor_info", b);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/addInvestor",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {

            var res = JSON.parse(res);
            if (res.ret == 0) {
                layer.msg("添加成功");
                $(".addInvestorForm input[type=text]").val("");

            } else {
                requestStatus(res.ret);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {

        });
}




$(".Investor_btn").click(function() {

    var Info = $(".addInvestorForm").serializeArray();
    var user_id = getSession()[2];
    var Inf = "{";
    $.each(Info, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}").split(",}")[0] + "}";

    if ($(".addInvestor_name").val() != "") {

        addInvestor(user_id, Infos);
    } else {

    }


});

/*
 *Capua
 *2018/4/11
 *用户列表
 */
function nullreturn(str) {
    if (str == null) {
        str = "无";
    } else {

    }
    return str;
}

function userList(num, page) {
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);
    form.append("list_order", "id");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/getUserList",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
            if (res.ret == 0) {
                if (res.data[0].length == 0) {
                    layer.msg("数据为空");
                } else {
                    var usersList = res.data;
                    $.each(usersList, function(index, el) {
                        var investor = $("<tr><td>" + el.id + "</td><td> " + el.name + "</td><td> " + el.money + "</td><td> " + el.vehicles + "</td><td> " + el.auth + "</td><td> " + el.phone + "</td><td> " + el.deposited + "</td><td> " + el.photo + "</td><td>" + el.identity + "</td><td>" + nullreturn(el.owner_id) + "</td></tr>");
                        $(".users_cont").append(investor);
                    });
                    $(".tablelist").trigger("update");
                }


            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            layer.msg("请求失败");
        })
        .always(function() {

        });
}



/*
 *email:13523450460@sina.cn
 *name:capua
 *date:2018/3/28
 *part:维保站添加记录
 */

function addRepairRecord() {

    var station_id = $(".addRepair_adstation_id").val();
    var user_id = $(".addRepair_user_id").children("option:selected").attr("name");
    var vehicle_id = $(".addRepair_vehicle_id").val();
    var worker_id = $(".addRepair_worker_id").val();
    var repair_desc = $(".addRepair_repair_desc").val();
    var repair_time = Date.parse(new Date()) / 1000;


    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("station_id", station_id);
    form.append("user_id", user_id);
    form.append("vehicle_id", vehicle_id);
    form.append("worker_id", worker_id);
    form.append("repair_desc", repair_desc);
    form.append("repair_time", repair_time);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/site/addRepairRecord",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
            if (res.ret == 0) {
                layer.msg("添加成功");
                $("input[type=text]").val("");

            } else {
                requestStatus(res.ret);
            }
        }).fail(function() {
            console.log("error");
        })
        .always(function() {

        });
}


$(".addRepair_btn").click(function() {

    if (check_code(".addRepair_adstation_id") && check_code(".addRepair_user_id") && check_code(".addRepair_vehicle_id")) {
        addRepairRecord();

    }


});
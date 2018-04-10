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
/*
 *email:13523450460@sina.cn 
 *name:capua
 *date:2018/3/28
 *part:设置用户类型
 */
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
}
$(".usertypeBtn").click(function() {
    var manager_id = getSession()[2];
    var user_id = $(".type_userid").val();
    var owner_id = $(".type_ownerid").children('option:selected').attr("name");
    var user_type = $(".type_type").children('option:selected').attr("name");

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
        // console.log(Infos);
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
    var user_type = $(".ct_type").children("option:selected").attr("name");
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

function returnBikeStr(JSON){
   var str="<td class='bike_id'><ul class='bike_idul'>";
   $.each(JSON,function(index, el) {
       str+="<li>"+el.vehicle_id+"</li>";
   });
   str+="</ul></td>";
   return str;
}
function returnBikeBtn(JSON){
   var str="<td><ul>";
   $.each(JSON,function(index, el) {
       str+="<li class='text-primary bike_detailBtn'>详情 </li>";
   });
   str+="</ul></td>";
   
   return str;
}
function getBikelist() {

    var user_id = getSession()[2];

    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/bike/getBikeId",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
 
            if (res.ret == 0) {
                var  bikelist;
                if (res.data.length == 0) {
                    layer.msg("数据为空");
                } else {
                   
                    if(getSession()[4]==1){
                
                          bikelist=res.data;
               
                        
                    }else{
                          bikelist=res.data ;
                    
                    }
                   
                   $.each(bikelist,function(index, el) {
                        var tr=$("<tr><td class='bike_user_id'>"+el.user_id+"</td>"+returnBikeStr(el.bike_ids)+returnBikeBtn(el.bike_ids)+"</tr>");
                        $(".bikeList_cont").append(tr);
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
};

//车辆详情
function getBikeDetail(bikeid) {
     

    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("vehicle_id",bikeid);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url":"https://www.8gps8.cn:8011/bikePublic/api/bike/bikeDetail",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };
 
    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
    
            if (res.ret == 0) {
                var bikeInfo=res.data;
                 var cont="<ul   style='padding:30px 20px;letter-spacing:1px;color:blue;'><li>电车ID:"+bikeInfo.vehicle_id+"</li><li>电车电量:"+bikeInfo.battery+";</li><li>电车电压:"+bikeInfo.voltage+";</li><li>电车寿命:"+bikeInfo.remain+";</li><li>车辆状态:(1开,0关)"+bikeInfo.lock_status+";</li><li>累计骑行公里数:"+(bikeInfo.distance).toFixed(2)+";</li><li>预计需要支付的金额:"+bikeInfo.cost+";</li><li>满电续航里程:"+bikeInfo.full_power_distance+";</li></ul>";
             layer.open({
                    type: 1,
                    title:'车辆实时详情',
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '440px'], //宽高
                    content:cont
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
  $(".bikeList_cont").on('click','.bike_detailBtn',function(){
          var index=$(this).index();
        
         var bikeid=$(this).parent().parent().siblings(".bike_id").children().children().eq(index).html();
        
         getBikeDetail(bikeid);
});

//投资商收益报表

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
                    var investorList=res.data;
                    $.each(investorList,function(index, el) {
                        var investor=$("<tr><td>"+el.id+"</td><td> "+el.name+"</td><td> "+el.addr+"</td><td> "+el.phone+"</td><td> "+el.bank +"</td><td> "+el.account  +"</td><td> "+el.wechat +"</td><td> "+el.alipay +"</td><td> "+el.elecs +"</td><td>"+el.bike_list +"</td><td>"+el.invest_number+"</td><td>"+el.splitmode  +"</td><td>"+el.bonus_ration+"</td></tr>");
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


//维保站维修报表





//车辆运行信息报表
function bikeWorkingReport(){
     var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);
    form.append("num",100);
    form.append("page",1);
    form.append("list_order","bike_id");


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
                    var bikeWorkingList=res.data;
                    $.each(bikeWorkingList,function(index, el) {
                        var Workingbike=$("<tr><td>"+el.id+"</td><td> "+el.name+"</td><td> "+el.addr+"</td><td> "+el.phone+"</td><td> "+el.bank +"</td><td> "+el.account  +"</td><td> "+el.wechat +"</td><td> "+el.alipay +"</td><td> "+el.elecs +"</td><td>"+el.bike_list +"</td><td>"+el.invest_number+"</td><td>"+el.splitmode  +"</td><td>"+el.bonus_ration+"</td></tr>");
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
        "url":"https://www.8gps8.cn:8011/bikePublic/api/site/addDelegater",
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
           
           addDelegater(user_id,Infos);
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
        "url":"https://www.8gps8.cn:8011/bikePublic/api/site/addFirm",
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
    var Inf= "{";
    $.each(Info, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}").split(",}")[0] + "}";

    if ($(".addfirm_name").val()!= "") {
           
           addFirm(user_id,Infos);
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
        "url":"https://www.8gps8.cn:8011/bikePublic/api/site/addFixstation",
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
    var Inf= "{";
    $.each(Info, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}").split(",}")[0] + "}";

    if ($(".addFixstation_name").val()!= "") {
           
           addFixstation(user_id,Infos);
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
        "url":"https://www.8gps8.cn:8011/bikePublic/api/site/addInvestor",
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
    var Inf= "{";
    $.each(Info, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}").split(",}")[0] + "}";

    if ($(".addInvestor_name").val()!= "") {
           
           addInvestor(user_id,Infos);
    } else {

    }


});
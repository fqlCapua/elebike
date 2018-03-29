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
/*
 *email:13523450460@sina.cn	
 *name:capua
 *date:2018/3/28
 *part:设置用户类型
 */
function setType(a,b,c,d) {

 var index = layer.load(1, {
                  shade: [0.1, '#000']
                });
    var form = new FormData();
    form.append("time",time_token()[0]);
    form.append("token",time_token()[1]);
    form.append("manager_id",a);
    form.append("user_id",b);
    form.append("owner_id",c);
    form.append("user_type",d);

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
      var res=JSON.parse(res);
         
           if(res.ret==0){
                    layer.msg("设置成功");
            }else{
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
    var user_id=$(".type_userid").val();
    var owner_id=$(".type_ownerid").children('option:selected').attr("name");
    var user_type=$(".type_type").children('option:selected').attr("name");
   
   //console.log(manager_id+"-"+owner_id+"-"+user_id+"-"+user_type);
    if(user_id!=""){
 
        setType(manager_id,user_id,owner_id,user_type);
    }else{
        layer.msg("完善信息");
    }
});



/*
 *email:13523450460@sina.cn	
 *name:capua
 *date:2018/3/28
 *part:添加车辆
 */

function addBike(a,b) {
     var index = layer.load(1, {
                  shade: [0.1, '#000']
                });
    var form = new FormData();
    form.append("time",time_token()[0]);
    form.append("token",time_token()[1]);
    form.append("user_id",a);
    form.append("info",b);

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
        var res=JSON.parse(res);
           if (res.ret == 0){
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


$(".ad_btn").click(function(){
 
	var Info= $(".addbikeForm").serializeArray();
	 var user_id=getSession()[2];
	var Inf="[{";
      $.each(Info,function(index, el) {
	     var one="\""+(el.name)+"\":\""+(el.value)+"\",";
	      Inf+=one;
         });
     var Infos=(Inf.substring(Inf,Inf.split("").length)+"}]").split(",}]")[0]+"}]";
     
    if($(".ad_id").val()!=""){
       
    	 addBike(user_id,Infos);
    }else{

    }


});
/*
 *email:13523450460@sina.cn
 *name:capua
 *date:2018/3/28
 *part:添加分销商行/添加用户
 */

 function addUser() {
     var index = layer.load(1, {
                  shade: [0.1, '#000']
                });
 	var user_id=getSession()[2];
 	var user_type=$(".user_addusertype").children("option:selected").attr("name");
 	var phone=$(".user_userPhone").val();
 	var truename=$(".user_truename").val();
 	var id=$(".user_userid").val();
 	var type=$(".user_usertype").children("option:selected").attr("name");


    var form = new FormData();
    form.append("time",time_token()[0]);
    form.append("token",time_token()[1]);
    form.append("user_id",user_id);
    form.append("user_type",user_type);
     form.append("phone",phone);
    form.append("truename",truename);
    form.append("id",id);
    form.append("type",type);
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
        var res=JSON.parse(res);
           if (res.ret == 0){
                    layer.msg("设置成功");
                    Code = res.data.code;

                } else {
                    requestStatus(res.ret);
                }
    }).fail(function() {
  console.log("error");
})
.always(function() {
  layer.close(index);
});
}


$(".ad_btn").click(function(){
	var Info= $(".addbikeForm").serializeArray();
	 var user_id=getSession()[2];
	var Inf="[{";
      $.each(Info,function(index, el) {
	     var one="\""+(el.name)+"\":\""+(el.value)+"\",";
	      Inf+=one;
         });
     var Infos=(Inf.substring(Inf,Inf.split("").length)+"}]").split(",}]")[0]+"}]";
    if(check_code(".ad_id")){
    	addBike(user_id,Infos);
    }


});
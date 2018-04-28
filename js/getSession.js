 function getSession(){
 	  var ss=window.sessionStorage;
 	   var userInfos=[];
 	   if(ss.getItem('io')) {
      var jsonTxt=JSON.parse(ss.getItem('io'));
		var name=jsonTxt.name;
		var userphone=jsonTxt.phone;
		var user_id=jsonTxt.id;
        var auth=jsonTxt.auth;
        var bikeArr=(jsonTxt.vehicles).split(";");
        var owner_id=jsonTxt.ownerid;
		    userInfos.push(name);
		    userInfos.push(userphone);
            userInfos.push(user_id);
            userInfos.push(bikeArr);
            userInfos.push(auth);
            userInfos.push(owner_id);
		     return userInfos;
  }else {
      layer.msg('请先登录');
    
  }
 	 // return  userInfos=['admin','13523450460','9',''];
 };
 

 function requestStatus(status){
 	switch(status){
 		case 1:
 		layer.msg("请求超时");
 		break;
 		case 2:
 		layer.msg("接口token错误");
 		break;
 		case 3:
 		layer.msg("已存在");
 		break;
 		case 4:
 		layer.msg("验证码有误");
 		break;
 		case 5:
 		layer.msg("文件格式不正确");
 		break;
 		case 6:
 		layer.msg("操作失败");
 		break;
 		case 7:
 		layer.msg("没有权限");
 		break;
 		case 8:
 		layer.msg("无信息");
 		break;
    default:
    layer.msg("未知错误");
    break;
 	}
 	
 }


 function LocalTime(timestamp) {
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

    
 
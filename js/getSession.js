 function getSession(){
 	  var ss=window.sessionStorage;
 	   var userInfos=[];
 	   if(ss.getItem('io')) {
      var jsonTxt=JSON.parse(ss.getItem('io'));
		var name=jsonTxt.name;
		var userphone=jsonTxt.phone;
		var user_id=jsonTxt.id;
        var bikeArr=(jsonTxt.vehicles).split(",");
		    userInfos.push(name);
		    userInfos.push(userphone);
        userInfos.push(user_id);
        userInfos.push(bikeArr);
		    return userInfos;
  } else {
     layer.msg('请先登录');

  }
 	   
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
 		layer.msg("手机号已存在");
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

    
 
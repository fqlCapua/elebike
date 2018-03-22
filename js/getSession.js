 function getSession(){
 	  var ss=window.sessionStorage;
 	   var userInfos=[];
 	if(ss.getItem('io')) {
      var jsonTxt=JSON.parse(ss.getItem('io'));
		var name=jsonTxt.name;
		var userphone=jsonTxt.phone;
		var user_id=jsonTxt.id;

		userInfos.push(name);
		userInfos.push(userphone);
        userInfos.push(user_id);
		
		return userInfos;
  } else {
     layer.msg('请先登录');

  }
 	   
 }

    
 
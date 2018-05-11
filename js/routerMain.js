

        function Router(){
            this.paths={};
            this.curPath='';
        }
        Router.prototype={
            path:function(str,callback){
                var func=callback||function(){};
                this.paths[str]=func;
            },
            refresh:function(){
           
                this.curPath=String(location.hash.slice(1)).split("?")[0]||'/home'
                this.paths[this.curPath]()
            },
            init:function(){
                window.addEventListener('load',this.refresh.bind(this),false)
                window.addEventListener('hashchange',this.refresh.bind(this),false)
            }
        };
       
        var r=new Router();
        r.path('/user',function(){
          $("#leftFrame").attr("src","left.html");
          $("#rightFrame").attr("src","./user/checktraval.html");
        });
        r.path('/admin',function(){
            $("#leftFrame").attr("src","adminMenu.html");
             $("#rightFrame").attr("src","./admin/userlist.html")
         });
        r.init();
function checklogin(){
    var ss=window.sessionStorage;
    if(ss.getItem("io")){
     
    }else{
        layer.msg("你还未登录！");
        window.location.href="index.html#/";
    }
}

 window.setInterval("checklogin()",2000);

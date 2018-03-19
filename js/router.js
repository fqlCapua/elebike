window.location.href="index.html#/";
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
        r.path('/',function(){
          window.location.href="index.html#/";
        });
        r.path('/8gps8',function(){
            window.location.href="adminLogin.html#/";
         });
        r.init();
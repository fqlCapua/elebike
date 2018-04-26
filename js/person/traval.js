$(function(){
    var bikeArr=getSession()[3];
  //  console.log(bikeArr);
    //   bikeArr=bikeStr.split(";");
    $.each(bikeArr,function(index, el) {
        var table=$("<table class='table table-hover'><thead><tr><th><a class=' bike_id'>"+el+"</a><a class='showList text-primary'> 查看 </a><a class='hideList text-primary'> &nbsp;收起&nbsp;&nbsp;</a></th></tr></thead><tbody class='traval_cont'></tbody></table>");
        $(".travalBox").append(table);
    });

})

function getBikelist(vehicle_id,obj){
 obj.find("tbody").empty();
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);
    form.append("vehicle_id",vehicle_id);
    form.append("num",100);
    form.append("page",1);


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/vehicle/travel",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
          //  console.log(res); 
            if (res.ret == 0) {
                if (res.data.length == 0) {
                    layer.msg("数据为空");
                } else {
                    var  bikelist=res.data;    
                    $.each(bikelist, function(index, el) {
                        var tr=$("<tr traval_id='"+el.travel_id+"'><td class='traval_time'><div class='text-muted'><span>开始:</span><span class='traval_start_time'>"+LocalTime(el.start_time)+"</span></div><div class='text-muted'><span>结束:</span><span class='traval_end_time'>"+LocalTime(el.end_time)+"</span></div><div class='traval_distance'>"+el.distance+"km</div></td></tr>");
                            obj.find("tbody").append(tr);
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
function getTravallist(vehicle_id){
 
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    
    form.append("vehicle_id",vehicle_id);
    


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.8gps8.cn:8011/bikePublic/api/travel/position",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function(res) {
            var res = JSON.parse(res);
          //  console.log(res); 
            if (res.ret == 0) {
                if (res.data.length == 0) {
                    layer.msg("数据为空");
                } else {
                    var  posList=res.data;    
                 console.log(posList);
                   //  $.each(bikelist, function(index, el) {
                   //      var tr=$("<tr traval_id='"+el.travel_id+"'><td class='traval_time'><div class='text-muted'><span>开始:</span><span class='traval_start_time'>"+LocalTime(el.start_time)+"</span></div><div class='text-muted'><span>结束:</span><span class='traval_end_time'>"+LocalTime(el.end_time)+"</span></div><div class='traval_distance'>"+el.distance+"km</div></td></tr>");
                   //          obj.find("tbody").append(tr);
                   // });
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
$(".travalBox").on('click','.bike_id,.showList',function() {
  // console.log($(this).html());
   var bike_id=$(this).siblings('.bike_id').html();
   getBikelist(bike_id,$(this).parent().parent().parent().parent());

});
$(".travalBox").on('click','.bike_id,.hideList',function() {
  // console.log($(this).html());
 //  var bike_id=$(this).siblings('.bike_id').html();
     $(this).parent().parent().parent().parent().find(".traval_cont").empty();

});
$(".travalBox ").on('click','.traval_cont tr',function() {
 
   var traval_id=$(this).attr('traval_id');
   console.log(traval_id);
   getTravallist(traval_id)

});
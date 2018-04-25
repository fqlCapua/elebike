$(function(){
    var bikeArr=getSession()[3];
    console.log(bikeArr);
    //   bikeArr=bikeStr.split(";");
    $.each(bikeArr,function(index, el) {
        var table=$("<table class='table table-hover'><thead><tr><th class='bike_id'>"+el+"</th></tr></thead><tbody class='traval_cont'></tbody></table>");
        $("body").append(table);
    });

})

function getBikelist(vehicle_id,) {
    var tableStr="";
    var user_id = getSession()[2];
    var form = new FormData();
    form.append("time", time_token()[0]);
    form.append("token", time_token()[1]);
    form.append("user_id", user_id);
    form.append("vehicle_id",vehicle_id);
    form.append("num", 100);
    form.append("page", 1);


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
            if (res.ret == 0) {
                if (res.data.length == 0) {
                    layer.msg("数据为空");
                } else {
                    var  bikelist=res.data;     
                    $.each(bikelist, function(index, el) {
      

                    
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
console.log(getSession()[1])
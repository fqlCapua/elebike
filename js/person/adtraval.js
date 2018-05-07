

 
 function getTravallist(vehicle_id){
        var form = new FormData();
        form.append("time", time_token()[0]);
        form.append("token", time_token()[1]);

        form.append("travel_id", vehicle_id);



        var settings = {
            "async": false,
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

                if (res.ret == 0) {
                    if (res.data.length == 0) {
                        layer.msg("数据为空");
                    } else {
                        var posList = res.data;
                        var arrArr = new Array();
                        $.each(posList, function(index, el) {
                            var ar = [];
                            ar.push(el.longitude, el.latitude);
                            arrArr.push(ar);

                        });


                        var newArr = new Array();
                        $.each(arrArr, function(index, el) {

                            var newel = coordtransform.wgs84togcj02(el[0], el[1]);
                            newArr.push(newel);
                        });

                        var pointArr = new Array();
                        $.each(newArr, function(index, el) {
                            var point = new AMap.LngLat(el[0], el[1]);
                            pointArr.push(point);
                        });
                        new AMap.Polyline({
                            map: map,
                            strokeColor: 'red',
                            path: pointArr
                        });
                        new AMap.Marker({
                            map: map,
                            position: pointArr[0],
                            content: '<div class="marker-route marker-marker-bus-from"></div>' //自定义点标记覆盖物内容
                        });
                        new AMap.Marker({
                            map: map,
                            position: pointArr[pointArr.length - 1],
                            content: '<div class="marker-route marker-marker-bus-to"></div>'
                        });
                        map.setFitView();
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
 
$(".bikelist").on('click','.traval_cont tr',function() {
   var traval_id=$(this).attr('traval_id');
   //alert(traval_id);
// parent.window.$("#rightFrame").attr("src","userloc.html?traval_id="+traval_id);
  getTravallist(traval_id)
});



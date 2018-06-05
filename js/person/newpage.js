var page = 1,
    count = 1000;
var urlTips = "https://www.8gps8.cn:8011/bikePublic/api/newSite";

function refreshTable() {

    $("table").find("td").bind("dblclick", function() {
        var input = "<input type='text' id='temp' style='width:130px;' value=" + $(this).text() + " >";
        $(this).text("");
        $(this).append(input);
        $("input#temp").focus();
        $("input").blur(function() {
            if ($(this).val() == "") {
                $(this).remove();
            } else {
                $(this).closest("td").text($(this).val());
            }
        });
    });
}
//setInterval("refreshTable()", 200);

function NameTranslate(n) {


    var ths = $("table th");
    $.each(ths, function(index, el) {
        switch ($(el).html()) {
            case "name":
                $(el).html("用户名");
                break;
            case "auth_name":
                $(el).html("用户身份");
                break;
            case "photo":
                $(el).html("用户头像");
                break;
            case "auth":
                $(el).html("身份id");
                break;
            case "phone":
                $(el).html("手机");
                break;
            case "deposited":
                $(el).html("是否交押金");
                break;
            case "money":
                $(el).html("余额");
                break;
            case "ownerid":
                $(el).html("隶属公司id");
                break;
            case "id":
                $(el).html("用户id");
                break;
            case "identity":
                $(el).html("身份证");
                break;

        }
    });

}

function dataFormater(data) {
    // body...
    var Inf = "{";
    $.each(data, function(index, el) {
        var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
        Inf += one;
    });
    var Infos = (Inf.substring(Inf, Inf.split("").length) + "}]").split(",}]")[0] + "}";

    var Infos = JSON.parse(Infos);
    console.log(Infos);
    if (Infos.like) {
        var val = Infos.like;
        Infos.like = "User.name," + val;
    } else {

    }
    return Infos;
}

function checkInfo(n) {
    $("input[name=user_id]").val(getSession()[2]);
    $(".data").html("");
    var url = urlTips + $(n).attr("name");
    var submitData = $(".checkForm").serializeArray();
    var form = dataFormater(submitData);
    var settings = {
        "url": url,
        "method": "POST",
        "data": form
    }
    $.ajax(settings).done(function(res) {
        if (res.ret == 0) {
            var result = res.data.res_data;
            // var obj = "." + $(n).attr("target") + "data";
            $(".data").columns({
                data: result
            });

            setInterval("NameTranslate()", 100);
            refreshTable();
        } else {
            layer.msg(res.msg);
        }
    });
}

function addInfo(n) {
    layer.msg("添加成功");
    $("input[name=user_id]").val(getSession()[2]);
    // var url = urlTips + $(n).attr("name");
    // var submitData = $("." + $(n).attr("target")).find("form").serializeArray();
    // console.log($("." + $(n).attr("target")).find("form"));
    // var form = dataFormater(submitData);
    // console.log(form);
    // var settings = {
    //     "url": url,
    //     "method": "POST",
    //     "data": form
    // }
    // $.ajax(settings).done(function(res) {
    //     if (res.ret == 0) {
    //         layer.msg("添加成功");
    //         $("input[type=text]").val("");
    //     } else {
    //         console.log(res.msg);
    //         layer.msg("添加失败");
    //     }
    // });
}

function editInfo(n) {
    var url = urlTips + $(n).attr("name");
    var submitData = $("#" + $(n).attr("target")).serializeArray();
    var form = dataFormater(submitData);
    var settings = {
        "url": url,
        "method": "POST",
        "data": form
    }
    $.ajax(settings).done(function(res) {
        if (res.ret == 0) {
            var result = res.data.res_data;
            var obj = "." + n + "Form";
            $(obj).columns({
                data: result
            });
        } else {
            layer.msg(res.msg);
        }
    });
}

function delInfo(n) {
    layer.prompt({ title: '输入类型的id', formType: 1 }, function(pass, index) {
        layer.close(index);
        
            layer.msg('删除类型id：' + pass+"成功");
        
    });
    // var url = urlTips + $(n).attr("name");
    // var submitData = $("#" + $(n).attr("target")).serializeArray();
    // var form = dataFormater(submitData);
    // var settings = {
    //     "url": url,
    //     "method": "POST",
    //     "data": form
    // }
    // $.ajax(settings).done(function(res) {
    //     if (res.ret == 0) {
    //         layer.msg("删除成功！");
    //     } else {
    //         layer.msg(res.msg);
    //     }
    // });
}
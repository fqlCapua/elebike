
var vehicle = "";
var type = "0x0000";
var desc = "on";
var page = 1;
var num = 20;

function refresh() {
    vehicle = $("#vehicle").val();
    type = $("#type").val();
    desc = $("#desc").val();
    num = $("num").val();
    page = 1;
    getData();
    var table = $("#table");
    table.empty();
    table.append("<tr>\n" +
        "            <td>消息类型</td>\n" +
        "            <td>设备ID</td>\n" +
        "            <td>发送时间</td>\n" +
        "            <td>消息内容</td>\n" +
        "            <td>数据报文</td>\n" +
        "        </tr>");
}

function getMore() {
    page = page + 1;
    getData();
}

function getData() {
    var data = {};
    data["vehicle_id"] = vehicle;
    if (type != "0x0000") {
        data["type"] = type;
    }
    if (desc == "on") {
        data["desc"] = 1;
    }
    data["page"] = page;
    var setting = {"method": "POST", "data": data};
    $.ajax("https://www.8gps8.cn:8011/bikePublic/api/vehicle/message",
        setting).done(function(res) {
        if (res.ret == 0) {
            didGetData(res.data);
        }else {
            alert("获取数据失败");
        }
    }).fail(function() {
        alert("获取数据失败");
    });
}

function didGetData(data) {
    for (var row in data) {
        var tr = createRow(data[row]);
        var table = document.getElementById("table");
        table.appendChild(tr);
    }
}

function createRow(data) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var type = data["type"];
    td.innerHTML = "[" + type + "]" + types[type];
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = data["vehicle_id"];
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = data["send_time"];
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = data["message"];
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = data["content"];
    tr.appendChild(td);
    return tr;
}






var types = {"0x0000": "所有", "0x0001": "终端通用应答", "0x8001": "平台通用应答"
        , "0x0002": "终端心跳", "0x8003": "补传分包请求", "0x0100": "终端注册"
    , "0x8100": "终端注册应答", "0x0003": "终端注销", "0x0102": "终端鉴权"
    , "0x8103": "设置终端参数", "0x8104": "查询终端参数", "0x0104": "查询终端参数应答"
    , "0x8105": "终端控制", "0x8106": "查询指定终端参数", "0x8107": "查询终端属性"
    , "0x0107": "查询终端属性应答", "0x8108": "下发终端升级包", "0x0108": "终端升级结果通知"
    , "0x0200": "位置信息汇报", "0x8201": "位置信息查询", "0x0201": "位置信息查询应答"
    , "0x8202": "临时位置跟踪控制", "0x8203": "人工确认报警信息", "0x8300": "文本信息下发"
    , "0x8301": "事件设置", "0x0301": "事件报告", "0x8302": "提问下发"
    , "0x0302": "提问应答", "0x8303": "信息点播菜单设置", "0x0303": "信息点播/取消"
    , "0x8304": "信息服务", "0x8400": "电话回拨", "0x8401": "设置电话本"
    , "0x8500": "车辆控制", "0x0500": "车辆控制应答", "0x8600": "设置圆形区域"
    , "0x8601": "删除圆形区域", "0x8602": "设置矩形区域", "0x8603": "删除矩形区域"
    , "0x8604": "设置多边形区域", "0x8605": "删除多边形区域", "0x8606": "设置路线"
    , "0x8607": "删除路线", "0x8700": "行驶记录仪数据采集命令", "0x0700": "行驶记录仪数据上传"
    , "0x8701": "行驶记录仪参数下传命令", "0x0701": "电子运单上报", "0x0702": "驾驶员身份信息采集上报"
    , "0x8702": "上报驾驶员身份信息请求", "0x0704": "定位数据批量上传", "0x0705": "CAN总线数据上传"
    , "0x0800": "多媒体事件信息上传", "0x0801": "多媒体数据上传", "0x8800": "多媒体数据上传应答"
    , "0x8801": "摄像头立即拍摄命令", "0x0805": "摄像头立即拍摄命令应答", "0x8802": "存储多媒体数据检索"
    , "0x0802": "存储多媒体数据检索应答", "0x8803": "存储多媒体数据上传", "0x8804": "录音开始命令"
    , "0x8805": "单挑存储多媒体数据检索上传命令", "0x8900": "数据下行透传", "0x0900": "数据上行透传"
    , "0x0901": "数据压缩上报", "0x8A00": "平台RSA公钥", "0x0A00": "终端RSA公钥"};

var typeElement = document.getElementById("type");

for (var type in types) {
    var element = document.createElement("option");
    element.setAttribute("value", type);
    element.text = type + "--" + types[type];
    typeElement.appendChild(element);
}









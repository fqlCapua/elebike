           page = 1,
               count = 1000;
           var urlTips = "https://www.8gps8.cn:8011/bikePublic/api/newSite";

           function saveInfo(n) {
               var that = this;
               var url = urlTips + $(n).attr("name");
               var submitData = JSON.parse($(n).attr("target_data"));
               submitData.user_id = getSession()[2];
              var settings = {
                   "url": url,
                   "method": "POST",
                   "data": submitData
               }
               $.ajax(settings).done(function (res) {
                   if (res.ret == 0) {

                       layer.msg("修改成功");
                   } else {


                       var msg = res.msg.split("缺少必要参数 ")[1].split(" !")[0];
//                        		       layer.prompt({
//                        							 title: '请输入'+msg,
//                        							 formType: 0
//                        							 }, function (pass,index){
// 																			      
//                        							})
                     console.log(msg)  
                   }
               });
           }

           function refreshTable() {
               $(".datalist").parent().on("dblclick", 'section table tr td', function () {
                   $(".editdata").show();
                   var $that = $(this);
                   //$(this).text("");



                   var $that = $(this);
                   var formObject = "{";


                   $(this).css("position", 'relative');
                   var t = $(this).position().top;
                   var l = $(this).position().left;
                   var w = $(this).css("width");
                   var input = "<input  type='text' id='temp' style='width:1" + w +
                       ";position:absolute;z-index:10;left:0;' value=" + $(this).text() +
                       " >";
                   $(this).append(input);


                   $("input#temp").focus();
                   $("table input").blur(function () {
                       if ($(this).val() == "") {
                           $(this).remove();
                       } else {
                           $(this).closest("td").text($(this).val());
                           $(this).remove();
                       }
                       var ths = $that.parent().parent().siblings('thead').find("tr").find('th');
                       var tds = $that.parent().children('td');
                       $.each(ths, function (i, el) {
                           var key1 = $(el).attr('data-columns-sortby');
                           var index = $(el).index();
                           var val = $(tds[index]).html();
                           var str = key1 + ":'" + val + "',";
                           formObject += str;

                       })

                       formObject = (formObject + "}").split(",}")[0] + "}";
                       var formObj = eval("(" + formObject + ")");
                       formStr = JSON.stringify(formObj);
                       $(".editdata").attr("target_data", formStr);

                   });

               });
           }



           function NameTranslate() {
               var ths = $("table th,li label");
               var tds = $("table td");
               $.each(tds, function (index, el) {
                   if (!isNaN($(el).html()) && $(el).html().length == 10) {
                       var val = LocalTime($(el).html()).split(" ")[0];
                       $(el).html(val);

                   }
               })

               $.each(ths, function (index, el) {
                   switch ($(el).html()) {
                       case "name":

                           $(el).html("名称");

                           break;
                       case "auth_name":
                           $(el).html("用户身份名称");
                           break;
                       case "photo":
                           $(el).html("用户头像");
                           break;
                       case "auth":
                           $(el).html("用户身份id");
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
                           $(el).html("id");
                           break;
                       case "identity":
                           $(el).html("身份证");
                           break;
                       case "auth_desc":
                           $(el).html("职责描述");
                           break;
                       case "vehiclenos":
                           $(el).html("车辆列表");
                           break;
                       case "fixstations":
                           $(el).html("维保站列表");
                           break;
                       case "addr":
                           $(el).html("地址");
                           break;
                       case "brand":
                           $(el).html("品牌");
                           break;
                       case "officer":
                           $(el).html("负责人姓名");
                           break;
                       case "delegaters":
                           $(el).html("代理商列表");
                           break;
                       case "alipay":
                           $(el).html("支付宝");
                           break;
                       case "wechat":
                           $(el).html("微信");
                           break;
                       case "account":
                           $(el).html("账户余额");
                           break;
                       case "investors":
                           $(el).html("投资商列表");
                           break;
                       case "pid":
                           $(el).html("上级列表");
                           break;
                       case "bank":
                           $(el).html("银行账户");
                           break;
                       case "dealers":
                           $(el).html("经销商列表");
                           break;
                       case "elecs":
                           $(el).html("充电桩列表");
                           break;
                       case "delegater_id":
                           $(el).html("代理商id");
                           break;
                       case "splitmode":
                           $(el).html("分成模式");
                           break;
                       case "invest_stime":
                           $(el).html("投资起始时间");
                           break;
                       case "bonus_type":
                           $(el).html("投资规则");
                           break;
                       case "invest_inid":
                           $(el).html("投资商id");
                           break;
                       case "invest_etime":
                           $(el).html("投资结束时间");
                           break;
                       case "invest_money":
                           $(el).html("投资金额(分)");
                           break;
                       case "invest_boid":
                           $(el).html("分成规则id");
                           break;
                       case "bonus_time":
                           $(el).html("投资时长(月)");
                           break;
                       case "bonus_amount":
                           $(el).html("回报金额(分)");
                           break;
                       case "bonus_ration":
                           $(el).html("回报率百分比");
                           break;
                       case "grants":
                           $(el).html("授权品牌列表");
                           break;
                       case "addr2":
                           $(el).html("卫星定位地址");
                           break;
                       case "operate":
                           $(el).html("经营范围");
                           break;
                       case "vehicle_id":
                           $(el).html("车辆id");
                           break;
                       case "uid":
                           $(el).html("修理员工id");
                           break;
                       case "description":
                           $(el).html("描述");
                           break;
                       case "sid":
                           $(el).html("修理厂id");
                           break;
                       case "vehicle_uid":
                           $(el).html("私人用户id");
                           break;
                       case "time":
                           $(el).html("维修完成时间");
                           break;
                       case "report_id":
                           $(el).html("报修id");
                           break;
                       case "report_id":
                           $(el).html("报修id");
                           break;
                       case "host":
                           $(el).html("所属厂商");
                           break;
                       case "version":
                           $(el).html("型号");
                           break;
                       case "delegater":
                           $(el).html("代理商");
                           break;
                       case "investor":
                           $(el).html("投资者");
                           break;
                       case "power":
                           $(el).html("充电桩");
                           break;
                       case "inNetDate":
                           $(el).html("入网日期");
                           break;
                       case "saleDate":
                           $(el).html("销售日期");
                           break;
                       case "maintenance":
                           $(el).html("保修期");
                           break;
                       case "pos":
                           $(el).html("经纬度");
                           break;
                       case "heartData":
                           $(el).html("经纬度");
                           break;
                       case "owners":
                           $(el).html("所属用户");
                           break;
                       case "simno":
                           $(el).html("SIM卡号");
                           break;
                       case "salestate":
                           $(el).html("车辆售出状态");
                           break;
                       case "dealer":
                           $(el).html("经销商");
                           break;
                       case "full_power_distance":
                           $(el).html("满电续航里程,");
                           break;
                       case "s_voltage":
                           $(el).html("额定电压");
                           break;
                       case "invest":
                           $(el).html("投资id");
                           break;
                       case "dealer_name":
                           $(el).html("经销商名称");
                           break;
                       case "delegater_name":
                           $(el).html("代理商名称");
                           break;
                       case "delegater_id":
                           $(el).html("代理商id");
                           break;
                       case "investor_name":
                           $(el).html("投资商名称");
                           break;
                       case "region":
                           $(el).html("充电桩所在地区");
                           break;
                       case "community":
                           $(el).html("充电桩所在小区");
                           break;
                       case "address":
                           $(el).html("地址");
                           break;
                       case "position":
                           $(el).html("位置");
                           break;
                       case "lat":
                           $(el).html("纬度");
                           break;
                       case "lng":
                           $(el).html("经度");
                           break;
                       case "rule_distance":
                           $(el).html("每公里收费（分）");
                           break;
                       case "rule_time":
                           $(el).html("每分钟收费（分）");
                           break;
                       case "sale_money":
                           $(el).html("优惠金额（分）");
                           break;
                       case "sale_time":
                           $(el).html("优惠骑行时长（分钟）");
                           break;
                       case "sale_etime":
                           $(el).html("优惠结束时间");
                           break;
                       case "community":
                           $(el).html("优惠覆盖的小区");
                           break;
                       case "sale_distance":
                           $(el).html("优惠骑行距离(米)");
                           break;
                       case "sale_times":
                           $(el).html("优惠次数");
                           break;
                       case "sale_power":
                           $(el).html(" 优惠覆盖的充电桩");
                           break;
                       case "sale_stime":
                           $(el).html("优惠起始时间");
                           break;
                       case "sale_did":
                           $(el).html("优惠的代理商id");
                           break;

                   }
               });

           }

           function dataFormater(data) {
               // body...
               var Inf = "{";
               $.each(data, function (index, el) {
                   var one = "\"" + (el.name) + "\":\"" + (el.value) + "\",";
                   Inf += one;
               });
               var Infos = (Inf.substring(Inf, Inf.split("").length) + "}]").split(",}]")[0] + "}";

               var Infos = JSON.parse(Infos);

               return Infos;
           }

           function TypeStatus(name) {
               $(".datalist").parent().find("section").empty();
               var flag = false;
               switch (name) {
                   case '/userManage/auth/get':
                       flag = false;
                       break;
                   case '/investManage/costRule/get':
                       flag = false;
                       break;
                   case '/investManage/investRule/get':
                       flag = false;
                       break;
                       // 			case '/investManage/get':
                       // 			flag=false;
                       // 			break;
                   default:
                       flag = true;
                       break;
               }

               return flag;
           }

           function append_input_form(arr) {
               var formtext = "<ul class='form_ul'><input style='display:none;' name='user_id' type='text'/>";
               //    console.log(arr);
               if (arr.indexOf("s_voltage") > -1) {
                   $.each(arr, function (i, el) {
                       var li = "<li><label>" + el + "</label><input type='text' name='" + el +
                           "' class='dfinput' /></li>";
                       formtext += li;
                   });
               } else {
                   $.each(arr, function (i, el) {
                       if (el == 'id') {

                       } else {
                           var li = "<li><label>" + el + "</label><input type='text' name='" + el +
                               "' class='dfinput' /></li>";
                           formtext += li;
                       }
                   });
               }
               formtext += "</ul>";
               return formtext;
           }

           function return_word_name() {
               var keyArr = new Array();
               $("input[name=user_id]").val(getSession()[2]);
               var url = urlTips + $(".getdata").attr("name");
               var target = $("." + $(".getdata").attr("target"));
               var submitData = $(".checkForm").serializeArray();
               var form = dataFormater(submitData);
               var settings = {
                   "async": false,
                   "url": url,
                   "method": "POST",
                   "data": form
               }
               var result = [];
               $.ajax(settings).done(function (res) {

                   if (res.ret == 0) {
                       var dataInfo = $("<section></section>");
                       $(".datalist").before(dataInfo);
                       if (!TypeStatus($(".getdata").attr("name"))) {
                           result = res.data;

                       } else {
                           result = res.data.res_data;


                       }
                       for (let el in result[0]) {
                           keyArr.push(el);
                       }



                   } else {
                       layer.msg(res.msg);
                   }
               });

               return keyArr;
           }

           function checkInfo(n) {
               $("input[name=user_id]").val(getSession()[2]);

               var url = urlTips + $(n).attr("name");
               var submitData = $(".checkForm").serializeArray();
               var form = dataFormater(submitData);

               var settings = {
                   "async": false,
                   "url": url,
                   "method": "POST",
                   "data": form
               }
               var result = [];
               var curName = $(".getdata").attr("name");

               $.ajax(settings).done(function (res) {

                   if (res.ret == 0) {


                       var dataInfo = $("<section></section>");
                       $(".datalist").before(dataInfo);
                       if (!TypeStatus(curName)) {
                           result = res.data;

                       } else {
                           result = res.data.res_data;

                       }
                       // var obj = "." + $(n).attr("target") + "data";
                       dataInfo.columns({
                           data: result,
                           pages: 50
                       });
                       //$(".ui-table-size").find("select option").eq(3).attr("selected",true);
                       $(".ui-table-footer").append(

                       );
                       $(".ui-table-search").attr("placeholder", "搜索关键词");
                       setInterval("NameTranslate()", 100);
                       refreshTable();
                   } else {
                       layer.msg(res.msg);
                   }
               });
           }


           function addInfo(n) {
               $("input[name=user_id]").val(getSession()[2]);
               var url = urlTips + $(n).attr("name");
               var submitData = $("." + $(n).attr("target")).find("form").serializeArray();
               // console.log($("." + $(n).attr("target")));
               var form = dataFormater(submitData);
               //  console.log(form);
               var settings = {
                   "url": url,
                   "method": "POST",
                   "data": form
               }
               $.ajax(settings).done(function (res) {
                   if (res.ret == 0) {
                       layer.msg("添加成功");
                       $("." + $(n).attr("target")).find("form input[type=text]").val("");
                   } else {
                       console.log(res.msg);
                       layer.msg("添加失败," + $("." + $(n).attr("target")).find("form").find("input[name=" + res.msg
                           .split("column ")[1].split(" at")[0].replace(/'/g, '') + "]").siblings(
                           "label").html() + "出错");
                   }
               });
           }



           function delInfo(n) {
               var form = {};

               layer.prompt({
                   title: '输入要删除类型的id',
                   formType: 0
               }, function (pass, index) {
                   layer.close(index);
                   layer.confirm('确定要删除么？', {
                       btn: ['是', '否'] //按钮
                   }, function () {
                       if ($(n).attr("name") == "/userManage/auth/delete") {
                           form = {
                               user_id: getSession()[2],
                               auth_id: pass
                           }
                       } else {
                           form = {
                               user_id: getSession()[2],
                               id: pass
                           }
                       }

                       var url = urlTips + $(n).attr("name");
                       // var submitData = $("#" + $(n).attr("target")).serializeArray();
                       //var form = dataFormater(submitData);
                       var settings = {
                           "url": url,
                           "method": "POST",
                           "data": form
                       }
                       $.ajax(settings).done(function (res) {
                           if (res.ret == 0) {
                               layer.msg("删除成功！");
                           } else {
                               layer.msg(res.msg);
                           }
                       });
                   }, function () {

                   });


               });

           }



           //编辑信息

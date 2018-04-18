define(
		[ 'jquery', 'Module', 'commonData', 'common' ],
		function($, Module, commonData, common) {
			
			var queryDemoForm;
			function GetQueryString(name)
			{
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			}
			// 关键人批量导入
			new Module({
				"type" : "forms",
				"obj" : "queryDemoForm",
				"cols" : "",
				"inline" : true,
				"title" : "关键人批量导入",
				"titleType" :"1",
				"titleAlign" : "left",
				"labelPosition" : "center",
				"labelWidth" : "200",
				"data" : [[{
					"type": "fileUpload",
					"obj": "file",
					"labelShow": false,
					"label": "上传文件",
					"size": "small",
				//	"labelWidth": "100",
					"labelPosition": "left",
					"rightButton": true,
					"rightButtonText": '浏览',
					"rightIcon": "",
					"value": '',
					"url": '',
					"initCallback": function (self) {},
					"callbackChange": function (self) {},
					"rightButtonClick": function () {}
				}],[{
					"type":"inputText",
					"obj":"inputText",
					"label":"业务信息",
					"inputExist":false,
					"labelPosition": "right",
					"readonly":false,
					"size":'',
					"labelWidth":150,
					"placeholder1":"这里是标题",
					"placeholder2":"这里是内容",
					"initCallback":function(){

					},
				}],[{
					"type": "formText",
					"obj": "formText2",
					"text": "文件格式",
					"borderLine": "none",
					"data": ['导入字段:    集团编号|手机号码|重要成员类型|关键人物级别|职位|成员说明', 
					         '重要成员类型:    0-无定义;1-最集团普通成员;2-高层领导/管理层;3-中层领导/影响力人物;4-集团基层领导 ;5-最高领导 ;', 
					         '6-通讯部负责人物 ;7-亲属 ;8-关联成员',
					         '关键人物级别:    1-集团钻;2-集团金;3-集团银;4-集团贵宾'],
				}],[{
					"type":"form",
	                "obj": "obj1",
	                "label": "操作类型",
	                "required":true,
	                "textType": "select",
	                "row": 2,
	                "multi": false,
	                "cols": 1,
	                "placeholder": "",
	                "edit": false,
	                "defaultVal": ['1'],
	                "maxSelected":2,
	               "data": [{
	                    "text": "新增",
	                        "value": "1",
	                }, {
	                	 "text": "删除",
		                    "value": "2",
	                }],
	            }],[{
					"type": "formText",
					"obj": "formText3",
					"text": "文件格式",
					"borderLine": "none",
					"data": ['1.第一行为列标题，数据从第二行开始;', 
					         '2.集团编号和手机号码为必填项', 
					         '3.请注意最大上传数量为10000行'],
				}],[{
					"type":"form",
					"obj": "telephone",
					"label": "联系电话",
					"required":true,
					"textType": "input",
					"placeholder": "",
					"validate": {
					//	expression:"^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$"
					}
				}],[{
					"type":"form",
					"obj": "remark",
					"label": "备注",
					"required":true,
					"textType": "input",
					"placeholder": "",
					"validate": {
					}
				}],[{
					"type": "form",
					"obj": "button-default",
					"textType": "button",
					"size": "",
					"disabled": false,
					//"icon": "",
					"text": "提交",
					"plain": false,
					"buttonAlign": "center",
					"buttonType": "primary", //text primary
					"callbackClick": function () {
						commonData.postData({
							serviceUrl: "/task/import",
							serviceData: "fileName",
							callback: function (result) {
								commonData.boxInfo({
									message:"批量导入成功",
									messageTitle:"提示",
									 success:function (result) {
									    },
									      type:'alert'
								});
							}
						});
					  }
				}]],
				"initCallback" : function(module) {
					queryDemoForm = module;
				}
			});

			initTable();
			// 查询结果
			function initTable(initDataParam) {}


			//	initTable({});
			function queryButton_click() {
				if (!queryDemoForm.validate()) {
					return;
				}
		
				var formData = queryDemoForm.jsonData();
				initTable(formData);
			}
			;
		});
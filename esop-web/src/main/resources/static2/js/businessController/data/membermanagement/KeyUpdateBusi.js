define(['jquery', 'Module', 'commonData', 'common','messagebox'], function($, Module, commonData, common,messagebox) {
	
	var queryDemoForm;
	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	var s = GetQueryString("contactId");
	// 关键人修改
	new Module({
		"type": "forms",
		"obj": "queryDemoForm",
		"cols": "",
		"inline": true,
		"title": "关键人",
		"titleType" :"1",
		"titleAlign": "left",
		"labelPosition": "center",
		"labelWidth": "150",
		"data": [
					[{
					    	"type": "form",
							"obj": "memPosition",
							"label": "成员职位",
					//		"value": data.employeeId,
							"textType": "input",
							 "placeholder": " ",
							"validate": {}
						},{
							"type": "form",
			                "obj": "memType",
			                "label": "成员类型",
			                "textType": "select",
			                "row": 2,
			                "multi": false,
			                "cols": 1,
			                "placeholder": "",
			                "edit": false,
			                "defaultVal": ['1'],
			                "maxSelected": 3,
			                "data": [{
			                    "text": "未定类别",
			                    "value": "1"
			                }, {
			                	 "text": "集团普通成员",
				                    "value": "2"
			                },{
			                	 "text": "高层领导/管理层",
				                    "value": "3"
			                }]
			            }],[{
			            	"type": "form",
			                "obj": "persionClass",
			                "label": "关键人物级别",
			                "textType": "select",
			                "row": 2,
			                "multi": false,
			                "cols": 1,
			                "placeholder": " ",
			                "edit": false,
			                "defaultVal": ['1'],
			                "maxSelected": 4,
			                "data": [{
			                    "text": "未知",
			                    "value": "1"
			                }, {
			                	 "text": "集团钻",
				                    "value": "2"
			                },{
			                	 "text": "集团金",
				                    "value": "3"
			                },{
			                	 "text": "集团银",
				                    "value": "4"
			                }]
			            },{
			            	"type": "date",
							"obj": "brd",
							"label": "提醒生日日期",
							"value":"1995-1-1",
							"textType": "date",
							
							"format": "Y-m-d"
						}],[{
							"type": "form",
			                "obj": "brs",
			                "label": "生日提醒短信",
			                "textType": "select",
			                "row": 2,
			                "multi": false,
			                "cols": 1,
			                "placeholder": " ",
			                "edit": false,
			                "defaultVal": ['1'],
			                "maxSelected": 3,
			                "data": [{
			                    "text": "是",
			                    "value": "1"
			                }, {
			                	 "text": "否",
				                    "value": "2"
			                }]
			            }],[{
			            	"type": "form",
							"obj": "memRemarks",
							"label": "成员说明",
							"textType": "input",
							"placeholder": " ",
							"validate": {}
						}],[{
						"type": "form",
						"obj": "l41",
						"textType": "buttonGroup",
						"size": "small",
						"btnGroupAlign": "center",
						"data": [{
							"id": 1,
							"text": "修改",
							"plain": false,
							"buttonType": "primary",
							"icon": "",
							"disabled": false,
							"callbackClick": function (self,id) {
							    var keyer = self.jsonData();
								keyer["contactId"] = s ;
								var validate = self.validate();
			                    console.log(keyer);
			                    commonData.postData({
			                        serviceUrl: "/data/updateKeyer",
			                        serviceData:keyer,
			                        callback: function (result) {
			                            commonData.boxInfo({
											message:"修改成功",
											messageTitle:"提示",
											success:function (result) {
											},
											 type:'alert'
										});
			                            window.history.back(-1);
			                        },defaultCb:function(){
			                            commonData.boxInfo({
											message:"修改成功",
											messageTitle:"提示",
											success:function (result) {
											},
											 type:'alert'
										});
			                        }
			                    });
			                }
						}, {
							"id": 2,
							"text": "取消",
							"plain": false,
							"buttonType": "info",
							"icon": "",
							"disabled": false,
							"callbackClick": function (self, _this) {
								window.history.back(-1);
							}
						}],
						"initCallback": function (){},
					}]
				],
		
		"initCallback": function (module) {
			queryDemoForm = module;
		}
	});
	

	
	function queryButton_click(){
		if(!queryDemoForm.validate()) {
			return;
		}
		
		var formData = queryDemoForm.jsonData();
		
		initTable(formData);
	};
});
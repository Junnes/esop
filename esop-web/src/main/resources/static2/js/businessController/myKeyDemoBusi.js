define(['jquery', 'Module', 'commonData', 'common'], function($, Module, commonData, common) {
	
	var queryDemoForm;
	// 表单
	new Module({
		"type": "forms",
		"obj": "queryDemoForm",
		"cols": "",
		"inline": true,
		"title": "关键人",
		"titleAlign": "left",
		"labelPosition": "center",
		"labelWidth": "150",
		"data": [
			[{
				"type": "form",
				"obj": "customId",
				"size": "small",
				"disabled": false,
				"icon": "",
				"labelShow": false,
				"label": "手机号码：",
				"labelPosition": "right",
				"textType": "input",
				"row": 2,
				//"placeholder": "请输入内容",
				"callbackKeyup": function (e) {
					console.log('Focus!');
				},
				"callbackBlur": function (e) {
					console.log('Blur!');
				},
				"initCallback": function() {},
				"validate": {
					expression:"^[0-9]*$"
				}
			}, {}, {}],[{
				"type": "form",
				"obj": "button-default",
				"textType": "button",
				"size": "middle",
				"text": "查询",
				"buttonType": "primary", //text primary
				"callbackClick": queryButton_click
			},{
                "type": "form",
                "obj": "button-default1",
                "textType": "button",
                "size": "middle",
                "text": "新增",
                "buttonType": "primary", //text primary
                "callbackClick": function (){
                    if(!queryDemoForm.validate()) {
                        return;
                    }
                    var customer = queryDemoForm.jsonData();
                    console.log(customer);
                    commonData.postData({
                        serviceUrl: "/demo/addSmallCustomer",
                        serviceData:customer,
                        callback: function (result) {
                            console.log(result);
                            alert("添加成功 ");
                        }
                    });
                }
            }]
		],
		
		"initCallback": function (module) {
			queryDemoForm = module;
		}
	});
	
	
	// 自定义表格 多选
	function initTable(initDataParam) {
		new Module({
			"type": "table",
			"obj": "queryDemoTable",
			"pagination": true,
			"headHighlight": true,
			"tableShadow": true,
			"pageAlign": 'right',
			"pageUrl": '',
			"pageOpt": {
				"maxNum": 5,
				"length": 5,
				"nowPage": 1,
				"pageSize": 5,
				"str": 'page',
				"obj": "table"
			},
			"buttonConfig": true,
			"buttonColWidth": 200,
			"buttonCol": [{
				"type": "修改",
				"size": "mini",
				"callbackClick": function (self, id) {
					alert("修改集团编号： "+id);
					commonData.postData({
						serviceUrl: "/demo/findCustomerId",
						serviceData:{id:id},
						callback: function (result) {
							if(result){
							initTable2(result);
						}
							}
					});
				}
			},{
				"type": "删除",
				"size": "mini",
				"buttonType": "primary",
				"callbackClick": function (self, id) {
					alert("删除 "+id+"成功！");
					commonData.postData({
						serviceUrl: "/demo/deleteSmallCustomer",
						serviceData:{id:id},
						callback: function (result) {
							if(result){
								queryButton_click();
							}
						}
					});
				}
			}],
			"checkboxConfig": true,
			//"checkboxValue":"选择",
			"checkboxIcon":'circle',
			"checkboxColWidth": 100,
			"indexConfig": false,
			"indexColWidth": 100,
			"thHead": [{
				"name": "手机号码",
				"colId": "customId"
			},  {
				"name": "客户名称",
				"colId": "customId"
			}, {
				"name": "集团编号",
				"colId": "customId"
			}, {
				"name": "所属集团",
				"colId": "customName"
			}, {
				"name": '是否是联系人',
				"colId": "customLaderName"
			}, {
				"name": '是否是关键人',
				"colId": "createTime"
			}, {
				"name": '是否是普通成员',
				"colId": "customType"
			}, {
				"name": "用户星级",
				"colId": "status"
			}, {
				"name": "加入集团时间",
				"colId": "status"
			}
			, {
				"name": "成员类型",
				"colId": "status"
			}, {
				"name": "职位",
				"colId": "status"
			}, {
				"name": "说明",
				"colId": "status"
			}, {
				"name": "用户状态",
				"colId": "status"
			}, {
				"name": "客户经理",
				"colId": "status"
			}, {
				"name": "客户经理电话",
				"colId": "status"
			}],
			"initDataUrl" : "/demo/loadSmallCustomer",
			"initDataParam" : initDataParam,
			"callbackRowClick": function (self) {
			}
		});
		
	}

	//修改
	function initTable2(data) {
		new Module({
			"type": "forms",
			"obj": "queryDemoForm",
			"cols": "",
			"inline": true,
			"title": "修改信息",
			"titleAlign": "left",
			"labelPosition": "center",
			"labelWidth": "150",
			"data": [
				[{
					"type": "form",
					"obj": "customId",
					"size": "small",
					"disabled": false,
					"labelShow": false,
					"label": "集团编号",
					"labelPosition": "right",
					"textType": "input",
					"row": 2,
					"value":data.customId,
					"placeholder": "请输入内容",
					"callbackKeyup": function (e) {
						console.log('Focus!');
					},
					"callbackBlur": function (e) {
						console.log('Blur!');
					},
					"initCallback": function() {},
					"validate": {
						expression:"^[0-9]*$"
					}
				}, {
					"type": "form",
					"obj": "customName",
					"size": "small",
					"label": "集团名称",
					"textType": "input",
					"value":data.customName,
					"placeholder": "请输入内容",
					"validate": "^[a-zA-Z]*$"
				}, {
					"type": "form",
					"obj": "customLaderName",
					"size": "small",
					"label": "客户经理名字",
					"value":data.customLaderName,
					"textType": "input",
					"placeholder": "请输入内容"
				}],
				[{
	                "type": "date",
	                "obj": "createTime",
	                "label": "创建日期",
	                "format": 'Y-m-d',
	                "value":data.createTime,
	                "textType": "input",
					"placeholder": "请输入内容",
	            },{
	                "type": "form",
	                "obj": "customType",
	                "labelShow": false,
	                "size": "small",
	                "disabled": false,
	                "label": "集团类型",
	                "value":data.customType,
	                "labelPosition": "right",
	                "textType": "select",
	                "row": 2,
	                "multi": false,
	                "cols": 1,
	                "placeholder": "请选择",
	                "edit": false,
	                "maxSelected": 5,
	                "data": [{
	                    "id": 1,
	                    "value": 1
	                }, {
	                    "id": 2,
	                    "value": 2
	                }, {
	                    "id": 3,
	                    "value": 3
	                }, {
	                    "id": 4,
	                    "value": 4
	                }],
	                "initCallback": function() {}
	            },{
	                "type": "form",
	                "obj": "status",
	                "size": "small",
	                "label": "审批状态",
	                "labelShow": false,
	                
	                "labelWidth": 150,
	                "labelPosition": "right",
	                "radioType": "button",
	                "textType": "radio",
	                "radioBorder": false,
	                "value": data.status,
	                "data": [{
	                    "id": true,
	                    "value": "通过",
	                    "disabled": false
	                }, {
	                    "id": false,
	                    "value": "未通过",
	                    "disabled": false
	                }],
	                "initCallback": function() {}
	            }, {
	                "type": "form",
	                "obj": "button-default",
	                "textType": "button",
	                "size": "small",
	                "text": "修改",
	                "buttonType": "primary", //text primary
	                "callbackClick": function (){
	                    if(!queryDemoForm.validate()) {
	                        return;
	                    }
	                    var customer = queryDemoForm.jsonData();
	                    console.log(customer);
	                    commonData.postData({
	                        serviceUrl: "/demo/updateSmallCustomer",
	                        serviceData:customer,
	                        callback: function (result) {
	                            console.log(result);
	                            alert("修改成功 ");
	                        }
	                    });
	                }
	            }]
			],
			
			"initCallback": function (module) {
				queryDemoForm = module;
			}
		});
		
	}
	
	
	//initTable({});
	
	function queryButton_click(){
		if(!queryDemoForm.validate()) {
			return;
		}
		
		var formData = queryDemoForm.jsonData();
		
		initTable(formData);
	};
});
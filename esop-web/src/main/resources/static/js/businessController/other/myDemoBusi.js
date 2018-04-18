define(['jquery', 'Module', 'commonData', 'common'], function($, Module, commonData, common) {
	
	var queryDemoForm;
	var a;
	// 表单
	new Module({
		"type": "forms",
		"obj": "queryDemoForm",
		"cols": "",
		"inline": true,
		"title": "员工查询",
		"titleAlign": "left",
		"labelPosition": "center",
		"labelWidth": "150",
		"data": [
			[{
				"type": "form",
				"obj": "employeeId",
				"size": "small",
				"disabled": false,
				"icon": "",
				"labelShow": false,
				"label": "员工编号",
				"labelPosition": "right",
				"textType": "input",
				"row": 2,
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
				"obj": "employeeName",
				"size": "small",
				"label": "员工姓名",
				"textType": "input",
				"placeholder": "请输入内容",
				"validate": "^[a-zA-Z]*$"
			}, {
				"type": "form",
				"obj": "age",
				"size": "small",
				"label": "年龄",
				"textType": "input",
				"placeholder": "请输入内容"
			}],
			[{
                "type": "date",
                "obj": "entryDate",
                "label": "入职日期",
                "format": 'Y-m-d',
                /*"value":"1995-1-1",*/
                "textType": "input",
				"placeholder": "请输入内容",
            },{
                "type": "form",
                "obj": "departmentName",
                "labelShow": false,
                "size": "small",
                "disabled": false,
                "label": "所属部门",
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
                    "value": "人事"
                }, {
                    "id": 2,
                    "value": "研发"
                }, {
                    "id": 3,
                    "value": "销售"
                }, {
                    "id": 4,
                    "value": "财务"
                }],
                "initCallback": function() {}
            },{
                "type": "form",
                "obj": "gender",
                "size": "small",
                "label": "性别",
                "labelShow": false,
                "labelWidth": 150,
                "labelPosition": "right",
                "radioType": "button",
                "textType": "radio",
                "radioBorder": false,
                "value": "true",
                "data": [{
                    "id": true,
                    "value": "男",
                    "disabled": false
                }, {
                    "id": false,
                    "value": "女",
                    "disabled": false
                }],
                "initCallback": function() {}
            }, {
				"type": "form",
				"obj": "button-default",
				"textType": "button",
				"size": "small",
				"text": "查询",
				"buttonType": "primary", //text primary
				"callbackClick": queryButton_click
				
				
			},{
                "type": "form",
                "obj": "button-default",
                "textType": "button",
                "size": "small",
                "text": "增加",
                "buttonType": "primary", //text primary
                "callbackClick": function (){
                    if(!queryDemoForm.validate()) {
                        return;
                    }
                    var employee = queryDemoForm.jsonData();
                    console.log(employee);
                    commonData.postData({
                        serviceUrl: "/demo/addSmallEmployee",
                        serviceData:employee,
                        callback: function (result) {
                            console.log(result);
                            alert("添加成功 ");
                            if(result){
								queryButton_click();
							}
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
			"title": "查询结果",
			"titleAlign": "left",
			"size":"mini",
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
					alert("修改   员工编号： "+id);
					commonData.postData({
						serviceUrl: "/demo/findEmployeeId",
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
					alert("删除员工编号： "+id);
					commonData.postData({
						serviceUrl: "/demo/deleteSmallEmployee",
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
			"checkboxIcon":'circle',
			"checkboxColWidth": 100,
			"indexConfig": false,
			"indexColWidth": 100,
			"thHead": [{
				"name": "员工编号",
				"colId": "employeeId"
			}, {
				"name": "员工姓名",
				"colId": "employeeName"
			}, {
				"name": '年龄',
				"colId": "age"
			}, {
				"name": '入职日期',
				"colId": "entryDate"
			}, {
				"name": '所属部门',
				"colId": "departmentName"
			}, {
				"name": "性别",
				"colId": "gender"
			}],
			"initDataUrl" : "/demo/loadSmallEmployee",
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
			"title": "员工查询",
			"titleAlign": "left",
			"labelPosition": "center",
			"labelWidth": "150",
			"data": [
				[{
					"type": "form",
					"obj": "employeeId",
					"size": "small",
					"disabled": false,
					"icon": "",
					"labelShow": false,
					"label": "员工编号",
					"value": data.employeeId,
					"disabled": false,
					"labelPosition": "right",
					"textType": "input",
					"row": 2,
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
					"obj": "employeeName",
					"size": "small",
					"label": "员工姓名",
					"value": data.employeeName,
					"textType": "input",
					"placeholder": "请输入内容",
					"validate": "^[a-zA-Z]*$"
				}, {
					"type": "form",
					"obj": "age",
					"size": "small",
					"label": "年龄",
					"value": data.age,
					"textType": "input",
					"placeholder": "请输入内容"
				}],
				[{
	                "type": "date",
	                "obj": "entryDate",
	                "label": "入职日期",
	                "value": data.entryDate,
	                "format": 'Y-m-d',
	                /*"value":"1995-1-1",*/
	                "textType": "input",
					"placeholder": "请输入内容",
	            },{
	                "type": "form",
	                "obj": "departmentName",
	                "labelShow": false,
	                "size": "small",
	                "disabled": false,
	                "label": "所属部门",
	                "value": data.departmentName,
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
	                    "value": "人事"
	                }, {
	                    "id": 2,
	                    "value": "研发"
	                }, {
	                    "id": 3,
	                    "value": "销售"
	                }, {
	                    "id": 4,
	                    "value": "财务"
	                }],
	                "initCallback": function(module) {
	                	a= module;
//	                	console.log(a.jsonData());
	                	alert("你好世界");
	                }
	            },{
	                "type": "form",
	                "obj": "gender",
	                "size": "small",
	                "label": "性别",
	                "value": data.gender,
	                "labelShow": false,
	                "labelWidth": 150,
	                "labelPosition": "right",
	                "radioType": "button",
	                "textType": "radio",
	                "radioBorder": false,
	                "value": "true",
	                "data": [{
	                    "id": true,
	                    "value": "男",
	                    "disabled": false
	                }, {
	                    "id": false,
	                    "value": "女",
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
	                    var employee = queryDemoForm.jsonData();
	                    console.log(employee);
	                    commonData.postData({
	                        serviceUrl: "/demo/updateSmallEmployee",
	                        serviceData:employee,
	                        callback: function (result) {
	                            console.log(result);
	                            alert("修改成功 ");
	                            window.location.href="http://localhost:9001/pages/myDemo.html";
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
define(['jquery', 'Module', 'commonData', 'common'], function($, Module, commonData, common) {
	var queryManagerForm;
	var addManagerForm;
	var managerTable;
	var updateForm;
	var area;
	function initTable(initDataParam) {
		new Module({
			"type": "table",
			"obj": "queryManagerTable",
			"title": "集团客户经理管理",
			"titleType":"1",
			"titleAlign": "left",
			"multi":false,
			"size":"mini",
			"headHighlight": true,
			"tableShadow": true,
			"pagination": true,
			"pageAlign": 'right',
			"initDataUrl" : "/data/loadGroupManagerRelationModel",
			"initDataParam" : initDataParam,
			"pageOpt": {
				"maxNum": 5,
				"length": 5,
				"nowPage": 1,
				"pageSize": 5,
				"str": 'page',
				"obj": "table"
			},
			"headButton":true,
			"headButtonData": [{
				"type": "新增",
				"size": "small",
				"buttonType": "",
				"callbackClick": function (self) {
					initAddInfo();
				}
			},{
				"type": "修改",
				"size": "small",
				"buttonType": "",
				"callbackClick": function (self) {
					var arr = self._getCheckedRow();
					if(arr.length<1){
						commonData.warnBox({
							message:"请选中一条记录！",
							messageTitle:"提示",
							success:function(){},
						});
					}else{
						var line = self._getRowData(arr[0]);
						initUpdate(line);
					}
					
				}
			},{
				"type": "删除",
				"size": "small",
				"buttonType": "",
				"callbackClick": function (self) {
					
					var arr = self._getCheckedRow();
					if(arr.length<1){
						commonData.warnBox({
							message:"请选中一条记录！",
							messageTitle:"提示",
							success:function(){},
						});
					}else{
						commonData.confirmBox({
							message:"确认删除这条记录？",
							messageTitle:"提示",
							success:function(){
								commonData.postData({
									serviceUrl:"/data/deleteCmGroupMagRel",
									serviceData:{"id":arr[0]},
									callback:function(result){
										commonData.successBox({
											message:"删除成功！",
											messageTitle:"提示",
											success:function(){},
										});
										initTable({"id":"88888888"});
									},defaultCb:function(result){
										commonData.errorBox({
											message:"操作失败"+result.message,
											messageTitle:"提示",
											success:function(){}
										});
									}
								});
							},
							cancel:function(){}
						});
					}
				}
			}],
			"checkboxConfig": true,
			"checkboxIcon":'circle',
			"checkboxColWidth": 100,
			"indexConfig": false,
			"indexColWidth": 100,
			"thHead": [{
				"name": "经理编号",
				"colId": "bcMgr",
				"width":200
			}, {
				"name": "经理姓名",
				"colId": "staffName",
				"width":200
			}, {
				"name": '服务关系',
				"colId": "serviceRel",
				"width":200
			}, {
				"name": '移动电话',
				"colId": "billId",
				"width":200
			}, {
				"name": '电子邮箱',
				"colId": "email",
				"width":200
			}],
			"callbackRowClick": function (self) {
			}
		});
		
	}; //initTable() end
	
	
	
	function initAddInfo(){
		new Module({
			"type":"forms",
			"obj":"queryManagerTable",
			"titleType":"1",
			"inline": true,
			"title": "客户经理新增信息",
			"titleAlign": "left",
			"labelPosition": "center",
			"labelWidth": "150",
			"data":[[{
				"type": "form",
				"obj": "managerType",
				"labelShow": false,	
				"size": "",
				"required": true,
				"label": "经理类型",
				"labelPosition": "right",
				"textType": "select",
				"row": 2,
				"multi": false,
				"cols": 1,
				"placeholder": "客户经理",
				"edit": false,
				"disabled":true,
				"maxSelected": 5,				
				"callbackClick": function (valArr, val) {
					console.log(valArr,'+',val);
				},
				"initCallback": function() {}
			},{
				"type": "form",
				"obj": "managerId",
				"size": "small",
				"disabled": false,
				"rightButtonText":"",
				// "icon": "sousuo",
				"labelShow": false,
				"label": "客户经理",
				"labelWidth":100,
				"labelPosition": "right",
				"textType": "input",
				"row": 2,
				"placeholder": " ",
				"value": "",
				"required": true,
				"validate": "^[0-9]+$",
				"rightButton": true,
				"rightIcon": "sousuo",
				"rightButtonClick": function (self) {
					initQuery();
				},
				"callbackKeyup": function (e) {
					console.log('Focus!');
				},
				"callbackBlur": function (e) {
					console.log('Blur!');
				},
				"initCallback": function() {}
			}],[{
				"type": "form",
				"obj": "serviceRel",
				"labelShow": false,
				"size": "",
				"disabled": false,
				"required": true,
				"label": "服务关系",
				"labelPosition": "right",
				"textType": "select",
				"row": 2,
				"multi": false,
				"cols": 1,
				"defaultVal":"1",
				"initDataUrl":"/base/getEnumList",
				"initDataParam":{"tableName":"CM_GROUP_MAG_REL","colName":"SERVICE_REL"},
				"edit": false,
				"maxSelected": 5,				
				"callbackClick": function (valArr, val) {
					console.log(valArr,'+',val);
				},
				"initCallback": function() {}
			}],[{
				"type": "form",
				"obj": "btn",
				"textType": "buttonGroup",
				"size": "medium",
				"btnGroupAlign": "center",
				"data": [{
					"id": 1,
					"text": "新增",
					"plain": false,
					"buttonType": "primary",
					"icon": "",
					"disabled": false,
					"callbackClick": function (id) {
						if(!addManagerForm.validate()) {
							return;
						}
						var format = addManagerForm.jsonData();
						console.log(format);
						commonData.postData({
							serviceUrl:"/data/addCmGroupMagRel",
							serviceData:format,
							callback:function(result){
								commonData.successBox({
									message:"新增成功！",
									messageTitle:"提示",
									success:function(){},
								});
								initTable({"id":"88888888"});
							},defaultCb:function(result){
								commonData.errorBox({
									message:"操作失败"+result.message,
									messageTitle:"提示",
									success:function(){},
								});
							}
						});
					}
				}, {
					"id": 2,
					"text": "返回",
					"plain": false,
					"buttonType": "primary",
					"icon": "",
					"disabled": false,
					"callbackClick": function (self) {
						initTable({"id":"88888888"});
					}
				}],
				"initCallback": function () {}
			}]],
			"initCallback": function (module) {
				addManagerForm = module;
			}
		});
	}; //initAddInfo() end
	
	function initUpdate(data){
		new Module({
			"type":"forms",
			"obj":"queryManagerTable",
			"inline": true,
			"title": "客户经理修改信息",
			"titleAlign": "left",
			"titleType":"1",
			"labelPosition": "center",
			"labelWidth": "150",
			"data":[[{
				"type": "form",
				"obj": "managerType",
				"labelShow": false,	
				"size": "",
				"required": true,
				"label": "经理类型",
				"labelPosition": "right",
				"textType": "select",
				"row": 2,
				"multi": false,
				"cols": 1,
				"placeholder": "客户经理",
				"edit": false,
				"disabled":true,
				"maxSelected": 5,				
				"callbackClick": function (valArr, val) {
					console.log(valArr,'+',val);
				},
				"initCallback": function() {}
			},{
				"type": "form",
				"obj": "managerId",
				"size": "small",
				"disabled": false,
				"rightButtonText":"",
				// "icon": "sousuo",
				"labelShow": false,
				"label": "客户经理",
				"labelWidth":100,
				"labelPosition": "right",
				"textType": "input",
				"row": 2,
				"placeholder": "",
				"value": "",
				"required": true,
				"validate": "^[0-9]+$",
				"rightButton": true,
				"rightIcon": "sousuo",
				"rightButtonClick": function (self) {
					initQuery();
				},
				"callbackKeyup": function (e) {
					console.log('Focus!');
				},
				"callbackBlur": function (e) {
					console.log('Blur!');
				},
				"initCallback": function() {}
			}],[{
				"type": "form",
				"obj": "serviceRel",
				"labelShow": false,
				"size": "",
				"disabled": false,
				"required": true,
				"label": "服务关系",
				"labelPosition": "right",
				"textType": "select",
				"row": 2,
				"multi": false,
				"cols": 1,
				"placeholder": " ",
				"initDataUrl":"/base/getEnumList",
				"initDataParam":{"tableName":"CM_GROUP_MAG_REL","colName":"SERVICE_REL"},
				"edit": false,
				"maxSelected": 5,				
				"callbackClick": function (valArr, val) {
					console.log(valArr,'+',val);
				},
				"initCallback": function() {}
			}],[{
				"type": "form",
				"obj": "btn",
				"textType": "buttonGroup",
				"size": "medium",
				"btnGroupAlign": "center",
				"data": [{
					"id": 1,
					"text": "修改",
					"plain": false,
					"buttonType": "primary",
					"icon": "",
					"disabled": false,
					"callbackClick": function (id) {
						if(!updateForm.validate()) {
							return;
						}
						var format = updateForm.jsonData();
						var newJson = 

	{"relId":data.rowId,"managerId":format.managerId,"serviceRel":format.serviceRel};
						console.log(newJson);
						commonData.postData({
							serviceUrl:"/data/updateCmGroupMagRel",
							serviceData:newJson,
							callback:function(result){
								commonData.successBox({
									message:"修改成功",
									messageTitle:"提示",
									success:function(){},
								});
								initTable({"id":"88888888"})
							},defaultCb:function(result){
								commonData.errorBox({
									message:"修改失败"+result.message,
									messageTitle:"提示",
									success:function(){},
								});
							}
						});
					}
				}, {
					"id": 2,
					"text": "返回",
					"plain": false,
					"buttonType": "primary",
					"icon": "",
					"disabled": false,
					"callbackClick": function (self) {
						initTable({"id":"88888888"});
					}
				}],
				"initCallback": function () {}
			}]],
			"initCallback":function(self){
				if(data.serviceRel=="主要服务"){
					data.serviceRel=1;
				}else if(data.serviceRel=="辅助服务"){
					data.serviceRel=2;
				}else{
					data.serviceRel = 3;
				}
					
				console.log(data);
				updateForm = self;
				updateForm.setData({
					"managerId":data.bcMgr,
					"serviceRel":data.serviceRel,
				});
			}
		});
	};//initUpdate() end
	 
	
	function initQuery(){
		new Module({
			"type": "forms",
			"obj": "queryManagerTable",
			"inline": true,
			"title": "客户经理查询",
			"titleAlign": "left",
			"titleType":"1",
			"labelPosition": "center",
			"labelWidth": "150",
			"data": [
				[{
					"type": "form",
					"obj": "bcMgr",
					"size": "small",
					"disabled": false,
					"icon": "",
					"labelShow": false,
					"label": "客户经理编号",
					"labelPosition": "right",
					"textType": "input",
					"row": 2,
					"placeholder": " ",
					"callbackKeyup": function (e) {
						console.log('Focus!');
					},
					"callbackBlur": function (e) {
						console.log('Blur!');
					},
					"initCallback": function(obj) {},
					"validate": {
						expression:"^[0-9]*$",
						text:"aaaaaaa"
					}
				}, {
					"type": "form",
					"obj": "staffName",
					"size": "small",
					"label": "客户经理名称",
					"textType": "input",
					"placeholder": " ",
					//"validate": "^[a-zA-Z]*$"
				}, {
					"type": "form",
					"obj": "managerType",
					"labelShow": false,
					"size": "small",
					"disabled": false,
					"label": "客户经理类型",
					"labelPosition": "right",
					"textType": "select",
					"row": 2,
					"multi": false,
					"cols": 1,
					"placeholder": "请选择",
					"edit": false,
					"maxSelected": 5,
					"initDataUrl" : "/base/getEnumList",
					"initDataParam":{"tableName":"CM_MANAGER","colName":"MANAGER_TYPE"},
					"callbackKeyup": function (e) {
						console.log('Focus!');
					},
					"callbackBlur": function (e) {
						console.log('Blur!');
					},
					"callbackClick": function (valArr, val) {
						console.log(valArr,'+',val);
					},
					"initCallback": function() {}
				}],
				[{
					"type": "form",
					"obj": "cityId",
					"labelShow": false,
					"size": "small",
					"disabled": false,
					"label": "归属地市",
					"labelPosition": "right",
					"textType": "select",
					"reset":"true",
					"row": 2,
					"multi": false,
					"cols": 1,
					"placeholder": "",
					"edit": false,
					"maxSelected": 5,
					"initDataUrl" : "/base/getDistrict",
					"initDataParam":{
						"parentDistrictId":"-1",
					},
					"callbackKeyup": function (e) {
						console.log('Focus!');
					},
					"callbackBlur": function (e) {
						console.log('Blur!');
					},
					"callbackClick": function (valArr, val) {
						area._setSelectUrlData("/base/getDistrict", {"parentDistrictId":val});
					},
					"initCallback": function() {}
				},{
					"type": "form",
					"obj": "countyId",
					"labelShow": false,
					"size": "small",
					"disabled": false,
					"label": "归属区县",
					"labelPosition": "right",
					"textType": "select",
					"row": 2,
					"multi": false,
					"cols": 1,
					"placeholder": "请选择",
					"edit": false,
					"maxSelected": 5,
					//"initDataUrl" : "",
					"callbackKeyup": function (e) {
						console.log('Focus!');
					},
					"callbackBlur": function (e) {
						console.log('Blur!');
					},
					"callbackClick": function (valArr, val) {
						console.log(valArr,'+',val);
					},
					"initCallback": function(self) {
						 area = self;
					}
				}],[{},{
					"type": "form",
					"obj": "queryBtn",
					"textType": "button",
					"size": "",
					"disabled": false,
					"icon": "",
					"plain": false,
					"text": "查询",
					"buttonType": "primary", //text primary
					"initCallback": function () {},
					"callbackClick": queryBtn_click
				}]],
			"initCallback": function (module) {
				queryManagerForm = module;
			}
		});
	} //initQuery() end
	
	function queryBtn_click(){
		if(!queryManagerForm.validate()) {
			return;
		}
		
		var format = queryManagerForm.jsonData();
		console.log(format);
		queryManagerTable(format);
	};
	
	function queryManagerTable(initDataParam){
		new Module({
			"type": "table",
			"obj": "queryTable",
			"title": "客户经理查询结果",
			"multi":false,
			"titleAlign": "left",
			"size":"mini",
			"headHighlight": true,
			"tableShadow": true,
			"pagination": true,
			"pageAlign": 'right',
			"initDataUrl" : "/data/loadManager",
			"initDataParam" : initDataParam,
			"pageOpt": {
				"maxNum": 5,
				"length": 5,
				"nowPage": 1,
				"pageSize": 5,
				"str": 'page',
				"obj": "table"
			},
			"checkboxConfig": true,
			"checkboxIcon":'circle',
			"checkboxColWidth": 100,
			"indexConfig": false,//
			"indexColWidth": 100,
			"thHead": [{
				"name": "客户经理编号",
				"colId": "bcMgr",
				"width":200
			}, {
				"name": "客户经理姓名",
				"colId": "staffName",
				"width":200
			}, {
				"name": '客户经理手机',
				"colId": "billId",
				"width":200
			}, {
				"name": '组织编号',
				"colId": "orgId",
				"width":200
			}, {
				"name": '受理地市',
				"colId": "cityId",
				"width":200
			}, {
				"name": "县区",
				"colId": "countyId",
				"width":200
			}],
			"callbackRowClick": function (self) {
				console.log(self);
			}
		});
	};
	
	
	
	initTable({"id":"88888888"});
});//define() end
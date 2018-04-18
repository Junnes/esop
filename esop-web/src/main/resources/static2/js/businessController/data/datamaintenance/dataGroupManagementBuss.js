define(['jquery', 'Module', 'commonData', 'common'], function($, Module, commonData, common) {

//  创建form表单
	var groupFormsData;
	var groupTableData;
	var testTableData;
	initForms();
	initTable();

	function initForms(initViewParam){
		new Module({
			"type": "forms",
			"obj": "dataGroupManageMentForms",
			"inline":true,
			"title" :"集团查询",
			"titleAlign": "left",
			"labelPosition":"center",
			"labelWidth":"150",
			"titleType":"1",
			"size":"mini",
			"data":[		        
	          [{
	       		"type": "form",
	       		"obj": "customerId",
	       		"size": "small",
	       		"disabled": false,
	       		"icon": "",
	       		"labelShow": false,
	       		"label": "集团编号",
	       		"labelPosition": "right",
	       		"textType": "input",
	       		"row": 2,
	       		"placeholder": "请输入集团编号",
	       		"callbackKeyup": function (e) {
	       			console.log('Focus!');
	       		},
	       		"callbackBlur": function (e) {
	       			console.log('Blur!');
	       		},
	       		"initCallback": function() {},
	       		"validate": {
//	       			expression:"^[0-9]*$"
	       		}
	          },
	          {
	      		"type": "form",
	      		"obj": "custName",
	      		"size": "small",
	      		"disabled": false,
	      		"icon": "",
	      		"labelShow": false,
	      		"label": "集团名称",
	      		"labelPosition": "right",
	      		"textType": "input",
	      		"row": 2,
	      		"placeholder": "请输入集团名称",
	      		"initCallback": function() {
	      		},
	         },
	         {
	        		"type": "form",
	        		"obj": "customLaderName",
	        		"size": "small",
	        		"disabled": false,
	        		"icon": "",
	        		"labelShow": false,
	        		"label": "客户经理名称",
	        		"labelPosition": "right",
	        		"textType": "input",
	        		"row": 2,
	        		"placeholder": "请输入客户经理名称",
	        		"initCallback": function() {},
	           }],
	           [{
					"type": "form",
					"obj": "cityCode",
					"labelShow": false,
					"size": "small",
					"disabled": false,
					"label": "所在地市",
					"labelPosition": "right",
					"textType": "select",
					"row": 2,
					"multi": false,
					"cols": 1,
					"placeholder": "请选择",
					"edit": false,
					
//				      "initDataUrl":"/base/getEnumList",
//		               "initDataParam": {
//		                    "tableName":"CM_CUSTOMER",
//		                    "colName":"CITY_CODE"
//		                },
//		               "initCallback": function() {}
					
					  "initDataUrl":"/base/getDistrict",
		              "initDataParam":{
		                    "parentDistrictId":-1
		                },
		                "callbackClick": function (valArr, val) {
		                	county._setSelectUrlData("/base/getDistrict", {"parentDistrictId":val});
		                },
		                "callbackChange": function (valArr, val) {
		                	county._setSelectUrlData("/base/getDistrict", {"parentDistrictId":val});
		                },

					
					
					
					
				},{
					"type": "form",
					"obj": "countyCode",
					"labelShow": false,
					"size": "small",
					"disabled": false,
					"label": "所在县区",
					"labelPosition": "right",
					"textType": "select",
					"row": 2,
					"multi": false,
					"cols": 1,
					"placeholder": "请选择",
					"edit": false,
		                //"defaultVal": ['1'],
		             "initCallback": function (module) {
		                	county=module;
		             },
					
					
					
					
//					 "initDataUrl":"/base/getEnumList",
//		               "initDataParam": {
//		                    "tableName":"CM_CUSTOMER",
//		                    "colName":"COUNTY_CODE"
//		                },
//		               "initCallback": function() {}

				},
				{
					"type": "form",
					"obj": "button-default",
					"textType": "button",
					"size": "small",
					"text": "查询",
					"buttonType": "primary", //text primary
					"callbackClick": queryButton_click
				}]
	          ],
	          "initCallback": function(module){
	        	  groupFormsData = module;
	          }
		})
	}

	function queryButton_click(){
		if(!groupFormsData.validate()) {
			return;
		}
		var formData = groupFormsData.jsonData();
		
	
		initTable(formData);
//		groupFormsData.setData({
//			"customId":"888",
//			"customName":"ddd",
//			"customLaderName":"sss",
//			"cityName":"2",
//            "cities":"111"
//		});
		
	};

//  创建查询列表
	function initTable(initDataParam) {	

		var a;
		if(initDataParam == null){
			a= "";
			
		}else{
			
			a="/data/findCmCustomerInfo";
		}
		
		
		new Module({
			"type": "table",
			"obj": "dataGroupManageMentTable",
			"title": "查询结果",
			"titleAlign": "left",
			"size":"mini",
			"headHighlight": true,
			"tableShadow": true,
			"pagination": true,
			"pageAlign": 'right',
			"initDataUrl" : a,
			"multi":false,
			"initDataParam" : initDataParam,
			"headButton": true,
			"headButtonData": [{
				"type": "新建",
				"size": "mini",
				"buttonType": "",
				"callbackClick": function (self) {
//					window.location.href='CreateDataGroup.html'+;
					window.location.href='CreateDataGroup.html';
				}
			},{
				"type": "成员管理",
				"size": "mini",
				"buttonType": "",
				"callbackClick": function (self) {
//					self._delMultiRow();
//					alert("成员管理"+self._delMultiRow());
//					var c = self._getRowData();
				    var b = self._getCheckedRow();
					if(b != null && b.length>0){
						window.location.href='/pages/data/membermanagement/Key.html?customerId='+ b;
						}


				}
				},
				{
					"type": "查看",
					"size": "mini",
					"buttonType": "",
					"callbackClick": function (self) {
						
					    var b = self._getCheckedRow();
						if(b != null && b.length>0){
							window.location.href='/pages/data/datamaintenance/ShowDataGroup.html?customerId='+ b;
                        }

					}
				},
					{
				"type": "暂停",
				"size": "mini",
				"buttonType": "",
				"callbackClick": function (self) {
					
					if(self.checkedRow[0] != null){
						alert("暂停集团:"+self.checkedRow[0].custName);
						self._getCheckedRow.rowId;
						}

				}
				},{
					"type": "恢复",
					"size": "mini",
					"buttonType": "",
					"callbackClick": function (self) {
						
						if(self.checkedRow[0] != null){
							alert("恢复集团:"+self.checkedRow[0].custName);
							self._getCheckedRow.rowId;
							}
						
					}
					},
					{
						"type": "注销",
						"size": "mini",
						"buttonType": "",
						"callbackClick": function (self) {
							
							if(self.checkedRow[0] != null){
								alert("注销集团:"+self.checkedRow[0].custName);
								self._getCheckedRow.rowId;
								}
							
						}
						},
						{
							"type": "预删除",
							"size": "mini",
							"buttonType": "",
							"callbackClick": function (self, id) {
								alert("delete"+id);
							}
					   },
							{
								"type": "其他",
								"size": "mini",
								"buttonType": "",
								"callbackClick": function (self) {}
								},
							{
								"type": "导出",
								"size": "mini",
								"buttonType": "",
								"callbackClick": function (self) {}
							}],
			"headButtonAlign": "right",
			

			
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
					alert("update"+id);

					
					window.location.href='/pages/data/datamaintenance/CreateDataGroup.html';
			       
//			        location.href="http://localhost:19001/pages/data/datamaintenance/CreateDataGroup.html?"+"customerId="+id;
				}
			},{
				"type": "删除",
				"size": "mini",
				"buttonType": "primary",
				"callbackClick": function (self, id) {
					alert("delete"+id);
					var formData = groupFormsData.jsonData();
					commonData.postData({
						serviceUrl: "/data/deleteCmCustomerInfoById",
						serviceData:{
							
							"customerId":id,
							
						},
//						serviceData: $.extend({
//							pageSize: 5,
//							page: 0
//						}, formData),
						callback: function (result) {
							console.log(result);
							initTable();

							
						}
					});
				}
			}],
			"checkboxConfig": true,
			"checkboxIcon":'circle',
			"checkboxColWidth": 100,
			"indexConfig": false,//
			"indexColWidth": 100,
			"thHead": [{
				"name": "集团编号",
				"colId": "customerId",
				"width":200
			}, {
				"name": "集团名称",
				"colId": "custName",
				"width":200
			}, {
				"name": '客户经理',
				"colId": "customLaderName",
				"width":200
			}, {
				"name": '创建时间',
				"colId": "createDate",
				"width":200
			}, {
				"name": '集团状态',
				"colId": "custStatus",
				"width":200
			}, {
				"name": "审批状态",
				"colId": "state",
				"width":200
			}],
			"callbackRowClick": function (self) {
			},
			
			
	        "initCallback": function(module){
	        	testTableData = module;
	          }
		});
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
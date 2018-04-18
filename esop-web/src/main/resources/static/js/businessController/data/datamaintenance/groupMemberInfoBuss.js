define(['jquery', 'Module', 'commonData', 'common'], function($, Module, commonData, common) {

//  创建form表单
	var groupFormsData;
	var groupTableData;
	var addGroupData;

	
	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	
	initForms();
	initTable();
	
	
	function initForms(initViewParam){
		new Module({
			"type": "forms",
			"obj": "baseMemberInfo",
			"inline":false,
			"title" :"集团成员",
			"titleAlign": "left",
			"labelPosition":"center",
			"labelWidth":"150",
			"titleType":"1",
			"size":"mini",
			"data":[		        
	          [{
	       		
//	        	 "type": "fileUpload",
//	      		"obj": "file",
//	      		"labelShow": true,
//	      		"size": "small",
//	      		"labelWidth": "100",
//	      		"labelPosition": "right",
//	      		"rightButton": true,
//	      		"rightButtonText": '',
//	      		"rightIcon": "sousuo",
//	      		"value": '',
//	      		"url": '',
//	      		"initCallback": function (self) {},
//	      		"callbackChange": function (self) {},
//	      		"rightButtonClick": function () {}
	        	  
	        	"type": "form",
	       		"obj": "customId",
	       		"size": "small",
	       		"disabled": false,
	       		"icon": "",
	       		"labelShow": false,
	       		"label": "通讯录附件上传",
	       		"labelPosition": "right",
	       		"textType": "input",
	       		"row": 2,
	       		"placeholder": "",
	      		"rightButton": true,
	      		"rightButtonText": '',
	      		"rightIcon": "sousuo",
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
	          }
//	          ,
//				{
//					"type": "form",
//					"obj": "button-default",
//					"textType": "button",
//					"size": "small",
//					"text": "单个添加",
//					"buttonType": "primary", //text primary
//					"callbackClick": queryButton_click
//				}
//	          ,
//				{
//					"type": "form",
//					"obj": "button-default1",
//					"textType": "button",
//					"size": "small",
//					"text": "批量导入",
//					"buttonType": "primary", //text primary
//					"callbackClick": function (self) {
//					}
//			    }
				]
	          ],
	          "initCallback": function(module){
	        	  groupFormsData = module;
	          }
		})
	}



//  创建查询列表
	function initTable() {	
		var initDataParam={};

		initDataParam["customerId"] = GetQueryString("customerId");
		
		
		new Module({
			"type": "table",
			"obj": "groupMemberInfoTable",
			"size":"mini",
			"headHighlight": true,
			"tableShadow": true,
			"pagination": true,
			"pageAlign": 'right',
			"initDataUrl" : "/data/findContactInfoFromGroup",
            "initDataParam" : initDataParam,
			"multi":false,
			"headButton": true,
			"headButtonData": [{
				"type": "单个添加",
				"size": "mini",
				"buttonType": "",
				"callbackClick": function (self) {
					initAddFroms();
				}
			}
          ,
			{
        	     "type": "批量导入",
				"size": "mini",
				"buttonType": "",
				"callbackClick": function (self) {
				}
			}],
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
				"name": "成员编号",
				"colId": "contactId",
				"width":200
			}, {
				"name": "姓名",
				"colId": "contactName",
				"width":200
			}, {
				"name": '身份证号',
				"colId": "contCertCode",
				"width":200
			}, {
				"name": '	手机号',
				"colId": "telephone",
				"width":200
			}],
			"callbackRowClick": function (self) {
			}
		});
	}

//	contactName  contCertCode   telephone  customerId   contactId   contType  


	function initAddFroms(initDataParam) {	
		new Module({
			"type": "forms",
			"obj": "groupMemberInfoTable",
			"inline":true,
			"title" :"添加成员",
			"titleAlign": "left",
			"labelPosition":"center",
			"labelWidth":"150",
			"titleType":"1",
			"size":"mini",
			
			"data":[		        
	          [{
	       		"type": "form",
	       		"obj": "contactName",
	       		"size": "small",
	       		"disabled": false,
	       		"icon": "",
	       		"labelShow": false,
	       		"label": "成员姓名",
	       		"labelPosition": "right",
	       		"textType": "input",
	       		"row": 2,
	       		"placeholder": "",
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
	          },
	          {
	      		"type": "form",
	      		"obj": "contactId",
	      		"size": "small",
	      		"disabled": false,
	      		"icon": "",
	      		"labelShow": false,
	      		"label": "成员编号",
	      		"labelPosition": "right",
	      		"textType": "input",
	      		"row": 2,
	      		"placeholder": "",
	      		"initCallback": function() {
	      		},
	         }
	        ],
	           [ {
	        		"type": "form",
	        		"obj": "contCertCode",
	        		"size": "small",
	        		"disabled": false,
	        		"icon": "",
	        		"labelShow": false,
	        		"label": "身份证号码",
	        		"labelPosition": "right",
	        		"textType": "input",
	        		"row": 2,
	        		"placeholder": "",
	        		"initCallback": function() {},
	           },{
					"type": "form",
					"obj": "telephone",
					"labelShow": false,
					"size": "small",
					"disabled": false,
					"label": "手机号码",
					"labelPosition": "right",
					"textType": "input",
				}],
				[
					{
						"type": "form",
						"obj": "contType",
						"labelShow": false,
						"size": "small",
						"disabled": false,
						"label": "是否网内网外",
						"labelPosition": "right",
						"textType": "select",
						"row": 2,
			            "defaultVal": ['1'],
						"multi": false,
						"cols": 1,
						"placeholder": "请选择",
						"edit": false,
						"maxSelected": 5,
		                "data": [{
		              	"value": "1",
		               	"text": "网内成员"
	                 	}, {
		                	"value": "2",
			                "text": "网外成员"
		                }]
					}
					
				],
				
				[{
					"type": "form",
					"obj": "l41",
					"textType": "buttonGroup",
					"size": "small",
					"btnGroupAlign": "right",
					"data": [{
						"id": 1,
						"text": "导入",
						"plain": false,
						"buttonType": "primary",
						"icon": "",
						"disabled": false,
						"callbackClick": queryButton_click1
					}, {
						"id": 2,
						"text": "取消",
						"plain": false,
						"buttonType": "info",
						"icon": "",
						"disabled": false,
						"callbackClick":queryButton_click
					}]
				}]

	          ],
	          "initCallback": function(module){
	        	  addGroupData = module;
	          }
		})
	
	
	}

	// 取消返回
	function queryButton_click(){
		if(!groupFormsData.validate()) {
			return;
		}
		var formData = groupFormsData.jsonData();
		initTable();
		
	};
	
	
	// 导入
	function queryButton_click1(){
		if(!groupFormsData.validate()) {
			return;
		}
		
//		addContactInfoFromGroup
		var formData = addGroupData.jsonData();
//        var custId=common.getParmas("custId");

        formData["customerId"] = GetQueryString("customerId");
		
		commonData.postData({
			serviceUrl: "/data/addContactInfoFromGroup",
			serviceData:formData,
			callback: function (result) {
				console.log(result);
				
					initTable();

			}
		});
		

	};













});
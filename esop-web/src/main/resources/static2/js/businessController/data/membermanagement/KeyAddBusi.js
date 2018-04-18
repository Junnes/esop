define(['jquery', 'Module', 'commonData', 'common','messagebox'], function($, Module, commonData, common,messagebox) {
	
	var queryDemoForm;
	var county;
	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	// 关键人新增
/*	new Module({
		"type": "forms",
		"obj": "queryDemoForm",
		"cols": "",
		"inline": true,
		"title": "关键人",
		//"titleType" :"1",
		"titleAlign": "left",
		"labelPosition": "center",
		"labelWidth": "100",
		"data": [
			[{
				"type": "form",
				"obj": "telephone",
				"size": "small",
				"disabled": false,
				"icon": "",
				"labelShow": false,
				"label": "手机号码",
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
				"initCallback": function() {},
				"validate": {
					expression:"^[0-9]*$"
				}
			}, {
				"type": "form",
				"obj": "button-default",
				"textType": "button",
				"size": "small",
				"text": "查询",
				"buttonType": "primary", //text primary
				"callbackClick": queryButton_click
			},{}]
		],
		
		"initCallback": function (module) {
			queryDemoForm = module;
		}
	});
	initTable({});

	
	function initTable(initDataParam) {	
		var url;
		if( initDataParam == null){
			url = "";
		}else{
		url = "/data/ifExistKeyer";
		}*/
		new Module({
			"type": "forms",
			"obj": "formsInner",
			"title": "",
			"titleAlign": "left",
			"titleType": "1",
			"inline": true,
			"cols": "2",
			"labelPosition": "right",
			"labelWidth": 100,
			"data": [
			     	//---------基本信息-------------
				[{
					"type": "formsInner",
					"textType": "formsInner",
					"showShrink":true,
					"showAll":true,
					"innerCols":2,
					"obj": "l1",
					"title": "基本信息",
					"data": [{
						"id":"1",
						"obj": "contactName",
						"label": "客户名称",
						"required":true,
						"textType": "input",
						"placeholder": "  ",
						"validate": {}
					},{
						"type":"form",
						"id":"2",
		                "obj": "sex",
		                "label": "性别",
		                "required":true,
		                "reset":true,
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected":1,
		               "data": [{
		                    "text": "未知",
		                        "value": "1",
		                }, {
		                	 "text": "男",
			                    "value": "2",
		                },{
		                	 "text": "女",
			                    "value": "3",
		                }],
		               /* "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"SEX",
						},*/
		            },{
		            	"id":"3",
						"obj": "shortName",
						"label": "姓名简称",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"4",
		                "obj": "contCertType",
		                "label": "证件类型",
		                "required":true,
		                "textType": "select",
		                "reset":true,
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 4,
		                "data": [{
		                    "text": "身份证",
		                    "value": "1"
		                }, {
		                	 "text": "护照",
			                    "value": "2"
		                },{
		                	 "text": "军官证",
			                    "value": "3"
		                },{
		                	 "text": "户口簿",
			                    "value": "4"
		                }]
		              /*  "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"CONT_CERT_TYPE",
						},*/
					
		            },{
		            	"id":"5",
						"obj": "certEffectiveDate",
						"label": "生效时间",
						"textType": "date",
						"format": "Y-m-d"
					},{
						"id":"6",
						"obj": "certExpireDate",
						"label": "失效时间",
						"textType": "date",
						"format": "Y-m-d"
					},{
						"id":"7",
						"obj": "contCertCode",
						"label": "证件号码",
						"required":true,
						"textType": "input",
						"placeholder": "",
						"validate": {
							expression : "^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$"
								}
					},{
						"id":"8",
						"obj": "certAddress",
						"label": "证件地址",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"9",
						"obj": "company",
						"label": "工作单位",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"10",
						"obj": "companyAddress",
						"label": "单位地址",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"11",
		                "obj": "occupation",
		                "label": "职业",
		                "required":true,
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 7,
		                "data": [{
		                    "text": "未知",
		                    "value": "1"
		                }, {
		                	 "text": "其他",
			                    "value": "2"
		                },{
		                	 "text": "个体户/私营企业",
			                    "value": "3"
		                },{
		                	 "text": "机关干部",
			                    "value": "4"
		                },{
		                	 "text": "教师/医生/技术人员",
			                    "value": "5"
		                },{
		                	 "text": "工人/一般职业",
			                    "value": "6"
		                },{
		                	 "text": "司机",
			                    "value": "7"
		                }],
		              /*  "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"OCCUPATION",
						},*/

					
		            },{
		            	"id":"12",
						"obj": "department",
						"label": "工作部门",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"13",
		                "obj": "position",
		                "label": "职位",
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 3,
		                "data": [{
		                    "text": "职员",
		                    "value": "1"
		                }, {
		                	 "text": "科长",
			                    "value": "2"
		                },{
		                	 "text": "经理",
			                    "value": "3"
		                }],
		             /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"POSITION",
						},*/
		            },{
		            	"id":"14",
						"obj": "birthday",
						"label": "生日",
						"textType": "date",
						"format": "Y-m-d"
					},{
						"id":"15",
		                "obj": "industry",
		                "label": "行业类别",
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 5,
		                "data": [{
		                    "text": "农、林、牧、渔业",
		                    "value": "1"
		                }, {
		                	 "text": "采矿业",
			                    "value": "2"
		                },{
		                	 "text": "制造业",
			                    "value": "3"
		                },{
		                	 "text": "电力、燃气及水的生产和供应业",
			                    "value": "4"
		                },{
		                	 "text": "建筑业",
			                    "value": "5"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"INDUSTRY",
						},*/
		            },{
		            	"id":"16",
		                "obj": "subIndustry",
		                "label": "子行业",
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 1,
		                "data": [{
		                    "text": "未知",
		                    "value": "1"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"SUB_INDUSTRY",
						},*/
		            },{
		            	"id":"17",
		                "obj": "education",
		                "label": "学历",
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 5,
		                "data": [{
		                    "text": "其他",
		                    "value": "1"
		                }, {
		                	 "text": "初中",
			                    "value": "2"
		                },{
		                	 "text": "高中",
			                    "value": "3"
		                }, {
		                	 "text": "本科",
			                    "value": "4"
		                },{
		                	 "text": "硕士",
			                    "value": "5"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"EDUCATION",
						},*/
		            },{
		            	"id":"18",
		                "obj": "maritalStatus",
		                "label": "婚姻状态",
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 4,
		                "data": [{
		                    "text": "不详",
		                    "value": "1"
		                }, {
		                	 "text": "已婚",
			                    "value": "2"
		                },{
		                	 "text": "未婚",
			                    "value": "3"
		                },{
		                	 "text": "离异",
			                    "value": "4"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"MARITAL_STATUS",
						},*/
		            },{
		            	"id":"19",
		                "obj": "brand",
		                "label": "品牌",
		                "required":true,
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 4,
		                "data": [{
		                    "text": "签约全球通",
		                    "value": "1"
		                }, {
		                	 "text": "签约数据业务",
			                    "value": "2"
		                },{
		                	 "text": "非签约神州行本地卡",
			                    "value": "3"
		                },{
		                	 "text": "签约动感地带",
			                    "value": "4"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"BRAND",
						},*/
		            },{
		            	"id":"20",
		                "obj": "operator",
		                "label": "运营商",
		                "required":true,
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 3,
		                "data": [{
		                    "text": "中国移动",
		                    "value": "1"
		                }, {
		                	 "text": "中国联通",
			                    "value": "2"
		                },{
		                	 "text": "中国电信",
			                    "value": "3"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"OPERATOR",
						},*/
		            }]
				}],
				//---------区域信息-------------
				
				[{
					"type": "formsInner",
					"textType": "formsInner",
					"showShrink":true,
					"showAll":true,
					"innerCols":2,
					"obj": "l2",
					"title": "区域信息",
					"data": [{
						"id":"21",
		                "obj": "city",
		                "label": "地市",
		                "required":true,
		                "textType": "select",
		                "reset":true,
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		               // "defaultVal": ['1'],
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
		            	"id":"22",
		                "obj": "county",
		                "label": "区县",
		                "required":true,
		                "textType": "select",
		                "reset":true,
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                //"defaultVal": ['1'],
		                "initCallback": function (module) {
		                	county=module;
		                },
		              
		            },{
		            	"id":"23",
						"obj": "homeAddress",
						"label": "家庭地址",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"24",
						"obj": "contRemarks",
						"label": "备注",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"25",
		                "obj": "isRemote",
		                "label": "异地客户标识",
		                "required":true,
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 3,
		                "data": [{
		                    "text": "未知",
		                    "value": "1"
		                }, {
		                	 "text": "网外成员",
			                    "value": "2"
		                },{
		                	 "text": "网内成员",
			                    "value": "3"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"IS_REMOTE",
						},*/
		            },{
						"id":"40",
						"obj": "createDate",
						"required":true,
						"label": "加入集团时间",
						"textType": "date",
						"format": "Y-m-d"
					}]
				}],
				//---------联系信息-------------
				[{
					"type": "formsInner",
					"textType": "formsInner",
					"showShrink":true,
					"showAll":true,
					"innerCols":2,
					"obj": "l3",
					"title": "联系信息",
					"data": [{
						"id":"26",
						"obj": "contName",
						"label": "联系人",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"27",
						"obj": "telephone",
						"label": "联系电话",
						"required":true,
						"textType": "input",
						"placeholder": "",
						"validate": {
							expression:"^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$"
						}
					},{
						"id":"28",
						"obj": "fax",
						"label": "传真",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"29",
						"obj": "address",
						"label": "收件地址",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"30",
						"obj": "postalCode",
						"label": "邮政编码",
						"required":true,
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"31",
						"obj": "email",
						"label": "邮政地址",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"32",
						"obj": "officeTele",
						"label": "办公电话",
						"textType": "input",
						"placeholder": "",
						"validate": {
							expression : ""
						}
					},{
						"type":"form",
						"id":"39",
		                "obj": "contType",
		                "label": "联系人类型",
		                "required":true,
		                "show":false,
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['2'],
		                "maxSelected":2,
		               "data": [{
		                    "text": "普通人",
	                        "value": "1",
	                },{
		                    "text": "关键人",
		                        "value": "2",
		                }],
		               /* "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"SEX",
						},*/
		            }]
				}],
				//---------成员信息-------------
				[{
					"type": "formsInner",
					"textType": "formsInner",
					"obj": "l4",
					"title": "成员信息",
					"showShrink":true,
					"showAll":true,
					"innerCols":2,
					"data": [{
						"id":"33",
						"obj": "memPosition",
						"label": "成员职位",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					},{
						"id":"34",
		                "obj": "memType",
		                "label": "成员类型",
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 6,
		                "data": [{
		                    "text": "未定类别",
		                    "value": "1"
		                }, {
		                	 "text": "集团普通成员",
			                    "value": "2"
		                },{
		                	 "text": "高层领导/管理层",
			                    "value": "3"
		                }, {
		                	 "text": "中层领导/影响力人物",
			                    "value": "4"
		                },{
		                	 "text": "集团基层领导",
			                    "value": "5"
		                },{
		                	 "text": "最高领导",
			                    "value": "6"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"MEM_TYPE",
						},*/
		            },{
		            	"id":"35",
		                "obj": "persionClass",
		                "label": "关键人物级别",
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 5,
		                "data": [{
		                    "text": "未知",
		                    "value": "1"
		                }, {
		                	 "text": "集团钻",
			                    "value": "2"
		                }, {
		                	 "text": "集团金",
			                    "value": "3"
		                }, {
		                	 "text": "集团银",
			                    "value": "4"
		                }, {
		                	 "text": "集团贵宾",
			                    "value": "5"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"PERSION_CLASS",
						},*/
		            },{
		            	"id":"36",
						"obj": "brd",
						"label": "提醒生日日期",
						"textType": "date",
						"format": "Y-m-d"
					},{
						"id":"37",
		                "obj": "brs",
		                "label": "生日提醒短信",
		                "textType": "select",
		                "row": 2,
		                "multi": false,
		                "cols": 1,
		                "placeholder": "",
		                "edit": false,
		                "defaultVal": ['1'],
		                "maxSelected": 2,
		                "data": [{
		                    "text": "否",
		                    "value": "1"
		                }, {
		                	 "text": "是",
			                    "value": "2"
		                }],
		                /*   "initDataUrl":"/base/getEnumList",
						"initDataParam":{
							"tableName":"CM_CONTACT",
							"colName":"PERSION_CLASS",
						},*/
		            },{
		            	"id":"38",
						"obj": "memRemarks",
						"label": "成员说明",
						"textType": "input",
						"placeholder": "",
						"validate": {}
					}]
				}],
				[{
					"type": "form",
					"obj": "l41",
					"textType": "buttonGroup",
					"size": "small",
					"btnGroupAlign": "right",
					"data": [{
						"id": 1,
						"text": "确定",
						"plain": false,
						"buttonType": "primary",
						"icon": "",
						"disabled": false,
						"callbackClick": function (self, _this) {
							   var keyer = self.jsonData();
							var validate = self.validate();
							var s = GetQueryString("customerId");
							keyer.l1["customerId"] = s ;
								var resultJsonObject={};
								for(var attr in keyer.l1){
								resultJsonObject[attr]=keyer.l1[attr];
								}
								for(var attr in keyer.l2){
								resultJsonObject[attr]=keyer.l2[attr];
								}
								for(var attr in keyer.l3){
									resultJsonObject[attr]=keyer.l3[attr];
									}
								for(var attr in keyer.l4){
									resultJsonObject[attr]=keyer.l4[attr];
									}
								console.log(resultJsonObject);
		                 
		                    commonData.postData({
		                        serviceUrl: "/data/addKeyer",
		                        serviceData:resultJsonObject,
		                        callback: function (result) {
		                            commonData.boxInfo({
										message:"添加成功",
										messageTitle:"提示",
										success:function (result) {
										},
										 type:'alert'
									});
		                            window.history.back(-1);
		                        },defaultCb:function(){
		                            commonData.boxInfo({
										message:"添加失败",
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
		
	/*}*/
	
	function queryButton_click(){
		if(!queryDemoForm.validate()) {
			return;
		}
		
		var formData = queryDemoForm.jsonData();
		
		initTable(formData);
	};
});
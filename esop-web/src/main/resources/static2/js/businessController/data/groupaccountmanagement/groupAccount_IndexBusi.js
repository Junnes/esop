define([ 'jquery', 'Module', 'commonData', 'common', 'messagebox'],
		function($, Module, commonData, common,messagebox) {

			var querygroupAccountForm;
			// 表单
			queryFunction();

			// “查询界面显示” 的方法
			function queryFunction() {

				new Module(
						{
							"type" : "forms",
							"obj" : "querygroupAccountForm",
							"inline" : true,
							"title" : "集团账户查询",
							"size" : "mediun",
							"titleAlign" : "left",
							//"titleType" : "1",
							"labelPosition" : "left",
							"labelWidth" : "200",
							"data" : [
									[ {
										"type" : "form",
										"obj" : "acctId",
										"size" : "small",
										"disabled" : false,
										"icon" : "",
										"labelShow" : false,
										"label" : "账户编号",
										"labelPosition" : "right",
										"textType" : "input",
										"row" : 2,
										"placeholder" : "请输入账户编号",
									    "validate": { expression:"^[0-9]*$", },
										"callbackKeyup": function(e){
											var key = e.key
											var pattern = /[0-9]/;
											if(!pattern.test(key)){
												
											}
										}
									
									}, {
										"type" : "form",
										"obj" : "acctName",
										"size" : "small",
										"label" : "账户名称",
										"textType" : "input",
										"placeholder" : "请输入账户名称",
									// "validate": "^[\S]*$"
									} ],
									[ {
										"type" : "form",
										"obj" : "button_Indextop",
										"textType" : "buttonGroup",
										"size" : "small",
										"btnGroupAlign" : "center",
										"data" : [
												{
													"id" : 1,
													"text" : "查询",
													"plain" : false,
													"buttonType" : "primary",
													"icon" : "",
													"disabled" : false,
													"callbackClick" : function(
															self, _this) {
														queryButton_click();
													}
												},
												{
													"id" : 2,
													"text" : "新建",
													"plain" : false,
													"buttonType" : "primary",
													"icon" : "",
													"disabled" : false,
													"callbackClick" : function() {
														window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_Add.html';
													}
												},
												{
													"id" : 3,
													"text" : "添加",
													"plain" : false,
													"buttonType" : "primary",
													"icon" : "",
													"disabled" : false,
													"callbackClick" : function() {
														window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_AddPayAcct.html';
													}
												} ],
										"initCallback" : function() {
										},
									} ], ],
							"initCallback" : function(module) {
								querygroupAccountForm = module;
							}
						});
				initTable({});
			}
			// “账户”查询自定义自定义表格 多选
			var querygroupAccountTable;
			function initTable(initDataParam) {
				new Module(
						{
							"type" : "table",
							"obj" : "querygroupAccountTable",
							"title" : "查询结果",
							"titleAlign" : "left",
							"size" : "mini",
							//"size" : "mediun",
							"headHighlight" : true,
							"tableShadow" : true,
							"pagination" : true,
							"pageAlign" : 'right',
							"initDataUrl" : "/data/loadAcctPayShowModel",
							"initDataParam" : initDataParam,
							"pageOpt" : {
								"maxNum" : 5,
								"length" : 5,
								"nowPage" : 1,
								"pageSize" : 5,
								"str" : 'page',
								"obj" : "table"
							},
							"headButton" : true,
							"headButtonData" : [
									{
										"type" : "修改",
										"buttonType" : "",
										"size" : "mini",
										"callbackClick" : function(self, id) {
											var rowNum = self._getCheckedRow();
											if (rowNum.length > 1) {
												commonData.boxInfo({
													message:"您只能选择一个账户进行修改",
													messageTitle:"修改提示",
													success:function(){},
													type:"alert",
												});
											} else if (rowNum.length < 1) {
												commonData.boxInfo({
													message:"请您选择一个账户，然后再进行修改",
													messageTitle:"修改提示",
													success:function(){},
													type:"alert",
												});
											} else {
												window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_Update.html?rowId='
														+ rowNum[0];
											}
										}
									},
									{
										"type" : "删除",
										"buttonType" : "",
										"size" : "mini",
										"callbackClick" : function(self) {
											var rowId = self._getCheckedRow();
											var isDelete 
											if(rowId.length >0){
												if (rowId.length == 1 ){
													isDelete = confirm("确认要删除集团编号为"+ rowId.toString()+ "这条数据吗");
												}else {
													isDelete = confirm("确认要删除集团编号为"+ rowId.toString()+ "这几条数据吗");
												}
											} else {
												commonData.boxInfo({
													message:"请选择您要删除的数据",
													messageTitle:"删除提示",
													success:function(){},
													type:"alert",
												});
												return;
											}
											
											if (isDelete) {
												commonData
														.postData({
															serviceUrl : "/data/deleteCmAccount",
															serviceData : {
																"acctId" : rowId.toString(),
															},
															callback : function(result) {
																commonData.boxInfo({
																	message:result,
																	messageTitle:"删除提示",
																	success:function(){
																		queryButton_click();
																	},
																	type:"alert",
																});
																
															}
														});
											}

										}
									},
									{
										"type" : "详细信息",
										"size" : "mini",
										"buttonType" : "",
										"callbackClick" : function(self) {

											var rowNum = self._getCheckedRow();
											if (rowNum.length > 1) {
												commonData.boxInfo({
													message:"您只能选择一个账户进行详细信息查看",
													messageTitle:"详细信息提示",
													success:function(){},
													type:"alert",
												});
											} else if (rowNum.length < 1) {
												commonData.boxInfo({
													message:"请您选择一个账户，然后再进行详细信息查看",
													messageTitle:"详细信息提示",
													success:function(){},
													type:"alert",
												});
											} else {
												window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_InfoDetailShow.html?rowId='
														+ rowNum[0];
											}
										}
									},
									{
										"type" : "相关产品",
										"size" : "mini",
										"buttonType" : "",
										"callbackClick" : function(self) {
											var rowNum = self._getCheckedRow();
											if (rowNum.length > 1) {
												commonData.boxInfo({
													message:"您只能选择一个账户进行查看相关产品信息",
													messageTitle:"相关产品提示",
													success:function(){},
													type:"alert",
												});
											} else if (rowNum.length < 1) {
												commonData.boxInfo({
													message:"请您选择一个账户，然后再进行相关产品信息查看",
													messageTitle:"相关产品提示",
													success:function(){},
													type:"alert",
												});
											} else {
												window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_RelatedProduct.html?rowId='
														+ rowNum[0];
											}
										}
									},
									{
										"type" : "费用明细",
										"size" : "mini",
										"buttonType" : "",
										"callbackClick" : function(self) {

											var rowNum = self._getCheckedRow();
											if (rowNum.length > 1) {
												commonData.boxInfo({
													message:"您只能选择一个账户进行查看费用明细信息",
													messageTitle:"费用明细提示",
													success:function(){},
													type:"alert",
												});
												/*var confirm=new messagebox({
										            "opacity": "0.2",
										            "message": "您只能选择一个账户进行查看费用明细信息",
										            "messageTitle": "费用明细提示",
										            "messageStatus":"success",
										            "buttonAlign": "right",
										            "buttons":[{
										                text: '确认',
										                role:'success',
										                handler: function(obj) {
										                }
										            }]
										        })
										        confirm._present();*/
											} else if (rowNum.length < 1) {
												commonData.boxInfo({
													message:"请您选择一个账户，然后再进行费用明细信息查看",
													messageTitle:"费用明细提示",
													success:function(){},
													type:"alert",
												});
											} else {
												window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_AcctPayDetail.html?rowId='
														+ rowNum[0];
											}
										}
									} ],

							"headButtonAlign" : "right",
							"checkboxConfig" : true,
							"checkboxIcon" : 'square',
							"checkboxColWidth" : 100,
							"thHead" : [ {
								"name" : "账户编号",
								"colId" : "acctId",
								"width" : 120
							}, {
								"name" : "账户名称",
								"colId" : "acctName",
								"width" : 150
							}, {
								"name" : "账户级别",
								"colId" : "acctClass",
								"width" : 150
							}, {
								"name" : "账户付费类型",
								"colId" : "custAcctType",
								"width" : 150
							}, {
								"name" : '集团账户类型',
								"colId" : "acctKind",
								"width" : 180
							}, {
								"name" : '支付方式',
								"colId" : "payType",
								"width" : 180
							}, {
								"name" : '生效时间',
								"format":"y-m-d",
								"colId" : "effectiveDate",
								"width" : 180
							}, ],
							"callbackRowClick" : function(self) {
							},
							"initCallback" : function(self) {
								querygroupAccountTable = self;
							}
						});

			}

			function confirmFunction() {
				new Module({
					"type" : "messagebox",
					"obj" : "confirm",
					"opacity" : "0.8",
					"modalType" : "1",
					"modalId" : "molly",
					"message" : "是否删除？",
					"messageTitle" : "提示",
					"messageStatus" : "",
					"buttonAlign" : "right",
					"callbackCancelClick" : function(self) {
						console.log(self)
					},
					"callbackConfirmClick" : function(self) {
						console.log(self)
					},
					"initCallback" : function() {
					}
				});
			}
			;

			function queryButton_click() {
				if (!querygroupAccountForm.validate()) {
					alert("验证信息不正确");
					return;
				}

				var formData = querygroupAccountForm.jsonData();
				console.log(formData);
				initTable(formData);
			}
			;
		});
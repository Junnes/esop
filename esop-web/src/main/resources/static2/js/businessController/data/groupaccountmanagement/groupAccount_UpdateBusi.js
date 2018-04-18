define([ 'jquery', 'Module', 'commonData', 'common' ],
		function($, Module, commonData, common) {

			var updategroupAccountForm;
			var rowId = GetQueryString("rowId");
			updateFunction(rowId);
			// 修改页面的显示方法的调用
			function updateFunction(rowId) {
				new Module(
						{
							"type" : "forms",
							"obj" : "updategroupAccountForm",
							"inline" : true,
							"title" : "账户修改信息",
							"titleType" : "1",
							"titleAlign" : "center",
							"labelPosition" : "center",
							"labelWidth" : "150",
							"data" : [
									[ {
										"type" : "form",
										"obj" : "acctName",
										"size" : "small",
										"icon" : "",
										"labelShow" : false,
										"label" : "账户名称",
										"required" : true,
										"labelPosition" : "right",
										"textType" : "input",
										"row" : 2,
										"edit" : false,
										"placeholder" : "请输入内容",
										"validate" : "",
									}, {
										"type" : "form",
										"obj" : "acctClass",
										"labelShow" : false,
										"required" : true,
										"size" : "small",
										"disabled" : false,
										"label" : "账户级别",
										"labelPosition" : "right",
										"textType" : "select",
										"multi" : false,
										"placeholder" : "请输入内容",
										"edit" : false,
										"maxSelected" : 5,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_ACCOUNT",
											"colName" : "ACCT_CLASS",
										},
									} ],
									[ {
										"type" : "form",
										"obj" : "acctKind",
										"labelShow" : false,
										"size" : "small",
										"disabled" : false,
										"label" : "账户类型",
										"required" : true,
										"labelPosition" : "right",
										"textType" : "select",
										"multi" : false,
										"placeholder" : "请输入内容",
										"edit" : false,
										"maxSelected" : 5,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_ACCOUNT",
											"colName" : "ACCT_KIND",
										},
									}, {
										"type" : "form",
										"obj" : "custAcctType",
										"labelShow" : false,
										"size" : "small",
										"required" : true,
										"disabled" : false,
										"label" : "付费类型",
										"labelPosition" : "right",
										"textType" : "select",
										"multi" : false,
										"placeholder" : "请输入内容",
										"edit" : false,
										"maxSelected" : 5,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_ACCOUNT",
											"colName" : "CUST_ACCT_TYPE",
										},
									} ],
									[ {
										"type" : "form",
										"obj" : "payType",
										"labelShow" : false,
										"size" : "small",
										"disabled" : false,
										"label" : "支付方式",
										"labelPosition" : "right",
										"textType" : "select",
										"multi" : false,
										"placeholder" : "请输入内容",
										"edit" : false,
										"maxSelected" : 5,
										"required" : true,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_PAYMENT",
											"colName" : "PAY_TYPE",
										},
									}, {
										"type" : "form",
										"obj" : "bankAcctType",
										"labelShow" : false,
										"size" : "small",
										"disabled" : false,
										"label" : "银行账号类型",
										"labelPosition" : "right",
										"textType" : "select",
										"multi" : false,
										"placeholder" : "请输入内容",
										"edit" : false,
										"maxSelected" : 5,
										"required" : true,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_PAYMENT",
											"colName" : "BANK_ACCT_TYPE",
										},
										"callbackClick" : function(e) {

										},
									} ],
									[ {
										"type" : "form",
										"obj" : "acctCode",
										"size" : "small",
										"label" : "银行账号",
										"textType" : "input",
										"placeholder" : "请输入内容",
										"validate" : "^[0-9]{19}$"
									}, {
										"type" : "form",
										"obj" : "bankAcctName",
										"size" : "small",
										"label" : "银行账号名称",
										"textType" : "input",
										"placeholder" : "请输入内容",
										"validate" : ""
									} ],
									[ {
										"type" : "form",
										"obj" : "bankType",
										"labelShow" : false,
										"size" : "small",
										"disabled" : false,
										"label" : "银行类型",
										"labelPosition" : "right",
										"textType" : "select",
										"multi" : false,
										"placeholder" : "请输入内容",
										"edit" : false,
										"maxSelected" : 5,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_PAYMENT",
											"colName" : "BANK_TYPE",
										},
									}, {
										"type" : "form",
										"obj" : "bankName",
										"size" : "small",
										"label" : "银行名称",
										"textType" : "input",
										"placeholder" : "请输入内容",
										"validate" : ""
									} ],
									[ {
										"type" : "form",
										"obj" : "contractNo",
										"size" : "small",
										"label" : "托收合同号",
										"textType" : "input",
										"placeholder" : "请输入内容",
										"validate" : ""
									}, {
										"type" : "form",
										"obj" : "receiptType",
										"labelShow" : false,
										"size" : "small",
										"disabled" : false,
										"label" : "发票打印类型",
										"labelPosition" : "right",
										"textType" : "select",
										"multi" : false,
										"placeholder" : "请输入内容",
										"edit" : false,
										"maxSelected" : 5,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_PAYMENT",
											"colName" : "RECEIPT_TYPE",
										},

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
													"text" : "修改",
													"plain" : false,
													"buttonType" : "primary",
													"icon" : "",
													"disabled" : false,
													"callbackClick" : function(self, _this) {
														update_click();
													}
												},
												{
													"id" : 2,
													"text" : "返回",
													"plain" : false,
													"buttonType" : "primary",
													"icon" : "",
													"disabled" : false,
													"callbackClick" : function() {
														window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_Index.html';
													}
												} ]
									} ], ],
							"initCallback" : function(module) {
								updategroupAccountForm = module;
								commonData
										.postData({
											serviceUrl : "/data/getOneAcctPayModel",
											serviceData : {
												"acctId" : rowId,
											},
											callback : function(result) {
												console.log(result);
												if (result.acctKind == false) {
													result.acctKind = 0;
												} else {
													result.acctKind = 1;
												}
												module
														.setData({
															"bankAcctName" : result.bankAcctName,
															"acctCode" : result.acctCode,
															"bankAcctType" : result.bankAcctType,
															"payType" : result.payType,
															"custAcctType" : result.custAcctType,
															"acctKind" : result.acctKind,
															"acctClass" : result.acctClass,
															"acctName" : result.acctName,
															"bankType" : result.bankType,
															"bankName" : result.bankName,
															"contractNo" : result.contractNo,
															"receiptType" : result.receiptType,
														});
											}
										});

							}
						});
			}

			function update_click() {
				if (!updategroupAccountForm.validate()) {
					commonData.boxInfo({
						message:"验证信息不正确",
						messageTitle:"验证提示",
						success: function(){},
						type:"alert",
					});
					return;
				}
				var formData = updategroupAccountForm.jsonData();
				formData.acctId = rowId;
				commonData
						.postData({
							serviceUrl : "/data/updateCmAccount",
							serviceData : formData,
							callback : function(result) {
								commonData.boxInfo({
									message:result,
									messageTitle:"提示",
									success: function(){
										window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_Index.html';
									},
									type:"alert",
								
								});
								
							},
							defaultCb : function(result) {
								console.log(result.message);
							}
						});
			}
			function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null)
					return unescape(r[2]);
				return null;
			}
		});
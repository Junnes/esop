define([ 'jquery', 'Module', 'commonData', 'common' ],
		function($, Module, commonData, common) {

			var addgroupAccountForm;

			newFunction();
			// “添加页面的显示”的方法
			function newFunction() {
				new Module(
						{
							"type" : "forms",
							"obj" : "addgroupAccountForm",
							"cols" : "",
							"inline" : true,
							"title" : "账户新增信息",
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
										"placeholder" : "请输入账户名称",
										"initCallback" : function() {
										},
									//	"validate": { expression:"^[0-9]*$", }

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
										"defaultVal" : [ '1' ],
										"multi" : false,
										"placeholder" : "请选择账户级别",
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
										"defaultVal" : [ '0' ],
										"multi" : false,
										"placeholder" : "请选择账户类型",
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
										"defaultVal" : [ '1' ],
										"multi" : false,
										"placeholder" : "请选择付费类型",
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
										"defaultVal" : [ '0' ],
										"multi" : false,
										"placeholder" : "请选择支付方式",
										"edit" : false,
										"maxSelected" : 5,
										"required" : true,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_PAYMENT",
											"colName" : "PAY_TYPE",
										},
										"callbackClick": function(val){
											if(val == 0){
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_bankAcctType",
													"labelShow" : false,
													"size" : "small",
													"disabled" : true,
													"label" : "银行账号类型",
													"labelPosition" : "right",
													"textType" : "select",
													"defaultVal" : [ '0' ],
													"multi" : false,
													//"placeholder" : "请选择银行账户类型",
													"edit" : false,
													"maxSelected" : 5,
													"required" : true,
													"initDataUrl" : "/base/getEnumList",
													"initDataParam" : {
														"tableName" : "CM_PAYMENT",
														"colName" : "BANK_ACCT_TYPE",
													},
													
													"initCallback" : function(self) {
													}		
												});
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_acctCode",
													"size" : "small",
													"label" : "银行账号",
													"textType" : "input",
													"disabled":true,
													//"placeholder" : "",
												});
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_bankAcctName",
													"size" : "small",
													"label" : "银行账号名称",
													"textType" : "input",
													"disabled":true,
													//"placeholder" : "",
													"validate" : ""
												});
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_bankType",
													"labelShow" : false,
													"size" : "small",
													"disabled" : true,
													"label" : "银行类型",
													"labelPosition" : "right",
													"textType" : "select",
												//	"defaultVal" : [ '1' ],
													"multi" : false,
													//"placeholder" : "请选择银行类型",
													"edit" : false,
													"maxSelected" : 5,
													"initDataUrl" : "/base/getEnumList",
													"initDataParam" : {
														"tableName" : "CM_PAYMENT",
														"colName" : "BANK_TYPE",
													},
												});
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_bankName",
													"size" : "small",
													"label" : "银行名称",
													"disabled":true,
													"textType" : "input",
													"value" : "",
													//"placeholder" : "请输入银行名称",
													"validate" : "",
												});
												
											}else{
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_bankAcctType",
													"labelShow" : false,
													"size" : "small",
													"disabled" : false,
													"label" : "银行账号类型",
													"labelPosition" : "right",
													"textType" : "select",
													"defaultVal" : [ '1' ],
													"multi" : false,
													"placeholder" : "请选择银行账户类型",
													"edit" : false,
													"maxSelected" : 5,
													"required" : true,
													"initDataUrl" : "/base/getEnumList",
													"initDataParam" : {
														"tableName" : "CM_PAYMENT",
														"colName" : "BANK_ACCT_TYPE",
													},
													"initCallback" : function(self) {
													}
												});
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_acctCode",
													"size" : "small",
													"label" : "银行账号",
													"textType" : "input",
													"value" : "",
													"placeholder" : "请输入银行账户",
													"validate" : "^[0-9]{19}$"
												});
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_bankAcctName",
													"size" : "small",
													"label" : "银行账号名称",
													"textType" : "input",
													"value" : "",
													"placeholder" : "请输入银行账户名称",
													"validate" : ""
												});
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_bankType",
													"labelShow" : false,
													"size" : "small",
													"disabled" : false,
													"label" : "银行类型",
													"labelPosition" : "right",
													"textType" : "select",
												//	"defaultVal" : [ '1' ],
													"multi" : false,
													"placeholder" : "请选择银行类型",
													"edit" : false,
													"maxSelected" : 5,
													"initDataUrl" : "/base/getEnumList",
													"initDataParam" : {
														"tableName" : "CM_PAYMENT",
														"colName" : "BANK_TYPE",
													},
												});
												new Module({
													"type" : "form",
													"obj" : "addgroupAccountForm_bankName",
													"size" : "small",
													"label" : "银行名称",
													"disabled":false,
													"textType" : "input",
													"value" : "",
													"placeholder" : "请输入银行名称",
													"validate" : "",
												});
											}
										}
									}, {
										"type" : "form",
										"obj" : "bankAcctType",
										"labelShow" : false,
										"size" : "small",
										"disabled" : false,
										"label" : "银行账号类型",
										"labelPosition" : "right",
										"textType" : "select",
										"defaultVal" : [ '1' ],
										"multi" : false,
										"placeholder" : "请选择银行账户类型",
										"edit" : false,
										"maxSelected" : 5,
										"required" : true,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_PAYMENT",
											"colName" : "BANK_ACCT_TYPE",
										},
										"initCallback" : function(self) {
										}
									} ],
									[ {
										"type" : "form",
										"obj" : "acctCode",
										"size" : "small",
										"label" : "银行账号",
										"textType" : "input",
										"value" : "",
										"placeholder" : "请输入银行账户",
										"validate" : "^[0-9]{19}$"
									}, {
										"type" : "form",
										"obj" : "bankAcctName",
										"size" : "small",
										"label" : "银行账号名称",
										"textType" : "input",
										"value" : "",
										"placeholder" : "请输入银行账户名称",
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
										//"defaultVal" : [ '1' ],
										"multi" : false,
										"placeholder" : "请选择银行类型",
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
										"value" : "",
									//"placeholder" : "请输入银行名称",
										"validate" : "",
										/*"type" : "form",
										"obj" : "bankName",
										"labelShow" : false,
										"size" : "small",
										"disabled" : false,
										"label" : "银行名称",
										"labelPosition" : "right",
										"textType" : "select",
										"defaultVal" : [ '1' ],
										"multi" : false,
										"placeholder" : "请选择银行名称",
										"edit" : false,
										"maxSelected" : 5,*/
										/*"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_PAYMENT",
											"colName" : "BANK_TYPE",
										},*/
									} ],
									[ {
										"type" : "form",
										"obj" : "contractNo",
										"size" : "small",
										"label" : "托收合同号",
										"textType" : "input",
										"value" : "",
										"placeholder" : "请输入托收合同号",
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
										"defaultVal" : [ '0' ],
										"multi" : false,
										"placeholder" : "请选择发票打印类型",
										"edit" : false,
										"maxSelected" : 5,
										"initDataUrl" : "/base/getEnumList",
										"initDataParam" : {
											"tableName" : "CM_PAYMENT",
											"colName" : "RECEIPT_TYPE",
										},
										"initCallback" : function(self) {
										}
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
													"text" : "新增",
													"plain" : false,
													"buttonType" : "primary",
													"icon" : "",
													"disabled" : false,
													"callbackClick" : function(self, _this) {
														newButton_click();
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
												} ],
										"initCallback" : function() {
										},

									} ] ],
							"initCallback" : function(module) {
								addgroupAccountForm = module;
								changePayTypeFunction(0);
							}
						});
			}

			function newButton_click() {
				if (!addgroupAccountForm.validate()) {
					commonData.boxInfo({
						message:"验证信息不正确",
						messageTitle:"验证提示",
						success:function(){},
						type:"alert",
					});
					return;
				}
				var formData = addgroupAccountForm.jsonData();
				commonData
						.postData({
							serviceUrl : "/data/newCmAccountAndCmPay",
							serviceData : formData,
							callback : function(result) {
								commonData.boxInfo({
									message:result,
									messageTitle:"提示",
									success:function(){
										window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_Index.html';
									},
									type:"alert",
								});
								
							},
							defaultCb : function(result) {
								console.log(result.message);
								window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_Index.html';
							}
						});
			}
			function changePayTypeFunction(val){
				if(val == 0){
					new Module({
						"type" : "form",
						"obj" : "addgroupAccountForm_bankAcctType",
						"labelShow" : false,
						"size" : "small",
						"disabled" : true,
						"label" : "银行账号类型",
						"labelPosition" : "right",
						"textType" : "select",
						"defaultVal" : [ '0' ],
						"multi" : false,
						//"placeholder" : "请选择银行账户类型",
						"edit" : false,
						"maxSelected" : 5,
						"required" : true,
						"initDataUrl" : "/base/getEnumList",
						"initDataParam" : {
							"tableName" : "CM_PAYMENT",
							"colName" : "BANK_ACCT_TYPE",
						},
						
						"initCallback" : function(self) {
						}		
					});
					new Module({
						"type" : "form",
						"obj" : "addgroupAccountForm_acctCode",
						"size" : "small",
						"label" : "银行账号",
						"textType" : "input",
						"disabled":true,
						//"placeholder" : "",
					});
					new Module({
						"type" : "form",
						"obj" : "addgroupAccountForm_bankAcctName",
						"size" : "small",
						"label" : "银行账号名称",
						"textType" : "input",
						"disabled":true,
						"placeholder" : "",
						"validate" : ""
					});
					new Module({
						"type" : "form",
						"obj" : "addgroupAccountForm_bankType",
						"labelShow" : false,
						"size" : "small",
						"disabled" : true,
						"label" : "银行类型",
						"labelPosition" : "right",
						"textType" : "select",
					//	"defaultVal" : [ '1' ],
						"multi" : false,
						//"placeholder" : "请选择银行类型",
						"edit" : false,
						"maxSelected" : 5,
						"initDataUrl" : "/base/getEnumList",
						"initDataParam" : {
							"tableName" : "CM_PAYMENT",
							"colName" : "BANK_TYPE",
						},
					});
					new Module({
						"type" : "form",
						"obj" : "addgroupAccountForm_bankName",
						"size" : "small",
						"label" : "银行名称",
						"disabled":true,
						"textType" : "input",
						"value" : "",
						//"placeholder" : "请输入银行名称",
						"validate" : "",
					});
				}
			}
		});
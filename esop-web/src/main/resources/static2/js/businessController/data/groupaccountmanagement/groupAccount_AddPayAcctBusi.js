define([ 'jquery', 'Module', 'commonData', 'common' ], function($, Module,
		commonData, common) {

	var addPayAcctGroupAccountForm;

	addPayAcct();
	// 添加账户为付费账户
	function addPayAcct() {
		new Module({
			"type" : "forms",
			"obj" : "addPayAcctGroupAccountForm",
			"title" : "集团账户添加",
			"titleAlign" : "left",
			"titleType" : "1",
			"inline" : true,
			"cols" : "2",
			"labelPosition" : "right",
			"labelWidth" : 250,
			"data" : [ [ {
				"type" : "form",
				"obj" : "form21",
				"size" : "small",
				"label" : "手机号码",
				"textType" : "input",
				"placeholder" : "请输入手机号码",
				"rightButton" : true,
				"rightButtonText" : "查询",
				"buttonType" : "mini",
				//"validate" : "^[0-9]{11}$",
				"rightButtonClick" : function(self) {
					queryAcctPayByPhoneNum_click();
				},

			},{type:"form", textType:"blank"} ], [ {
				"type" : "formsInner",
				"textType" : "formsInner",
				"obj" : "acctInfo",
				"title" : "账户信息",
				"showShrink" : true,
				"showRow" : 1,
				"data" : [ {
					"id" : "1",
					"obj" : "acctKind",
					"labelShow" : false,
					"size" : "small",
					"disabled" : false,
					"label" : "账户类型",
					"edit" : false,
					"textType" : "select",
					"defaultVal" : [ '1' ],
					"multi" : false,
					"initDataUrl" : "/base/getEnumList",
					"initDataParam" : {
						"tableName" : "CM_ACCOUNT",
						"colName" : "ACCT_KIND",
					},
				},{type:"form", textType:"blank"} ]
			} ],[{
				
			}] ],
			"initCallback" : function(module) {
				addPayAcctGroupAccountForm = module;
			}
		});
		//点击根据电话号码查询按钮
		function queryAcctPayByPhoneNum_click(){
			
		}
	}
});
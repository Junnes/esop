define(
		[ 'jquery', 'Module', 'commonData', 'common' ],
		function($, Module, commonData, common) {

			var AcctPayDerailGroupAccountForm;

			chargeDetail();
			// 费用明细
			function chargeDetail() {
				new Module(
						{
							"type" : "forms",
							"obj" : "AcctPayDerailGroupAccountForm",
							"inline" : true,
							"title" : "账户费用",
							"titleType" : 1,
							"size" : "mediun",
							"titleAlign" : "left",
							"labelPosition" : "right",
							"labelWidth" : "150",
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
									}, {
										"type" : "form",
										"obj" : "acctBalance",
										"size" : "small",
										"label" : "账户余额",
										"textType" : "input",
										"validate" : "^[a-zA-Z]*$"
									}, {
										"type" : "form",
										"obj" : "acctName",
										"size" : "small",
										"label" : "账户欠费",
										"textType" : "input",
									} ],
									[ {
										"obj" : "showInfo",
										"textType" : "table",
										"headHighlight" : true,
										"tableShadow" : true,
										"thHead" : [ {
											"name" : "本期总费用（元）",
											"colId" : "acctId",
											"width" : 150
										}, {
											"name" : "滞纳金（元）",
											"colId" : "acctName",
											"width" : 150
										}, {
											"name" : "减免额（元）",
											"colId" : "acctClass",
											"width" : 150
										}, {
											"name" : "本次应收（元）",
											"colId" : "custAcctType",
											"width" : 150
										}, {
											"name" : "本次余额（元）",
											"colId" : "status",
											"width" : 150
										} ]
									} ],
									[ {
										"type" : "form",
										"obj" : "button_Indextop",
										"textType" : "buttonGroup",
										"size" : "small",
										"btnGroupAlign" : "center",
										"data" : [ {
											"id" : 1,
											"text" : "返回查询结果",
											"plain" : false,
											"buttonType" : "primary",
											"icon" : "",
											"disabled" : false,
											"callbackClick" : function(self,
													_this) {
												window.location.href = '../../../../pages/data/groupaccountmanagement/groupAccount_Index.html';
											}
										} ]
									} ] ],
							"initCallback" : function(module) {
								AcctPayDerailGroupAccountForm = module;
							}
						});
			}
		});
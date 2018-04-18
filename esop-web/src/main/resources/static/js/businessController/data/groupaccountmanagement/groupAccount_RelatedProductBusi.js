define([ 'jquery', 'Module', 'commonData', 'common' ],
		function($, Module, commonData, common) {

			var relationProductGroupAccountForm;
			var rowId = GetQueryString("rowId");
			acctRelatedProductShow(rowId);
			// 详细信息的查看函数
			function acctRelatedProductShow(rowId) {
				new Module({
							"type" : "forms",
							"obj" : "relationProductGroupAccountForm",
							"inline" : true,
							"title" : "相关产品",
							"titleType" : "1",
							"titleAlign" : "center",
							"labelPosition" : "center",
							"labelWidth" : "150",
							"data" : [{
								"type": "form",
								"obj": "biaoge",
								"disabled": false,
								"label": "活动名称",
								"labelShow": false,
								"labelPosition": "top",
								"textType": "table",
								"titleAlign" : "left",
								"size" : "mini",
								"headHighlight" : true,
								"tableShadow" : true,
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
								}]
							}],
							"initCallback" : function(module) {
								relationProductGroupAccountForm = module;
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
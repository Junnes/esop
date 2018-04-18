define(
		[ 'jquery', 'Module', 'commonData', 'common','messagebox'],
		function($, Module, commonData, common,messagebox) {
			
			var queryDemoForm;
			function GetQueryString(name)
			{
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			}
			// 关键人查询
			new Module({
				"type" : "forms",
				"obj" : "queryDemoForm",
				"cols" : "",
				"inline" : true,
				"title" : "关键人",
			//	"titleType" :"1",
				"titleAlign" : "left",
				"labelPosition" : "center",
				"labelWidth" : "100",
				"data" : [ [ {
					"type" : "form",
					"obj" : "telephone",
					"size" : "small",
					"disabled" : false,
					"icon" : "",
					"labelShow" : false,
					"label" : "手机号码",
					"labelPosition" : "right",
					"textType" : "input",
					"row" : 2,
					"placeholder" : "",
					"callbackKeyup" : function(e) {
						console.log('Focus!');
					},
					"callbackBlur" : function(e) {
						console.log('Blur!');
					},
					"initCallback" : function() {
					},
					"validate" : {
						expression : "^[0-9]*$"
						
					}
				}, {
					"type": "form",
					"obj": "button-default",
					"textType": "button",
					"size": "small",
					"text": "查询",
					"buttonType": "primary", //text primary
					"callbackClick": queryButton_click
				}, {}]],

				"initCallback" : function(module) {
					queryDemoForm = module;
				}
			});

			initTable();
			// 查询结果
			function initTable(initDataParam) {
				var url;
				if( initDataParam == null){
					url = "";
					
				}else{
				
				var s = GetQueryString("customerId");
				initDataParam["customerId"] = s ;
				//url = "/data/loadSomeKeyer";
				url = "/data/loadKeyer";
				}
				new Module(
						{
							"type" : "table",
							"obj" : "queryDemoTable",
							"title" : "查询结果",
							"align" : "center",
							"size" :"mini",
							"headButton" : true,
							"headButtonData" : [
									{
										"type" : "新增",
										"size" : "mini",
										"buttonType" : "",
										"callbackClick" : function(self) {
											
											var s = GetQueryString("customerId");
											window.location.href='/pages/data/membermanagement/KeyAdd.html?customerId='+ s;

								
										}
									},
									{
										"type" : "批量删除",
										"size" : "mini",
										"buttonType" : "",
										"callbackClick" : function(self) {
//											console.log(self);
											var rowId = self._getCheckedRow();
											console.log(rowId);											
											commonData.postData({
												serviceUrl: "/data/deleteInBatch",
												serviceData:{rowId:rowId.toString()},
												callback: function (result) {
													commonData.boxInfo({
														message:"批量删除成功",
														messageTitle:"提示",
														 success:function (result) {
														    },
														      type:'alert'
													});
													initTable({});
												}
											});
										  }
										},
									{
										"type" : "全部导出",
										"size" : "mini",
										"buttonType" : "",
										"callbackClick" : function(self) {
												commonData.boxInfo({
													message:"全部导出成功",
													messageTitle:"提示",
												    success:function (result) {
												    
												    },
												      type:'alert'
												});
												window.location.reload();
										}
									},
									{
										"type" : "转为普通人",
										"size" : "mini",
										"buttonType" : "",
										"callbackClick" : function(self) {
										
												//alert("转为普通人成功");
												commonData.boxInfo({
													message:"转为普通人成功",
													messageTitle:"提示",
													 success:function (result) {
													    },
													      type:'alert'
												});
												window.location.reload();
										
										/*	console.log(self);
											var rowId = self._getCheckedRow();
											console.log(rowId);											
											commonData.postData({
												serviceUrl: "/data/Export",
												serviceData:{rowId:rowId.toString()},
												callback: function (result) {
													initTable({});
												}
											});*/
										  }
									} ],
							"headButtonAlign" : "right",
							"tableShadow" : true,
							"tableBorder" : true,
							"initDataUrl" : "",
							"alarm" : true,
							"multi": true,
							"trHighlight" : "odd", 
							"headHighlight" : true,
							"pagination" : true,
							"pageAlign" : 'right',
							"pageOpt" : {
								"maxNum" : 1,
								"length" : 7,
								"nowPage" : 1,
								"pageSize" : 4,
								"str" : 'page',
								"obj" : "table"
							},
							"buttonConfig" : true,
							"buttonHeadText" : "操作",
							"buttonColWidth" : 150,
							"buttonCol" : [
									{
										"type" : "修改",
										"size" : "mini",
										"buttonShow" : true,
										"expression" : "",
										"buttonType" : "primary",
										"callbackClick" : function(self,id) {
											var z = id;
														//	alert("您正在修改： "+ z);
															if(z != null){
																window.location.href='/pages/data/membermanagement/KeyUpdate.html?contactId='+ z;
													}
										}
									},
									{
										"type" : "删除",
										"size" : "mini",
										"buttonShow" : true,
										"expression" : '',
										"buttonType" : "danger",
										"callbackClick" : function(self, id) {
											commonData.postData({
														serviceUrl : "/data/deleteKeyer",
														serviceData : {
															"contactId" : id
														},
														callback : function(result) {
														//	alert("删除成功：" + id);
															
																queryButton_click();
															
														},
														defaultCb : function() {
															alert("删除失败！")
														}
													});
										}
									} ],
							"checkboxConfig" : true,
							"checkboxIcon" : 'square',
							"checkboxColWidth" : 80,
							"indexConfig" : false,
							"indexColWidth" : 100,
							"thHead" : [ {
								
								"name" : "手机号码",
								"colId" : "telephone",
								"width" : 180
							},  {
								"name" : "姓名",
								"colId" : "contactName",
								"width" : 180
							},{
								"name" : "集团编号",
								"colId" : "customerId",
								"width" : 180
							},  {
								"name" : "所属集团",
								"colId" : "company",
								"width" : 180
							}, {
								"name" : '联系人类型',
								"colId" : "contType",
								"width" : 180
							}, {
								"name" : "职业",
								"colId" : "occupation",
								"width" : 180
							}, {
								"name" : "加入集团时间",
								"colId" : "createDate",
								"width" : 180
							}],
							
							"initDataUrl" : url,
							"initDataParam" : initDataParam,
							"callbackRowClick" : function(self) {
							}
						});

			}


			//	initTable({});
			function queryButton_click() {
				if (!queryDemoForm.validate()) {
					return;
				}
		
				var formData = queryDemoForm.jsonData();
				initTable(formData);
			};
		});
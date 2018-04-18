define(['jquery', 'Module', 'commonData', 'common'], function($, Module, commonData, common) {

//  创建基础信息表单
	
	var baseFormData;

	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	
	
	initFromData();
	function initFromData(){
		//  先请求数据
		commonData.postData({
//			var c = GetQueryString("customerId");
			serviceUrl:"/data/findCmCustomerInfoBycustomerId",
			serviceData:{"customerId":GetQueryString("customerId")},
			callback: function (result) {
				console.log(result);
				// 根据用户权限来设置页面
				var data = result.data
				initTest(result);
			}
		})  
		
	}
	
	function initTest(initdataFrom){
//		var Range = 999999 - 100000;   
//		var Rand = Math.random();   
//		var num =  100000 + Math.round(Rand * Range)
		
		new Module({
			"type": "forms",
			"obj": "baseGroupInfo",
			"titleType": "1",
			"inline": true,
			"cols": "2",
			"labelPosition": "right",
			"labelWidth": 140,	
			"disabled":true,
			"data": [
				[{
					//----------------------
					"type": "formsInner",
					"textType": "formsInner",
					"obj": "l1",
					"title": "基本信息",
					"showShrink": true,
					"showAll":true,
					"showRow": 15,
					"innerCols":2,
					"data": [ {
						"id": "2",
			      		"obj": "customerId",
			      		"label": "集团编号",
					    "required": true,
			      		"textType": "input",
			 
		      			"value":"",
		      			"callbackKeyup": function (e) {
		      		
						},
						"callbackBlur": function (e) {
					
						},
			      		"initCallback": function() {
			      		}
			      		
			      		
					  },
			             {
					    "id": "3",
			      		"obj": "custName",
			      		"label": "集团名称",
						"required": true,
			      		"textType": "input",
			             "value":" ",
			      		"initCallback": function() {}
			         },
			         {
				      		"id": "50",
				      		"obj": "form50",
				      		"label": "是否重要集团",
				      		 "required": true,
				        		"textType": "select",
				           	    "initDataUrl": "",
					            "defaultVal": ['1'],
					            "edit": false,
				        		"row": 2,
				        		"placeholder": "请选择",
				                "data": [{
					              	"value": "1",
					               	"text": "是"
				                 	}, {
					                	"value": "2",
						                  "text": "否"
					                }]
				       },
			         {
			        		"id": "4",
			        		"obj": "custStatus",
			        		"label": "集团状态",
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		 "initDataUrl":"/base/getEnumList",
				             "initDataParam": {
				                    "tableName":"CM_CUSTOMER",
				                    "colName":"CUST_STATUS"
				                },
				                "initCallback": function() {}
			           },
			           
			           {
				      		"id": "5",
				      		"obj": "contactTel",
				      		"label": "联系电话",
							"required": true,
				      		"textType": "input",
				      		"value":" ",
				      		"row": 2,
				      
				         },
			           {
			        		"id": "6",
			        		"obj": "artifPerson",
			        		"label": "法人代表",
							"required": true,
			        		"textType": "input",
			        		"value":" ",
			        		"row": 2,
			       
//			        		"initCallback": function() {},
			           },
			           {
			        		"id": "7",
			        		"obj": "serverClass",
			        		"label": "客户服务级别",
							"required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "标准级"
			                 	}]
			           },				
			           {
			        		"id": "8",
			        		"obj": "groupSize",
			        		"label": "集团规模",
							 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			        		"callbackClick": function (valArr) {
								console.log(valArr);
//								cities._setSelectUrlData("/demo/loadCitiesByProvinces", {"provinces":val});
							},
							"initCallback": function(module) {
//								provinces = module;
							},
			                "data": [{
				              	"value": "1",
				               	"text": "特大型"
			                 	}, {
				                	"value": "2",
					                  "text": "大型"
				                }, {
				               	"value": "3",
					               "text": "中型"
				                }, {
				              	"value": "4",
					              "text": "小微型"
				           }]
			           },
			          
			           {
			        		"id": "23",
			        		"obj": "certType",
			        		"label": "证件类型",
							 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "三证合一营业执照"
			                 	}, {
				                	"value": "2",
					                  "text": "营业执照"
				                }, {
				               	"value": "3",
					               "text": "事业单位法人证书"
				                }, {
				              	"value": "4",
					              "text": "社会团体法人登记证书"
				           }]
			           },
			           {
				      		"id": "24",
				      		"obj": "certCode",
				      		"label": "证件编号",
							"required": true,
				      		"textType": "input",
				      		"value":" ",
				      		"row": 2,
				  
				       },
				       {
				    	        "id": "25",
								"type": "fileUpload",
								"obj": "file",
								"labelShow": true,
								"size": "small",
								"labelWidth": "100",
								"labelPosition": "left",
								"rightButton": true,
								"rightButtonText": '',
								"rightIcon": "sousuo",
								"value": '',
								"url": '',
								"initCallback": function (self) {},
								"callbackChange": function (self) {},
								"rightButtonClick": function () {}
						},
						{
			        		"id": "70",
			        		"obj": "creditClass",
			        		"label": "信用级别",
							 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "一级"
			                 	}, {
				                	"value": "2",
					                  "text": "二级"
				                }]
			           },

			           {
			        		"id": "9",
			        		"obj": "form9",
			        		"label": "客户类型",
							 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "集团客户"
			                 	}, {
				                	"value": "2",
					                  "text": "团体客户"
				                }]
			           },
			           {
				      		"id": "10",
				      		"obj": "form10",
				      		"label": "客户责任人",
				      		"textType": "input",
				      		"value":" ",
				      		"row": 2,
			
				         },
				         {
				        		"id": "11",
				        		"obj": "form11",
				        		"label": "上发BBOSS",
				        		"textType": "select",
				           	    "initDataUrl": "",
					            "defaultVal": ['1'],
					            "edit": false,
				        		"row": 2,
				        		"placeholder": "请选择",
				                "data": [{
					              	"value": "1",
					               	"text": "否"
				                 	}, {
					                	"value": "2",
						                  "text": "是"
					                }]
				           },
				           {
					      		"id": "12",
					      		"obj": "ecId",
					      		"label": "BBOSS编码",
					      		"textType": "input",
					      		"value":" ",
					      		"row": 2,
					 
					         },
					         {
					        		"id": "13",
					        		"obj": "isStraight",
					        		"label": "是否直管客户",
									 "required": true,
					        		"textType": "select",
					           	    "initDataUrl": "",
						            "defaultVal": ['1'],
						            "edit": false,
					        		"row": 2,
					        		"placeholder": "请选择",
					                "data": [{
						              	"value": "1",
						               	"text": "否"
					                 	}, {
						                	"value": "2",
							                  "text": "是"
						                }]
					           },
					            {
						      		"id": "14",
						      		"obj": "straightCode",
						      		"label": "直管客户编码",
						      		"textType": "input",
						      		"value":" ",
						      		"row": 2,
						      	
						         },
						         
						         {
							      		"id": "16",
							      		"obj": "orgCode",
							      		"label": "组织机构编码",
							      		"textType": "input",
							      		"value":" ",
							      		"row": 2,
							      	
							         },
						         {
							      		"id": "15",
							      		"obj": "biCode",
							      		"label": "一经编码",
							      		"textType": "input",
							      		"value":" ",
							      		"row": 2,
							   
							         },
								       
								           {
								        		"id": "21",
								        		"obj": "form21",
								        		"label": "集团机构类型",
												 "required": true,
								        		"textType": "select",
								           	    "initDataUrl": "",
									            "defaultVal": ['1'],
									            "edit": false,
								        		"row": 2,
								        		"placeholder": "请选择",
								                "data": [{
									              	"value": "1",
									               	"text": "企业"
								                 	}, {
									                	"value": "2",
										                  "text": "事业"
									                }, {
									               	"value": "3",
										               "text": "机关"
									                }, {
									              	"value": "4",
										              "text": "社会团体"
									           }]
								           } ,
								       
							           {
							        		"id": "60",
							        		"obj": "form60",
							        		"label": "是否小微市场",
							        		"textType": "select",
							           	    "initDataUrl": "",
								            "defaultVal": ['1'],
								            "edit": false,
							        		"row": 2,
							        		"placeholder": "请选择",
							                "data": [{
								              	"value": "1",
								               	"text": "否"
							                 	}, {
								                	"value": "2",
									                  "text": "是"
								                }]
							           },
								       
							           {
							        		"id": "61",
							        		"obj": "form61",
							        		"label": "小微市场类型",
							        		"textType": "select",
							           	    "initDataUrl": "",
								            "defaultVal": ['1'],
								            "edit": false,
							        		"row": 2,
							        		"placeholder": "请选择",
							                "data": [{
								              	"value": "1",
								               	"text": "专业市场"
							                 	}, {
								                	"value": "2",
									                  "text": "商业楼宇"
								                }, {
								               	"value": "3",
									               "text": "沿街商铺-其他"
								                }, {
								              	"value": "4",
									              "text": "酒店宾馆"
								           }]
							           },
								       
							           {
							        		"id": "62",
							        		"obj": "form62",
							        		"label": "小微集团级别",
							        		"textType": "select",
							           	    "initDataUrl": "",
								            "defaultVal": ['1'],
								            "edit": false,
							        		"row": 2,
							        		"placeholder": "请选择",
							                "data": [{
								              	"value": "1",
								               	"text": "星1"
							                 	}, {
								                	"value": "2",
									                  "text": "星2"
								                }, {
								               	"value": "3",
									               "text": "星3"
								                }, {
								              	"value": "4",
									              "text": "星4"
								           }]
							           },
								       
							           {
							        		"id": "63",
							        		"obj": "form63",
							        		"label": "宽带运营商",
							        		"textType": "select",
							           	    "initDataUrl": "",
								            "defaultVal": ['1'],
								            "edit": false,
							        		"row": 2,
							        		"placeholder": "请选择",
							                "data": [{
								              	"value": "1",
								               	"text": "无"
							                 	}, {
								                	"value": "2",
									                  "text": "移动"
								                }, {
								               	"value": "3",
									               "text": "电信"
								                }, {
								              	"value": "4",
									              "text": "联通"
								           }]
							           },
							           {
							        		"id": "64",
							        		"obj": "form64",
							        		"label": "移动宽带资源是否覆盖",
							        		"textType": "select",
							           	    "initDataUrl": "",
								            "defaultVal": ['1'],
								            "edit": false,
							        		"row": 2,
							        		"placeholder": "请选择",
							                "data": [{
								              	"value": "1",
								               	"text": "否"
							                 	}, {
								                	"value": "2",
									                  "text": "是"
								                }]
							           }
				    ]
				}],
				
				//----------------------

				[{
					"type": "formsInner",
					"textType": "formsInner",
					"obj": "l2",
					"title": "区域信息",
					"showShrink": true,
					"showAll":true,
					"innerCols":2,

					"data":  [
					
						 {
				        		"id": "26",
				        		"obj": "localProvince",
				        		"label": "省份",
								"required": true,
				        		"textType": "select",
				           	    "initDataUrl": "",
					            "defaultVal": ['1'],
					            "edit": false,
				        		"row": 2,
				        		"placeholder": "请选择",
				                "initDataUrl":"/base/getEnumList",
				                "initDataParam": {
				                    "tableName":"CM_CUSTOMER",
				                    "colName":"LOCAL_PROVINCE"
				                },
				                "initCallback": function() {}
				           },
				           {
					      		"id": "27",
					      		"obj": "cityCode",
					      		"label": "地市",
					      		 "required": true,
					        		"textType": "select",
					           	    "initDataUrl": "",
						            "defaultVal": ['1'],
						            "edit": false,
					        		"row": 2,
					        		"placeholder": "请选择",
					                "data": [{
						              	"value": "1",
						              	"text": "南昌"
						     }]
					       },
					       {
					      		"id": "28",
					      		"obj": "countyCode",
					      		"label": "县区",
					      		 "required": true,
					        		"textType": "select",
					           	    "initDataUrl": "",
						            "defaultVal": ['1'],
						            "edit": false,
					        		"row": 2,
					        		"placeholder": "请选择",
					                "data": [{
						              	"value": "1",
						               	"text": "南昌移动公司"
					                 	}]
					       },
					       {
					      		"id": "29",
					      		"obj": "groupAddress",
					      		"label": "集团地址",
								"required": true,
					      		"textType": "input",
					      		"row": 2,
					      		"placeholder": "请输入地址",
					      		"value":" ",
					         }
					
					]
				}],
				//----------------------

				[{
					"type": "formsInner",
					"textType": "formsInner",
					"obj": "l3",
					"title": "经理信息",
					"showRow": 2,
					"showShrink": true,
					"showAll":true,
					"innerCols":2,
					"data":  [{
						"id":"30",
						"obj": "form30",
						"label": "客户经理",
						"required": true,
						"textType": "input",
						"rightButton": true,
						"rightIcon": "sousuo",
						"rightButtonText": '搜索',
						"placeholder": "请输入内容",
						"value": "111111",
						"callbackKeyup": function (e) {
							console.log('Focus!');
						},
						"callbackBlur": function (e) {
							console.log('Blur!');
						},
						"initCallback": function() {},
						"required": true,
						"validate": {
							"expression":"^[0-9]*$",
							"validateText": "输入内容全部为数字",
							"matchType":"g"
						}
					},
					  {
			      		"id": "31",
			      		"obj": "form31",
			      		"label": "联系电话",
						"required": true,
			      		"textType": "input",
			      		"row": 2,
			      		"placeholder": "请输入联系电话",
			      		"value":" ",
			   }]
				}],
				//----------------------------
				
				[{
					"type": "formsInner",
					"textType": "formsInner",
					"obj": "l4",
					"title": "分类信息",
					"showRow": 7,
					"showShrink": true,
					"showAll":true,
					"innerCols":2,
					"data":  [ {
			      		"id": "35",
			      		"obj": "industryType",
			      		"label": "行业类型",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			        		"initDataUrl":"/base/getEnumList",
				             "initDataParam": {
				                    "tableName":"CM_CUSTOMER_EXT",
				                    "colName":"INDUSTRY_TYPE"
				                },
				                "initCallback": function() {}
				         
			       },
			       {
			      		"id": "36",
			      		"obj": "industryCategory",
			      		"label": "行业门类",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "A、农、林、牧、渔业"
			                 	}, {
				                	"value": "2",
					                  "text": "B、采矿业"
				                }, {
				               	"value": "3",
					               "text": "C、制造业"
				                }, {
				              	"value": "4",
					              "text": "D、电力、燃气及水的生产和供应业"
				           }]
			       },
			       {
			      		"id": "37",
			      		"obj": "industryClass",
			      		"label": "行业大类",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "农、林、牧、渔服务业"
			                 	}, {
				                	"value": "2",
					                  "text": "农业"
				                }, {
				               	"value": "3",
					               "text": "林业"
				                }, {
				              	"value": "4",
					              "text": "牧业"
				           }]
			       },
			       {
			      		"id": "38",
			      		"obj": "industryMidclass",
			      		"label": "行业中类",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "渔业服务业"
			                 	}, {
				                	"value": "2",
					                  "text": "畜牧服务业"
				                }, {
				               	"value": "3",
					               "text": "林业服务业"
				                }, {
				              	"value": "4",
					              "text": "农业服务业"
				           }]
			       },
			       
//			       {
//		        		"id": "18",
//		        		"obj": "form18",
//		        		"label": "集团行业小类",
//						 "required": true,
//		        		"textType": "select",
//		           	    "initDataUrl": "",
//			            "defaultVal": ['1'],
//			            "edit": false,
//		        		"row": 2,
//		        		"placeholder": "请选择",
//		                "data": [{
//			              	"value": "1",
//			               	"text": "选项1"
//		                 	}, {
//			                	"value": "2",
//				                  "text": "选项2"
//			                }, {
//			               	"value": "3",
//				               "text": "选项3"
//			                }, {
//			              	"value": "4",
//				              "text": "选项4"
//			           }]
//		           },
			       {
			      		"id": "39",
			      		"obj": "groupLever",
			      		"label": "集团级别",
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "D类客户"
			                 	}, {
				                	"value": "2",
					                  "text": "A1类客户"
				                }, {
				               	"value": "3",
					               "text": "A2类客户"
				                }, {
				              	"value": "4",
					              "text": "B1类客户"
				           }]
			       },
			       {
			      		"id": "39",
			      		"obj": "custLever",
			      		"label": "集团客户级别(2016)",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "A"
			                 	}, {
				                	"value": "2",
					                  "text": "B"
				                }, {
				               	"value": "3",
					               "text": "C"
				                }, {
				              	"value": "4",
					              "text": "D"
				           }]
			       },
			       {
			      		"id": "40",
			      		"obj": "regionRange",
			      		"label": "经营区域范围",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "跨市集团"
			                 	}, {
				                	"value": "2",
					                  "text": "本地集团"
				                }, {
				               	"value": "3",
					               "text": "跨省集团"
				                }, {
				              	"value": "4",
					              "text": "跨国集团"
				           }]
			       },
			       {
			      		"id": "41",
			      		"obj": "isGrid",
			      		"label": "是否归属网格",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			                "data": [{
				              	"value": "1",
				               	"text": "否"
			                 	}, {
				                	"value": "2",
					                  "text": "是"
				                }]
			       },
			       /////```````````````````````````````````````````````
			       {
			      		"id": "42",
			      		"obj": "isCounty",
			      		"label": "是否归属乡镇",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			                "data": [{
				              	"value": "1",
				               	"text": "否"
			                 	}, {
				                	"value": "2",
					                  "text": "是"
				                }]
			       },
			       {
			      		"id": "43",
			      		"obj": "industryInfo",
			      		"label": "所属行业",
			      		 "required": true,
			        		"textType": "select",
			           	    "initDataUrl": "",
				            "defaultVal": ['1'],
				            "edit": false,
			        		"row": 2,
			        		"placeholder": "请选择",
			        	      "initDataUrl":"/base/getEnumList",
				               "initDataParam": {
				                    "tableName":"CM_CUSTOMER_EXT",
				                    "colName":"INDUSTRY_INFO"
				                },
				                "initCallback": function() {}
			       }
			       
			       ],
			     
				}],
				
				
				//----------------------

				[{
					"type": "formsInner",
					"textType": "formsInner",
					"obj": "l5",
					"title": "其他信息",
					"showShrink": true,
					"showAll":true,
					"showRow": 2,
					"innerCols":2,
					"data":  [{
						"id":"32",
						"obj": "staffNumber",
						"label": "企业员工数",
			      		 "required": true,
						"textType": "input",
						"placeholder": "请输入内容",
						"value": "10",
						"callbackKeyup": function (e) {
							console.log('Focus!');
						},
						"callbackBlur": function (e) {
							console.log('Blur!');
						},
						"initCallback": function() {},
						"required": true,
						"validate": {
							"expression":"^[0-9]*$",
							"validateText": "输入内容全部为数字",
							"matchType":"g"
						}
					},
					{
			      		"id": "33",
			      		"obj": "annualTurnover",
			      		"label": "企业年营业额(万元)",
						"required": true,
			      		"textType": "input",
			      		"row": 2,
			      		"placeholder": "请输入内容",
						"value": "12",
						"callbackKeyup": function (e) {
							console.log('Focus!');
						},
						"callbackBlur": function (e) {
							console.log('Blur!');
						},
						"initCallback": function() {},
						"required": true,
						"validate": {
							"expression":"^[0-9]*$",
							"validateText": "输入内容全部为数字",
							"matchType":"g"
						}
			     },{
						"id":"32",
						"obj": "groupRemarks",
						"label": "备注",
						"textType": "input",
						"value":" ",
						"callbackKeyup": function (e) {
							console.log('Focus!');
						},
						"callbackBlur": function (e) {
							console.log('Blur!');
						},
						"initCallback": function() {},
					
					}],
			     
				}],
				
				
//				//----------------------
//				[{
//					"type": "formsInner",
//					"textType": "formsInner",
//					"obj": "l6",
//					"title": "下一个审核人",
//					"showRow": 2,
//					"data":  [{
//			      		"id": "34",
//			      		"obj": "form34",
//			      		"label": "下一个审核人",
//			      		 "required": true,
//			        		"textType": "select",
//			           	    "initDataUrl": "",
//				            "defaultVal": ['1'],
//				            "edit": false,
//			        		"row": 2,
//			        		"placeholder": "请选择",
//			                "data": [{
//				              	"value": "1",
//				               	"text": "选项1"
//			                 	}, {
//				                	"value": "2",
//					                  "text": "选项2"
//				                }, {
//				               	"value": "3",
//					               "text": "选项3"
//				                }, {
//				              	"value": "4",
//					              "text": "选项4"
//				           }]
//			       }],
//			     
//				}],
				//------------------		
				[{
					"type": "form",
					"obj": "l41",
					"textType": "buttonGroup",
					"size": "small",
					"btnGroupAlign": "right",
					"data": [{
						"id": 1,
						"text": "返回",
						"plain": false,
						"buttonType": "primary",
						"icon": "",
						"disabled": false,
						"callbackClick": function (self, _this) {
					
							
							
							window.location.href='dataGroupManagement.html';

							
							
							
						}
					}],
					"initCallback": function () {},
				}]
			],
			"initCallback": function (self) {
				
				self.setData({
					l1: {
						customerId: initdataFrom.customerId,
						custName: initdataFrom.custName,
						contactTel:initdataFrom.contactTel,
						artifPerson:initdataFrom.artifPerson,
						certCode:initdataFrom.certCode,
						
					},
					l2:{
						
						groupAddress:initdataFrom.groupAddress,

					}

				});
				
			}
		
		});
	}
	
	

});
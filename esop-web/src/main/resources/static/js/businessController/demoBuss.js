define(['jquery', 'Module', 'commonData', 'common', 'ec'], function($, Module, demoData, common, ec) {
	   

	// 输入框
	new Module({
		"type": "form",
		"obj": "text",
		"size": "mini",
		"disabled": false,
		"icon": "sousuo",
		"labelShow": false,
		"label": "活动名称",
		"labelWidth": 100,
		"labelPosition": "right",
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
		"initCallback": function() {}
	});
	// 文本域
	new Module({
		"type": "form",
		"obj": "textarea",
		"size": "mini",
		"disabled": false,
		"labelShow": true,
		"label": "活动名称",
		"labelWidth": 100,
		"labelPosition": "top",
		"textType": "textarea",
		"row": 2,
		"placeholder": "请输入内容",
		"value": "1234567",
		"callbackKeyup": function (e) {
			console.log('Focus!');
		},
		"callbackBlur": function (e) {
			console.log('Blur!');
		},
		"initCallback": function() {}
	});

	// select
	new Module({
		"type": "form",
		"obj": "select",
		"labelShow": true,
		"size": "small",
		"disabled": false,
		"label": "活动名称",
		"labelWidth": 100,
		"labelPosition": "right",
		"textType": "select",
		"row": 2,
		"multi": false,
		"defaultVal": '3',
		"placeholder": "请输入内容",
		"value": "1234567",
		"edit": false,
		"maxSelected": 5,
		"callbackKeyup": function (e) {
			console.log('Focus!');
		},
		"callbackBlur": function (e) {
			console.log('Blur!');
		},
		"callbackClick": function (valArr, val) {
			console.log(valArr,'+',val);
		},
		"data": [{
			"id": 1,
			"value": "aaaa"
		}, {
			"id": 2,
			"value": "bbbb"
		}, {
			"id": 3,
			"value": "cccc"
		}, {
			"id": 4,
			"value": "dddd"
		}, {
			"id": 5,
			"value": "eeee"
		}, {
			"id": 6,
			"value": "ffff"
		}],
		"initCallback": function() {}
	});
	// select multi
	new Module({
		"type": "form",
		"obj": "select1",
		"size": "small",
		"disabled": false,
		"labelShow": false,
		"label": "活动名称",
		"labelWidth": 100,
		"labelPosition": "right",
		"textType": "select",
		"row": 2,
		"multi": true,
		"defaultVal": ['1', '2'],
		"placeholder": "请输入内容",
		"value": "1234567",
		"edit": false,
		"maxSelected": 5,
		"callbackKeyup": function (e) {
			console.log('Focus!');
		},
		"callbackBlur": function (e) {
			console.log('Blur!');
		},
		"callbackClick": function (valArr, val) {
			console.log(valArr,'+',val);
		},
		"data": [{
			"id": 1,
			"value": "aaaa"
		}, {
			"id": 2,
			"value": "bbbb"
		}, {
			"id": 3,
			"value": "cccc"
		}, {
			"id": 4,
			"value": "dddd"
		}, {
			"id": 5,
			"value": "eeee"
		}, {
			"id": 6,
			"value": "ffff"
		}],
		"initCallback": function() {}
	});

	// 可编辑
	new Module({
		"type": "form",
		"obj": "select2",
		"size": "small",
		"disabled": false,
		"label": "活动名称",
		"labelShow": true,
		"labelWidth": 100,
		"labelPosition": "top",
		"textType": "select",
		"row": 2,
		"multi": true,
		"url": "",
		"defaultVal": ['1'],
		"placeholder": "请输入内容",
		"value": "1",
		"edit": true,
		"maxSelected": 5,
		"callbackKeyup": function (e) {
			console.log('Focus!');
		},
		"callbackBlur": function (e) {
			console.log('Blur!');
		},
		"callbackSelect": function (e) {

		},
		"data": [{
			"id": 1,
			"value": "aaaa"
		}, {
			"id": 2,
			"value": "bbbb"
		}, {
			"id": 3,
			"value": "cccc"
		}, {
			"id": 4,
			"value": "dddd"
		}, {
			"id": 5,
			"value": "eeee"
		}, {
			"id": 6,
			"value": "ffff"
		}],
		"initCallback": function() {}
	});

	// 单选框
	new Module({
		"type": "form",
		"obj": "radio",
		"size": "small",
		"label": "活动名称",
		"labelShow": true,
		"labelWidth": 80,
		"labelPosition": "right",
		"radioType": "button",
		"textType": "radio",
		"radioBorder": true,
		"value": "1",
		"data": [{
			"id": 1,
			"value": "上海",
			"disabled": false
		}, {
			"id": 2,
			"value": "长沙",
			"disabled": true
		}, {
			"id": 3,
			"value": "北京",
			"disabled": false
		}],
		"initCallback": function() {}
	});

	// 多选框
	new Module({
		"type": "form",
		"obj": "checkbox",
		"size": "small",
		"label": "活动名称",
		"labelWidth": 80,
		"labelPosition": "right",
		"checkboxType": "button",
		"textType": "checkbox",
		"checkboxBorder": true,
		"value": ['5'],
		"labelShow": true,
		"data": [{
			"id": 1,
			"value": "上海",
			"disabled": false
		}, {
			"id": 2,
			"value": "长沙",
			"disabled": true
		}, {
			"id": 5,
			"value": "北京",
			"disabled": false
		}],
		"initCallback": function() {},
		"callbackChange": function (val) {
			console.log(val)
		}
	});

	// button
	new Module({
		"type": "form",
		"obj": "button-default",
		"textType": "button",
		"size": "",
		"disabled": false,
		"icon": "",
		"text": "确定",
		"plain": false,
		"buttonType": "primary", //text primary
		"initCallback": function () {},
		"callbackClick": function () {}
	});
	new Module({
		"type": "form",
		"obj": "button-danger",
		"textType": "button",
		"size": "",
		"disabled": false,
		"icon": "",
		"text": "确定",
		"plain": false,
		"buttonType": "danger", //text primary
		"initCallback": function () {},
		"callbackClick": function () {}
	});
	new Module({
		"type": "form",
		"obj": "button-medium",
		"textType": "button",
		"size": "medium",
		"disabled": false,
		"icon": "",
		"plain": false,
		"text": "确定",
		"buttonType": "info", //text primary
		"initCallback": function () {},
		"callbackClick": function () {}
	});
	new Module({
		"type": "form",
		"obj": "button-small",
		"textType": "button",
		"size": "small",
		"disabled": false,
		"icon": "",
		"plain": false,
		"text": "确定",
		"buttonType": "success", //text primary
		"initCallback": function () {},
		"callbackClick": function () {}
	});
	new Module({
		"type": "form",
		"obj": "button-mini",
		"textType": "button",
		"size": "mini",
		"disabled": false,
		"icon": "",
		"plain": false,
		"text": "确定",
		"buttonType": "warning", //text primary
		"initCallback": function () {},
		"callbackClick": function (self) {
			alert(1);
		}
	});
	new Module({
		"type": "form",
		"obj": "button1",
		"textType": "buttonGroup",
		"size": "small",
		"data": [{
			"id": 1,
			"text": "不确定",
			"plain": false,
			"buttonType": "primary",
			"icon": "",
			"disabled": true,
			"callbackClick": function (id) {
				alert($(self).attr('val'));
			}
		}, {
			"id": 2,
			"text": "确定",
			"plain": false,
			"buttonType": "success",
			"icon": "",
			"disabled": false,
			"callbackClick": function (self) {
				alert($(self).attr('val'));
			}
		}, {
			"id": 3,
			"text": "确定",
			"plain": false,
			"buttonType": "danger",
			"icon": "",
			"disabled": false,
			"callbackClick": function (self) {
				alert($(self).attr('val'));
			}
		}, {
			"id": 4,
			"text": "确定",
			"plain": false,
			"buttonType": "info",
			"icon": "",
			"disabled": false,
			"callbackClick": function (self) {
				alert($(self).attr('val'));
			}
		}, {
			"id": 5,
			"text": "确定",
			"plain": false,
			"buttonType": "waring",
			"icon": "",
			"disabled": false,
			"callbackClick": function (self) {
				alert($(self).attr('val'));
			}
		}],
		// "buttonType": "primary", //text primary
		"initCallback": function () {}
	});
	new Module({
		"type": "form",
		"obj": "button2",
		"textType": "button",
		"size": "small",
		"disabled": false,
		"icon": "",
		"plain": true,
		"text": "文本按钮",
		"buttonType": "text", //text primary
		"initCallback": function () {},
		"callbackClick": function () {}
	});

	// 表单
	new Module({
		"type": "forms",
		"obj": "form",
		"cols": "",
		"inline": true,
		"title": "表单录入",
		"titleAlign": "left",
		"labelPosition": "center",
		"labelWidth": "100",
		"data": [
			[{
				"type": "form",
				"obj": "text",
				"size": "small",
				"disabled": false,
				"icon": "sousuo",
				"labelShow": false,
				"label": "活动名称",
				"labelWidth": 100,
				"labelPosition": "right",
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
				"validate": function (val, id) {
					var reg = /^[0-9]*$/g;
					if (reg.test(val) == true) {
						$('#'+id).find('input').css('color', '#5a5e66');
					} else {
						$('#'+id).find('input').css('color', 'red');
					}
				}
			}, {
				"type": "form",
				"obj": "checkbox",
				"size": "small",
				"label": "活动名称",
				"labelWidth": 100,
				"labelPosition": "right",
				"checkboxType": "button",
				"textType": "checkbox",
				"checkboxBorder": false,
				"value": ['5'],
				"labelShow": false,
				"data": [{
					"id": 1,
					"value": "上海",
					"disabled": false
				}, {
					"id": 5,
					"value": "北京",
					"disabled": false
				}],
				"initCallback": function() {},
				"callbackChange": function (val) {
					console.log(val)
				}
			}, {
				"type": "form",
				"obj": "text",
				"size": "small",
				"disabled": false,
				"icon": "",
				"labelShow": false,
				"label": "活动名称",
				"labelWidth": 100,
				"labelPosition": "right",
				"textType": "input",
				"row": 2,
				"placeholder": "请输入内容",
				"value": "Cris",
				"callbackKeyup": function (e) {
					console.log('Focus!');
				},
				"callbackBlur": function (e) {
					console.log('Blur!');
				},
				"initCallback": function() {},
				"validate": function (val, id) {
					var reg = /^[a-zA-Z]*$/g;
					if (reg.test(val) == true) {
						$('#'+id).find('input').css('color', '#5a5e66');
					} else {
						$('#'+id).find('input').css('color', 'red');
					}
				}
			}],
			[{
				"type": "form",
				"obj": "select",
				"labelShow": false,
				"size": "small",
				"disabled": false,
				"label": "活动名称",
				"labelWidth": 100,
				"labelPosition": "right",
				"textType": "select",
				"row": 2,
				"multi": false,
				"cols": 1,
				"defaultVal": '3',
				"placeholder": "请输入内容",
				"value": "1234567",
				"edit": false,
				"maxSelected": 5,
				"callbackKeyup": function (e) {
					console.log('Focus!');
				},
				"callbackBlur": function (e) {
					console.log('Blur!');
				},
				"callbackClick": function (valArr, val) {
					console.log(valArr,'+',val);
				},
				"data": [{
					"id": 1,
					"value": "aaaa"
				}, {
					"id": 2,
					"value": "bbbb"
				}, {
					"id": 3,
					"value": "cccc"
				}, {
					"id": 4,
					"value": "dddd"
				}, {
					"id": 5,
					"value": "eeee"
				}, {
					"id": 6,
					"value": "ffff"
				}],
				"initCallback": function() {}
			}, {
				"type": "form",
				"obj": "",
				"textType": "blank"
			}, {
				"type": "form",
				"obj": "select1",
				"size": "small",
				"disabled": false,
				"labelShow": false,
				"label": "多选下拉",
				"labelWidth": 100,
				"labelPosition": "right",
				"textType": "select",
				"row": 2,
				"multi": true,
				"cols": 1,
				"defaultVal": ['1', '2'],
				"placeholder": "请输入内容",
				"value": "1234567",
				"edit": false,
				"maxSelected": 5,
				"callbackKeyup": function (e) {
					console.log('Focus!');
				},
				"callbackBlur": function (e) {
					console.log('Blur!');
				},
				"callbackClick": function (valArr, val) {
					console.log(valArr,'+',val);
				},
				"data": [{
					"id": 1,
					"value": "aaaa"
				}, {
					"id": 2,
					"value": "bbbb"
				}, {
					"id": 3,
					"value": "cccc"
				}, {
					"id": 4,
					"value": "dddd"
				}, {
					"id": 5,
					"value": "eeee"
				}, {
					"id": 6,
					"value": "ffff"
				}],
				"initCallback": function() {}
			}],
			[{
				"type": "form",
				"obj": "radio",
				"size": "small",
				"label": "活动名称",
				"labelShow": false,
				"labelWidth": 100,
				"labelPosition": "right",
				"radioType": "button",
				"textType": "radio",
				"radioBorder": false,
				"value": "1",
				"data": [{
					"id": 1,
					"value": "男",
					"disabled": false
				}, {
					"id": 2,
					"value": "女",
					"disabled": false
				}],
				"initCallback": function() {}
			}],
			[{
				"type": "form",
				"obj": "button1",
				"textType": "buttonGroup",
				"size": "small",
				"data": [{
					"id": 1,
					"text": "提交",
					"plain": false,
					"buttonType": "primary",
					"icon": "",
					"disabled": false,
					"callbackClick": function (self) {
						alert($(self).attr('val'));
					}
				}, {
					"id": 2,
					"text": "取消",
					"plain": false,
					"buttonType": "info",
					"icon": "",
					"disabled": false,
					"callbackClick": function (self) {
						alert($(self).attr('val'));
					}
				}],
				"initCallback": function () {},
			}]
		],
		"initCallback": function () {}
	});

	// 自定义表格 多选
	new Module({
		"type": "table",
		"obj": "table",
		"title": "表格标题",
		"titleAlign": "left",
		"pagination": true,
		"pageUrl": '',
		"pageOpt": {
			"maxNum": 5,
			"length": 4,
			"nowPage": 1,
			"pageSize": 5,
			"str": 'page',
			"obj": "table"
		},
		"buttonConfig": true,
		"buttonColWidth": 200,
		"buttonCol": [{
			"type": "新增",
			"status": "",
			"size": "small",
			"buttonType": "primary",
			"callbackClick": function (self, id) {
				alert(id);
			}
		},{
			"type": "删除",
			"size": "small",
			"buttonType": "danger",
			"callbackClick": function (self, id) {
				alert(id);
			}
		}],
		"checkboxConfig": true,
		"checkboxColWidth": 100,
		"indexConfig": false,
		"indexColWidth": 100,
		"thHead": [{
			"name": "日期",
			"colspan": "",
			"rowspan": "2"
		}, {
			"name": "姓名",
			"colspan": "",
			"rowspan": "2"
		}, {
			"name": '省份',
			"colspan": "",
			"rowspan": "2"
		}, {
			"id": 4,
			"name": "操作",
			"width": "100",
			"colspan": "",
			"rowspan": "2"
		}],
		"data": [
			[{
				"id": 1,
				"rowId": 12,
				"value": "2017/12/21",
				"colspan": 1
			}, {
				"id": 2,
				"rowId": 12,
				"value": "Cris"
			}, {
				"id": 3,
				"rowId": 12,
				"value": "湖南"
			}, {
				"id": 4,
				"rowId": 12,
				"value": "操作内容"
			}],
			[{
				"id": 1,
				"rowId": 13,
				"value": "2017/12/21"
			}, {
				"id": 2,
				"rowId": 13,
				"value": "Cris"
			}, {
				"id": 3,
				"rowId": 13,
				"value": "湖南"
			}, {
				"id": 4,
				"rowId": 13,
				"value": '操作内容'
			}],
			[{
				"id": 1,
				"rowId": 14,
				"value": "2017/12/21"
			}, {
				"id": 2,
				"rowId": 14,
				"value": "Cris"
			}, {
				"id": 3,
				"rowId": 14,
				"value": "湖南"
			}, {
				"id": 4,
				"rowId": 14,
				"value": '操作内容',
			}],
			[{
				"id": 1,
				"rowId": 15,
				"value": "2017/12/21"
			}, {
				"id": 2,
				"rowId": 15,
				"value": "Cris"
			}, {
				"id": 3,
				"rowId": 15,
				"value": "湖南"
			}, {
				"id": 4,
				"rowId": 15,
				"value": "操作内容"
			}]
		],
		"callbackRowClick": function (self) {
			alert($(self).find('td').attr('rowId'));
		}
	});

	new Module({
		"type": "date",
		"obj": "date",
		"format": 'Y-m-d',
		"value": ""
	});

	/*new Module({
		"type": "dateRange",
		"obj": "dateRange"
	});*/

	/*上传，单个时间框，范围时间框，开关，提示框*/
	

	// 饼图
	// ['#2196F3', '#FC855D', '#62CA51', 'blue', 'orange', 'purple', '#dcdcdc']
	new Module({
		"obj": "pie",
		"type": "pie",
		"data": [],
		"legend": "0",
		"useData": false //是否使用option的data，true使用，false使用组建的静态data
	});         

	// 雷达图
	new Module({
		"obj": "radar",
		"type": "radar",
		"labelValue": "0",
		"data": [{
		    "name": "预算分配（Allocated Budget）",
		    "value": 6500,
		    "indicatorName": "销售",
		    "indicatorValue": 23234,
		    "indicatorMax": 6500,
		    "groupId": 1
		}, {
		    "name": "预算分配（Allocated Budget）",
		    "value": 8000,
		    "indicatorName": "管理",
		    "indicatorValue": 23234,
		    "indicatorMax": 16000,
		    "groupId": 1
		}, {
		    "name": "预算分配（Allocated Budget）",
		    "value": 30000,
		    "indicatorName": "信息技术",
		    "indicatorValue": 23234,
		    "indicatorMax": 30000,
		    "groupId": 1
		}, {
		    "name": "预算分配（Allocated Budget）",
		    "value": 32000,
		    "indicatorName": "销客服售",
		    "indicatorValue": 23234,
		    "indicatorMax": 38000,
		    "groupId": 1
		}, {
		    "name": "预算分配（Allocated Budget）",
		    "value": 48000,
		    "indicatorName": "研发",
		    "indicatorValue": 23234,
		    "indicatorMax": 52000,
		    "groupId": 1
		}]
	});

	/*柱状图*/
	new Module({
		"cutHead": 0,
		"title": "",
		"data": {
			"x": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
			"zhey": {

			},
			"zhuy": {
				"2017-09": ["609418.00", "632740.00", "655606.00", "689799.00", "726322.00", "760150.00", "803257.00", "838313.00", "896978.00", "925444.00", "950411.00", "973669.00"],
				"2017-10": ["1628364.00", "1639408.00", "1649905.00", "1661148.00", "1675077.00", "1690820.00", "1705623.00", "1721535.00", "1740113.00", "1759507.00", "1778888.00", "1803477.00", "1834272.00"]
			}
		},
		"legend": '1',
		"download": 0,
		"topLast": 0,
		"type": "barGraph",
		"addTitle": true,
		"lineType": 9,
		"radius": [5, 5, 0, 0],
		"barWidth": "10",
		"icon": 'circle',
		"obj": 'bar',
		"label": 0,
		"titleBorder": false,
		"gradient": true,
		"legendPosition": ['10', '20', '', '0'], //top, right, bottom, left
		"gridPosition": ['70', '30', '25', '90'], //top, right, bottom, left
	});

	// 折线图
	new Module({
        obj: "line", //存储组件的结构id
        type: 'barGraph',
        title: '',
        data: {
           "x": ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "01", "02", "03", "04"],
			"zhey": {
				"和慧眼": ["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "215.00", "334.00", "434.00", "512.00", "608.00", "730.00", "805.00", "908.00", "1015.00", "527.00", "640.00", "718.00", "810.00", "206.00", "319.00", "424.00", "224.00", "315.00", "399.00"],
				"宽带新增": ["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "100.00", "200.00", "300.00", "400.00", "500.00", "600.00", "700.00", "800.00", "900.00", "400.00", "500.00", "600.00", "700.00", "100.00", "200.00", "300.00", "100.00", "200.00", "300.00"],
				"宽带电视": ["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "183.00", "285.00", "390.00", "481.00", "570.00", "682.00", "775.00", "864.00", "977.00", "487.00", "590.00", "680.00", "775.00", "174.00", "281.00", "380.00", "185.00", "278.00", "364.00"],
				"宽带续包": ["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "136.00", "245.00", "348.00", "438.00", "536.00", "645.00", "743.00", "830.00", "933.00", "449.00", "545.00", "636.00", "733.00", "134.00", "237.00", "332.00", "143.00", "240.00", "334.00"]
			},
            // {
            //     "2017-09": ["609418.00", "632740.00", "655606.00", "689799.00", "726322.00", "760150.00", "803257.00"],
            //     "2017-10": ["1628364.00", "1439408.00", "1649905.00", "1661148.00", "1675077.00", "1690820.00", "1705623.00"]
            // },
            // "zhuy": {
            //     "2017-09": ["609418.00", "632740.00", "655606.00", "689799.00", "726322.00", "760150.00", "803257.00"],
            //     "2017-10": ["1228364.00", "1339408.00", "1449905.00", "1681148.00", "1675077.00", "1690820.00", "1705623.00"]
            // }
        },
        download: 0, //开关：下载
        cutHead: 0, //开关：去首尾
        topLast: 0,
        lineType: 4,
        label: 0,
        icon: 'circle',
        titleborder: false,
        legendPosition: ['5', '10', '0', ''], //top, right, bottom, left
        gridPosition: ['70', '15', '40', '60'], //top, right, bottom, left
    });


});
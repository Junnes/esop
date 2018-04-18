define(['jquery', 'Module', 'commonData', 'common'], function($, Module, commonData, common) {
// 步骤
	
	
//	  var loc = location.href;
//	  var n1 = loc.length;//地址的总长度
//	  var n2 = loc.indexOf("=");//取得=号的位置
//	  var customerId = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
	  
//	function GetQueryString(name)
//	{
//	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//	     var r = window.location.search.substr(1).match(reg);
//	     if(r!=null)return  unescape(r[2]); return null;
//	}
//	
//    var va = GetQueryString("customerId");

	
	new Module({
		"type": "steps",
		"obj": "baseGroupInfo",
		"icon": "",
		"data": [{
			"text": "集团信息",
			"success":true,
			"fileUrl": "dataGroupInfo.html",
			"back":true
		}, {
			"text": "集团成员",
			"success": false,
			"fileUrl": "GroupMemberInfo.html",
			"back":true
		}],
		"buttonShow": true,
		"btnGroupAlign": "center",
		"buttonData": [{
			"text": "上一步",
			"plain": false,
			"size": "small",
			"buttonType": "primary",
			"disabled": false,
			"icon": '',
			"callbackClick": function (self) {
				self._setBefore();
			}
		}, {
			"text": "下一步",
			"plain": false,
			"size": "small",
			"buttonType": "primary",
			"disabled": false,
			"icon": '',
			"callbackClick": function (self) {
				self._setNext();
			}
		},
		 {
			"text": "返回",
			"plain": false,
			"size": "small",
			"buttonType": "primary",
			"disabled": false,
			"icon": '',
			"callbackClick": function (self) {
				
				window.location.href='dataGroupManagement.html';

				
				
			}
		}]
	});
	
	
});
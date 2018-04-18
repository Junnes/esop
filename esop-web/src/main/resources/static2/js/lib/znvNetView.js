var varurl='http://qdjkzx1.zj.chinamobile.com/bsrp-web/GetData';
var channelId = 0;
var puId=0;
function getArgs() {
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for (var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1)
			continue;
		var argname = pairs[i].substring(0, pos);
		var value = pairs[i].substring(pos + 1);
		value = decodeURIComponent(value);
		args[argname] = value;
	}
	return args;
}


$(function() {
	/**
	 * 视频参数对象
	 **/
	
	NetViewConfig = {
		ip: "211.140.6.188", // 中心地址
		port: "8000", // 中心端口
		name: "hjf", // 登录用户名称
		pwd: "888888", // 登录用户密码
		encoderid: "", // 编码器ID
		cameraport: "", // 摄像头端口号
		cameraid: "", // 摄像头ID
		domain: "", // 所有域
		// 全屏状态
		Screen: false,
		//云台控制
		ControlStatus: true,
		//速度索引
		SpeedIndex: 4,
		Domain: {},
		//选中的录像文件
		startTimeSelected: "",
		endTimeSelected: "",
		videoFilename: "",
		videoSize: "",
		TreeDomain: "",
		TreeSelectRow: null,
		TreeSelectStatus: true,
		// 播放录像速度表
		arrSpeed: [{
			"title": "×1/16"
		}, {
			"title": "×1/8"
		}, {
			"title": "×1/4"
		}, {
			"title": "×1/2"
		}, {
			"title": "×1"
		}, {
			"title": "×2"
		}, {
			"title": "×4"
		}, {
			"title": "×8"
		}, {
			"title": "×16"
		}],
		// 更新视频参数
		setValue: function(name, value) {
			if (typeof NetViewConfig[name] == "string") {
				$("#" + name).val(value);
				NetViewConfig[name] = value;
			} else {
				alert("视频参数对象不存在");
			}
		},

		updateValue: function() {
			var attrNames = ["ip", "port", "name", "pwd"];
			for (var i = 0; i < attrNames.length; i++) {
				var name_tmp = name_tmp = "#" + attrNames[i];
				NetViewConfig[attrNames[i]] = $(name_tmp).val();
			}
		},

		// 视频请求错误参数对象
		Error: {
			"-536861928": "客户端已经有用户登录",
			"-536862186": "服务器未连接",
			"-536862192": "连接服务器失败",
			"-536862191": "请求超时",
			"-536862461": "请求视频路由失败",
			"-536862459": "无可用的视频路由",
			"-536862446": "设备未注册",
			"-536862190": "连接服务器中断"
		},
		// 解析DOM
		DOM: function(xmlString) {
			var objXMLHTTP = null;
			if (window.ActiveXObject) {
				objXMLHTTP = new ActiveXObject("Microsoft.XMLDOM");
			}
			if (document.implementation && document.implementation.createDocument) {
				objXMLHTTP = document.implementation.createDocument("", "", null);
			}
			if (objXMLHTTP) {
				objXMLHTTP.async = false;
				objXMLHTTP.loadXML(xmlString);
			}
			return objXMLHTTP;
		},

		// 判断协议异常
		checkError: function(obj, tips) {
			if (!obj) {
				alert("获取" + tips + "对象失败.");
				return false;
			}
			var objNode = obj.getElementsByTagName("result");
			if (objNode.length != 1) {
				alert("解释" + tips + "协议失败.");
				return false;
			}
			var strNode = objNode[0].getAttribute("code");
			if (strNode != 0) {
				alert("加载" + tips + "数据失败.错误代号:" + strNode);
				return false;
			}
		},
		Time: function() {
			var dt = new Date();
			var y = dt.getFullYear();
			var m = dt.getMonth() + 1;
			var d = dt.getDate();
			y = y < 1900 ? (1900 + y) : y;
			var sdt = y + "-" + NetViewConfig.getString(m.toString()) + "-" + NetViewConfig.getString(d.toString());
			$("#beginTime").val(sdt + " 00:00:00");
			$("#endTime").val(sdt + " 23:59:59");
		},

		getString: function(str) {
			var va = str.split("");
			if (va.length < 2) {
				return "0" + str;
			} else {
				return str;
			}
		},
		Parameter: function() {
			$("#ip").val(NetViewConfig.ip); // 中心地址
			$("#port").val(NetViewConfig.port); // 中心端口
			$("#name").val(NetViewConfig.name); // 登录用户名称
			$("#pwd").val(NetViewConfig.pwd); // 登录用户密码
			$("#encoderid").val(NetViewConfig.encoderid); // 编码器ID
			$("#cameraport").val(NetViewConfig.cameraport); //摄像头端口号
			$("#cameraid").val(NetViewConfig.cameraid); // 摄像头ID
		}
	};
	NetViewConfig.Parameter();
//	channelId = getArgs().CHNL_ID;
//	var paramMap="{\"BUSI_ID\":\"99998888\",\"CHANNEL_ID\":\""+channelId+"\"}";
//	
//	$.ajax({
//		type : 'POST',
//		url : varurl,
//		dataType : 'jsonp',
//		jsonp : 'callbackparam',
//		timeout : 120000,
//		data : {val:paramMap},
//		error : function() {
//			console.log("error");
//		},
//		success : function(data) {
//			if(data[0].error!=-1)
//			{
//				puId=data[0].DEVICE_CODE;
//				loginZt("211.140.6.188","8000","sys_moniter","zc123456");
//				start(puId,"211.140.6.188","8000","");
//			
//			}
//		}
//		});	
	
	puId="120101121041479";
	loginZt("211.140.6.188","8000","sys_moniter","zc123456");
	start(puId,"211.140.6.188","8000","");
	//登录
	setTimeout(function() {

	}, 200);
	//播放视屏
	setTimeout(function() {
		
	}, 1000);
	//登录
	function loginZt(zip,zport,zname,zpwd) {
		// var ztconfig={
		// 	zip : "211.140.6.188", // 中心地址
		// 	zport : "8000", // 中心端口
		// 	zname : "hjf", // 登录用户名称
		// 	zpwd : "888888", // 登录用户密码
		// };
		// $("#loginBtn").attr("disabled",true);
		//对于IE6.0版本需要调用该接口，对于IE8.0或9.0版本由于IE采用了多进程方式，不能调用该接口，否则，反而在关闭IE时会出现非法访问。
		//对于V3.71.008之后的视频控件(NetViewPlayerAdv.dll)，控件会从注册表中获取IE版本，自动判断是否释放问题，可以不调用该接口
		if (!((navigator.userAgent.indexOf('MSIE') != -1) && (/MSIE 6.0/ig.test(navigator.appVersion)))) {
			$("#NetViewPlayX")[0].SetWebMode();
		}
		// LogIn(中心地址，中心端口，登录用户，登录密码)
		NetViewConfig.updateValue();
		var ret = $("#NetViewPlayX")[0].LogIn(zip, zport, zname, zpwd);
		if (parseInt(ret) < 0) {
			if (NetViewConfig.Error[ret]) {
				alert("用户登录失败：" + NetViewConfig.Error[ret]);
			} else {
				alert("用户登录失败：" + ret);
			}
			return false;
		}
		// alert("用户登录成功：" + ret);
		//登录成功后初始化树
		// $("#treeBtn").click();
		// $("#startStatusBtn").click();
		NetViewConfig.Time();
	};
//播放视屏
// caid: "", // 摄像头ID
// cid:"",   // 中心地址
// cport:"", 中心端口
// domain: "", // 所有域
	function start(caid, cid, cport, domain) {

		// PlayVideo(摄像头id, 中心地址，中心端口)
		if (domain == "") {
			$("#NetViewPlayX")[0].PlayVideo(caid, cid, cport);
		} else {
			$("#NetViewPlayX")[0].PlayVideo(caid + "@" + domain, cid, cport);
		}
		$("#NetViewPlayX")[0].EnableCTRLfromScreen(0);
	};
});
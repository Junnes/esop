(function(global, factory) {
    typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) :
        typeof define == 'function' && define.amd ? define(['jquery', 'znvNetView', 'znvViewTree'], factory) : (global.monitoring = factory($, znvNetView, znvViewTree));
})(this, function($, znvNetView, znvViewTree) {
    function monitoring(option) {
        var _option = $.extend({
            data: []
        }, option);
        this._init(_option);
        this.NetViewConfig = {
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
                var self = this;
                if (typeof self.NetViewConfig[name] == "string") {
                    $("#" + name).val(value);
                    self.NetViewConfig[name] = value;
                } else {
                    alert("视频参数对象不存在");
                }
            },

            updateValue: function() {
                var attrNames = ["ip", "port", "name", "pwd"];
                for (var i = 0; i < attrNames.length; i++) {
                    var name_tmp = name_tmp = "#" + attrNames[i];
                    self.NetViewConfig[attrNames[i]] = $(name_tmp).val();
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
                var sdt = y + "-" + self.NetViewConfig.getString(m.toString()) + "-" + self.NetViewConfig.getString(d.toString());
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
                $("#ip").val(self.NetViewConfig.ip); // 中心地址
                $("#port").val(self.NetViewConfig.port); // 中心端口
                $("#name").val(self.NetViewConfig.name); // 登录用户名称
                $("#pwd").val(self.NetViewConfig.pwd); // 登录用户密码
                $("#encoderid").val(self.NetViewConfig.encoderid); // 编码器ID
                $("#cameraport").val(self.NetViewConfig.cameraport); //摄像头端口号
                $("#cameraid").val(self.NetViewConfig.cameraid); // 摄像头ID
            }
        }
    }
    monitoring.prototype = {
        _init: function (option) {
            var self = this;
            $('#'+option.obj).empty();
            if (option.data.length == 1) {
                $('#'+option.obj).append('<OBJECT ID="NetViewPlayX" style="width:100%;height:100%;border: 1px solid rebeccapurple;" CLASSID="CLSID:369576C1-8D06-4734-BC4D-153998E087F4" CODEBASE="ZXVNMS.cab#version=2,2,0,0" name=_ExtentX VALUE="9631" border="0">'+
                    '<param name="_Version" value="65536">'+
                    '<param name="_ExtentX" value="18468">'+
                    '<param name="_ExtentY" value="15240">'+
                    '<param name="_StockProps" value="0">'+
                '</OBJECT>');
                var puId = option.data[0].monitorCode;
                self._loginZt("211.140.6.188","8000","sys_moniter","zc123456", 'NetViewPlayX');
                self._start(puId,"211.140.6.188","8000","NetViewPlayX");
            } else if (option.data.length == 0) {
                return
            } else {
                var temp = '';
                for (var i = 0; i < option.data.length; i++) {
                    temp += '<div class="mon">';
                    temp += '<OBJECT ID="NetViewPlayX" style="width:100%;height:100%;border: 1px solid rebeccapurple;" CLASSID="CLSID:369576C1-8D06-4734-BC4D-153998E087F4" CODEBASE="ZXVNMS.cab#version=2,2,0,0" name=_ExtentX VALUE="9631" border="0">'+
                        '<param name="_Version" value="65536">'+
                        '<param name="_ExtentX" value="18468">'+
                        '<param name="_ExtentY" value="15240">'+
                        '<param name="_StockProps" value="0">'+
                    '</OBJECT>';
                    temp += '</div>';
                }
                $('#'+option.obj).append(temp);
                var puId = option.data[i].monitorCode;
                self._loginZt("211.140.6.188","8000","sys_moniter","zc123456", 'NetViewPlayX'+i);
                self._start(puId,"211.140.6.188","8000","NetViewPlayX"+i);
            }
        },
        _start: function (caid, cid, cport, domain) {

            // PlayVideo(摄像头id, 中心地址，中心端口)
            if (domain == "") {
                $("#NetViewPlayX")[0].PlayVideo(caid, cid, cport);
            } else {
                $("#NetViewPlayX")[0].PlayVideo(caid + "@" + domain, cid, cport);
            }
            $("#NetViewPlayX")[0].EnableCTRLfromScreen(0);
        },
        _loginZt: function (zip,zport,zname,zpwd) {
            var self = this;
            // var ztconfig={
            //  zip : "211.140.6.188", // 中心地址
            //  zport : "8000", // 中心端口
            //  zname : "hjf", // 登录用户名称
            //  zpwd : "888888", // 登录用户密码
            // };
            // $("#loginBtn").attr("disabled",true);
            //对于IE6.0版本需要调用该接口，对于IE8.0或9.0版本由于IE采用了多进程方式，不能调用该接口，否则，反而在关闭IE时会出现非法访问。
            //对于V3.71.008之后的视频控件(NetViewPlayerAdv.dll)，控件会从注册表中获取IE版本，自动判断是否释放问题，可以不调用该接口
            if (!((navigator.userAgent.indexOf('MSIE') != -1) && (/MSIE 6.0/ig.test(navigator.appVersion)))) {
                $("#NetViewPlayX")[0].SetWebMode();
            }
            // LogIn(中心地址，中心端口，登录用户，登录密码)
            self.NetViewConfig.updateValue();
            var ret = $("#NetViewPlayX")[0].LogIn(zip, zport, zname, zpwd);
            if (parseInt(ret) < 0) {
                if (self.NetViewConfig.Error[ret]) {
                    alert("用户登录失败：" + self.NetViewConfig.Error[ret]);
                } else {
                    alert("用户登录失败：" + ret);
                }
                return false;
            }
            // alert("用户登录成功：" + ret);
            //登录成功后初始化树
            // $("#treeBtn").click();
            // $("#startStatusBtn").click();
            self.NetViewConfig.Time();
        }
    };
    monitoring.prototype.constructor = monitoring;
    return monitoring;
})
define(function() {
	/**
	 * Created by ZW on 07/29/2014.
	 * 
	 */
	function AIMap_loadScript(zAIMap_PARAMS) {
		AIMap_PARAMS = zAIMap_PARAMS;
		AIMap_APPID = AIMap_PARAMS.APPID; // 应用id
		AIMap_MAPID = AIMap_PARAMS.MAPID; // 地图容器
		gis_url = AIMap_PARAMS.GIS_URL; // GIS路径

		AIMap_asysScript("localApi");
	}

	function AIMap_encapsulateBMap() {
		AIMap = BMap;
		// 使用百度地图绘制功能、使用api自带标记点信息弹窗样式
		AIMap_loadStyles("../css/map.css");
		AIMap_asysScript("DrawingManager", loadInfoWin);
	}

	function loadInfoWin() {
		AMapLib = BMapLib;
		AIMap_asysScript("map", AIMap_PARAMS.initCallback);
	}

	function AIMap_loadTools() {
		AIMap_modules();
		AIMap_initMap();
	}

	function AIMap_modules() {
		AIMap.init = {
			/**
			 * 标点前台 鼠标点击地图生成marker并返回坐标 flag：是否只在地图上显示一个marker点 callback：返回点坐标
			 */
			getPoint: function(flag, callback) {
				if (AIMap_Juhe._markers.length) {
					AIMap.init.clearJuhe(); // 清除点聚合
				}
				var marker = "";
				AIMap_map.addEventListener("click", function(e) {
					if (flag) {
						AIMap_map.clearOverlays();
					}
					marker = new AIMap.Marker(new AIMap.Point(e.point.lng,
						e.point.lat));
					AIMap_map.addOverlay(marker);
					marker.enableDragging();
					marker.addEventListener("dragend", function(e) {
						if (typeof callback == 'function') {
							callback(e);
						}
					});
					if (typeof callback == 'function') {
						callback(e);
					}
				});
			},
			/**
			 * 其他坐标转百度坐标 from:
			 * 1：GPS设备获取的角度坐标;2：GPS获取的米制坐标、sogou地图所用坐标;3：google地图、soso地图、aliyun地图、mapabc地图和amap地图所用坐标4：3中列表地图坐标对应的米制坐标5：百度地图采用的经纬度坐标6：百度地图采用的米制坐标7：mapbar地图坐标;8：51地图坐标
			 * to: 有两种可供选择：5、6。5：bd09ll(百度经纬度坐标),6：bd09mc(百度米制经纬度坐标);
			 */
			geoconv: function(points, from, to, callback) {
				var url = "http://api.map.baidu.com/geoconv/v1/?coords=" + points + "&from=" + from + "&to=" + to + "&ak=fOgGo46uu0z1KA96BSy55ZcV&callback=AIMap_dealResult";
				AIMap.ajax.AjaxJsonp(url, "");
				window.AIMap_dealResult = function(data) {
					callback(data);
				}
			},
			/**
			 * 地址编码与反编码 1表示地址转坐标 2表示坐标转地址
			 */
			geocoder: function(type, arr, addr, callback) {
				var myGeo = new AIMap.Geocoder();
				var tempJson = [];
				var tempIndex = 0;
				if (type == '1') {
					for (var i = 0, length = arr.length; i < length; i++) {
						myGeo.getPoint(arr[i], function(point) {
							if (point) {
								tempJson.push(point);
								if (tempJson.length == arr.length) {
									callback(tempJson);
								}
							}
						}, addr);
					}
				} else if (type == '2') {
					for (var i = 0, length = arr.length; i < length; i++) {
						myGeo.getLocation(arr[i], function(res) {
							if (res) {
								tempJson.push(res);
								if (tempJson.length == arr.length) {
									callback(tempJson);
								}
							}
						});
					}
				}
			},
			areaColor: function(num) {
				if (typeof num == 'number') {
					var colorArr = ["#7e9925", "#e50756", "#490ceb",
						"#5756c6", "#047e83", "#8307d1", "#695246",
						"#e613fa"
					];
					return colorArr[num];
				} else {
					return '#' + ('00000' + (Math.random() * 0x1000000 << 0)
						.toString(16)).slice(-6);
				}
			},
			/**
			 * 业务场景1：客户信息展示
			 */
			markershow: function(dataP) {
				var points = dataP.POINTS;
				var unclear = dataP.UNCLEAR;
				var custom = dataP.CUSTOM || "";
				var callback = dataP.CALLBACK || "";
				var datap = JSON.stringify(points);
				var viewfollow = dataP.VIEWFOLLOW;
				// point='{"param_list":'+JSON.stringify(points)+'}';
				datap = encodeBase64(encodeURIComponent(datap));
				AIMap.ajax
					.AjaxJson(
						gis_url + "?interfaceId=GIS00010",
						"appId=" + AIMap_APPID + "&data=" + datap,
						function(state, json) {
							if (state == 'success') {
								if (json && json.returncode == '1' && json.point_list.length > 0) {
									AIMap.init
										.createMarker(
											json,
											unclear,
											true,
											function(zpoints,
												markers) {
												// alert(JSON.stringify(json));
												if (viewfollow)
													AIMap_map
													.panTo(new AIMap.Point(
														zpoints[0].longitude,
														zpoints[0].latitude));
												AIMap_Juhe
													.addMarkers(markers); // 生成点聚合
												// AIMap_map.setViewport(zpoints);
											});
								} else {
									// alert("未查找到用户标记点！");
									var nopoint = dataP.NOPOINTMSG;
									if (typeof nopoint == 'function') {
										nopoint();
									} else {
										alert("未查找到用户标记点！");
									}
								}
							}
						});
			},
			/**
			 * 业务场景2：片区管理的功能
			 */
			treeArea: function(dataP) {
				var rootid = dataP.TREEID;
				var treeContain = dataP.TREECONTAINER;
				var markerflag = dataP.MARKERFLAG;
				var areaflag = dataP.AREAFLAG;

				AIMap.ajax
					.AjaxJson(
						gis_url + "?interfaceId=GIS00006",
						"appId=" + AIMap_APPID + "&nodeId=" + rootid,
						function(state, json) {

							if (state == 'success') {
								if (json && json.returncode == '1') {
									AIMap.init
										.drawZtree(
											$("#" + treeContain),
											json,
											function(e, treeId,
												treeNode) {

												AIMap.init
													.clearAll(AIMap_map);
												if (areaflag) {
													// 显示树节点下绑定的区域
													AIMap.ajax
														.AjaxJson(
															gis_url + "?interfaceId=GIS00007",
															"appId=" + AIMap_APPID + "&nodeId=" + treeNode.id,
															function(
																state,
																json) {
																if (state == "success") {
																	if (json && json.returncode == "1") {
																		if (json.node_area_info.area_info) { // 获取自己区域
																			var zply = AIMap.init
																				.drawShape(
																					json.node_area_info,
																					false);
																			AIMap_map
																				.setViewport(zply
																					.getPath()); // 地图视野转到该区域
																		} else {
																			alert("暂未绑定区域！");
																		}
																	} else {
																		alert(json.returnmessage || "获取区域失败！");
																	}
																} else {
																	alert("系统错误！");
																}
															});
												}

												if (markerflag) {
													// 显示树节点下绑定的标记点
													AIMap.ajax
														.AjaxJson(
															gis_url + "?interfaceId=GIS00001",
															"appId=" + AIMap_APPID + "&treeNodeId=" + treeNode.id,
															function(
																state,
																json) {
																if (state == 'success') {
																	if (json && json.returncode == '1' && json.point_list.length > 0) {
																		setTimeout(
																			function() {
																				AIMap.init
																					.createMarker(
																						json,
																						true,
																						false,
																						function(
																							point,
																							markers) {
																							AIMap_Juhe
																								.addMarkers(markers); // 生成点聚合
																						});
																			},
																			200);
																	} else {
																		alert(json.returnmessage || "暂未绑定节点！");
																	}
																}
															});
												}

											});
								}
							}
						})
			},
		};

		AIMap.draw = [{
			createMarker: function(map, json, renderOptions, callback) {
				var json = json || {
					"point": {}
				};
				var markers = [];
				var points = [];
				for (i in json.points) {
					var point = json.points[i];

					var zhtml = '<div style="margin:0;line-height:20px;padding:2px;">' + '<img src="res/theme/default/images/infoWindow/iconfont-yidong.png" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>';
					for (var j = 0, length = point.staticData.length; j < length; j++) {
						zhtml += "<p style='display:block;word-break: break-all;word-wrap: break-word;width:175px;'>" + point.staticData[j].name + ":" + point.staticData[j].value + "</p>";
					}
					zhtml += "<p style='display:block;word-break: break-all;word-wrap: break-word;width:175px;margin: 2px 0;'>地址:" + point.address + "</p>";

					var marker = AIMap.draw.addMarker(map, point.lng,
						point.lat, point.title ? point.title : '', zhtml,
						renderOptions.icon ? renderOptions.icon : null,
						point.pointId ? point.pointId : null,
						point.businessId);
					points[i] = marker.getPosition();
					map.addOverlay(marker);
					markers[i] = marker;
				};
				if (renderOptions && renderOptions.isDrawLine == true) {
					AIMap.draw.drawLine(points,
						renderOptions.params ? renderOptions.params : '',
						function(line) {
							myMap.addOverlay(line);
						});
				};
				if (typeof callback == "function") {
					callback(markers);
				}

			},
			addMarker: function(map, lng, lat, title, shtml, icon, pointId, businessId) {
				var myIcon, url, _marker;
				var icon = parseInt(icon, 10);
				if (icon) {
					switch (icon) {
						case 1:
							url = "res/lib/AIMap/1.0.0/icon/yingyeting.png";
							break;
						case 2:
							url = "res/lib/AIMap/1.0.0/icon/shehuiqudao.png";
							break;
						case 3:
							url = "res/lib/AIMap/1.0.0/icon/jituankehu.png";
							break;
						default:
							url = "http://api0.map.bdimg.com/images/marker_red_sprite.png";
							break;
					}
					myIcon = new BMap.Icon(url, new BMap.Size(20, 25), {
						anchor: new BMap.Size(10, 25), // 指定定位位置
						infoWindowAnchor: new BMap.Size(10, 0)
					});
					myShadow = new BMap.Icon(url, new BMap.Size(20, 25), {
						anchor: new BMap.Size(10, 25), // 指定定位位置
						imageOffset: new BMap.Size(-20, 0)
							// 设置图片偏移
					});
					_marker = new BMap.Marker(new BMap.Point(lng, lat), {
						"title": title,
						"icon": myIcon,
						"shadow": myShadow
					});

				} else {
					_marker = new BMap.Marker(new BMap.Point(lng, lat), {
						"title": title
					});
				};

				if (pointId) {
					_marker.addEventListener("click", function(e) {

						// 关闭其他窗口
						myMap.closeInfoWindow();

						// 新建窗口
						var infoWin = new AIMap.InfoWindow(
							shtml, {
								enableMessage: false,
								width: 300,
								height: 160
							});
						this.openInfoWindow(infoWin);

						var dhtml = '<div style="margin:0;line-height:20px;padding:2px; max-width:300px;height:150px; color: #4d4d4d;font-size: 13px;">';
						AIMap.ajax.AjaxJson("res/data/dhtml.json", '&pointId=' + pointId + '&bussId=' + businessId, function(state, json) {
							if (state == 'success') {
								if (json && json.returnCode == '1') {
									for (i in json.rows) {
										dhtml += json.rows[i].propLabel + " : " + json.rows[i].propValue + "<br>";
									};
									dhtml += '</div>';
									infoWin.setContent(shtml + dhtml);
								}
							}
						});
					});
				} else {
					/* if(BMapLib&&BMapLib.EventWrapper){ */
					if (BMapLib.EventWrapper) {
						BMapLib.EventWrapper.addListener(_marker, 'click',
							function(e) {
								this.openInfoWindow(new BMap.InfoWindow(
									shtml, {
										enableMessage: false
									}));
							});
					} else {
						shtml += '</div>';
						var searchInfoWindow = new BMapLib.SearchInfoWindow(
							map, shtml, {
								title: title, // 标题
								width: 290, // 宽度
								panel: "panel", // 检索结果面板
								enableAutoPan: true, // 自动平移
								enableSendToPhone: false, // 是否启动发送到手机功能
								searchTypes: [BMAPLIB_TAB_SEARCH, // 周边检索
									BMAPLIB_TAB_TO_HERE, // 到这里去
									BMAPLIB_TAB_FROM_HERE // 从这里出发
								]
							});
						_marker.addEventListener("click", function(e) {
							searchInfoWindow.open(_marker);
						});
					}
				};
				return _marker;
			},
			drawCircle: function(point, radius, param, callback) {
				/**
				 * 根据圆心,半径画圆 points代表点,radius为半径 param表示渲染参数 callback返回对象
				 */
				param = param || {};
				var circle = new AIMap.Circle(point, radius, {
					strokeColor: param.strokeColor ? param.strokeColor : "blue",
					strokeWeight: param.strokeWeight ? param.strokeWeight : 3,
					strokeOpacity: param.strokeOpacity,
					strokeStyle: param.strokeStyle,
					enableMassClear: param.enableMassClear,
					enableEditing: param.enableEditing,
					enableClicking: param.enableClicking
				});
				callback(circle);
				return circle;
			},
			drawPolygon: function(points, param, callback) {
				/**
				 * 根据点画多边形 points代表点数组 param表示渲染参数 callback返回多边形对象
				 */
				param = param || {};
				var polygon = new AIMap.Polygon(points, {
					strokeColor: param.strokeColor ? param.strokeColor : "blue",
					strokeWeight: param.strokeWeight ? param.strokeWeight : 3,
					strokeOpacity: param.strokeOpacity,
					strokeStyle: param.strokeStyle,
					enableMassClear: param.enableMassClear,
					enableEditing: param.enableEditing,
					enableClicking: param.enableClicking
				});
				callback(polygon);
				return polygon;
			},
			drawShape: function(map, json, flag, callback) {
				var shape;
				if (!json.params) {
					json.params = {
						strokeColor: "blue", // 边线颜色。
						fillColor: "white", // 填充颜色。当参数为空时，圆形将没有填充效果。
						strokeWeight: 3, // 边线的宽度，以像素为单位。
						strokeOpacity: .8, // 边线透明度，取值范围0 - 1。
						fillOpacity: .3, // 填充的透明度，取值范围0 - 1。
						strokeStyle: 'solid' // 边线的样式，solid或dashed。
					}
				}
				if (json.drawingModes == "polygon") {
					var points = [];
					for (var i = 0, length = json.points.length; i < length; i++) {
						points[i] = new AIMap.Point(json.points[i].lng,
							json.points[i].lat);
					};
					shape = new AIMap.Polygon(points, json.params);
				}
				if (flag) {
					shape.disableMassClear(); // 禁止覆盖物在map.clearOverlays方法中被清除。
				}
				map.addOverlay(shape);
				if (typeof callback == 'function') {
					callback(shape);
				}
				return shape;
			},
		}];

		AIMap.ajax = {
			/*
			 * 原生ajax非跨域请求
			 */
			AjaxJson: function(url, datas, callback) {
				var AIMap_xmlhttp;
				if (window.XMLHttpRequest) {
					AIMap_xmlhttp = new XMLHttpRequest();
				} else if (window.ActiveXObject) {
					AIMap_xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				} else {
					alert("您的浏览器不支持ajax，请更换浏览器！");
					return false;
				}
				AIMap_xmlhttp.open("POST", url);
				AIMap_xmlhttp.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
				AIMap_xmlhttp.send(datas + "&_=" + (new Date()).getTime());
				AIMap_xmlhttp.onreadystatechange = function() {
					if (AIMap_xmlhttp.readyState == 4 && AIMap_xmlhttp.status == 200) {
						callback("success", eval("(" + AIMap_xmlhttp.responseText + ")"));
					}
				}
			},
			/*
			 * ajax跨域请求 datas中包含回调方法，缺省为AIMap_jsonp
			 */
			AjaxJsonp: function(url, datas) {
				// 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
				var url = url + datas + "&_=" + (new Date()).getTime();
				// 创建script标签，设置其属性
				var script = document.createElement('script');
				script.setAttribute('src', url);
				// 把script标签加入head，此时调用开始
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		};
	}

	var mapStyle = [{
		"featureType": "land",
		"elementType": "geometry",
		"stylers": {
			"color": "#094377ff"
		}
	}, {
		"featureType": "road",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#000000ff"
		}
	}, {
		"featureType": "highway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#0889a2ff",
			"weight": "1.5"
		}
	}, {
		"featureType": "subway",
		"elementType": "all",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "railway",
		"elementType": "all",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "arterial",
		"elementType": "geometry",
		"stylers": {
			"color": "#000000ff",
			"weight": "0.7"
		}
	}, {
		"featureType": "local",
		"elementType": "all",
		"stylers": {
			"color": "#000000ff",
			"weight": "0.2"
		}
	}, {
		"featureType": "water",
		"elementType": "all",
		"stylers": {
			"color": "#102c4eff"
		}
	}, {
		"featureType": "green",
		"elementType": "all",
		"stylers": {
			"color": "#094377ff"
		}
	}, {
		"featureType": "manmade",
		"elementType": "all",
		"stylers": {
			"color": "#5891b4ff"
		}
	}, {
		"featureType": "all",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "all",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#000000ff"
		}
	}];

	function AIMap_initMap() {
		AIMap_map = new AIMap.Map(AIMap_MAPID, {
			enableMapClick: false
		});
		AIMap_map.setMapStyle({
			styleJson: mapStyle
		});
		AIMap_map.enableScrollWheelZoom(); // 添加滚轮缩放
		AIMap_map.addControl(new AIMap.ScaleControl()); // 添加比例尺控件


		AIMap_Juhe = new AMapLib.MarkerClusterer(AIMap_map, {
			minClusterSize: 20,
			maxZoom: 16
		}); // 点聚合，多于20个点聚合，缩放级别大于16不聚合。建议：第三方应用自己使用分页功能，不使用聚合。

		// 定位
		if (AIMap_PARAMS.LOCATION.LNGLAT && AIMap_PARAMS.LOCATION.LNGLAT.FLAG) { // 根据百度经纬度定位
			var marker = AIMap_PARAMS.LOCATION.LNGLAT;
			var grade = marker.GRADE || "13";
			AIMap_map.centerAndZoom(new AIMap.Point(marker.POINTS[0].lng,
				marker.POINTS[0].lat), grade);
		} else if (AIMap_PARAMS.LOCATION.GPS && AIMap_PARAMS.LOCATION.GPS.FLAG) { // gps定位
			var gps = AIMap_PARAMS.LOCATION.GPS;
			var grade = gps.GRADE || "13";
			var points = gps.POINTS[0].lng + "," + gps.POINTS[0].lat;
			// gps转换百度坐标
			AIMap.init.geoconv(points, 1, 5, function(data) {
				AIMap_map.centerAndZoom(new AIMap.Point(data.result[0].x,
					data.result[0].y), grade);
			});
		} else if (AIMap_PARAMS.LOCATION.ADDRESS && AIMap_PARAMS.LOCATION.ADDRESS.FLAG) { // 根据中文名定位
			var address = AIMap_PARAMS.LOCATION.ADDRESS;
			var grade = address.GRADE || "13";
			var addr = address.ADDR;
			AIMap_map.centerAndZoom(addr, grade);
		}

		AIMap_map.addEventListener("tilesloaded", function() {
			AIMap_map.clearOverlays();
			if (typeof AIMap_PARAMS.loadcallback == "function") {
				AIMap_PARAMS.loadcallback(AIMap_map, AIMap);
			}
		});
	}

	/**
	 * 异步加载脚本
	 */
	function AIMap_asysScript(url, callback) {
		require([url], function() {
			if (callback) {
				callback();
			}
		})
	}

	/**
	 * 跨域传参过长分割数组 oldArr：要处理的数组 maxLength：每次可传输的最大长度限制
	 */
	function AIMap_splitArray(oldArr, maxLength) {
		var oldArr = oldArr.slice(0);
		// 每次可传输字符串的最大长度限制
		var MAX_LENGTH = maxLength || 255;
		// 建议每次传输的数组长度
		var RECOMM_SINGLE_ARRAY_LENGTH = 100;
		// 当建议传输长度仍过长时的递减值
		var RECOMM_STEP_BACK = 5;

		// 拆分后的数组子集，每个子数组stringify后长度不超过指定的限制
		var subArrs = [];

		// if(JSON.stringify(oldArr).length < MAX_LENGTH){//ie6需引入json2.js
		if (oldArr.join("").length < MAX_LENGTH) {
			// 小于最大限制时直接发送
			subArrs.push(oldArr);
		} else {
			// 对数组进行拆分
			var remainArr = oldArr;
			while (remainArr.length > 0) {
				for (var tryLength = RECOMM_SINGLE_ARRAY_LENGTH; tryLength > 0; tryLength -= RECOMM_STEP_BACK) {
					if (tryLength > remainArr.length) {
						tryLength = remainArr.length;
					}
					var subArr = remainArr.slice(0, tryLength);
					if (subArr.join("").length < MAX_LENGTH) {
						remainArr.splice(0, tryLength);
						subArrs.push(subArr);
						break;
					}
				}
			}
		}
		return subArrs;
	}

	/**
	 * 返回数组索引
	 */
	function AIMap_getIndex(array, val) {
		for (var i = 0, leng = array.length; i < leng; i++) {
			// if(AIMap_judgeSame(array[i],val)){
			// return i;
			// }
			if (array[i] == val) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * 判断是否为同一点 相差500以内---需要测试！
	 */
	function AIMap_judgeSame(array, array2) {
		if (Math.abs(array.lng * 1000000 - array2.lng * 1000000) < 500 && Math.abs(array.lat * 1000000 - array2.lat * 1000000) < 500)
			return true;
		else
			return false;
	}

	// BASE64编码
	function encodeBase64(str) {
		try {
			var wordArray = CryptoJS.enc.Utf8.parse(str);
			var base64Json = CryptoJS.enc.Base64.stringify(wordArray);
			return base64Json;
		} catch (e) {
			// console.log('CryptoJS is not include.');
		}
		return str;
	}

	function AIMap_loadStyles(url) {
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = url;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
	}

	function AIMap_getElementsByClassName(node, classname) {
		if (node.getElementsByClassName) {
			return node.getElementsByClassName(classname);
		} else {
			return (function getElementsByClass(searchClass, node) {
				if (node == null)
					node = document;
				var classElements = [],
					els = node.getElementsByTagName("*"),
					elsLen = els.length,
					pattern = new RegExp(
						"(^|\\s)" + searchClass + "(\\s|$)"),
					i, j;

				for (i = 0, j = 0; i < elsLen; i++) {
					if (pattern.test(els[i].className)) {
						classElements[j] = els[i];
						j++;
					}
				}
				return classElements;
			})(classname, node);
		}
	}

	function AIMap_addClass(obj, cls) {
		var obj_class = obj.className, // 获取 class 内容.
			blank = (obj_class != '') ? ' ' : ''; // 判断获取到的 class 是否为空,
		// 如果不为空在前面加个'空格'.
		added = obj_class + blank + cls; // 组合原来的 class 和需要添加的 class.
		obj.className = added; // 替换原来的 class.
	}

	function AIMap_removeClass(obj, cls) {
		var obj_class = ' ' + obj.className + ' '; // 获取 class 内容, 并在首尾各加一个空格.
		// ex) 'abc bcd' -> ' abc
		// bcd '
		obj_class = obj_class.replace(/(\s+)/gi, ' '), // 将多余的空字符替换成一个空格. ex) '
			// abc bcd ' -> ' abc
			// bcd '
			removed = obj_class.replace(' ' + cls + ' ', ' '); // 在原来的 class
		// 替换掉首尾加了空格的 class.
		// ex) ' abc bcd '
		// -> 'bcd '
		removed = removed.replace(/(^\s+)|(\s+$)/g, ''); // 去掉首尾空格. ex) 'bcd ' ->
		// 'bcd'
		obj.className = removed; // 替换原来的 class.
	}

	function AIMap_hasClass(obj, cls) {
		var obj_class = obj.className, // 获取 class 内容.
			obj_class_lst = obj_class.split(/\s+/); // 通过split空字符将cls转换成数组.
		x = 0;
		for (x in obj_class_lst) {
			if (obj_class_lst[x] == cls) { // 循环数组, 判断是否包含cls
				return true;
			}
		}
		return false;
	}

	// 阻止事件冒泡
	function AIMap_stopEvent(e) {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			window.event.cancelBubble = true;
		}
	}

	/*
	 * addEventListener:监听Dom元素的事件
	 * 
	 * target：监听对象 type：监听函数类型，如click,mouseover func：监听函数
	 */
	function AIMap_addEventHandler(target, type, func) {
		if (target.addEventListener) {
			// 监听IE9，谷歌和火狐
			target.addEventListener(type, func, false);
		} else if (target.attachEvent) {
			target.attachEvent("on" + type, func);
		} else {
			target["on" + type] = func;
		}
	}
	/*
	 * removeEventHandler:移除Dom元素的事件
	 * 
	 * target：监听对象 type：监听函数类型，如click,mouseover func：监听函数
	 */
	function AIMap_removeEventHandler(target, type, func) {
		if (target.removeEventListener) {
			// 监听IE9，谷歌和火狐
			target.removeEventListener(type, func, false);
		} else if (target.detachEvent) {
			target.detachEvent("on" + type, func);
		} else {
			delete target["on" + type];
		}
	}

	return {
		AIMap_loadScript: AIMap_loadScript,
		AIMap_encapsulateBMap: AIMap_encapsulateBMap,
		loadInfoWin: loadInfoWin,
		AIMap_loadTools: AIMap_loadTools,
		AIMap_modules: AIMap_modules,
		AIMap_initMap: AIMap_initMap,
		AIMap_asysScript: AIMap_asysScript,
		AIMap_splitArray: AIMap_splitArray,
		AIMap_getIndex: AIMap_getIndex,
		AIMap_judgeSame: AIMap_judgeSame,
		encodeBase64: encodeBase64,
		AIMap_loadStyles: AIMap_loadStyles,
		AIMap_getElementsByClassName: AIMap_getElementsByClassName,
		AIMap_addClass: AIMap_addClass,
		AIMap_removeClass: AIMap_removeClass,
		AIMap_hasClass: AIMap_hasClass,
		AIMap_stopEvent: AIMap_stopEvent,
		AIMap_addEventHandler: AIMap_addEventHandler,
		AIMap_removeEventHandler: AIMap_removeEventHandler,
	};
});
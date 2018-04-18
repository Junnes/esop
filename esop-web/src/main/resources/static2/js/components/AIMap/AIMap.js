(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'apiv'], factory) :
		(global.baiduMap = factory ($, bMap));
})(this, function ($, bMap) {
	var option;
	function baiduMap (_option) {
		option = _option;
		$('#' + option.obj).empty();
		$('#'+option.obj).removeAttr('style');
		var self = this;

        var map = new BMap.Map(option.obj, {
        	enableMapClick: false
        });

        if (option.location.lnglat && option.location.lnglat.flag) {// 根据百度经纬度定位
			var marker = option.location.lnglat;
			var grade = marker.grade || "13";
			var points = marker.points;
			map.centerAndZoom(new BMap.Point(points[0], points[1]), grade);
		} else if (option.location.address && option.location.address.flag) {// 根据中文名定位
			var address = option.location.address;
			var grade = address.grade || "13";
			var addr = address.addr;
			map.centerAndZoom(addr, grade);
		}

		map.addEventListener("tilesloaded", function() {
			if (typeof option.loadcallback == "function") {
				self._clearOverLay(map);
				option.loadcallback(self, map, option);
			}
		});

        map.enableScrollWheelZoom(); //启用滚轮放大缩小
        map.disable3DBuilding();
        map.setMapStyle({
        	styleJson: this._getMapStyle()
        });

        if (typeof option.initCallback == 'function') {
        	option.initCallback(self, map, option);
        }
	}
	baiduMap.prototype = {
		_getMapStyle: function () {
			return [{
				"featureType" : "land",
				"elementType" : "geometry",
				"stylers" : {
					"color" : "#094377ff"
				}
			}, {
				"featureType" : "road",
				"elementType" : "geometry.fill",
				"stylers" : {
					"color" : "#000000ff"
				}
			}, {
				"featureType" : "highway",
				"elementType" : "geometry.stroke",
				"stylers" : {
					"color" : "#0889a2ff",
					"weight" : "1.5"
				}
			}, {
				"featureType" : "subway",
				"elementType" : "all",
				"stylers" : {
					"visibility" : "off"
				}
			}, {
				"featureType" : "railway",
				"elementType" : "all",
				"stylers" : {
					"visibility" : "off"
				}
			}, {
				"featureType" : "arterial",
				"elementType" : "geometry",
				"stylers" : {
					"color" : "#000000ff",
					"weight" : "0.7"
				}
			}, {
				"featureType" : "local",
				"elementType" : "all",
				"stylers" : {
					"color" : "#000000ff",
					"weight" : "0.2"
				}
			}, {
				"featureType" : "water",
				"elementType" : "all",
				"stylers" : {
					"color" : "#102c4eff"
				}
			}, {
				"featureType" : "green",
				"elementType" : "all",
				"stylers" : {
					"color" : "#094377ff"
				}
			}, {
				"featureType" : "manmade",
				"elementType" : "all",
				"stylers" : {
					"color" : "#5891b4ff"
				}
			}, {
				"featureType" : "all",
				"elementType" : "labels.text.fill",
				"stylers" : {
					"color" : "#ffffffff"
				}
			}, {
				"featureType" : "all",
				"elementType" : "labels.text.stroke",
				"stylers" : {
					"color" : "#000000ff"
				}
			}];
		},
		_setPolygonLabel: function (polygon, map) {
			var poles = polygon.poles;
			var lat = ((+poles.maxLat) + (+poles.minLat)) / 2;
			var lng = ((+poles.maxLng) + (+poles.minLng)) / 2;
			var marker = new BMap.Marker(new BMap.Point(lng,lat));
		    var label = new BMap.Label(polygon.name, { offset: new BMap.Size(20, -10) });
		    marker.setLabel(label);
		    map.addOverlay(marker);
		},
		_setCircle: function (map, points, param, radius, callback) {
			myMap = map;
			
			var param = param || {};
			var radius = radius ? radius : 10000;
			var circle = new BMap.Circle({lng:points[0],lat:points[1]},radius);
		    circle.setFillColor(param.fillColor ? param.fillColor : "#44ffd1"); //填充颜色
		    circle.setStrokeColor(param.strokeColor ? param.strokeColor : "#44ffd1"); //边线颜色
		    circle.setFillOpacity(param.fillOpacity ? param.fillOpacity : 0.2); //边线颜色
		    circle.setStrokeOpacity(param.strokeOpacity ? param.strokeOpacity : 0.7); //边线颜色
		    circle.setStrokeWeight(param.strokeWeight ? param.strokeWeight : 0.7); //边线颜色
		    circle.setStrokeStyle(param.strokeStyle ? param.strokeStyle : 'dashed'); //边线颜色
		    map.addOverlay(circle);        //增加圆
		    if (typeof callback == 'function') {
		    	callback(circle);
		    }
		    return circle;
		},
		_drawPolygon : function(map, arr, param, callback) {
			/**
			 * 根据点画多边形 points代表点数组 param表示渲染参数 callback返回多边形对象
			 */
			param = param || {};
			var pointsArr = [];
			for (var i = 0; i < arr.point.length; i++) {
				pointsArr.push(new BMap.Point(arr.point[i].lng, arr.point[i].lat));
			}
			var polygon = new BMap.Polygon(pointsArr, {
				strokeColor : param.strokeColor ? param.strokeColor
						: "blue",
				strokeWeight : param.strokeWeight ? param.strokeWeight : 3,
				strokeOpacity : param.strokeOpacity,
				strokeStyle : param.strokeStyle,
				fillColor: param.fillColor ? param.fillColor : '#ef441c',
				fillOpacity: param.fillOpacity ? param.fillOpacity : 0.2
			});
			polygon.addEventListener('click', function () {
				if (typeof callback == 'function') {
			    	callback(polygon);
			    }
			});
			polygon.code = arr.id;
			polygon.poles = arr.poles;
			polygon.level = arr.level;
			polygon.name=arr.name;
			polygon.overlayType = 'polygon';
		    map.addOverlay(polygon);
			return polygon;
		},
		_setMarker: function (map, lng, lat, icon) {
			var myIcon, url, _marker;
			// var icon = parseInt(icon, 10);
			var icon = icon.toString();
			if (icon) {
				switch (icon) {
					case '0': 
						url = "../js/components/AIMap/img/0.png";
						break;
					case '1':
						url = "../js/components/AIMap/img/1.png";
						break;
					case '2':
						url = "../js/components/AIMap/img/2.png";
						break;
					case '3':
						url = "../js/components/AIMap/img/3.png";
						break;
				}
				if (icon == 1 || icon == 2 || icon == 3) {
					myIcon = new BMap.Icon(url, new BMap.Size(25, 35), {
						anchor: new BMap.Size(10, 25), // 指定定位位置
						infoWindowAnchor: new BMap.Size(10, 0)
					});
					myShadow = new BMap.Icon(url, new BMap.Size(25, 35), {
						anchor: new BMap.Size(10, 25), // 指定定位位置
						imageOffset: new BMap.Size(-20, 0) // 设置图片偏移
					});
				} else if (icon == 0) {
					myIcon = new BMap.Icon(url, new BMap.Size(60, 70), {
						anchor: new BMap.Size(30, 50), // 指定定位位置
						infoWindowAnchor: new BMap.Size(10, 0)
					});
					myShadow = new BMap.Icon(url, new BMap.Size(60, 70), {
						anchor: new BMap.Size(30, 50), // 指定定位位置
						imageOffset: new BMap.Size(-20, 0) // 设置图片偏移
					});
				}

				_marker = new BMap.Marker(new BMap.Point(lng, lat), {
					"icon": myIcon,
					"shadow": myShadow
				});

			} else {
				_marker = new BMap.Marker(new BMap.Point(lng, lat));
			};
			map.addOverlay(_marker);
			return _marker;
		},
		_getRange: function (map) {
			var bounds = map.getBounds();
			return bounds;
		},
		_clearOverLay(map) {
			map.clearOverlays();
		},
		_setCallback: function (fun, map) {
			var self = this;
			if (typeof fun == 'function') {
				option.loadcallback ? option.loadcallback = fun : option['loadcallback'] = fun;
			}
		},
		_setPolygonClick: function (map, polygon) {
			var overLays = map.getOverlays();
			var polygons = [];
			overLays.forEach(function (item, index) {
				if (item.overlayType == 'polygon') {
					polygons.push(item);
				}
			});
			polygons.forEach(function (item, index) {
				if (item.code == polygon.code) {
					item.setStrokeColor('purple');
					item.setFillColor('orange');
				} else {
					item.setStrokeColor('#ea3106');
					item.setFillColor('#ef441c');
				}
			});
		}
	};
	baiduMap.prototype.constructor = baiduMap;
	return baiduMap;
})
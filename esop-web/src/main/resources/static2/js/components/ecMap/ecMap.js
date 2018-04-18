(function(global, factory) {
    typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) :
        typeof define == 'function' && define.amd ? define(['jquery', 'ec', 'Module'], factory) : (global.ecMap = factory($, ec, Module));
})(this, function($, ec, Module) {
    function ecMap(option) {
        var _option = $.extend({
            data: []
        }, option);
        this._init(_option, _option.cityId);
    }
    ecMap.prototype = {
        _init: function(option, cityId) {
            var self = this;
            var cityid;
            if (arguments.length > 1) {
                cityid = cityId;
            }
            $('#' + option.obj).empty();
            if (option.degree == 'province') {
                $('.map-back').hide();
            } else if (option.degree == 'city') {
                $('.map-back').show();
            }
            var colors = ['#0b518a', '#0f3c5d', '#082347', '#07284a', '#072a58', '#062a57', '#08254c', '#063b66', '#063a74', '#063863', '#072b5a', '#0d4398', '#1054bd'];

            $.ajax({
                // url: '../js/components/ecMap/zhejiang.json',
                url: option.mapUrl,
                dataType: 'json',
                success: function(geoJson) {
                    var map = {
                        "570": "330800",
                        "571": "330100",
                        "572": "330500",
                        "573": "330400",
                        "574": "330200",
                        "575": "330600",
                        "576": "331000",
                        "577": "330300",
                        "578": "331100",
                        "579": "330700",
                        "580": "330900",
                        "5701": "330802",
                        "5703": "330822",
                        "5704": "330824",
                        "5702": "330881",
                        "5706": "330803",
                        "5705": "330825",
                        "5719": "330108",
                        "571C": "330104",
                        "571B": "330106",
                        "5718": "330185",
                        "5717": "330122",
                        "5716": "330127",
                        "5715": "330182",
                        "5714": "330110",
                        "5713": "330111",
                        "5712": "330109",
                        "571D": "330105",
                        "571A": "330103",
                        "5711": "330102",
                        "5725": "330503",
                        "5722": "330522",
                        "5721": "330502",
                        "5723": "330521",
                        "5724": "330523",
                        "5735": "330482",
                        "5731": "330411",
                        "5734": "330421",
                        "5733": "330481",
                        "5736": "330424",
                        "5732": "330483",
                        "5748": "330211",
                        "5745": "330206",
                        "5749": "330212",
                        "5741": "330203",
                        "574C": "330205",
                        "574B": "330284",
                        "5744": "330225",
                        "5743": "330282",
                        "5746": "330226",
                        "5747": "330283",
                        "5742": "330281",
                        "5751": "330602",
                        "5753": "330604",
                        "5755": "330624",
                        "5752": "330681",
                        "5754": "330683",
                        "5756": "330603",
                        "5761": "331002",
                        "5763": "331004",
                        "5769": "331021",
                        "5762": "331003",
                        "5768": "331022",
                        "5767": "331023",
                        "5766": "331024",
                        "5765": "331081",
                        "5764": "331082",
                        "577B": "330304",
                        "5771": "330303",
                        "577A": "330302",
                        "5774": "330326",
                        "5775": "330324",
                        "5776": "330305",
                        "5778": "330329",
                        "5777": "330328",
                        "5773": "330381",
                        "5779": "330327",
                        "5772": "330382",
                        "5784": "331125",
                        "5783": "331121",
                        "5787": "331123",
                        "5788": "331124",
                        "5782": "331122",
                        "5785": "331126",
                        "5786": "331181",
                        "5789": "331127",
                        "578B": "331102",
                        "578A": "331105",
                        "5793": "330727",
                        "5797": "330726",
                        "5791": "330702",
                        "5794": "330781",
                        "5798": "330723",
                        "5799": "330703",
                        "5792": "330782",
                        "5795": "330783",
                        "5796": "330784",
                        "5801": "330902",
                        "5803": "330921",
                        "5804": "330922",
                        "5802": "330903",
                    };
                    var id_map = {
                        "330800": 570,
                        "330802": "5701",
                        "330822": "5703",
                        "330824": "5704",
                        "330881": "5702",
                        "330803": "5706",
                        "330825": "5705",
                        "330100": "571",
                        "330108": "5719",
                        "330104": "571C",
                        "330106": "571B",
                        "330185": "5718",
                        "330122": "5717",
                        "330127": "5716",
                        "330182": "5715",
                        "330110": "5714",
                        "330111": "5713",
                        "330109": "5712",
                        "330105": "571D",
                        "330103": "571A",
                        "330102": "5711",
                        "330500": 572,
                        "330503": "5725",
                        "330522": "5722",
                        "330502": "5721",
                        "330521": "5723",
                        "330523": "5724",
                        "330400": 573,
                        "330482": "5735",
                        "330411": "5731",
                        "330421": "5734",
                        "330481": "5733",
                        "330424": "5736",
                        "330483": "5732",
                        "330200": 574,
                        "330211": "5748",
                        "330206": "5745",
                        "330212": "5749",
                        "330203": "5741",
                        "330205": "574C",
                        "330284": "574B",
                        "330225": "5744",
                        "330282": "5743",
                        "330226": "5746",
                        "330283": "5747",
                        "330281": "5742",
                        "330600": 575,
                        "330602": "5751",
                        "330604": "5753",
                        "330624": "5755",
                        "330681": "5752",
                        "330683": "5754",
                        "330603": "5756",
                        "331000": 576,
                        "331002": "5761",
                        "331004": "5763",
                        "331021": "5769",
                        "331003": "5762",
                        "331022": "5768",
                        "331023": "5767",
                        "331024": "5766",
                        "331081": "5765",
                        "331082": "5764",
                        "330300": 577,
                        "330303": "577B",
                        "330302": "5771",
                        "330304": "577A",
                        "330326": "5774",
                        "330324": "5775",
                        "330305": "5776",
                        "330329": "5778",
                        "330328": "5777",
                        "330381": "5773",
                        "330327": "5779",
                        "330382": "5772",
                        "331100": 578,
                        "331125": "5784",
                        "331121": "5783",
                        "331123": "5787",
                        "331124": "5788",
                        "331122": "5782",
                        "331126": "5785",
                        "331181": "5786",
                        "331127": "5789",
                        "331102": "578B",
                        "331105": "578A",
                        "330700": 579,
                        "330727": "5793",
                        "330726": "5797",
                        "330702": "5791",
                        "330781": "5794",
                        "330723": "5798",
                        "330703": "5799",
                        "330782": "5792",
                        "330783": "5795",
                        "330784": "5796",
                        "330900": 580,
                        "330902": "5801",
                        "330921": "5803",
                        "330922": "5804",
                        "330903": "5802"
                    };
                    var name_map = {
                        "570": "衢州",
                        "571": "杭州",
                        "572": "湖州",
                        "573": "嘉兴",
                        "574": "宁波",
                        "575": "绍兴",
                        "576": "台州",
                        "577": "温州",
                        "578": "丽水",
                        "579": "金华",
                        "580": "舟山",
                        "5701": "柯城",
                        "5703": "常山",
                        "5704": "开化",
                        "5702": "江山",
                        "5706": "衢江",
                        "5705": "龙游",
                        "571A": "下沙",
                        "5716": "淳安",
                        "5713": "富阳",
                        "5717": "桐庐",
                        "5718": "临安",
                        "5715": "建德",
                        "571C": "江干",
                        "5714": "余杭",
                        "5712": "萧山",
                        "5711": "武林",
                        "5719": "滨江",
                        "571B": "西湖",
                        "571D": "拱墅",
                        "5725": "南浔",
                        "5722": "长兴",
                        "5721": "吴兴",
                        "5723": "德清",
                        "5724": "安吉",
                        "5735": "平湖",
                        "5731": "嘉禾",
                        "5734": "嘉善",
                        "5733": "海宁",
                        "5736": "海盐",
                        "5732": "桐乡",
                        "5748": "镇海",
                        "5745": "北仑",
                        "5749": "鄞州",
                        "5741": "海曙",
                        "574C": "江北",
                        "574B": "江东",
                        "5744": "象山",
                        "5743": "慈溪",
                        "5746": "宁海",
                        "5747": "奉化",
                        "5742": "余姚",
                        "5751": "越城",
                        "5753": "上虞",
                        "5755": "新昌",
                        "5752": "诸暨",
                        "5754": "嵊州",
                        "5756": "绍兴县",
                        "5761": "椒江",
                        "5763": "路桥",
                        "5769": "玉环",
                        "5762": "黄岩",
                        "5768": "三门",
                        "5767": "天台",
                        "5766": "仙居",
                        "5765": "温岭",
                        "5764": "临海",
                        "577B": "龙湾",
                        "5771": "鹿城",
                        "577A": "瓯海",
                        "5774": "平阳",
                        "5775": "永嘉",
                        "5776": "洞头",
                        "5778": "泰顺",
                        "5777": "文成",
                        "5773": "瑞安",
                        "5779": "苍南",
                        "5772": "乐清",
                        "5784": "云和",
                        "5783": "青田",
                        "5787": "遂昌",
                        "5788": "松阳",
                        "5782": "缙云",
                        "5785": "庆元",
                        "5786": "龙泉",
                        "5789": "景宁畲族自治",
                        "578B": "莲都",
                        "578A": "南城",
                        "5793": "磐安",
                        "5797": "浦江",
                        "5791": "婺城",
                        "5794": "兰溪",
                        "5798": "武义",
                        "5799": "金东",
                        "5792": "义乌",
                        "5795": "东阳",
                        "5796": "永康",
                        "5801": "定海",
                        "5803": "岱山",
                        "5804": "嵊泗",
                        "5802": "普陀"
                    };
                    var map_name = {};

                    // 确定data
                    var mapData = [];
                    var _option = {
                        light: {
                            main: {
                                intensity: 1,
                                shadow: true,
                                alpha: 150,
                                beta: 70
                            }
                        },
                        geo: {
                            map: option.mapType,
                            itemStyle: {
                                normal: {
                                    areaColor: '#ddd',
                                    borderColor: 'transparent'
                                },
                                emphasis: {
                                    areaColor: '#ccc'
                                }
                            },
                        },
                        series: []
                    };
                    var city = [];
                    var nameMapData = {}; // 自定义name
                    var markPos = {}; // 标注数据
                    var template = [];
                    
                    //----------------------------------------------------------------------------
                    var dataMap = {};
                    for(var i = 0; i < option.data.length; i ++) {
                    	dataMap[option.data[i].id] = option.data[i];
                    }
                    
                    for(var i = 0; i < geoJson.features.length; i ++) {
                    	/*if(!dataMap[id_map[geoJson.features[i].id]]) {
                    		continue;
                    	}*/
                    	if (dataMap[id_map[geoJson.features[i].id]] && !!dataMap[id_map[geoJson.features[i].id]].color) {
                    		mapData.push({
                                name: name_map[id_map[geoJson.features[i].id]],
                                value: dataMap[id_map[geoJson.features[i].id]].value,
                                id: geoJson.features[i].id,
                                itemStyle: {
                                    normal: {
                                        areaColor: dataMap[id_map[geoJson.features[i].id]].color
                                    }
                                }
                            });
                        } else {
                            mapData.push({
                            	name: name_map[id_map[geoJson.features[i].id]],
                                value: dataMap[id_map[geoJson.features[i].id]] ? dataMap[id_map[geoJson.features[i].id]].value:0,
                                id: geoJson.features[i].id,
                                itemStyle: {
                                    normal: {
                                        areaColor: colors[i]
                                    },
                                    emphasis: {
                                        areaColor: '#0d9682'
                                    }
                                }
                            });
                        }
                    	
                    	nameMapData[geoJson.features[i].properties.name] = name_map[id_map[geoJson.features[i].id]];
                    }
                    
                  //----------------------------------------------------------------------------
                    
                    var series = [];
                    [
                        mapData
                    ].forEach(function(item, i) {
                        series.push({
                            type: 'map',
                            mapType: option.mapType, // 自定义扩展图表类型
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                    },
                                    borderColor: '#3ab3ff',
                                    borderWidth: 2
                                },
                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: mapData,
                            nameMap: nameMapData,
                            label: {
                                normal: {
                                    position: 'bottom',
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 15
                                    },
                                },
                                emphasis: {
                                    position: 'bottom',
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 15
                                    },
                                }
                            },
                            zlevel: 0
                        });
                    });
                    _option.series = series;
                    ec.registerMap(option.mapType, geoJson);
                    var charts;
                    if (charts != null && charts != "" && charts != undefined) {
                        charts.dispose();
                    }
                    $('#'+option.obj).removeAttr('_echarts_instance_').removeAttr('style');

                    charts = ec.init(document.getElementById(option.obj));
                    charts.setOption(_option);

                    var markData = [];
                    var smallCityData = [];

                    if (!!cityid) {
                        if (cityid == 571) {
                            for (var f = 0; f < mapData.length; f++) {
                                if (mapData[f].id == "330102" || mapData[f].id == "330108" ||
                                    mapData[f].id == "330105" || mapData[f].id == "330104") {
                                    smallCityData.push(mapData[f]);
                                } else {
                                    markData.push(mapData[f]);
                                }
                            }
                            self._setShengEcChange(markData, option);
                            self._setSpecialTab(smallCityData, option.obj);
                        } else if (cityid == 574) {
                            for (var f = 0; f < mapData.length; f++) {
                                if (mapData[f].id == "330212" || mapData[f].id == "330205" ||
                                    mapData[f].id == "330203" || mapData[f].id == "330284") {
                                    smallCityData.push(mapData[f]);
                                } else {
                                    markData.push(mapData[f]);
                                }
                            }
                            self._setShengEcChange(markData, option);
                            self._setSpecialTab(smallCityData, option.obj);
                        } else {
                            self._setShengEcChange(mapData, option);
                        }
                             
                    } else {
                        self._setShengEcChange(mapData, option);
                    }
                    var cp = [];
                    for (var m = 0; m < geoJson.features.length; m++) {
                        if (geoJson.features[m].id == cityid) {
                            cp = geoJson.features[m].properties.cp;
                        }
                    }
                    charts.on('click', function(params) {
                        self._setAreaClick(id_map[params.data.id], option, params.data.name, cp);
                    });

                    $('#' + option.obj).find('.map-point').off('click').on('click', function() {
                        self._setAreaClick(id_map[$(this).attr('city')], option, $(this).attr('cityname'), cp);
                    });

                }
            });
        },
        _setAreaClick: function(id, option, city, cp) {
            var self = this;
            var degree;
            var currentId = $('.map-back').attr('currentid');
            switch(option.degree) {
                case 'province':
                    degree = 'city';
                    $.ajax({
                        url: '../js/components/ecMap/get'+id+'.json',
                        dataType: 'json',
                        success: function (data) {
                            $('.map-back').attr('currentid', id).attr("backid", '').attr('mapType', city).attr('beforeNext', city).attr('degree', degree)
                                .attr('parentUrl', '../js/components/ecMap/getZhejiang.json').attr('btnShow', true)
                                .attr('mapUrl', '../js/components/ecMap/' + id + '.json');
                            option.data = data;
                            option.pageId = 'gridviewCity';
                            option.mapUrl = '../js/components/ecMap/' + id + '.json';
                            option.parentUrl = '../js/components/ecMap/getZhejiang.json';
                            option.backId = '';
                            option.currentId = id;
                            option.mapType = city;
                            option.btnShow = true;
                            option.degree = degree;
                            self._init(option, id);
                            self._setPageFresh(degree, id, option);
                        }
                    });
                    break;
                case 'city': 
                    degree = 'county';
                    $('.map-back').attr('currentid', id).attr("backid", currentId).attr('mapType', city).attr('degree', degree)
                        .attr('parentUrl', '../js/components/ecMap/get'+currentId+'.json')
                        .attr('mapUrl', '../js/components/ecMap/'+currentId+'.json');
                    
                    new Module({
                        obj: option.obj,
                        cp: cp,
                        // cp: [120.709594, 28.020172],
                        radius: 5000,
                        type: 'baiduMap',
                        gis_url : "http://qdjkzx1.zj.chinamobile.com/bsrp-web/gisSdkAction.do",
                        appId : 230322,
                        location : { // 地图定位服务，三种定位方式只能任选其一。
                            address : {
                                flag : true,
                                grade : 12,
                                addr : city
                            },
                            lnglat: {
                                flag: false,
                                grade: 13,
                                points: cp
                            }
                        },
                        initCallback:function (self, map, option) {
                            console.log('地图初始化回调!');
                            setTimeout(function () {
                                self._setCallback(function(self, map, option) {
                                    console.log(self._getRange(map));
                                    
                                    var dotGroups = [{
                                            lng: '120.182742',
                                            lat: '30.283339',
                                            icon: 1
                                            }, {
                                                lng: '120.18073',
                                                lat: '30.261131',
                                                icon: 1
                                            }, {
                                                lng: '120.193809',
                                                lat: '30.241165',
                                                icon: 2
                                            }, {
                                                lng: '120.205307',
                                                lat: '30.254643',
                                                icon: 3
                                            }, {
                                                lng: '120.226579',
                                                lat: '30.257388',
                                                icon: 2
                                            }
                                        ],
                                        polygonGroups = [
                                            {
                                                id: 123,
                                                point: [{
                                                    lng: '120.052742',
                                                    lat: '30.283339'
                                                }, {
                                                    lng: '120.08073',
                                                    lat: '30.161131'
                                                }, {
                                                    lng: '120.193809',
                                                    lat: '30.241165'
                                                }, {
                                                    lng: '120.205307',
                                                    lat: '30.254643'
                                                }, {
                                                    lng: '120.226579',
                                                    lat: '30.257388'
                                                }, {
                                                    lng: '120.198696',
                                                    lat: '30.280345'
                                                }]
                                            }, {
                                                id: 234,
                                                point: [{
                                                    lng: '120.209188',
                                                    lat: '30.296748'
                                                }, {
                                                    lng: '120.249432',
                                                    lat: '30.285771'
                                                }, {
                                                    lng: '120.310373',
                                                    lat: '30.23636'
                                                }, {
                                                    lng: '120.29715',
                                                    lat: '30.165444'
                                                }, {
                                                    lng: '120.187341',
                                                    lat: '30.186425'
                                                }]
                                            }
                                        ];
                                    for (var i = 0; i < dotGroups.length; i++) {
                                        self._setMarker(map, dotGroups[i].lng, dotGroups[i].lat, dotGroups[i].icon);
                                    }

                                    for (var j = 0; j < polygonGroups.length; j++) {
                                        self._drawPolygon(map, polygonGroups[j], {
                                            strokeColor: '#ea3106',
                                            strokeWeight: 1.5,
                                            fillColor: '#ef441c',
                                            strokeOpacity: 1,
                                            fillOpacity: 0.3,
                                            strokeStyle: 'solid'
                                        }, function (polygon) {
                                            self._setPolygonClick(map, polygon);
                                            alert('多边形点击事件！');
                                        });
                                    }

                                    self._setCircle(map, option.cp, {
                                        strokeColor: '#44ffd1',
                                        strokeWeight: 2,
                                        fillColor: '#44ffd1',
                                        strokeOpacity: 0.7,
                                        fillOpacity: 0.25,
                                        strokeStyle: 'dashed'
                                    }, option.radius);
                                }, map);
                            }, 1000);
                        }
                    });
                    self._setPageFresh(degree, id, option);
                    break;
            }

           
        },
        _setShengEcChange: function(mapData, option) {
            var self = this;
            var obj = option.obj;
            var template = ['<div class="map-point-box">'];
            for (var i = 0; i < mapData.length; i++) {
                template.push('<div class="map-point mark-' + mapData[i].id + '" city="' + mapData[i].id + '" cityName="' + mapData[i].name + '">' +
                    // '<div class="map-point-item">'+
                    '<p class="map-point-text">' + mapData[i].value + '</p>' +
                    // '</div>'+
                    '</div>');
            }
            template.push('</div>');
            var templateMark = template.join('');
            $('#' + obj).append(templateMark);
        },
        _setSpecialTab: function (speData, obj) {
            var self = this;
            if (speData.length > 0) {
                var template = ['<div class="spe-box"><ul>'];
                for (var m = 0; m < speData.length; m++) {
                    template.push('<li class=" spe-li clearfix"><div class="spe-data-name">'+speData[m].name+
                        '</div><div class="spe-data-val">'+speData[m].value+'</div></li>');
                }
                template.push('</ul></div>');
                $('#'+obj).append(template.join(''));
            }
                
        },
        _setPageFresh: function (degree, channelId, option) {
            var self = this;
            if(typeof option.callback == 'function') {
            	var mapopt={
    					"degree": option.degree,
    					"mapUrl": option.mapUrl,
    					"parentUrl": option.parentUrl,
    					"backId": option.backId,
    					"currentId": option.currentId,
    					"mapType": option.mapType,
    					"btnShow": option.btnShow
    			};
            	option.callback(degree, channelId,mapopt);
            }
        }
    };
    ecMap.prototype.constructor = ecMap;
    return ecMap;
})
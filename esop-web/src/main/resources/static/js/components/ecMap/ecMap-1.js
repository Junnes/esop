(function(global, factory) {
    typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) :
        typeof define == 'function' && define.amd ? define(['jquery', 'ec', 'Module'], factory) : (global.ecMap = factory($, ec, Module));
})(this, function($, ec, Module) {
    function ecMap(option) {
        var _option = $.extend({
            data: []
        }, option);
        this._init(_option);
    }
    ecMap.prototype = {
        _init: function(option) {
            var self = this;
            $('#' + option.obj).empty();
            // var colors = ['#2a4d9c', '#305ec4', '#4376e9', '#4281e8', '#4ca5f1', '#59bef2',
            //     '#4ec4f2', '#62cef8', '#8cd9f3', '#60e4fb', '#79eeff', '#9ef1ff', '#b4f6ff'];
            // var colors = ['#b4f6ff', '#9ef1ff', '#79eeff', '#60e4fb', '#8cd9f3', '#62cef8',
            //     '#4ec4f2', '#59bef2', '#4ca5f1', '#4281e8', '#4376e9', '#305ec4', '#2a4d9c'];
            // var colors = ['#0b518a', '#0f3c5d', '#082347', '#07284a', '#072a58', '#062a57', '#08254c', '#063b66', '#063a74', '#063863', '#072b5a'];
            var colors = ['#0b518a', '#0f3c5d', '#082347', '#07284a', '#072a58', '#062a57', '#08254c', '#063b66', '#063a74', '#063863', '#072b5a', '#0d4398', '#1054bd'];
            var name_map = {"111":"桐乡","571A":"下沙","5716":"淳安","5713":"富阳","5717":"桐庐","5718":"临安","5715":"建德","571C":"江干","5714":"余杭","5712":"萧山","5711":"武林","5719":"滨江","571B":"西湖","571D":"拱墅","570":"衢州","571":"杭州","572":"湖州","573":"嘉兴","574":"宁波","575":"绍兴","576":"台州","577":"温州","578":"丽水","579":"金华","580":"舟山","5701":"柯城","5702":"江山","5703":"常山","5704":"开化","5705":"龙游","5706":"衢江","5721":"南浔","5722":"长兴","5723":"吴兴","5724":"安吉","5725":"德清","5731":"海盐","5732":"海宁","5733":"嘉善","5734":"秀洲","5735":"平湖","5736":"南湖","5741":"余姚","5742":"奉化","5743":"宁海","5744":"慈溪","5745":"象山","5746":"江北","5747":"海曙","5748":"鄞州","5749":"北仑","5751":"越城","5752":"嵊州","5753":"新昌","5754":"诸暨","5755":"柯桥","5756":"上虞","5761":"椒江","5762":"路桥","5763":"玉环","5764":"黄岩","5765":"三门","5766":"天台","5767":"仙居","5768":"温岭","5769":"临海","5771":"乐清","5772":"苍南","5773":"瑞安","5774":"文成","5775":"泰顺","5776":"洞头","5777":"永嘉","5778":"平阳","5779":"瓯海","5781":"云和","5782":"青田","5783":"遂昌","5784":"松阳","5785":"缙云","5786":"庆元","5787":"龙泉","5788":"景宁","5789":"莲都","5791":"磐安","5792":"浦江","5793":"婺城","5794":"兰溪","5795":"武义","5796":"金东","5797":"义乌","5798":"东阳","5799":"永康","5801":"定海","5802":"岱山","5803":"嵊泗","5804":"普陀","574C":"镇海","577B":"龙湾","577A":"鹿城"};
            var map = {"111":"330483","5719":"330108","571C":"330104","571B":"330106","5718":"330185","5717":"330122","5716":"330127","5715":"330182","5714":"330110","5713":"330111","5712":"330109","571D":"330105","571A":"330103","5711":"330102","570":"330800","571":"330100","572":"330500","573":"330400","574":"330200","575":"330600","576":"331000","577":"330300","578":"331100","579":"330700","580":"330900","5701":"330802","5702":"330881","5703":"330822","5704":"330824","5705":"330825","5706":"330803","5721":"330503","5722":"330522","5723":"330502","5724":"330523","5725":"330521","5731":"330424","5732":"330481","5733":"330421","5734":"330411","5735":"330482","5736":"330402","5741":"330281","5742":"330283","5743":"330226","5744":"330282","5745":"330225","5746":"330205","5747":"330203","5748":"330212","5749":"330206","5751":"330602","5752":"330683","5753":"330624","5754":"330681","5755":"330603","5756":"330604","5761":"331002","5762":"331004","5763":"331021","5764":"331003","5765":"331022","5766":"331023","5767":"331024","5768":"331081","5769":"331082","5771":"330382","5772":"330327","5773":"330381","5774":"330328","5775":"330329","5776":"330305","5777":"330324","5778":"330326","5779":"330304","5781":"331125","5782":"331121","5783":"331123","5784":"331124","5785":"331122","5786":"331126","5787":"331181","5788":"331127","5789":"331102","5791":"330727","5792":"330726","5793":"330702","5794":"330781","5795":"330723","5796":"330703","5797":"330782","5798":"330783","5799":"330784","5801":"330902","5802":"330921","5803":"330922","5804":"330903","574C":"330211","577B":"330303","577A":"330302"};
            var id_map = {"330483":111, "330100":571,"330108":"5719","330104":"571C","330106":"571B","330185":"5718","330122":"5717","330127":"5716","330182":"5715","330110":"5714","330111":"5713","330109":"5712","330105":"571D","330103":"571A","330102":"5711","330200":574,"330203":5747,"330205":5746,"330206":5749,"330211":"574C","330212":5748,"330225":5745,"330226":5743,"330281":5741,"330282":5744,"330283":5742,"330300":577,"330302":"577A","330303":"577B","330304":5779,"330305":5776,"330324":5777,"330326":5778,"330327":5772,"330328":5774,"330329":5775,"330381":5773,"330382":5771,"330400":573,"330402":5736,"330411":5734,"330421":5733,"330424":5731,"330481":5732,"330482":5735,"330500":572,"330502":5723,"330503":5721,"330521":5725,"330522":5722,"330523":5724,"330600":575,"330602":5751,"330603":5755,"330604":5756,"330624":5753,"330681":5754,"330683":5752,"330700":579,"330702":5793,"330703":5796,"330723":5795,"330726":5792,"330727":5791,"330781":5794,"330782":5797,"330783":5798,"330784":5799,"330800":570,"330802":5701,"330803":5706,"330822":5703,"330824":5704,"330825":5705,"330881":5702,"330900":580,"330902":5801,"330903":5804,"330921":5802,"330922":5803,"331000":576,"331002":5761,"331003":5764,"331004":5762,"331021":5763,"331022":5765,"331023":5766,"331024":5767,"331081":5768,"331082":5769,"331100":578,"331102":5789,"331121":5782,"331122":5785,"331123":5783,"331124":5784,"331125":5781,"331126":5786,"331127":5788,"331181":5787};
            var reverData = option.data;
            reverData.sort(function(a, b) {
                if (a.value < b.value) {
                    return 1;
                } else if (a.value > b.value) {
                    return -1;
                } else {
                    return 0;
                }
            });
            // 确定data
            var mapData = [];
            if (reverData.length > 0) { //获取series数据
                for (var i = 0; i < reverData.length; i++) {
                    if (!!reverData[i].color) {
                        mapData.push({
                            name: reverData[i].name,
                            value: reverData[i].value,
                            id: reverData[i].id,
                            itemStyle: {
                                normal: {
                                    areaColor: reverData[i].color
                                }
                            }
                        });
                    } else {
                        mapData.push({
                            name: reverData[i].name,
                            value: reverData[i].value,
                            id: reverData[i].id,
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
                }
            }
            mapData.sort(function(a, b) {
                if (a.id > b.id) {
                    return 1;
                } else if (a.id < b.id) {
                    return -1;
                } else {
                    return 0;
                }
            });
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
            $.ajax({
                // url: '../js/components/ecMap/zhejiang.json',
                url: option.mapUrl,
                dataType: 'json',
                success: function(geoJson) {
                    var pointData = [];

                    for (var j = 0; j < option.data.length; j++) {
                        // debugger
                        var name = '';
                        if (geoJson.features[j].properties.name.charAt(geoJson.features[j].properties.name.length - 1) == '市' || 
                            geoJson.features[j].properties.name.charAt(geoJson.features[j].properties.name.length - 1) == '县' || 
                            geoJson.features[j].properties.name.charAt(geoJson.features[j].properties.name.length - 1) == '区') {
                            name = geoJson.features[j].properties.name.slice(0, geoJson.features[j].properties.name.length-1);
                        } else {
                            name = geoJson.features[j].properties.name;
                        }
                        for (var k = 0; k < mapData.length; k++) {
                            if (mapData[k].name == name) {
                                pointData.push(mapData[k]);
                            }
                        }
                    }
                    // console.log(pointData);
                    // console.log(mapData)
                    var city = [];
                    var nameMapData = {}; // 自定义name
                    var markPos = {}; // 标注数据
                    var template = [];
                    for (var i = 0; i < option.data.length; i++) {
                        city.push({
                            name: geoJson.features[i].properties.name,
                            id: geoJson.features[i].id
                        });
                        markPos[mapData[i].name] = geoJson.features[i].properties.cp;
                        markPos[mapData[i].name] = geoJson.features[i].properties.name;
                        // nameMapData[geoJson.features[i].properties.name] = mapData[i].name;
                        nameMapData[geoJson.features[i].properties.name] = pointData[i].name;

                    }
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
                                    borderWidth: 2,
                                    // shadowColor: 'rgba(255, 255, 255, 0.5)',
                                    // shadowBlur: 25
                                },
                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: pointData,
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
                    self._setShengEcChange(pointData, option);
                    charts.on('click', function(params) {
                        self._setAreaClick(params.data.id, option, params.data.name);
                    });

                    $('#' + option.obj).find('.map-point').off('click').on('click', function() {
                        self._setAreaClick($(this).attr('city'), option, $(this).attr('cityname'));
                    });

                    if (option.btnShow == true) {
                        $('#'+option.obj).append('<div class="map-back" before="zhejiang">返回</div>');
                        $('#'+option.obj).find('.map-back').off().on('click', function () {
                            option.mapUrl = '../js/components/ecMap/zhejiang.json';
                            $.ajax({
                                url: '../../../js/components/ecMap/getZhejiang.json',
                                dataType: 'json',
                                success: function (data) {
                                    option.data = data;
                                    option.btnShow = false;
                                    new Module(option);
                                }
                            });
                            
                        });
                    }

                }
            });
        },
        _setAreaClick: function(id, option, city) {
            var self = this;
            
            $.ajax({
                url: '../../../js/components/ecMap/get'+id+'.json',
                dataType: 'json',
                success: function (data) {
                    option.data = data;
                    option.pageId = 'gridviewCity';
                    option.mapUrl = '../js/components/ecMap/' + id + '.json';
                    option.mapType = city;
                    option.btnShow = true;
                    self._init(option);
                    /*var _opt = $.extend({
                        data: data
                    }, {
                        obj: option.obj,
                        type: option.type,
                        pageId: 'gridviewCity',
                        mapUrl: '../js/components/ecMap/' + id + '.json',
                        mapType: city,
                        btnShow: true,
                    });
                    new Module(_opt);*/
                    /*$.ajax({
                        // url: '../js/components/ecMap/'+id+'.json',
                        url: option.mapUrl,
                        dataType: 'json',
                        success: function(geoJson) {
                            $('#'+option.obj).empty();
                            var _option = {
                                obj: option.obj,
                                type: 'ecMap',
                                data: option.data
                            };
                            _option.inner = {
                                geo: {
                                    map: city,
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
                            var downData = [];
                            var downCity = [];
                            var nameMapData = {};
                            var template = [];
                            var colors = ['#0b518a', '#0f3c5d', '#082347', '#07284a', '#072a58', '#062a57', '#08254c', '#063b66', '#063a74', '#063863', '#072b5a', '#0d4398', '#1054bd'];
                            // var colors = ['#2a4d9c', '#305ec4', '#4376e9', '#4281e8', '#4ca5f1', '#59bef2',
                            //     '#4ec4f2', '#62cef8', '#8cd9f3', '#60e4fb', '#79eeff', '#9ef1ff', '#b4f6ff'];
                            for (var i = 0; i < option.data.length; i++) { //获取地图series数据
                                var name;
                                if (geoJson.features[i].properties.name.charAt(geoJson.features[i].properties.name.length - 1) == '市' || 
                                    geoJson.features[i].properties.name.charAt(geoJson.features[i].properties.name.length - 1) == '县' || 
                                    geoJson.features[i].properties.name.charAt(geoJson.features[i].properties.name.length - 1) == '区' ) {
                                    name = geoJson.features[i].properties.name.slice(0, geoJson.features[i].properties.name.length - 1);
                                }
                                downCity.push({
                                    name: name,
                                    id: geoJson.features[i].id
                                });
                                downData.push({
                                    name: name,
                                    value: option.data[i].value,
                                    itemStyle: {
                                        normal: {
                                            areaColor: colors[i]
                                        },
                                        emphasis: {
                                            areaColor: '#0d9682'
                                        }
                                    },
                                    id: option.data[i].id
                                });
                                nameMapData[geoJson.features[i].properties.name] = name;
                            }
                            var reverData = geoJson.features;
                            downData.sort(function(a, b) {
                                if (a.value < b.value) {
                                    return 1;
                                } else if (a.value > b.value) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            });
                            // 确定data
                            if (option.data.length > 0) { //获取series数据
                                for (var i = 0; i < option.data.length; i++) {
                                    if (!!reverData[i].color) {
                                        downData[i].itemStyle.normal.areaColor = reverData[i].color;
                                    } else {
                                        downData[i].itemStyle.normal.areaColor = colors[i];
                                    }
                                }
                            }
                            downData.sort(function(a, b) {
                                if (a.id > b.id) {
                                    return 1;
                                } else if (a.id < b.id) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            });
                            var pointData = [];
                            for (var i = 0; i < option.data.length; i++) {
                                var name = '';
                                if (geoJson.features[i].properties.name.charAt(geoJson.features[i].properties.name.length - 1) == '市' || 
                                    geoJson.features[i].properties.name.charAt(geoJson.features[i].properties.name.length - 1) == '县' || 
                                    geoJson.features[i].properties.name.charAt(geoJson.features[i].properties.name.length - 1) == '区' ) {
                                    name = geoJson.features[i].properties.name.slice(0, geoJson.features[i].properties.name.length - 1);
                                }
                                for (var k = 0; k < downData.length; k++) {
                                    if (downData[k].name == name) {
                                        pointData.push(downData[k]);
                                    }
                                }
                            }

                            var series = [{
                                type: 'map',
                                mapType: city, // 自定义扩展图表类型
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                        },
                                        borderColor: '#3ab3ff',
                                        borderWidth: 2,
                                        // shadowColor: 'rgba(255, 255, 255, 0.5)',
                                        // shadowBlur: 25
                                    },
                                    emphasis: {
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: downData,
                                nameMap: nameMapData,
                                label: {
                                    normal: {
                                        position: 'bottom',
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: 10
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
                            }];
                            _option.inner.series = series;
                            ec.registerMap(city, geoJson);
                            var charts;
                            if (charts != null && charts != "" && charts != undefined) {
                                charts.dispose();
                            }
                            $('#'+option.obj).removeAttr('_echarts_instance_').removeAttr('style');
                            var charts = ec.init(document.getElementById(_option.obj));
                            charts.setOption(_option.inner);
                            self._setShengEcChange(pointData, option);
                            // $('#' + _option.obj).find('canvas').css('transform', 'rotateZ(-8deg) rotateY(-21deg) rotateX(-42deg) scaleX(1.4) scaleY(1)');
                            $('#'+option.obj).append('<div class="map-back" before="zhejiang">返回</div>');
                            $('#'+option.obj).find('.map-back').off().on('click', function () {
                                option.mapUrl = '../js/components/ecMap/zhejiang.json';
                                $.ajax({
                                    url: '../../../js/components/ecMap/getZhejiang.json',
                                    dataType: 'json',
                                    success: function (data) {
                                        option.data = data;
                                        new Module(option);
                                    }
                                });
                                
                            });
                            self._setPageFresh(option.pageId, id, option);
                        }
                    });*/
                }
            });
            // option.mapType = city;
            // new Module(option);
           
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
        _setPageFresh: function (pageId, channelId, option) {
            var self = this;
            option.callback(pageId, channelId);
        }
    };
    ecMap.prototype.constructor = ecMap;
    return ecMap;
})
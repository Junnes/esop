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
        _init: function(option, cityId) {
            var self = this;
            var cityid;
            if (arguments.length > 1) {
                cityid = cityId;
            }
            $('#' + option.obj).empty();
            $('.map-back').remove();
            if (option.btnShow == 'true' || option.btnShow == true) {
                $('#'+option.obj).parent().append('<div class="map-back" before="zhejiang" mapUrl="'+
                    option.mapUrl+'" mapType="'+option.mapType+'" btnShow="'+
                    option.btnShow+'">返回</div>');
                $('#'+option.obj).parent().find('.map-back').off().on('click', function () {
                    option.mapUrl = '../js/components/ecMap/zhejiang.json';
                    $.ajax({
                        url: '../js/components/ecMap/getZhejiang.json',
                        dataType: 'json',
                        success: function (data) {
                            option.data = data;
                            option.btnShow = false;
                            option.degree = 'province';
                            new Module(option);
                            self._setPageFresh(option.degree, "", option);
                        }
                    });
                });
            } else {
                $('#'+option.obj).parent().append('<div class="map-back" style="display: none;" degree="province" mapUrl="zhejiang" mapType="zhejiang" btnShow="false">返回</div>');
            }
            var colors = ['#0b518a', '#0f3c5d', '#082347', '#07284a', '#072a58', '#062a57', '#08254c', '#063b66', '#063a74', '#063863', '#072b5a', '#0d4398', '#1054bd'];

            $.ajax({
                // url: '../js/components/ecMap/zhejiang.json',
                url: option.mapUrl,
                dataType: 'json',
                success: function(geoJson) {
                	var map = {"570":"330800","571":"330100","572":"330500","573":"330400","574":"330200","575":"330600","576":"331000","577":"330300","578":"331100","579":"330700","580":"330900","5701":"330802","5702":"330881","5703":"330822","5704":"330824","5705":"330825","5706":"330803","5719":"330108","571C":"330104","571B":"330106","5718":"330185","5717":"330122","5716":"330127","5715":"330182","5714":"330110","5713":"330111","5712":"330109","571D":"330105","571A":"330103","5711":"330102","5721":"330502","5722":"330522","5723":"330521","5724":"330523","5725":"330503","5731":"330411","5732":"330483","5733":"330481","5734":"330421","5735":"330482","5736":"330424","5741":"330203","5742":"330281","5743":"330282","5744":"330225","5745":"330206","5746":"330226","5747":"330283","5748":"330211","5749":"330212","5751":"330602","5752":"330681","5753":"330604","5754":"330683","5755":"330624","5756":"330603","5761":"331002","5762":"331021","5763":"331004","5764":"331082","5765":"331081","5766":"331024","5767":"331023","5768":"331022","5769":"331021","5771":"330302","5772":"330382","5773":"330381","5774":"330326","5775":"330324","5776":"330305","5777":"330328","5778":"330329","5779":"330327","5781":"331125","5782":"331122","5783":"331121","5784":"331125","5785":"331126","5786":"331181","5787":"331123","5788":"331124","5789":"331127","5791":"330702","5792":"330782","5793":"330727","5794":"330781","5795":"330783","5796":"330784","5797":"330726","5798":"330723","5799":"330703","5801":"330902","5802":"330903","5803":"330921","5804":"330922"};
                    var id_map ={"330100":"571","330102":"5711","330103":"571A","330104":"571C","330105":"571D","330106":"571B","330108":"5719","330109":"5712","330110":"5714","330111":"5713","330122":"5717","330127":"5716","330182":"5715","330185":"5718","330200":"574","330203":"5741","330206":"5745","330211":"5748","330212":"5749","330225":"5744","330226":"5746","330281":"5742","330282":"5743","330283":"5747","330300":"577","330302":"5771","330305":"5776","330324":"5775","330326":"5774","330327":"5779","330328":"5777","330329":"5778","330381":"5773","330382":"5772","330400":"573","330411":"5731","330421":"5734","330424":"5736","330481":"5733","330482":"5735","330483":"5732","330500":"572","330502":"5721","330503":"5725","330521":"5723","330522":"5722","330523":"5724","330600":"575","330602":"5751","330603":"5756","330604":"5753","330624":"5755","330681":"5752","330683":"5754","330700":"579","330702":"5791","330703":"5799","330723":"5798","330726":"5797","330727":"5793","330781":"5794","330782":"5792","330783":"5795","330784":"5796","330800":"570","330802":"5701","330803":"5706","330822":"5703","330824":"5704","330825":"5705","330881":"5702","330900":"580","330902":"5801","330903":"5802","330921":"5803","330922":"5804","331000":"576","331002":"5761","331004":"5763","331021":"5769","331022":"5768","331023":"5767","331024":"5766","331081":"5765","331082":"5764","331100":"578","331121":"5783","331122":"5782","331123":"5787","331124":"5788","331125":"5784","331126":"5785","331127":"5789","331181":"5786"}
                    var name_map ={"570":"衢州","571":"杭州","572":"湖州","573":"嘉兴","574":"宁波","575":"绍兴","576":"台州","577":"温州","578":"丽水","579":"金华","580":"舟山","5701":"柯城","5702":"江山","5703":"常山","5704":"开化","5705":"龙游","5706":"衢江","571A":"下城","5716":"淳安","5713":"富阳","5717":"桐庐","5718":"临安","5715":"建德","571C":"江干","5714":"余杭","5712":"萧山","5711":"上城","5719":"滨江","571B":"西湖","571D":"拱墅","5721":"吴兴","5722":"长兴","5723":"德清","5724":"安吉","5725":"南浔","5731":"秀洲","5732":"桐乡","5733":"海宁","5734":"嘉善","5735":"平湖","5736":"海盐","5741":"海曙","5742":"余姚","5743":"慈溪","5744":"象山","5745":"北仑","5746":"宁海","5747":"奉化","5748":"镇海","5749":"鄞州","5751":"越城","5752":"诸暨","5753":"上虞","5754":"嵊州","5755":"新昌","5756":"绍兴","5761":"椒江","5762":"黄岩","5763":"路桥","5764":"临海","5765":"温岭","5766":"仙居","5767":"天台","5768":"三门","5769":"玉环","5771":"鹿城","5772":"乐清","5773":"瑞安","5774":"平阳","5775":"永嘉","5776":"洞头","5777":"文成","5778":"泰顺","5779":"苍南","5781":"云和","5782":"缙云","5783":"青田","5784":"云和","5785":"庆元","5786":"龙泉","5787":"遂昌","5788":"松阳","5789":"景宁畲族自治","5791":"婺城","5792":"义乌","5793":"磐安","5794":"兰溪","5795":"东阳","5796":"永康","5797":"浦江","5798":"武义","5799":"金东","5801":"定海","5802":"普陀","5803":"岱山","5804":"嵊泗"};
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
                    var markData = mapData;
                    var 
                    if (!!cityid) {
                        if (cityid == 571) {
                            for (var f = 0; f < mapData.length; f++) {
                                if (mapData[f].id == "330102" || mapData[f].id == "330108" ||
                                    mapData[f].id == "330105" || mapData[f].id == "330104") {
                                    markData.splice(f, 1);
                                }
                            }
                        } else if (cityid == 574) {
                            // 330212 330203
                            console.log(cityid);
                        }
                    }
                    self._setShengEcChange(markData, option);
                    charts.on('click', function(params) {
                        self._setAreaClick(id_map[params.data.id], option, params.data.name);
                    });

                    $('#' + option.obj).find('.map-point').off('click').on('click', function() {
                        self._setAreaClick(id_map[$(this).attr('city')], option, $(this).attr('cityname'));
                    });

                }
            });
        },
        _setAreaClick: function(id, option, city) {
            var self = this;
            var degree;
            switch(option.degree) {
                case 'province':
                    degree = 'city';
                    $.ajax({
                        url: '../js/components/ecMap/get'+id+'.json',
                        dataType: 'json',
                        success: function (data) {
                            option.data = data;
                            option.pageId = 'gridviewCity';
                            option.mapUrl = '../js/components/ecMap/' + id + '.json';
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
                    option.btnShow = false;
                    self._setPageFresh(degree, id, option);
                    break;
                case 'county':
                    console.log('county');
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
        _setPageFresh: function (degree, channelId, option) {
            var self = this;
            if(typeof option.callback == 'function') {
            	var mapopt={
    					"degree": option.degree,
    					"mapUrl": option.mapUrl,
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
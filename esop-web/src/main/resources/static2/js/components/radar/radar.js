define(['jquery', 'ec'], function ($, ec) {
    function radar (option) {
        this._init(option);
    }

    radar.prototype = {
        _init: function (option) {
            var self = this;
            var _option = $.extend({
                data: []
            }, option);

            var arrId = [];
            for (var i = 0; i < _option.data.length; i++) {
                if (arrId.indexOf(_option.data[i].groupId) == -1) {
                    arrId.push(_option.data[i].groupId);
                }
            }

            // 获取indicator数据
            var indicatorData = [];
            for (var i = 0; i < _option.data.length; i++) {
                indicatorData.push({
                    name: _option.data[i].indicatorName,
                    value: _option.data[i].indicatorValue,
                    max: _option.data[i].indicatorMax
                });
            }

            // 获取seriesData
            var seriesData = [];
            for (var i = 0; i < arrId.length; i++) {
                var item = {
                    name: '',
                    value: []
                };
                for (var j = 0; j < _option.data.length; j++) {
                    if (arrId[i] == _option.data[j].groupId) {
                        item.value.push(_option.data[j].value);
                        item.name = _option.data[j].name;
                    }
                }
                seriesData.push(item);
            }

            _option.inner = {
                radar: {
                    indicator: indicatorData,
                    center : ['50%','50%'],
                    radius : '60%',
                    startAngle: 90,
                    splitNumber: 4,
                    name : {
                        formatter:function (value, indicator) {
                            var div = '<h3></h3>';
                            var next = _option.labelValue == '1' ? '\n\n'+ indicator.value : '';
                            return value + next;
                        },
                        textStyle: {color:'white'}
                    },
                    scale: true,
                    axisLine: {            // 坐标轴线
                        show: false
                    },
                    splitArea : {
                        show : true,
                        areaStyle : {
                            color: ['rgba(47, 77, 134, 0.68)', 'rgba(52, 94, 175, 0.68)'],
                            shadowColor: 'rgba(0, 0, 0, 0.8)',
                            shadowBlur: 50
                        }
                    },
                    splitLine : {
                        show : true,
                        lineStyle : {
                            width : 0,
                            color : '#000'
                        }
                    }
                },
                series: [{
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            color: 'rgb(65, 234, 221)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(10, 153, 224, 0.91)'
                        }
                    },
                    data : seriesData
                }]
            };
            var charts = ec.init(document.getElementById(_option.obj));
            charts.setOption(_option.inner);
        }
    };
    return radar;
});
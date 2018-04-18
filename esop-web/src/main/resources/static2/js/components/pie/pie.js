define(['jquery', 'ec'], function ($, ec) {
    function pie (option) {
        this._init(option);
    }

    pie.prototype = {
        _init: function (option) {
            var self = this;
            var _option;
            if (option.useData == true ) {
                _option = option;
            } else {
                _option = option;
                _option.data = [{
                    name: '直接访问',
                    value: 335
                }, {
                    name: '邮件营销',
                    value: 310
                }, {
                    name: '联盟广告',
                    value: 274
                }];
            }
            var legend = [];
            for (var i = 0; i < _option.data.length; i++) {
                legend.push({
                    icon: _option.icon ? _option.icon : 'square',
                    name: _option.data[i].name
                });
            }
            var colors = ['#2196F3', '#FC855D', '#36dab8'];
            for (var i = 0; i < _option.data.length; i++) {
                _option.data[i] = $.extend({
                    itemStyle: {
                        normal: {
                            color: colors[i]
                        }
                    }, 
                    selected: true
                }, _option.data[i]);
            }
            opt = {
                title: {
                    text: _option.title ? _option.title : 'AAA',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                legend: {
                    show: _option.legend == '1' ? true : false,
                    data: legend
                },

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedOffset: 1,
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:_option.data.sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff'
                                },
                                padding: [-30, -20, 0, -40]
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: '#2196F3'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 60
                            }
                        },
                        itemStyle: {
                            normal: {
                            //     color: '#c23531',
                                // shadowBlur: 200,
                                // shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            
            var charts = ec.init(document.getElementById(_option.obj));
            charts.setOption(opt);
        }
    };
    return pie;
});
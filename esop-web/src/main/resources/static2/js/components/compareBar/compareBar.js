(function(global, factory) {
    typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) :
        typeof define == 'function' && define.amd ? define(['jquery', 'ec'], factory) : (global.compareBar = factory($, ec));
})(this, function($, ec) {
    function compareBar(option) {
        var _option = $.extend({
            data: []
        }, option);
        this._init(_option);
    }
    compareBar.prototype = {
        _init: function (option) {
            var data = option.data.slice(0, 4);
            var opt = {
                title: [],
                grid: [],
                xAxis: [],
                yAxis: [],
                series: []
            };
            for (var i = 0; i < data.length; i++) {
                opt.title.push({
                    text: (!!data[i].title ? data[i].title : ''),
                    x: (i % 2 * 50) + 4 + '%',
                    y: (i <= 1 ? '8%' : '58%'),
                    textAlign: 'left',
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 'lighter'
                    }
                });
                opt.grid.push({
                    top: (i <= 1 ? '20%' : '70%'),
                    width: '40%',
                    bottom: (i <= 1 ? '50%' : '0%'),
                    left: (i % 2 * 50) + 5 + '%',
                    right: '5%',
                    containLabel: true
                });
                opt.xAxis.push({
                    type: 'value',
                    gridIndex: i,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                });
                opt.yAxis.push({
                    gridIndex: i,
                    type: 'category',
                    data: ['加盟后','加盟前'],
                    axisLabel: {
                        interval: 0,
                        rotate: 0,
                        textStyle: {
                            color: '#fff',
                            align: 'right',
                            fontSize: 12,
                            opacity: .8
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                });
                opt.series.push({
                    type: 'bar',
                    barWidth: 28,
                    xAxisIndex: i,
                    yAxisIndex: i,
                    label: {
                        normal: {
                            position: 'right',
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 13,
                                padding: [0, 0, 0, 15]
                            }
                        }
                    },
                    data: [{
                        value: (!!data[i].jmafter ? data[i].jmafter : 0),
                        itemStyle: {
                            normal: {
                                color: '#6abfbf'
                            }
                        }
                    }, {
                        value: (!!data[i].jmbefore ? data[i].jmbefore : 0),
                        itemStyle: {
                            normal: {
                                color: '#1851ab'
                            }
                        }
                    }]
                });
            }
            var mycharts = ec.init(document.getElementById(option.obj));
            mycharts.setOption(opt);
        }
    };
    compareBar.prototype.constructor = compareBar;
    return compareBar;
})
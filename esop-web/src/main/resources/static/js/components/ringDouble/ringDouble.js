(function(global, factory) {
	typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) :
		typeof define == 'function' && define.amd ? define(['jquery', 'ec'], factory) : (global.ringDouble = factory($, ec));
})(this, function($, ec) {
	function ringDouble(option) {
		var _option = $.extend({
			data: []
		}, option);
		this._init(_option);
	}
	ringDouble.prototype = {
		_init: function(option) {
			var self = this;
			$('#'+option.obj).empty();
			var div = '<div class="ringDouble-box clearfix">';
			for (var i = 0; i < option.data.length; i++) {
				div += '<div class="ringdouble-item-box"><div class="ringdouble-item" id="ringDouble'+i+'"></div></div>';
			}
			div += '</div>';
			$('#'+option.obj).append(div);
			/*$('#'+option.obj).append('<div class="ringdouble-legend-box clearfix">'+
				'<div class="ringdouble-legend-item clearfix">'+
					'<span class="ringdouble-legend-uncomplete"></span>'+
					'<p>未达标</p>'+
				'</div>'+
				'<div class="ringdouble-legend-item clearfix">'+
					'<span class="ringdouble-legend-complete"></span>'+
					'<p>完成率</p>'+
				'</div>'+
			'</div>');*/
			switch(option.data.length) {
				case 1:
					$('#'+option.obj).find('.ringdouble-item-box').css({
						'width': '100%',
						'height': '100%'
					});
					break;
				case 2:
					$('#'+option.obj).find('.ringdouble-item-box').css({
						'width': '50%',
						'height': '100%'
					});
					break;
				case 3:
					$('#'+option.obj).find('.ringdouble-item-box').css({
						'width': '33.333333%',
						'height': '100%'
					});
					break;
				case 4: 
					$('#'+option.obj).find('.ringdouble-item-box').css({
						'width': '50%',
						'height': '50%'
					});
					break;
				case 5 || 7 || 8:
					$('#'+option.obj).find('.ringdouble-item-box').css({
						'width': '25%',
						'height': '50%'
					});
					break;
				case 6: 
					$('#'+option.obj).find('.ringdouble-item-box').css({
						'width': '33.333333%',
						'height': '50%'
					});
			}
			var colors = ['#c23531', '#2e9cf3'];
			var formatter = '{d}%';
			for (var i = 0; i < option.data.length; i++) {
				var opt = {
					title: {},
					series: []
				};
				// var outper = Math.ceil((+option.data[i].value/+option.data[i].total)*100);
				if (option.data[i].unit == '%') {
					var outper = (+option.data[i].value / +option.data[i].total *100).toFixed(2);
				} else {
					var outper = ((+option.data[i].value/+option.data[i].total)*100).toFixed(2);
				}
				if (!!option.data[i].title) {
					opt.title = {
						text: option.data[i].title,
						textStyle: {
							align: 'center',
							color: '#fff',
							fontSize: 16
						},
						left: 'center'
					};
				} else {
					opt.title = {
						text: '',
						textStyle: {
							align: 'center',
							color: '#fff',
							fontSize: 16
						},
						left: 'center'
					}
				}
				var remain = 0;
				if (!!option.data[i].value && !!option.data[i].total) {
					remain = option.data[i].total - option.data[i].value;
				}
				var unit = '';
				var itemColor = +option.data[i].alarm == 0 ? colors[1] : colors[0];


				if (option.data[i].unit == '%') {
					var isInt = self._isInteger(+option.data[i].value);
					if (!!isInt) {
						formatter = Math.floor(+option.data[i].value) + '%';
					} else {
						formatter = (+option.data[i].value).toFixed(2) + '%';
					}
					
					var total = (+option.data[i].total);
					// var val = (+option.data[i].value);
					var val = self._setNumber((+option.data[i].value));
					// var val0 = (+total) - (+val);
					var val0 = self._setNumber((+total) - (+val));
				} else {
					formatter = '{c}'+option.data[i].unit;
					var total = option.data[i].total;
					var val = self._setNumber(+option.data[i].value);
					var val0 = self._setNumber((+total) - (+val));
					// var val = option.data[i].value;
					// var val0 = (+total) - (+val);
				}
				opt.series = [{
					type: 'pie',
					center: ['50%', '60%'],
					radius: ['50%', '60%'],
					avoidLabelOverlap: false,
					animation: false,
					/*label: {
						normal: {
							show: true,
							color: '#fff',
							formatter: '{d}%',
							position: 'outside',
						}
					},*/
					labelLine: {
						normal: {
							show: false
						}
					},
					data: [{
						value: val0,
						name: '直接访问',
						itemStyle: {
							normal: {
								color: '#4e4c67',
								shadowBlur: 15,
								shadowColor: '#000'
							}
						},
						label: {
							normal: {
								show: false,
								position: 'outside',
								color: '#fff',
								padding: [50, 0, 0, -20],
								formatter: '{d}'
							}
						},
					}, {
						value: val,
						name: '邮件营销',
						itemStyle: {
							normal: {
								// color: '#c23531',
								color: itemColor,
								shadowBlur: 15,
								shadowColor: '#000'
							}
						},
						label: {
							normal: {
								show: true,
								position: 'center',
								color: '#fff',
								formatter: formatter,
								textStyle: {
									fontSize: 16
								}
							}
						},
					}]
				}, {
					type: 'pie',
					center: ['50%', '60%'],
					radius: ['60%', '68%'],
					avoidLabelOverlap: false,
					animation: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						}
					},
					data: [{
						value: 335,
						name: '直接访问',
						itemStyle: {
							normal: {
								color: '#051331',
								shadowBlur: 40,
								shadowColor: '#3b5b77'
							}
						}
					}]
				}]
				var mycharts = ec.init(document.getElementById('ringDouble'+i));
				mycharts.setOption(opt);
				$('#ringDouble'+i).append('<div class="per-pos"><p>'+outper+'%</p></div>')
			}
		},
		_isInteger: function (obj) {
			return Math.floor(obj) === obj;
		},
		_setNumber: function (obj) {
			var self = this;
			var isInt = self._isInteger(obj);
			if (!!isInt) {
				obj = Math.floor(obj);
			} else {
				obj = (+obj).toFixed(2);
			}
			return obj;
		}
	};
	ringDouble.prototype.constructor = ringDouble;
	return ringDouble;
})
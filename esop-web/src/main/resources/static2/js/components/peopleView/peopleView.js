(function(global, factory) {
	typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) :
		typeof define == 'function' && define.amd ? define(['jquery', 'ec'], factory) : (global.peopleView = factory($, ec));
})(this, function($, ec) {
	function peopleView(option) {
		var _option = $.extend({
			data: []
		}, option);
		this.colors = ['#3ea078', '#41c2c7', '#f37b56', '#e4ae2e', '#1ea7c7'];
		this._init(_option);
	}
	peopleView.prototype = {
		_init: function(_option) {
			var self = this;
			$('#'+_option.obj).empty().append('<div class="people-box">'+
				'<div class="people-color-box"></div>'+
				'<div class="people-mark-box"><div class="people-mark-bg"></div></div>'+
			'</div>');
			setTimeout(function () {
				self._setColors(_option);
				self._setMark(_option);
			}, 20);
				
		},
		_setColors: function (_option) {
			var self = this;
			var total = 0;
			for (var m = 0; m < _option.data.length; m++) {
				total += +_option.data[m].value;
			}
			var templateColors = '';
			var perArr = [];
			var perAll = 0;
			for (var i = 0; i < _option.data.length; i++) {
				if (i < _option.data.length-1) {
					var per = (+_option.data[i].value/total*100).toFixed(2);
					perAll += +per;
				} else {
					var per = 100 - (+perAll);
				}
				templateColors += '<div class="people-color-item" style="background: '+self.colors[i]+'; height: '+per+'%;"></div>';
			}
        	$('#'+_option.obj).find('.people-color-box').append(templateColors);
		},
		_setMark: function (_option) {
			var self = this;
			var templateMark = '';
			var heiArr = [];
			var offsetY = $('#'+_option.obj).find('.people-mark-box').offset().top;
			for (var j = 0; j < _option.data.length; j++) {
				var hei = +($('#'+_option.obj).find('.people-color-item').eq(j).offset().top);
				heiArr.push(hei);
				// var top = 45 + Math.floor(hei/2);
				var top = (+$('#'+_option.obj).find('.people-color-item').eq(j).offset().top) - (+offsetY) - 10;
				var img = '';
				switch(_option.data[j].title) {
					case '爱购物':
						img = 'shop.png';
						break;
					case '爱旅游':
						img = 'travel.png';
						break;
					case '爱美食':
						img = 'food.png';
						break;
					case '爱汽车':
						img = 'car.png';
						break;
					case '爱社交':
						img = 'chat.png';
						break;
					default:
						img = '';
				}
				if (j%2 == 1) {
					templateMark += '<div class="people-mark-item pos-absolute clearfix" style="top: '+top+'px; left: 80px;">'+
                        '<div class="people-mark-icon">'+
                            '<span style="background: url(./../img/'+img+') no-repeat; background-size: 100%;"></span>'+
                        '</div>'+
                        '<div class="people-mark-label-box pos-absolute">'+
                            '<p class="people-mark-name">'+(!!_option.data[j].value ? _option.data[j].value : '')+'</p>'+
                            '<p class="people-mark-val" style="color: '+self.colors[j]+'">'+(!!_option.data[j].title ? _option.data[j].title : '')+'</p>'+
                        '</div>'+
                        '<div class="people-mark-line"></div>'+
                    '</div>';
				} else {
					var right = 100 - j*15;
					if (j == 4) {
						right = 80;
					}
					templateMark += '<div class="people-mark-item pos-absolute clearfix" style="top: '+top+'px; right: '+right+'px;">'+
                        '<div class="people-mark-line"></div>'+
                        '<div class="people-mark-label-box pos-absolute">'+
                            '<p class="people-mark-name">'+(!!_option.data[j].value ? _option.data[j].value : '')+'</p>'+
                            '<p class="people-mark-val" style="color: '+self.colors[j]+'">'+(!!_option.data[j].title ? _option.data[j].title : '')+'</p>'+
                        '</div>'+
                        '<div class="people-mark-icon">'+
                            '<span style="background: url(./../img/'+img+') no-repeat; background-size: 100%;"></span>'+
                        '</div>'+
                    '</div>';
				}
			}
			$('#'+_option.obj).find('.people-mark-box').append(templateMark);
		}
	};
	peopleView.prototype.constructor = peopleView;
	return peopleView;
})
(function (global, factory) {
	typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) : 
		typeof define == 'function' && define.amd ? define(['jquery'], factory) : (global.number = factory($));
})(this, function ($) {
	function number (option) {
		var _option = $.extend({
			data: []
		}, option);
		this._init(_option);
	}
	number.prototype = {
		_init: function (_option) {
			var self = this;
			$('#'+_option.obj).empty();

			var div = self._setNumbetHtml(_option);
			$('#'+_option.obj).append(div);

			self._setNumberWidth(_option);
			self._setCardCenter(_option);

			// default selected number-item-box
			var ind = !!_option.defaultCard ? (+_option.defaultCard > (_option.data.length - 1) ? 'none' : +_option.defaultCard) : ((+_option.defaultCard == 0) ? 0 : 'none');
			if (ind != 'none') {
				$('#'+_option.obj).find('.number-item-box').eq(ind).addClass('number-active');	
			}
			if (!!_option.clickAllow) {
				$('#'+_option.obj).find('.number-item-box').css({
					'cursor': 'pointer'
				});
				$('#'+ _option.obj).find('.number-item-box').on('click', function () {
					if(typeof _option.callbackClick=='function'){
						_option.callbackClick(_option.obj, self, $(this));
					}
				});

			}
			if(typeof _option.callbackInit=='function'){
				_option.callbackInit(_option.obj, self);
			}
		},
		_setNumberWidth: function (_option) {
			var arrow = (!!_option.arrow) ? _option.arrow : 'top';
			if (arrow === 'top') {
				switch(_option.data.length) {
					case 1:
						$('#'+_option.obj+' .number-item-box').css({
							'width': '50%',
							'padding-bottom': '10px'
						});
						$('#'+_option.obj+' .number-item-box span').css({
							"width": "42px",
							"height": "50px"
						});
						break;
					case 2:
						$('#'+_option.obj+' .number-item-box').css({
							'width': '50%',
							'padding-bottom': '10px'
						});
						$('#'+_option.obj+' .number-item-box span').css({
							"width": "42px",
							"height": "50px"
						});
						break;
					case 3:
						$('#'+_option.obj+' .number-item-box').css({
							'width': '33.333333%',
							'padding-bottom': '10px'
						});
						$('#'+_option.obj+' .number-item-box span').css({
							"width": "38px",
							"height": "48px"
						});
						break;
					case 4:
						$('#'+_option.obj+' .number-item-box').css({
							'width': '25%',
							'padding-bottom': '25px'
						});
						break;
				}
				if(_option.align == 'vertical') {
					$('#'+_option.obj+' .number-item-box').css('width', '100%');
					var totalHeight = $('#'+_option.obj).height();
					var sumHeight = 0;
					var items = $('#'+_option.obj+' .number-item-box');
					for(var i = 0; i < items.length; i ++) {
						sumHeight += items.eq(i).height();
					}
					$('#'+_option.obj+' .number-item-box').css('padding-top', (totalHeight-sumHeight)/(items.length+2));
				}
			} else if (arrow === 'left') {
				$('#'+_option.obj+' .number-item-box').css('width', '50%');
			}
		},
		_setNumbetHtml: function (_option) {
			var div = '<div class="number-group-box clearfix">';
			for (var i = 0; i < _option.data.length; i++) {
				var classA = _option.arrow == 'left' ? 'number-hor-name' : '';
				var classB = _option.arrow == 'left' ? 'number-hor-val' : '';
				var classC = _option.arrow == 'left' ? 'clearfix' : '';
				var labelWidth = '';
				if (_option.arrow == 'left') {
					labelWidth = (!!_option.labelWidth) ? _option.labelWidth : '20%';
				} else {
					labelWidth = '100%';
				}
				if (_option.data[i].title) {
					div += '<div class="number-item-box '+classC+'" data-id="'+_option.data[i].id+'">'+
			            '<div class="number-title '+classA+'" style="width: '+labelWidth+'">'+
			                '<p>'+_option.data[i].title+'</p>'+
			            '</div>'+
			            '<div class="number-item clearfix '+classB+'">';
				} else {
					div += '<div class="number-item-box '+classC+'" data-id="'+_option.data[i].id+'">'+
			            '<div class="number-title '+classA+'">'+
			                '<p></p>'+
			            '</div>'+
			            '<div class="number-item clearfix '+classB+'">';
				}
				_option.data[i].value = +_option.data[i].value;
				var length = _option.data[i].value.toString().length;
				var itemstr = length > 4 ? (length < 8 ? (Math.floor(_option.data[i].value/10000) == _option.data[i].value/10000 ? (_option.data[i].value/10000).toString() : (_option.data[i].value/10000).toFixed(2).toString()) : 
					Math.floor(_option.data[i].value/10000) == _option.data[i].value/10000 ? (_option.data[i].value/10000).toString() : (_option.data[i].value/10000).toFixed().toString()) : 
					_option.data[i].value.toString();
				// var itemstr = _option.data[i].value.toString();
				var newUnit = length > 4 ? '万' : '';
				if(Math.floor(itemstr) == itemstr && _option.data[i].unit != '%') {
					itemstr = Math.floor(itemstr).toString();
				} else {
					itemstr = (+itemstr).toFixed(2);
				}
				var maxLength = _option.data[i].unit == '%' ? 6 : 5;
				while(itemstr.length < maxLength) {
					itemstr = '0'+itemstr;
				}
				
				for (var j = 0; j < itemstr.length; j++) {
					if(itemstr.charAt(j) != '.') {
						div += '<span style="background: url(./../img/theme-flower/'+itemstr.charAt(j)+'.png) no-repeat; background-size: 100% 100%;"></span>';
					} else {
						div += '<span style="background: url(./../img/theme-flower/dot.png) no-repeat; background-size: 100% 100%;"></span>';
					}
				}
				
				if (_option.data[i].unit == '%') {
					div += '<span style="background: url(./../img/theme-flower/per.png) no-repeat; background-size: 100% 100%;"></span>'
				} else if (_option.data[i].unit != '') {
					if (newUnit != '') {
						div += '<span style="background: url(./../img/theme-flower/'+newUnit+'.png) no-repeat; background-size: 100% 100%;"></span>'	
					}
					
				}
				
				div += '</div></div>';
			}
			div += '</div>';
			return div;
		},
		_setCardCenter: function (_option) { //ensure number-item-box -> span position
			for (var m = 0; m < _option.data.length; m++) {
				var wid = $('#'+_option.obj).find('.number-item-box').eq(m).width();
				var lenSpan = $('#'+_option.obj).find('.number-item-box').eq(m).find('span').length;
				var widSpan;
				if ($('#'+_option.obj).find('.number-item-box span').length > 0) {
					widSpan = $('#'+_option.obj).find('.number-item-box span').eq(0).width();
				}
				var halfWid = (wid - widSpan*lenSpan)/2 - 10;
				$('#'+_option.obj).find('.number-item-box').eq(m).css({
					"padding-left": halfWid +'px',
					"padding-right": halfWid +'px'
				});
			}
			
		},
		_setNumberUnsel: function (obj) {    //clear all selected number-item-box in option.obj
			$('#'+obj).find('.number-item-box').removeClass('number-active');
		},
		_setNumberChange: function (obj) {    //number-item-box click event function
			var self = this;
			obj.addClass('number-active').siblings().removeClass('number-active');
		}
	};
	number.prototype.constructor = number;
	return number;
})
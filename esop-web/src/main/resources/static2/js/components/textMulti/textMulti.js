(function (flobal, factory) {
	typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) :
		typeof define == 'function' && define.amd ? define(['jquery'], factory) : (global.textMulti = factory($));
})(this, function ($) {
	function textMulti (option) {
		var _option = $.extend({
			data: {}
		}, option);
		this._init(_option);
	}
	textMulti.prototype = {
		_init: function (option) {
			$('#'+option.obj).empty();
			var border = !!option.borderShow ? 'text-border' : '';
			var template = '<div class="text-multi-box '+border+'">';
				if (option.showTitle == 1) {
					template += '<div class="text-multi-title"><p>'+option.title+'</p></div>';
				} else {
					template += '<div class="text-multi-title"><p></p></div>';
				}
			template += '<div class="text-multi-con"></div></div>';
			$('#'+option.obj).append(template);
			

			if (option.data.text == '' || typeof option.data.text == 'undefined') {
				// if (option.title = '' || typeof option.title == 'undefined') {
					if (option.title == "" || typeof option.title == 'undefined' || option.showTitle == 0) {
						$('#'+option.obj).find('.text-multi-box').remove();
					}
				// }
			}
				
            $('#'+option.obj).find('.text-multi-con').append(option.data.text);
			if (option.textAlign == 'hor') {
				$('#'+option.obj).find('.text-multi-box').css({
					"padding": "0 15px 0px 35px"
				});
				$('#'+option.obj).find('.text-multi-box .text-multi-con').css({
					"text-align": "left",
					"width": "auto",
					"font-size": "16px",
					"line-height": "43px"
				});
				$('#'+option.obj).find('.text-multi-box span').css({
					"width": "auto",
					"float": "none",
					"padding-right": "10px"
				});
			} else {
				if (option.textType == 'center') {
					$('#'+option.obj).find('.text-multi-box .text-multi-con').css({
						"text-align": "center",
						"width": "auto"
					});
				} else if (option.textType == 'left') {
					$('#'+option.obj).find('.text-multi-box .text-multi-con').css({
						"text-align": "left",
						"width": "auto"
					});
				} else {
					$('#'+option.obj).find('.text-multi-box .text-multi-con').css({
						"text-align": "center",
						"width": "auto"
					});
				}
				$('#'+option.obj).find('.text-multi-box').css({
					"padding": "15px 15px 15px"
				});
				$('#'+option.obj).find('.text-multi-box span').css({
					"width": "auto",
					"float": "none"
				});
			}
			var opacity = !!option.opacity ? (+option.opacity <= 1 ? option.opacity : 1) : (option.opacity == 0 ? option.opacity : 1);
			$('#'+option.obj).find('.text-multi-box').css('background', 'rgba(14, 40, 67, '+opacity+')');
		}
	};
	textMulti.prototype.constructor = textMulti;
	return textMulti;
})
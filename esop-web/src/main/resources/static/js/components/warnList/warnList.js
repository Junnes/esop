(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'commonData'], factory) :
		(global.warnList = factory ($, Module, commonData));
})(this, function ($, Module, commonData) {
	function warnList (_option) {
		_option = $.extend({
			data: []
		}, _option);
		if (typeof _option.initDataUrl != 'undefined' && _option.initDataUrl != '') {
			commonData.postData({
				serviceUrl: _option.initDataUrl,
				serviceData: $.extend({}, _option.initDataParam),
				callback: function (result) {
					_option.data = result;
					this.option = _option;
					this._init();
				}
			})
		} else {
			this.option = _option;
			this._init();
		}
	}
	warnList.prototype = {
		_init: function () {
			var self = this;
			var div = '<div class="con-warn-box">'+
                '<div class="con-warn">'+
                    '<div class="warn-left">'+
                        '<ul>';
            for (var i = 0; i < self.option.data.length; i++) {
            	div += '<li><div class="warn-img"><img src="../img/circle.png" alt=""></div></li>';
            }
            div += '</ul>'+
                '</div>'+
                '<div class="warn-right">'+
                    '<div class="warn-head clearfix">'+
                        '<p class="warn-name">'+self.option.title+'</p>'+
                        '<p class="warn-more">更多</p>'+
                    '</div>'+
                    '<ul>';
            for (var i = 0; i < self.option.data.length; i++) {
            	var alarm = '';
            	switch (self.option.data[i].alarm) {
            		case '0':
            			alarm = 'group-0-warn';
            			break;
            		case '1':
            			alarm = 'group-1-warn';
            			break;
            		case '2':
            			alarm = 'group-2-warn';
            			break;
            		case '3':
            			alarm = 'group-3-warn';
            			break;
            		default:
            			alarm = 'group-0-warn';
            	}
            	div += '<li val="'+self.option.data[i].id+'">'+
                    '<div class="warn-item-box '+alarm+' clearfix">'+
                        '<div class="warn-item-num">'+
                            '<div class="warn-item-square square-color">'+
                                '<p>'+self.option.data[i].rank+'</p>'+
                            '</div>'+
                            '<div class="warn-item-triangle triangle-color"></div>'+
                        '</div>'+
                        '<div class="warn-item-name">'+
                            '<p>'+self.option.data[i].text+'</p>'+
                        '</div>'+
                        '<div class="warn-item-to"><img src="../img/forward.png"></div>'+
                    '</div>'+
                '</li>';
            }
            div += '</ul>'+
                    '</div>'+
                '</div>'+
                '<div class="notice-shadow">'+
                    '<div></div>'+
                '</div>'+
            '</div>';
            $('#'+self.option.obj).html(div);

            if (typeof self.option.initCallback == 'function') {
            	self.option.initCallback(self);
            }
		},
		_setMoreClick: function () {
			var self = this;
			if (typeof self.option.callbackMoreClick == 'function') {
				self.option.callbackMoreClick(self);
			}
		},
		_setLiClick: function () {
			var self = this;
			$('#'+self.option.obj+' .warn-item-to').off().on('click', function (e) {
				e.stopPropagation();
				var id = $(this).parent().parent().attr('val');
				if (typeof self.option.callbcakClick == 'function') {
					self.option.callbcakClick(id);
				}
			});
		}
	};
	warnList.prototype.constructor = warnList;
	return warnList;
})
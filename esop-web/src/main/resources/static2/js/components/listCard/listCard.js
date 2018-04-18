(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'commonData'], factory) :
		(global.listCard = factory ($, Module, commonData));
})(this, function ($, Module, commonData) {
	function listCard (_option) {
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
	listCard.prototype = {
		_init: function () {
			var self = this;
			var div = '<div class="con-notice-box">'+
                '<div class="con-notice">'+
                '<div class="con-notice-head clearfix">';
			for (var i = 0; i < self.option.tabData.length; i++) {
				div += '<div class="notice-name-tab" val="'+self.option.tabData[i].id+'" url="'+self.option.tabData[i].initDataUrl+'">'+
                    '<p class="notice-name">'+self.option.tabData[i].text+'</p>'+
                    '<div class="tab-active-triangle"></div>'+
                	'</div>';
			}
			div += '<p class="notice-more">更多</p>'+
                '</div>'+
                '<ul class="clearfix">';
            div += self._setBodyHtml();
            
            div += '</ul>'+
                '</div>'+
                '<div class="notice-shadow">'+
                    '<div></div>'+
                '</div>'+
            '</div>';

            $('#'+self.option.obj).html(div);
            self._setTabClick();
            if (typeof self.option.initCallback == 'function') {
            	self.option.initCallback(self);
            }
		},
		_setBodyHtml: function () {
			var self = this;
			var widPar = $('#'+self.option.obj).width();
			var widPer = 'width: '+(widPar - 50)+'px;';
			var div = '';
			for (var i = 0; i < self.option.data.length; i++) {
            	div += '<li val="'+self.option.data[i].id+'">'+
                    '<div class="notice-item-box clearfix">'+
                        '<div class="notice-dot"><img src="../img/circle.png"></div>'+
                        '<div class="notice-item" style="'+widPer+'">'+
                            '<p>'+self.option.data[i].text+'</p>'+
                        '</div>'+
                    '</div>'+
                '</li>';
            }
            return div;
		},
		setDefaultTab: function (n) {
			var self = this;
			$('#'+self.option.obj+' .notice-name-tab').eq(n).addClass('active-tab').siblings().removeClass('active-tab');
		},
		_setTabClick: function () {
			var self = this;
			$('#'+self.option.obj+' .notice-name-tab').off().on('click', function (e) {
				e.stopPropagation();
				var id = $(this).attr('val');
				$(this).addClass('active-tab').siblings().removeClass('active-tab');
				var url = $(this).attr('url');
				if (url != undefined && url != '') {
					commonData.postData({
						serviceUrl: _option.initDataUrl,
						serviceData: $.extend({}, _option.initDataParam),
						callback: function (result) {
							self.option.data = result;
							$('#'+self.option.obj+' ul').html(self._setBodyHtml());
							if (typeof self.option.callbaclClick == 'function') {
								self.option.callbaclClick(id);
							}
						}
					});
				} else {
					$('#'+self.option.obj+' ul').html(self._setBodyHtml());
					if (typeof self.option.callbaclClick == 'function') {
						self.option.callbaclClick(id);
					}
				}
			});
		},
		_setMoreClick: function () {
			var self = this;
			$('#'+self.option.obj+' .notice-more').off('click').on('click', function (e) {
				e.stopPropagation();
				if (typeof self.option.callbackMoreClick == 'function') {
					self.option.callbackMoreClick(self);
				}
			})
		}
	};
	listCard.prototype.constructor = listCard;
	return listCard;
})
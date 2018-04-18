(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'commonData'], factory) :
		(global.navListCard = factory ($, Module, commonData));
})(this, function ($, Module, commonData) {
	function navListCard (_option) {
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
	navListCard.prototype = {
		_init: function () {
			var self = this;
			var div = '<div class="page-con-nav">'+
                '<ul class="clearfix">';
            for (var i = 0; i < self.option.data.length; i++) {
            	var active = self.option.data[i].active == true ? 'page-nav-active' : '';
            	div += '<li class="" val="'+self.option.data[i].id+'">'+
                    '<div class="group-item">'+
                        '<div class="group-item-name">'+
                            '<p>'+self.option.data[i].groupName+'</p>'+
                        '</div>'+
                        '<div class="group-item-tel"><span></span>'+
                            '<p>'+self.option.data[i].groupNumber+'</p>'+
                        '</div>'+
                        '<div class="item-manager"><span></span>'+
                            '<p>'+self.option.data[i].groupType+'</p>'+
                        '</div>'+
                        '<div class="group-bottom clearfix">'+
                            '<div class="member-num clearfix">'+
                                '<p class="member-name">所属地  /</p>'+
                                '<p class="member-val">'+self.option.data[i].groupBelong+'</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="nav-item-border"></div>'+
                '</li>';
            }
            div += '</ul></div>';
            $('#'+self.option.obj).html(div);
            self._navChange();

            if (typeof self.option.initCallback == 'function') {
            	self.option.initCallback(self);
            }
		},
		_navChange: function () {
			var self = this;
			$('#'+self.option.obj+' li').off('click').on('click', function (e) {
				e.stopPropagation();
				$(this).addClass('page-nav-active').siblings().removeClass('page-nav-active');

				if (typeof self.option.callbackClick == 'function') {
					var id = $(this).attr('val');
					self.option.callbackClick(id);
				}
			});
		},
		_setDefault: function (n) {
			var self = this;
			$('#'+self.option.obj+ ' li').eq(n).addClass('page-nav-active');
		}
	};
	navListCard.prototype.constructor = navListCard;
	return navListCard;
})
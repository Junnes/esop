(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'commonData'], factory) :
		(global.navList = factory ($, Module, commonData));
})(this, function ($, Module, commonData) {
	function navList (_option) {
		_option = $.extend({
			data: []
		}, _option);
		this.colorChange = typeof _option.colorChange != 'undefined' && _option.colorChange != '' ? _option.colorChange : '0';
		this.col = typeof _option.col != 'undefined' && _option.col != '' ? +_option.col : _option.data.length;
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
	navList.prototype = {
		_init: function () {
			var self = this;
			var div = '<ul class="consele clearfix">';
			var marginWid = (self.col-1) * 2;
			var widPer = 'width: ' + ((100 - marginWid) / self.col).toFixed(6)+'%';
			var ind = 0;
            for (var i = 0; i < self.option.data.length; i++) {
            	var leftClass = '';
            	if ((i) != ind*self.col) {
            		leftClass = 'rconleft';
            	}
            	var backGround = '';
            	var backClass = '';
            	if (typeof self.option.color != 'undefined' && self.option.color.length > 0 && self.option.color != '') {
            		if (self.option.color.constructor == Array) {
            			if (self.colorChange == '1') {
            				backGround = 'background:'+self.option.color[i]+'; border: 1px solid '+self.option.color[i]+'; color: #fff';
            				backClass = 'color-op';
            			} else {
            				backGround = '';
            			}
            		} else if (self.option.color.constructor == String) {
            			if (self.colorChange == '1') {
            				backGround = 'background: '+self.option.color+'; color: #fff';
            				backClass = 'color-op';
            			} else {
            				backGround = '';
            			}
            		}
            	} else {
            		backGround = '';
            	}
	            	
            	div += '<li class="'+leftClass+' '+backClass+'" val="'+self.option.data[i].id+'" style="'+widPer+'; '+backGround+';">'+
                    '<div class="rconimg spring11"><i class="iconfont icon-'+self.option.data[i].icon+'"></i></div>'+
                    '<div class="rcontext">'+self.option.data[i].text+'</div>'+
                '</li>';
            	if ((i+1) % self.col == 0) {
            		ind += 1;
            	}
            }
            div += '</ul>';
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
				if (self.colorChange == '1') {
					if (typeof self.option.color != 'undefined' && self.option.color.length > 0 && self.option.color != '') {
						$(this).addClass('color-click').siblings().removeClass('color-click');
					} else {
						$(this).addClass('spcurrent').siblings().removeClass('spcurrent');
					}
					
				} else {
					$(this).addClass('spcurrent').siblings().removeClass('spcurrent');
				}
				
				if (typeof self.option.callbackClick == 'function') {
					var id = $(this).attr('val');
					self.option.callbackClick(id);
				}
			});
		},
		_setDefault: function (n) {
			var self = this;
			if (self.colorChange == '1') {
				if (typeof self.option.color != 'undefined' && self.option.color.length > 0 && self.option.color != '') {
					$('#'+self.option.obj+' li').eq(n).addClass('color-click').siblings().removeClass('color-click');
				} else {
					$('#'+self.option.obj+ ' li').eq(n).addClass('spcurrent').siblings().removeClass('spcurrent');
				}
			} else {
				$('#'+self.option.obj+ ' li').eq(n).addClass('spcurrent').siblings().removeClass('spcurrent');
			}
		}
	};
	navList.prototype.constructor = navList;
	return navList;
})
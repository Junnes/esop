(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module'], factory) :
		(global.steps = factory($, Module));
})(this, function($, Module) {
	var option;

	function steps(_option) {
		_option = $.extend({
			data: []
		}, _option);
		option = _option;
		this._init(_option);
	}
	steps.prototype = {
		_init: function() {
			var self = this;
			var back = 0;
			var div = '<div class="es-steps es-steps--horizontal">';
			var beforeWid = (100 - 10) / (option.data.length - 1).toFixed(6);
			for (var i = 0; i < option.data.length; i++) {
				var back = option.data[i].back == true ? 'back="true"' : 'back="false"';
				if (option.data[i].success == true) {
					back += 1;
				}
				if (typeof option.data[i+1] != 'undefined') {
					var lineWid = '0%';
					if (option.data[i+1].success == true && option.data[i].success == true) {
						lineWid = '100%';
					} else {
						lineWid = '0%';
					}
				}
				if (i == 0) {
					var success = option.data[i].success == true ? 'is-success' : 'is-process';
					var text = typeof option.data[i].text != 'undefined' ? option.data[i].text : '';
					// 
					div += '<div class="es-step is-horizontal" style="flex-basis: 50%; width: '+beforeWid+'%\0; margin-right: 0px;" '+back+' path="'+option.data[i].fileUrl+'">'+
						'<div class="es-step__head '+success+'">'+
							'<div class="es-step__line" style="margin-right: 0px;">'+
								'<i class="es-step__line-inner" style="transition-delay: 0ms; border-width: 1px; width: '+lineWid+';"></i>'+
							'</div>'+
							'<div class="es-step__icon is-text">'+
								'<i class="es-step__icon-inner is-status iconfont icon-xuanzhong"></i>'+
							'</div>'+
						'</div>'+
						'<div class="es-step__main">'+
							'<div class="es-step__title '+success+'">'+option.data[i].text+'</div>'+
							'<div class="es-step__description '+success+'"></div>'+
						'</div>'+
					'</div>';
				} else {					
					var flex = '';
					var flexClass = '';
					if (i == option.data.length - 1) {
						flex = 'style="max-width: 33.3333%; width: 10%\0";';
						flexClass = 'is-flex';
						flexLine = 'style="margin-right: 0px; display: none;"'
					} else {
						flex = 'style="flex-basis: 50%; width: '+beforeWid+'%\0; margin-right: 0px;"';
						flexLine = 'style="margin-right: 0px;"';
					}
					if (option.data[i-1].success == true) {
						if (option.data[i].success == true) {
							var success = 'is-success';
							var text = typeof option.data[i].text != 'undefined' ? option.data[i].text : '';
							div += '<div class="es-step is-horizontal '+flexClass+'" '+flex+' '+back+' path="'+option.data[i].fileUrl+'">'+
								'<div class="es-step__head '+success+'">'+
									'<div class="es-step__line" '+flexLine+'>'+
										'<i class="es-step__line-inner" style="transition-delay: 0ms; border-width: 1px; width: '+lineWid+';"></i>'+
									'</div>'+
									'<div class="es-step__icon is-text">'+
										'<i class="es-step__icon-inner is-status iconfont icon-xuanzhong"></i>'+
									'</div>'+
								'</div>'+
								'<div class="es-step__main">'+
									'<div class="es-step__title '+success+'">'+option.data[i].text+'</div>'+
									'<div class="es-step__description '+success+'"></div>'+
								'</div>'+
							'</div>';
						} else {
							var success = 'is-process';
							var text = typeof option.data[i].text != 'undefined' ? option.data[i].text : '';
							div += '<div class="es-step is-horizontal '+flexClass+'" '+flex+' '+back+' path="'+option.data[i].fileUrl+'">'+
								'<div class="es-step__head '+success+'">'+
									'<div class="es-step__line" '+flexLine+'>'+
										'<i class="es-step__line-inner" style="transition-delay: 0ms; border-width: 1px; width: '+lineWid+';"></i>'+
									'</div>'+
									'<div class="es-step__icon is-text">'+
										'<i class="es-step__icon-inner is-status iconfont icon-xuanzhong"></i>'+
									'</div>'+
								'</div>'+
								'<div class="es-step__main">'+
									'<div class="es-step__title '+success+'">'+option.data[i].text+'</div>'+
									'<div class="es-step__description '+success+'"></div>'+
								'</div>'+
							'</div>';
						}
					} else {
						var success = 'is-wait';
						var text = typeof option.data[i].text != 'undefined' ? option.data[i].text : '';
						div += '<div class="es-step is-horizontal '+flexClass+'" '+flex+' '+back+' path="'+option.data[i].fileUrl+'">'+
							'<div class="es-step__head '+success+'">'+
								'<div class="es-step__line" '+flexLine+'>'+
									'<i class="es-step__line-inner" style="transition-delay: 0ms; border-width: 1px; width: '+lineWid+';"></i>'+
								'</div>'+
								'<div class="es-step__icon is-text">'+
									'<i class="es-step__icon-inner is-status iconfont icon-xuanzhong"></i>'+
								'</div>'+
							'</div>'+
							'<div class="es-step__main">'+
								'<div class="es-step__title '+success+'">'+option.data[i].text+'</div>'+
								'<div class="es-step__description '+success+'"></div>'+
							'</div>'+
						'</div>';
					}
				}
			}
			div += '</div>';
			if (option.data[0].fileUrl != '' && typeof option.data[0].fileUrl != 'undefined') {
				div+= '<iframe src="'+option.data[0].fileUrl+'" frameborder="0" class="es-steps-iframe"></iframe>';
			}
			
			if (option.buttonShow == true) {
				var align = typeof option.btnGroupAlign != 'undefined' ? 'es-btn-'+option.btnGroupAlign : 'es-btn-center';
				div += '<div class="es-button-group '+align+'">';
				if (typeof option.buttonData != 'undefined') {
					for (var i = 0; i < option.buttonData.length; i++) {
						var plain = option.buttonData[i].plain == true ? 'is-plain' : '';
						var buttonType = typeof option.buttonData[i].buttonType ? 'es-button-'+option.buttonData[i].buttonType : '';
						var size = typeof option.buttonData[i].size != 'undefined' ? 'es-button-'+option.buttonData[i].size : '';
						var text = typeof option.buttonData[i].text != 'undefined' ? option.buttonData[i].text : '按钮'+i;
						var disabled = option.buttonData[i].disabled == true ? 'is-disabled' : '';
						div += '<button type="button" class="es-button '+buttonType+' '+size+' '+disabled+' '+plain+'" style="margin-top: 12px;">'+
							'<span>'+text+'</span>';
						if (typeof option.buttonData[i].icon != 'undefined' && option.buttonData[i].icon != '') {
							div += '<i class="icon-'+option.icon+'"></i>';
						}
						div += '</button>';
					}
				}
			}
			$('#'+option.obj).append(div);
			$('#'+option.obj+' .es-button-group button').each(function (index, item) {
				$(item).off().on('click', function (e) {
					e.stopPropagation();
					if (typeof option.buttonData[index].callbackClick == 'function') {
						option.buttonData[index].callbackClick(self);
					}
				});
			})
			if (typeof option.initCallback == 'function') {
				option.initCallback(self);
			}
		},
		_setNext: function (n) {
			var len = $('#'+option.obj+' .es-step__head.is-success').length;
			if (!$('#'+option.obj+' .es-button-group button:eq(1)').hasClass('is-disabled')) {
				if (len == 0) {
					$('#'+option.obj+' .es-step__head').eq(0).removeClass('is-process').addClass('is-success')
						.siblings('.es-step__main').find('.es-step__title').removeClass('is-process')
						.addClass('is-success').siblings('.es-step__description').removeClass('is-process')
						.addClass('is-success');

					$('#'+option.obj+' .es-step__head').eq(1).removeClass('is-wait').addClass('is-process')
						.siblings('.es-step__main').find('.es-step__title').removeClass('is-wait')
						.addClass('is-process').siblings('.es-step__description').removeClass('is-wait')
						.addClass('is-process');
					if ($('#'+option.obj+' .es-step__head').eq(1).parent().attr('back') == 'false') {
						$('#'+option.obj+' .es-button-group button:eq(0)').addClass('is-disabled');
					}
				} else if (len > 0) {
					if ($('#'+option.obj+' .es-step__head').eq(len-1).parent().nextAll().length >= 1) {
						// 改变当前步
						$('#'+option.obj+' .es-step__head.is-success').eq(len-1).find('.es-step__line-inner').css('width', '100%');
						// 改变后第一步
						$('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().nextAll().eq(0).find('.es-step__head')
							.removeClass('is-process').addClass('is-success');
						$('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().nextAll().eq(0).find('.es-step__title')
							.removeClass('is-process').addClass('is-success')
							.siblings('.es-step__description').removeClass('is-process').addClass('is-success');
						// 改变后第二步
						if ($('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().nextAll().eq(1).length >= 1) {
							$('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().nextAll().eq(1).find('.es-step__head')
								.removeClass('is-wait').addClass('is-process');
							$('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().nextAll().eq(1).find('.es-step__title')
								.removeClass('is-wait').addClass('is-process')
								.siblings('.es-step__description').removeClass('is-wait').addClass('is-process');
						}
						if ($('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().attr('back') == 'false') {
							$('#'+option.obj+' .es-button-group button:eq(0)').addClass('is-disabled');
						} else {
							$('#'+option.obj+' .es-button-group button:eq(0)').removeClass('is-disabled');
						}
						$('#'+option.obj+' .es-steps-iframe').attr('src', $('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().nextAll().eq(0).attr('path'));
					}
				}
			}
		},
		_setBefore: function (n) {
			var len = $('#'+option.obj+' .es-step__head.is-success').length;
			if (!$('#'+option.obj+' .es-button-group button:eq(0)').hasClass('is-disabled')) {
				if ($('#'+option.obj+' .es-step__head').eq(len-1).parent().prevAll().length >= 1) {
					// 改变后一步
					if ($('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().next().length >= 1) {
						$('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().next().find('.es-step__head')
							.removeClass('is-process').addClass('is-wait');
						$('#'+option.obj+' .es-step__head.is-success').eq(len-1).parent().next().find('.es-step__title')
							.removeClass('is-process').addClass('is-wait')
							.siblings('.es-step__description').removeClass('is-process').addClass('is-wait');
					}
					// 改变当前
					$('#'+option.obj+' .es-step__head.is-success').eq(len-2).find('.es-step__line-inner').css('width', '0%');
					$('#'+option.obj+' .es-step__head.is-success').eq(len-1).siblings('.es-step__main').find('.es-step__title')
						.removeClass('is-success').addClass('is-process')
						.siblings('.es-step__description').removeClass('is-success').addClass('is-process');
					$('#'+option.obj+' .es-step__head.is-success').eq(len-1).removeClass('is-success').addClass('is-process');

					if ($('#'+option.obj+' .es-step__head.is-success').eq(len-3).parent().attr('back') == 'false') {
						$('#'+option.obj+' .es-button-group button:eq(0)').addClass('is-disabled');
					} else {
						$('#'+option.obj+' .es-button-group button:eq(0)').removeClass('is-disabled');
					}
					$('#'+option.obj+' .es-steps-iframe').attr('src', $('#'+option.obj+' .es-step__head.is-success').eq(len-2).parent().attr('path'));
				}
			}
				
		}
	};
	steps.prototype.constructor = steps;
	return steps;
})
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'form', 'common', 'dateTimePicker', 'commonData'], factory) :
		(global.formsInner = factory($, Module, form, common, datetimepicker, commonData));
})(this, function($, Module, form, common, datetimepicker, commonData) {
	function formsInner(_option) {
		_option = $.extend({
			data: []
		}, _option);
		this.option = _option;
		this.multi = false;
		this.defaultVal = [];
		this.broswer = common.myBrowser();
		this.valArr = this.defaultVal;
		this.checkArr = [];
		var cols = typeof this.option.cols != 'undefined' && this.option.cols != '' ? +this.option.cols : 1;
		var widPar = $('#' + this.option.obj).width();
		this.widItem = (1 / cols * 100).toFixed(6) + '%';
		this.labelWidth = typeof this.option.labelWidth != 'undefined' ? this.option.labelWidth + 'px' : 'auto';
		this.label = '';
		this.textAlign = typeof this.option.labelPosition != 'undefined' ? this.option.labelPosition : "right";
		this._init();
	}
	formsInner.prototype = {
		_init: function() {
			var self0 = this;
			$('#'+self0.option.obj).empty();
			var temp = '';
			var horAlign = 'text-align: right';
			var verAlign = '';
			if (self0.option.title != '' && typeof self0.option.title != 'undefined') {
				$('#'+self0.option.obj).append('<h5 class="es-formInnerHead">'+self0.option.title+'</h5>');
			}
			for (var i = 0; i < self0.option.data.length; i++) {
				self0.label = typeof self0.option.data[i].label ? self0.option.data[i].label : '';
				if (self0.option.data[i].initDataUrl != '' && typeof self0.option.data[i].initDataUrl != 'undefined') {
					commonData.postData({
						serviceUrl: self0.option.data[i].initDataUrl,
						serviceData: $.extend({}, self0.option.data[i].initDataParam),
						callback: function (result) {
							self0.option.data[i].data = result;
							(function (i) {
								self0._setInner(i);
							})(i);
						}
					})
				} else {
					(function (i) {
						self0._setInner(i);
					})(i);
				}
			}

			$('#'+self0.option.obj+' .es-input-only input').each(function (index, item) {
				self0._setInputEvent(item);
			});

			$('#'+self0.option.obj+' .es-select .es-input').each(function (index, item) {
				self0._setSelectEvent(item);
				self0._setWindowResize();
			});	

			$('#'+self0.option.obj+' .es-form-item-radio').each(function (index, item) {
				$(item).find('.es-radio').each(function (ind, item0) {
					self0._setRadioEvent(item0);
				})
			});

			$('#'+self0.option.obj+' .es-form-item-check').each(function (index, item) {
				$(item).find('.es-checkbox').each(function (ind, item0) {
					self0._setCheckboxEvent(item0);
				});
			});

			$('#'+self0.option.obj+' .es-form-item-date input').each(function (index, item) {
				self0._setDateEvent(item);
			})

			if (typeof self0.option.initCallback == 'function') {
				self0.option.initCallback();
			}
		},
		_setInner: function (i) {
			var self0 = this;
			switch (self0.option.data[i].textType) {
				case 'input':
					var val = '';
					if (typeof self0.option.data[i].value != 'undefined') {
						val = self0.option.data[i].value;
					}
					var rightbutton = self0.option.data[i].rightButton == true ? true : false;
					var rightbuttonpre = rightbutton == true ? 'es-right-button-pre' : '';
					var div = '<div id="l'+self0.option.data[i].obj+'" index="'+i+'" class="es-form-item clearfix" style="width: '+self0.widItem+';" type="'+self0.option.data[i].textType+'">'+
						'<label class="es-form-item-label" style="width:'+self0.labelWidth+';">'+self0.label+'</label>'+
						'<div class="es-form-item-content" style="margin-left: '+self0.labelWidth+';">'+
						'<div id="'+self0.option.data[i].obj+'" class="es-input-only es-input es-input-small '+rightbuttonpre+'">'+
						'<input class="es-input-inner" value="'+val+'" type="'+self0.option.data[i].textType+'" placeholder="请输入内容" />'+
						'</div>';
					if (rightbutton == true) {
						div += '<div class="es-right-button-box">'+
							'<button type="button" class="es-button btn-preview es-button-primary es-button-small es-right-button">'+
				    		'<span>预览</span></button></div>';
					}
					div += '</div></div>';
					$('#'+self0.option.obj).append(div);
					if (typeof self0.option.data[i].validate == 'object' && self0.option.data[i].validate.constructor == Object) {
						var text = typeof self0.option.data[i].validate.validateText != 'undefined' ? self0.option.data[i].validate.validateText : '';
						if (text != '') {
							$('#'+self0.option.data[i].obj).attr('text', text);
						}
						$('#'+self0.option.data[i].obj).attr('reg', self0.option.data[i].validate.expression).attr('match', self0.option.data[i].validate.matchType);
					} else if (typeof self0.option.data[i].validate == 'string' && self0.option.data[i].validate.constructor == String) {
						$('#'+self0.option.data[i].obj).attr('reg', self0.option.data[i].validate);
					}
					break;
					self0._setPos($('#'+self0.option.data[i].obj).parent().parent());
				case 'textarea':
					var val = '';
					if (typeof self0.option.data[i].value != 'undefined') {
						val = self0.option.data[i].value;
					}
					$('#'+self0.option.obj).append('<div id="l'+self0.option.data[i].obj+'" type="'+self0.option.data[i].textType+'" class="es-form-item clearfix" style="width: '+self0.widItem+';">'+
						'<label class="es-form-item-label" style="width:'+self0.labelWidth+';">'+self0.label+'</label>'+
						'<div class="es-form-item-content" style="margin-left: '+self0.labelWidth+';">'+
						'<div id="'+self0.option.data[i].obj+'" class="es-textarea"><textarea class="es-textarea-inner" type="textarea" rows="1" >'+val+'</textarea></div>'+
					'</div></div>');
					break;
				case 'select':
					self0.defaultVal = typeof self0.option.data[i].defaultVal != 'undefined' ? self0.option.data[i].defaultVal : [];
					self0.multi = self0.option.data[i].multi == true ? true : false;
					var div = '<div id="l'+self0.option.data[i].obj+'" index="'+i+'" type="'+self0.option.data[i].textType+'" class="es-form-item clearfix" style="width: '+self0.widItem+';">'+
						'<label class="es-form-item-label" style="width:'+self0.labelWidth+';">'+self0.label+'</label>'+
						'<div class="es-form-item-content" style="margin-left: '+self0.labelWidth+';">'+
						'<div class="es-select es-input-small" id="'+self0.option.data[i].obj+'" multi="'+self0.multi+'">'+
						'<div class="es-input">'+
						'<input type="text" class="es-input-inner" val="" />'+
						'<span class="es-input-suffix">'+
						'<span class="es-input-suffix-inner">'+
						'<i class="es-input-icon iconfont icon-jiantouxia"></i>'+
						'</span>'+
						'</span>'+
						'</div>';
					if (self0.multi == true) {
						div += '<div class="es-select__tags"></div>';
					}
					div += '<div class="resize-triggers">'+
						'<div class="expand-trigger">'+
						'<div></div>'+
						'</div>'+
						'<div class="contract-trigger"></div>'+
						'</div>'+
						'</div>'+
						'</div></div>';
					$('#'+self0.option.obj).append(div);
					if (self0.option.data[i].edit == false) {
						$('#'+self0.option.data[i].obj+' input').attr('readonly', 'readonly');
						$('#'+self0.option.data[i].obj+' input').css('cursor', 'pointer');
					}
					if (self0.multi == true) {
						for (var k = 0; k < self0.defaultVal.length; k++) {
							if (typeof self0.option.data[i].data[self0.defaultVal[k]].value != 'undefined') {
								var val = typeof self0.option.data[i].data[self0.defaultVal[k]-1].text != 'undefined' ? self0.option.data[i].data[self0.defaultVal[k]-1].text : '';
								var tempClose = '<span><span class="es-tag es-tag--info es-tag--small" val="'+
									self0.option.data[i].data[self0.defaultVal[k]-1].value+'">'+'<span class="es-select__tags-text">'+val+'</span>';
								tempClose += '<i class="es-tag__close iconfont icon-guanbi"></i></span></span>';
								$('#'+self0.option.data[i].obj).find('.es-select__tags').append(tempClose);
							}
						}
						$('#'+self0.option.data[i].obj).find('input').attr('val', self0.defaultVal);
						var heiBefore = $('#'+self0.option.data[i].obj+' input').height()+2;
						var heiNow = $('#'+self0.option.data[i].obj+' .es-select__tags').height();
						var topBefore = $('.es-select-dropdown').last().css('top');
						topBefore = topBefore != undefined ? topBefore.slice(0, topBefore.length - 2) : '';
						topBefore = topBefore.slice(0, topBefore.length - 2);
						if (heiNow > heiBefore) {
							$('#'+self0.option.data[i].obj).find('input').css('height', heiNow+'px');
							if ($('.es-select-dropdown').last().attr('x-placement') == 'bottom-start') {
								$('.es-select-dropdown').last().css('top', (+topBefore + heiNow - heiBefore)+'px');
							}
						}
					} else {
						for (var k = 0; k < self0.option.data[i].data.length; k++) {
							for (var j = 0; j < self0.defaultVal.length; j++) {
								if (self0.option.data[i].data[k].value == self0.defaultVal[j]) {
									$('#'+self0.option.data[i].obj).find('input').val(self0.option.data[i].data[k].text);
									$('#'+self0.option.data[i].obj).find('input').attr('val',self0.option.data[i].data[k].value);
								}
							}
						}
					}
					break;
				case 'radio':
					var div = '<div id="l'+self0.option.data[i].obj+'" index="'+i+'" type="'+self0.option.data[i].textType+'" class="es-form-item clearfix" style="width: '+self0.widItem+';">'+
						'<label class="es-form-item-label" style="width:'+self0.labelWidth+';">'+self0.label+'</label>'+
						'<div class="es-form-item-content es-form-item-radio" id="'+self0.option.data[i].obj+'" style="margin-left: '+self0.labelWidth+';">';
					for (var j = 0; j < self0.option.data[i].data.length; j++) {
						var checked = '';
						var aria = false;
						var val = typeof self0.option.data[i].value != 'undefined' ? self0.option.data[i].value : '';
						if (self0.option.data[i].data[j].id.toString() == val.toString()) {
							checked = 'is-checked';
							aria = true;
						}
						div += '<label role="radio" tabindex="0" class="es-radio '+checked+'" aria-checked="'+aria+'" val="'+self0.option.data[i].data[j].id+'" id="'+self0.option.data[i].obj+i+'o">'+
						'<span class="es-radio__input '+checked+'">'+
							'<span class="es-radio__inner"></span>'+
							'<input type="radio" tabindex="-1" class="es-radio__original" value="" >'+
						'</span>'+
						'<span class="es-radio__label">'+self0.option.data[i].data[j].value+'</span>'+
						'</label>';
					}
					div += '</div></div>';
					$('#'+self0.option.obj).append(div);
					break;
				case 'checkbox':
					self0.checkArr = typeof self0.option.data[i].value != 'undefined' ? self0.option.data[i].value : [];
					var div = '<div id="" class="es-form-item clearfix" index="'+i+'" type="'+self0.option.data[i].textType+'" val="'+self0.checkArr+'" style="width: '+self0.widItem+';">'+
						'<label class="es-form-item-label" style="width:'+self0.labelWidth+';">'+self0.label+'</label>'+
						'<div class="es-form-item-content es-form-item-check" id="'+self0.option.data[i].obj+'" style="margin-left: '+self0.labelWidth+';">';
					for (var j = 0; j < self0.option.data[i].data.length; j++) {
						var checked = '';
						var aria = false;
						if (self0.broswer == 'IE8') {
							if ($.inArray(self0.option.data[i].data[j].id.toString(), self0.checkArr) != -1) {
								checked = 'is-checked';
								aria = true;
							}
							div += '<label role="checkbox" aria-checked="'+aria+'" class="es-checkbox '+checked+' es-checkbox-small" val="'+self0.option.data[i].data[j].id+'" id="'+self0.option.data[i].obj+i+'c">'+
								'<span aria-checked="mixed" class="es-checkbox__input '+checked+'">'+
									'<span class="es-checkbox__inner0"><i class="es-checkbox__icon-inner iconfont icon-xuanzhong"></i></span>'+
									'<input type="checkbox" class="es-checkbox__original" value="">'+
								'</span>'+
								'<span class="es-checkbox__label">'+self0.option.data[i].data[j].value+'</span>'+
							'</label>';
						} else if (self0.broswer == 'IE9') {
							if ($.inArray(self0.option.data[i].data[j].id.toString(), self0.checkArr) != -1) {
								checked = 'is-checked';
								aria = true;
							}
							div += '<label role="checkbox" aria-checked="'+aria+'" class="es-checkbox '+checked+' es-checkbox-small" val="'+self0.option.data[i].data[j].id+'" id="'+self0.option.data[i].obj+i+'c">'+
								'<span aria-checked="mixed" class="es-checkbox__input '+checked+'">'+
									'<span class="es-checkbox__inner0"><i class="es-checkbox__icon-inner iconfont icon-xuanzhong"></i></span>'+
									'<input type="checkbox" class="es-checkbox__original" value="">'+
								'</span>'+
								'<span class="es-checkbox__label">'+self0.option.data[i].data[j].value+'</span>'+
							'</label>';
						} else {
							if (self0.checkArr.indexOf(self0.option.data[i].data[j].id.toString()) != -1) {
								checked = 'is-checked';
								aria = true;
							}
							div += '<label role="checkbox" aria-checked="'+aria+'" class="es-checkbox '+checked+' es-checkbox-small" val="'+self0.option.data[i].data[j].id+'" id="'+self0.option.data[i].obj+i+'c">'+
								'<span aria-checked="mixed" class="es-checkbox__input '+checked+'">'+
									'<span class="es-checkbox__inner"></span>'+
									'<input type="checkbox" class="es-checkbox__original" value="">'+
								'</span>'+
								'<span class="es-checkbox__label">'+self0.option.data[i].data[j].value+'</span>'+
							'</label>';
						}
					}
					div += '</div></div>';
					$('#'+self0.option.obj).append(div);
					break;
				case 'button':
					var div = '<div id="" class="es-form-item clearfix" index="'+i+'" type="'+self0.option.data[i].textType+'" style="width: '+self0.widItem+';">'+
						'<div class="es-form-item-content">';
					div += '<div class="es-button-con es-btn-right"><button type="button" id="'+self0.option.data[i].obj+'" class="es-button es-button-primary es-button-small">';
					if (typeof self0.option.data[i].icon != 'undefined' && self0.option.data[i].icon != '') {
						div += '<i class="icon-'+self0.option.data[i].icon+'"></i>';
					}
					div += '<span>'+self0.option.data[i].value+'</span></button></div>';
					div += '</div></div>';
					$('#'+self0.option.obj).append(div);
					break;
				case 'date':
					var val = '';
					if (typeof self0.option.data[i].value != 'undefined') {
						val = self0.option.data[i].value;
					}
					var div = '<div id="" class="es-form-item clearfix" index="'+i+'" type="'+self0.option.data[i].textType+'" val="'+self0.checkArr+'" style="width: '+self0.widItem+';">'+
						'<label class="es-form-item-label" style="width:'+self0.labelWidth+';">'+self0.label+'</label>'+
						'<div class="es-form-item-content es-form-item-date" style="margin-left: '+self0.labelWidth+';">';
					div += '<div class="es-input es-input-mini ">'+
						'<input id="'+self0.option.data[i].obj+'" class="es-input-inner" value="'+val+'" type="input" placeholder="请选择日期">'+
						'<span class="es-input-suffix">'+
							'<span class="es-input-suffix-inner">'+
								'<i class="es-input-icon iconfont icon-yanchurili"></i>'+
							'</span>'+
						'</span>'+
					'</div>';
					div += '</div></div>';
					$('#'+self0.option.obj).append(div);
					break;
			}
		},
		_setPos: function (obj) {
			var self0 = this;
			switch(self0.textAlign) {
				case 'left':
					$(obj).find('.es-form-item-label').css({
						"text-align": self0.textAlign
					});
					break;
				case 'top':
					if (self0.option.data[i].textType == 'radio' || self0.option.data[i].textType == 'checkbox') {
						$(obj).find('.es-form-item-label').css('float', 'none');
						$(obj).find('.es-form-item-content').attr("style", "");
					} else {
						$(obj).find('.es-form-item-label').attr("style", "");
						$(obj).find('.es-form-item-content').attr("style", "");
					}
					break;
				case 'right':
					$(obj).find('.es-form-item-label').css({
						"text-align": self0.textAlign
					});
					break;
			}
		},
		_setSelectEvent: function (obj) {
			var self0 = this;
			var ind = $(obj).parent().parent().parent().attr('index');
			// select event
			var clickInd = 1;
			// $('#'+self0.option.obj+' .es-select').find('.es-input').off().on('click', function (e) {
			$(obj).off().on('click', function (e) {
				var self = this;
				e.stopPropagation();

				if (!$(self).hasClass('is-disabled')) {
					// click count
					// first clicck has to init HTML
					// and other click just change the last es-select-dropdown
					if (clickInd == 1) {
						$(self).addClass('is-focus');
						var dropHtml = '<div class="es-select-dropdown es-popper '+(self0.multi == true ? 'is-multiple' : '')+'" x-placement=""><div class="es-scrollbar"><div class="es-select-dropdown-wrap">'+
						'<ul class="es-scrollbar__view es-select-dropdown__list">';
						if (typeof self0.option.data[ind].data != "undefined") {
							for (var i = 0; i < self0.option.data[ind].data.length; i++) {
								dropHtml += '<li class="es-select-dropdown__item" val="'+self0.option.data[ind].data[i].value+'"><span>'+self0.option.data[ind].data[i].text+'</span></li>';
							}
						} else {
							dropHtml += '<li class="es-select-dropdown__item" val=""><span></span></li>';
						}
						dropHtml += '</ul>'+'</div></div></div>';
						$('body').append(dropHtml);
						var top = $(self).offset().top;
						var scrollTop = $(document).scrollTop();
						var left = $(self).offset().left;
						var heiPar = $(window).height();
						var hei = $('.es-select-dropdown').last().height();
						var widpre = $(self).width();
						var heipre = $(self).height();
						var x = '';
						if (heiPar - top - heipre + scrollTop > hei) {
							x = "bottom-start";
							$('.es-select-dropdown').last().css({
								"position": "absolute",
								"top": top + heipre + 'px',
								"left": left + 'px',
								"min-width": widpre + 'px',
								"min-width": widpre - 18 + 'px'
							});
							$('.es-select-dropdown').last().attr('x-placement', 'bottom-start');
						} else {
							x = 'top-start';
							$('.es-select-dropdown').last().css({
								"position": "absolute",
								"top": top - hei - 12 + 'px',
								"left": left + 'px',
								"min-width": widpre + 'px',
								"min-width": widpre - 30 + 'px'
							});
							$('.es-select-dropdown').last().attr('x-placement', 'top-start');
						}
						$(".es-select-dropdown:not(':last')").hide();
						$('.es-select .es-input').not($(self)).removeClass('is-focus');
					} else if (!!$(self).hasClass('is-focus')) {
						$(self).removeClass('is-focus');
						$('.es-select-dropdown').last().hide();
					} else {
						$(self).addClass('is-focus');
						if (self0.multi == false) {
							$('.es-select-dropdown').last().removeClass('is-multiple');
						} else {
							$('.es-select-dropdown').last().addClass('is-multiple');
						}
						$('.es-select-dropdown').last().show();
						var top = $(self).offset().top;
						var scrollTop = $(document).scrollTop();
						var left = $(self).offset().left;
						var heiPar = $(window).height();
						var hei = $('.es-select-dropdown').last().height();
						var widpre = $(self).width();
						var heipre = $(self).height();
						var x = '';
						if (heiPar - top - heipre + scrollTop > hei) {
							x = "bottom-start";
							$('.es-select-dropdown').last().css({
								"position": "absolute",
								"top": top + heipre + 'px',
								"left": left + 'px',
								"min-width": widpre + 'px'
							});
							$('.es-select-dropdown').last().attr('x-placement', 'bottom-start');
						} else {
							x = 'top-start';
							$('.es-select-dropdown').last().css({
								"position": "absolute",
								"top": top - hei - 12 + 'px',
								"left": left + 'px',
								"min-width": widpre + 'px'
							});
							$('.es-select-dropdown').last().attr('x-placement', 'top-start');
						}
						$('.es-select .es-input').not($(self)).removeClass('is-focus');
					}
					clickInd += 1;
					if (self0.multi == true) {
						$('.es-select-dropdown').last().find('li').removeClass('selected');
						for (var j = 0; j < $('.es-select-dropdown').last().find('li').length; j++) {
	                    	for (var i = 0; i < self0.defaultVal.length; i++) {
	                            if ($('.es-select-dropdown').last().find('li').eq(j).attr('val') == self0.defaultVal[i]) {
	                                $('.es-select-dropdown').last().find('li').eq(j).addClass('selected');
	                            }
	                        }
	                    }
					} else {
						for (var j = 0; j < $('.es-select-dropdown').last().find('li').length; j++) {
	                    	for (var i = 0; i < self0.defaultVal.length; i++) {
	                            if ($('.es-select-dropdown').last().find('li').eq(j).attr('val') == self0.defaultVal[i]) {
	                                $('.es-select-dropdown').last().find('li').eq(j).addClass('selected').siblings().removeClass('selected');
	                            }
	                        }
	                    }
					}
					$('.es-select-dropdown').last().off().on('click', 'li', function (e) {
						e.stopPropagation();
						// var multi = typeof self0.option.multi != 'undefined' ? self0.option.multi : false;
						if (self0.multi == true) {
							var val = $(this).find('span').text();
							var id = $(this).attr('val');
							var maxSelected = typeof self0.option.maxSelected != 'undefined' ? self0.option.maxSelected : 5;
							if (self0.defaultVal.length < +maxSelected) {
								if (self0.defaultVal.indexOf(id) == -1) {
									$(this).addClass('selected');
									$(obj).parent().find('.es-select__tags').append('<span><span class="es-tag es-tag--info es-tag--small" val="'+
										id+'">'+'<span class="es-select__tags-text">'+val+'</span>'+
										'<i class="es-tag__close iconfont icon-guanbi"></i></span></span>');
									// self0.valArr.push(id);
									self0.defaultVal.push(id);
									var heiBefore = $(self).height();
									var heiNow = $(obj).parent().find('.es-select__tags').height();
									var topBefore = $('.es-select-dropdown').last().css('top');
									topBefore = topBefore != undefined ? topBefore.slice(0, topBefore.length - 2) : '';
									topBefore = topBefore.slice(0, topBefore.length - 2);
									if (heiNow > heiBefore) {
										$(self).find('input').css('height', heiNow+'px');
										if ($('.es-select-dropdown').last().attr('x-placement') == 'bottom-start') {
											$('.es-select-dropdown').last().css('top', (+topBefore + heiNow - heiBefore)+'px');
										}
									}
									// $('.es-select-dropdown').last().css('top')

								} else {
									$(obj).parent().find('.es-select__tags .es-tag[val="'+id+'"]').parent().remove();
									$(this).removeClass('selected');
									// self0.valArr.splice(self0.valArr.indexOf(id), 1);
									self0.defaultVal.splice(self0.defaultVal.indexOf(id), 1);
								}
							}
						} else {
							$('.es-input').removeClass('is-focus');
							var val = $(this).find('span').text();
							var id = $(this).attr('val');
							$(this).addClass('selected').siblings().removeClass('selected');
							$(self).find('input').attr('val', id).val(val);
							self0.defaultVal = [id];
							$(self).removeClass('is-focus');
							$('.es-select-dropdown').last().hide();
						}
						if (typeof self0.option.callbackClick == 'function') {
							self0.option.callbackClick(e);
						}
					});
					$('body').off().on('click', function () {
						$('.es-input').removeClass('is-focus');
						$('.es-select-dropdown').last().hide();
					});
				}
			});
			// select input event
			$('#'+self0.option.obj+' .es-select').find('.es-input input').off().on('keyup', function (e) {
				if (typeof self0.option.callbackSelect == 'function') {
					self0.option.callbackSelect(e);
				}
			});
			$('#'+self0.option.obj).off().on('click', '.es-tag__close', function (e) {
				// if (!$(this).parent().parent().parent().prev().hasClass('is-disabled')) {
				var id = $(this).parent().attr('val');
				$(this).parent().parent().remove();
				$('.es-select-dropdown').last().find('.es-select-dropdown__item[val="'+id+'"]').removeClass('selected');
				// self0.valArr.splice(self0.valArr.indexOf(id), 1);
				self0.defaultVal.splice(self0.defaultVal.indexOf(id), 1);

				var heiBefore = $('#'+self0.option.obj).find('.es-select input').height()+2;
				var heiNow = $('#'+self0.option.obj+' .es-select__tags').height();
				var topBefore = $('.es-select-dropdown').last().css('top');
				topBefore = topBefore != undefined ? topBefore.slice(0, topBefore.length - 2) : '';
				if (heiNow < heiBefore && $('#'+self0.option.obj+' .es-select .es-tag').length > 0) {
					$('#'+self0.option.obj).find('.es-select input').css('height', heiNow+'px');
					if ($('.es-select-dropdown').last().attr('x-placement') == 'bottom-start') {
						$('.es-select-dropdown').last().css('top', (+topBefore + heiNow - heiBefore)+'px');
					}
				}
				// }
					
				e.stopPropagation();
			});
		},
		_setInputEvent: function (obj) {
			var self0 = this;
			var ind = $(obj).parent().parent().parent().attr('index');
			// input event
			// $('#'+self0.option.obj+' input').off().on('keyup', function (e) {
			$(obj).off().on('keyup', function (e) {
				if (typeof self0.option.data[ind].callbackKeyup == 'function') {
					self0.option.data[ind].callbackKeyup(e);
				}
			}).on('blur', function () {
				if ($(this).parent().attr('reg') != '' && typeof $(this).parent().attr('reg') != 'undefined') {
					var str = $(this).parent().attr('reg');
					var match = typeof $(this).parent().attr('match') == 'undefined' ? 'g' : $(this).parent().attr('match');
					var reg = new RegExp(str, match);
					var val = $(this).val();
					var text = $(this).parent().attr('text');
					if (typeof self0.option.data[ind].validate == 'object' && self0.option.data[ind].validate.constructor == Object) {
						if (reg.test(val) == true) {
							if (typeof text != 'undefined') {
								$(this).css('border-color', '#d8dce5');
								$(this).parent().siblings('.es-warning').remove();
							} else {
								$(this).css('border-color', '#d8dce5');
							}
						} else {
							if (typeof text != 'undefined') {
								$(this).css('border-color', 'red');
								$(this).parent().parent().append('<div class="es-warning">'+text+'</div>');
							} else {
								$(this).css('border-color', 'red');
							}
							
						}
					} else if (typeof self0.option.data[ind].validate == 'string' && self0.option.data[ind].validate.constructor == String) {
						if (reg.test(val) == true) {
							$(this).css('border-color', '#d8dce5');
						} else {
							$(this).css('border-color', 'red');
						}
					}
						
				}
			}).on('focus', function() {
				$(obj).find('input').css('color', '#5a5e66');
			});
		},
		_setRadioEvent: function (obj) {
			var self0 = this;
			// radio event
			// $('#'+self0.option.obj).find('.es-radio').off().on('click', function (e) {
			$(obj).off().on('click', function (e) {
				if (!$(this).hasClass('is-disabled')) {
					if (self0.option.radioBorder == true) {
						$(this).addClass('is-checked').siblings().removeClass('is-checked');
						$(this).find('.es-radio__input').addClass('is-checked');
						$(this).siblings().find('.es-radio__input').removeClass('is-checked')
					} else {
						$(this).addClass('is-checked').siblings().removeClass('is-checked');
						$(this).find('.es-radio__input').addClass('is-checked');
						$(this).siblings().find('.es-radio__input').removeClass('is-checked')
					}
					self0.option.value = $(this).attr('val');
				}					
				e.stopPropagation();
			});
		},
		_setCheckboxEvent: function (obj) {
			var self0 = this;
			var ind = 
			// checkbox event
			// $('#'+self0.option.obj).find('.es-checkbox').off().on('change', function (e) {
			$(obj).off().on('change', function (e) {
				if (!$(this).hasClass('is-disabled')) {
					if (!!$(this).hasClass('is-checked')) {
						$(this).removeClass('is-checked');
						$(this).find('.es-checkbox__input').removeClass('is-checked');
						self0.checkArr.splice(self0.checkArr.indexOf($(this).attr('val')), 1);
						// self0.option.value.splice(self0.option.value.indexOf($(this).attr('val')), 1);
					} else {
						$(this).addClass('is-checked');
						$(this).find('.es-checkbox__input').addClass('is-checked');
						if (self0.option.checkboxBorder == true) {
							$(this).addClass('is-bordered');
						}
						self0.checkArr.push($(this).attr('val'));
						// self0.option.value.push($(this).attr('val'));
					}
					$(obj).parent().parent().attr('val', self0.checkArr);
				}
				e.stopPropagation();
			});
		},
		_setButtonEvent: function (obj) {
			var self0 = this;
			// button event 
			$('#'+self0.option.obj +' button').off().on('click', function () {
				if (!$(this).hasClass('is-disabled')) {
					if (typeof option.callbackClick == 'function') {
						self0.option.callbackClick(this);
					}
				}
					
			}).on('mousedown', function (e) {
				e.stopPropagation();
				if (!$(this).hasClass('is-disabled')) {
					var buttonClass = $(this).attr('class').split(' ')[1] + '-h';
					$(this).removeClass(buttonClass);
				}
			}).on('mouseup', function (e) {
				e.stopPropagation();
				var buttonClass = $(this).attr('class').split(' ')[1] + '-h';
				$(this).addClass(buttonClass);
				
			}).on('mouseenter', function (e) {
				e.stopPropagation();
				var buttonClass = $(this).attr('class').split(' ')[1] + '-h';
				$(this).addClass(buttonClass);
			}).on('mouseleave', function (e) {
				e.stopPropagation();
				var buttonClass = $(this).attr('class').split(' ')[1] + '-h';
				$(this).removeClass(buttonClass);
			});
		},
		_setDateEvent: function (obj) {
			var self0 = this;
			var ind = $(obj).parent().parent().parent().attr('index');
			var value = typeof self0.option.data[ind].value != 'undefined' ? self0.option.data[ind].value : '';
			var format = typeof self0.option.data[ind].format != 'undefined' ? self0.option.data[ind].format : 'Y-m-d';
			$(obj).datetimepicker({
		        lang: 'ch',
		        timepicker: false,
		        format: 'Y-m-d',
		        value: value,
		        id: self0.option.data[ind].obj+'date'
		    });
		    $(obj).off('click').on('click', function () {
		    	var wid = $(this).parent().width() + 'px';
		    	$('.xdsoft_datetimepicker').css('width', wid);
		    });
		},
		_setWindowResize: function () {
			var self0 = this;
			// window event listener
			$(window).resize(function () {
				$('.es-select[multi="true"]').each(function (index, item) {
					var heiBefore = $(item).find('input').height() + 2;
					var heiNow = $(item).find('.es-select__tags').height();
					var topBefore = $('.es-select-dropdown').last().css('top');
					topBefore = topBefore != undefined ? topBefore.slice(0, topBefore.length - 2) : '';
					topBefore = topBefore.slice(0, topBefore.length - 2);
					$(item).find('input').css('height', heiNow+'px');
				});
				$('.es-select .es-input.is-focus').each(function (index, item) {
					var top = $(item).offset().top;
					var scrollTop = $(document).scrollTop();
					var left = $(item).offset().left;
					var heiPar = $(window).height();
					var hei = $('.es-select-dropdown').last().height();
					var widpre = $(item).width();
					var heipre = $(item).height();
						
					if (!!$('.es-select-dropdown').last().is(':visible')) {
						if (heiPar - top - heipre + scrollTop > hei) {
							$('.es-select-dropdown').last().attr('x-placement', "bottom-start");
						} else {
							$('.es-select-dropdown').last().attr('x-placement', "top-start");
						}
						var x = $('.es-select-dropdown').last().attr('x-placement');
						if (x == 'bottom-start') {
							$('.es-select-dropdown').last().css({
								"top": top + heipre + 'px',
								"left": left + 'px',
								"min-width": widpre + 'px'
							});
						} else {
							$('.es-select-dropdown').last().css({
								"top": top - hei - 12 + 'px',
								"left": left + 'px',
								"min-width": widpre + 'px'
							});
						}
					}
				})
			});
		}
	};
	formsInner.prototype.constructor = formsInner;
	return formsInner;
})
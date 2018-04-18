(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'commonData', 'common'], factory) :
		(global.Esinput = factory ($, commonData, common));
})(this, function ($, commonData, common) {
	var broswer = common.myBrowser();
	function Esinput (_option) {
		var self = this;
		_option = $.extend({
			data: []
		}, _option);
		if (_option.textType == 'select') {
			if (_option.initDataUrl != '' && typeof _option.initDataUrl != 'undefined') {
				commonData.postData({
					serviceUrl: _option.initDataUrl,
					serviceData: $.extend({}, _option.initDataParam),
					callback: function (result) {
						_option.data = result;
						self.option = _option;
						self._init();
					}
				});
			} else {
				self.option = _option;
				self._init();
			}
		} else {
			self.option = _option;
			self._init();
		}
	}
	Esinput.prototype = {
		_init: function () {
			var selfs = this;
			var ind = 'l' + new Date().getTime() + (100*Math.random()).toFixed();
			var itemInd = 'm' + new Date().getTime() + (100*Math.random()).toFixed();
			var placeholder = selfs.option.placeholder ? selfs.option.placeholder : "请输入内容";
			var inputDisabled = selfs.option.disabled == true ? 'is-disabled' : '';
			var textType = selfs.option.textType ? selfs.option.textType : 'input';
			var labelWidth = selfs.option.labelWidth ? selfs.option.labelWidth+'px' : 'auto';
			var textAlign = selfs.option.labelPosition ? selfs.option.labelPosition : "right";
			var temp = '',div = '';
			var multi = typeof selfs.option.multi != 'undefined' ? selfs.option.multi : false;
			var size = selfs._setSize(textType);
			var edit = typeof selfs.option.edit != 'undefined' ? selfs.option.edit : false;
			var defaultVal = typeof selfs.option.defaultVal != 'undefined' ? (multi == true ? selfs.option.defaultVal : [selfs.option.defaultVal]) : [];
			var valArr = defaultVal;

			

			// 生成组件外部结构
			if (selfs.option.labelShow == true && typeof selfs.option.label != 'undefined' && selfs.option.label != '') {
				temp = '<div id="'+itemInd+'" class="es-form-item clearfix">'+
					'<label class="es-form-item-label" style="width:'+labelWidth+';">'+selfs.option.label+'</label>'+
					'<div class="es-form-item-content" style="margin-left: '+labelWidth+';">'+
				'</div></div>';
				$('#'+selfs.option.obj).append(temp);
				switch (textAlign) {
					case 'left':
						$('#'+itemInd+' .es-form-item-label').css({
							"text-align": selfs.option.labelPosition
						});
						break;
					case "right":
						$('#'+itemInd+' .es-form-item-label').css({
							"text-align": selfs.option.labelPosition
						});
						break;
					case 'top':
						if (selfs.option.textType == 'radio' || selfs.option.textType == 'checkbox') {
							$('#'+itemInd+' .es-form-item-label').css('float', 'none');
							$('#'+itemInd+' .es-form-item-content').attr("style", "");
						} else {
							$('#'+itemInd+' .es-form-item-label').attr("style", "");
							$('#'+itemInd+' .es-form-item-content').attr("style", "");
						}
						break;
				}
			}
			// 生成组件内部结构
			switch (textType) {
				case 'input':
					var required = selfs.option.required == true ? 'required' : '';
					var disabled = selfs.option.disabled == true ? "disabled='disabled'" : '';
					var rightbutton = selfs.option.rightButton == true ? true : false;
					var rightbuttonpre = rightbutton == true ? 'es-right-button-pre' : '';
					div += '<div id="'+ind+'" class="es-input'+' '+size+''+' '+inputDisabled+' '+rightbuttonpre+'">'+
						'<input class="es-input-inner" type="'+textType+'" placeholder="'+placeholder+'" '+disabled+' />';
					if (typeof selfs.option.icon != 'undefined' && selfs.option.icon != '') {
						div += '<span class="es-input-suffix"><span class="es-input-suffix-inner"><i class="es-input-icon iconfont icon-'+
							selfs.option.icon+'"></i></span></span>';
					}
					div += '</div>';
					if (rightbutton == true) {
						var rightsize = '';
						if (selfs.option.size != undefined && selfs.option.size != '') {
							rightsize = 'es-button-'+selfs.option.size;
						}
						div += '<div class="es-right-button-box">'+
							'<button type="button" class="es-button btn-preview es-button-primary '+rightsize+' es-right-button">';
						if (typeof selfs.option.rightIcon != 'undefined' && selfs.option.rightIcon != '') {
							div += '<i class="icon-'+selfs.option.rightIcon+'"></i>';
						}
				    	div += '<span>'+rightButtonText+'</span></button></div>';
					}
					break;
				case 'textarea':
					div += '<div id="'+ind+'" class="es-textarea '+inputDisabled+'"><textarea class="es-textarea-inner" type="textarea" rows="'+
					(selfs.option.row ? selfs.option.row : 1)+'" placeholder="'+placeholder+'" ></textarea></div>';
					break;
				case 'select':
					var disabled = selfs.option.disabled == true ? "disabled='disabled'" : '';
					var placeholder = typeof selfs.option.placeholder != 'undefined' ? selfs.option.placeholder : '';
					if (multi == true) {
						if (defaultVal.length > 0) {
							placeholder = '';
						}
					}
					div += '<div class="es-select '+size+'" id="'+ind+'" multi="'+multi+'">'+
						'<div class="es-input '+inputDisabled+'">'+
							'<input type="text" class="es-input-inner" val="" placeholder="'+placeholder+'" '+disabled+' />'+
							'<span class="es-input-suffix">'+
								'<span class="es-input-suffix-inner">'+
									'<i class="es-input-icon iconfont icon-jiantouxia"></i>'+
								'</span>'+
							'</span>'+
						'</div>';
					if (multi == true) {
						div += '<div class="es-select__tags"></div>';
					}
					div += '<div class="resize-triggers">'+
							'<div class="expand-trigger">'+
								'<div></div>'+
							'</div>'+
							'<div class="contract-trigger"></div>'+
						'</div>'+
					'</div>';
					break;
				case 'radio':
					for (var i = 0; i < selfs.option.data.length; i++) {
						var checked = '';
						var aria = false;
						var radioBorder = typeof selfs.option.radioBorder != 'undefined' ? (selfs.option.radioBorder == true ? 'is-bordered' : '') :'';
						if (selfs.option.data[i].id.toString() == selfs.option.value.toString()) {
							checked = 'is-checked';
							aria = true;
						}
						var dis = typeof selfs.option.data[i].disabled != 'undefined' ? selfs.option.data[i].disabled : false;
						var radioDisabled = dis == true ? 'is-disabled' : '';
						var rio = dis == true ? 'disabled': '';
						div += '<label role="radio" tabindex="0" class="es-radio '+checked+' '+radioDisabled+' '+radioBorder+
							'" aria-checked="'+aria+'" val="'+selfs.option.data[i].id+'" id="'+itemInd+i+'o">'+
							'<span class="es-radio__input '+checked+' '+radioDisabled+'">'+
								'<span class="es-radio__inner"></span>'+
								'<input type="radio" tabindex="-1" class="es-radio__original" value="1" disabled="'+
								rio+'">'+
							'</span>'+
							'<span class="es-radio__label">'+selfs.option.data[i].value+'</span>'+
						'</label>';
					}
					break;
				case 'checkbox':
					for (var i = 0; i < selfs.option.data.length; i++) {
						var checked = '';
						var aria = false;
						var checkboxBorder = '';
						var checkArr = typeof selfs.option.value != 'undefined' ? selfs.option.value : [];
						var checkboxBorder = typeof selfs.option.checkboxBorder != 'undefined' ? (selfs.option.checkboxBorder == true ? 'is-bordered' : '') :'';
						
						var dis = typeof selfs.option.data[i].disabled != 'undefined' ? selfs.option.data[i].disabled : false;
						var checkboxDisabled = dis == true ? 'is-disabled' : '';
						var check = dis == true ? 'disabled': '';

						if (broswer == 'IE8') {
							if ($.inArray(selfs.option.data[i].id.toString(), checkArr) != -1) {
								checked = 'is-checked';
								aria = true;
							}
							div += '<label role="checkbox" aria-checked="'+aria+'" class="es-checkbox '+checked+' '+checkboxDisabled+' '+
								checkboxBorder+' '+size+'" val="'+selfs.option.data[i].id+'" id="'+itemInd+i+'c">'+
								'<span aria-checked="mixed" class="es-checkbox__input '+checked+' '+checkboxDisabled+'">'+
									'<span class="es-checkbox__inner0"><i class="es-checkbox__icon-inner iconfont icon-xuanzhong"></i></span>'+
									'<input type="checkbox" class="es-checkbox__original" value="">'+
								'</span>'+
								'<span class="es-checkbox__label">'+selfs.option.data[i].value+'</span>'+
							'</label>';
						} else if (broswer == 'IE9') {
							if ($.inArray(selfs.option.data[i].id.toString(), checkArr) != -1) {
								checked = 'is-checked';
								aria = true;
							}
							div += '<label role="checkbox" aria-checked="'+aria+'" class="es-checkbox '+checked+' '+checkboxDisabled+' '+
								checkboxBorder+' '+size+'" val="'+selfs.option.data[i].id+'" id="'+itemInd+i+'c">'+
								'<span aria-checked="mixed" class="es-checkbox__input '+checked+' '+checkboxDisabled+'">'+
									'<span class="es-checkbox__inner0"><i class="es-checkbox__icon-inner iconfont icon-xuanzhong"></i></span>'+
									'<input type="checkbox" class="es-checkbox__original" value="">'+
								'</span>'+
								'<span class="es-checkbox__label">'+selfs.option.data[i].value+'</span>'+
							'</label>';
						} else {
							if (checkArr.indexOf(selfs.option.data[i].id.toString()) != -1) {
								checked = 'is-checked';
								aria = true;
							}
							div += '<label role="checkbox" aria-checked="'+aria+'" class="es-checkbox '+checked+' '+checkboxDisabled+' '+
								checkboxBorder+' '+size+'" val="'+selfs.option.data[i].id+'" id="'+itemInd+i+'c">'+
								'<span aria-checked="mixed" class="es-checkbox__input '+checked+' '+checkboxDisabled+'">'+
									'<span class="es-checkbox__inner"></span>'+
									'<input type="checkbox" class="es-checkbox__original" value="">'+
								'</span>'+
								'<span class="es-checkbox__label">'+selfs.option.data[i].value+'</span>'+
							'</label>';
						}
							
					}
						
					break;
				case "button":
					var align = typeof selfs.option.buttonAlign != 'undefined' && selfs.option.buttonAlign != '' ? 'es-btn-'+selfs.option.buttonAlign : 'es-btn-right';
					var butDisabled = typeof selfs.option.disabled != 'undefined' ? selfs.option.disabled == true ? 'is-disabled' : '' : '';
					var text = typeof selfs.option.text != 'undefined' ? selfs.option.text != '' ? selfs.option.text : '提交' : '提交';
					var plain = typeof selfs.option.plain != 'undefined' && selfs.option.plain != '' ? selfs.option.plain == true ? 'is-plain' : '' : '';
					var buttonType = typeof selfs.option.buttonType != 'undefined' && selfs.option.buttonType != '' ? 'es-button-'+selfs.option.buttonType : '';
					div += '<div class="es-button-con '+align+'"><button type="button" id="'+ind+'" class="es-button '+buttonType+' '+size+' '+plain+' '+butDisabled+'">';
					if (typeof selfs.option.icon != 'undefined' && selfs.option.icon != '') {
						div += '<i class="icon-'+selfs.option.icon+'"></i>';
					}
					div += '<span>'+text+'</span></button></div>';
					break;
				case 'buttonGroup':
					var align = typeof selfs.option.btnGroupAlign != 'undefined' && selfs.option.btnGroupAlign != '' ? 'es-btn-'+selfs.option.btnGroupAlign : 'es-btn-right';
					div += '<div class="es-button-group '+align+'" id="'+itemInd+'">';
					for (var i = 0; i < selfs.option.data.length; i++) {
						var butDisabled = typeof selfs.option.data[i].disabled != 'undefined' ? selfs.option.data[i].disabled == true ? 'is-disabled' : false : '';
						var text = typeof selfs.option.data[i].text != 'undefined' ? selfs.option.data[i].text != '' ? selfs.option.data[i].text : '提交' : '提交';
						var plain = typeof selfs.option.data[i].plain != 'undefined' && selfs.option.data[i].plain != '' ? selfs.option.data[i].plain == true ? 'is-plain' : '' : '';
						var buttonType = typeof selfs.option.data[i].buttonType != 'undefined' && selfs.option.data[i].buttonType != '' ? 'es-button-'+selfs.option.data[i].buttonType : '';
						div += '<button type="button" id="'+ind+i+'" class="es-button '+buttonType+' '+size+' '+plain+' '+butDisabled+'" val="'+selfs.option.data[i].id+'">';
						if (typeof selfs.option.data[i].icon != 'undefined' && selfs.option.icon != '') {
							div += '<i class="icon-'+selfs.option.data[i].icon+'"></i>';
						}
						div += '<span>'+text+'</span></button>';
					}
					div += '</div>';
					break;

			}
			if (typeof selfs.option.label != 'undefined' && selfs.option.label != '' && selfs.option.labelShow == true) {
				$('#'+itemInd+'>.es-form-item-content').append(div);
			} else {
				$('#'+selfs.option.obj).append(div);
			}
			if (selfs.option.disabled == true) {
				$('#'+ind+' .es-input-inner').attr('disabled');
				$('#'+ind+' .es-textarea-inner').attr('disabled');
			}
			// 初始化值
			switch(selfs.option.textType) {
				case 'input':
					var value = typeof selfs.option.value != 'undefined' ? selfs.option.value : '';
					$('#'+ind+' .es-input-inner').val(value);
					if (typeof selfs.option.validate == 'object' && selfs.option.validate.constructor == Object) {
						var text = typeof selfs.option.validate.validateText != 'undefined' ? selfs.option.validate.validateText : '';
						if (text != '') {
							$('#'+selfs.option.obj+' #'+ind).attr('text', text);
						}
						$('#'+selfs.option.obj+' #'+ind).attr('reg', selfs.option.validate.expression).attr('match', selfs.option.validate.matchType);
					} else if (typeof selfs.option.validate == 'string' && selfs.option.validate.constructor == String) {
						$('#'+selfs.option.obj+' #'+ind).attr('reg', selfs.option.validate);
					}
					break;
				case 'textarea':

					var value = typeof selfs.option.value != 'undefined' ? selfs.option.value : '';
					$('#'+ind+' .es-textarea-inner').val(value);
					break;
				case 'select':
					if (edit == false) {
						$('#'+ind).find('input').attr('readonly', 'readonly').attr("unselectable","on");
						$('#'+ind).find('input').css('cursor', 'pointer');
					}
					if (multi == true) {
						for (var i = 0; i < valArr.length; i++) {
							if (typeof selfs.option.data[valArr[i]].value != 'undefined') {
								var val = typeof selfs.option.data[valArr[i]-1].text != 'undefined' ? selfs.option.data[valArr[i]-1].text : '';
								var tempClose = '<span><span class="es-tag es-tag--info es-tag--small" val="'+
									selfs.option.data[valArr[i]-1].value+'">'+'<span class="es-select__tags-text">'+val+'</span>';
								if (selfs.option.disabled == false) {
									tempClose += '<i class="es-tag__close iconfont icon-guanbi"></i></span></span>';
								}
								$('#'+ind).find('.es-select__tags').append(tempClose);
							}
						}
						$('#'+ind).find('input').attr('val', valArr);
						// $('#'+ind).find('input').attr('data', valueArr);
						var heiBefore = $('#'+selfs.option.obj+' input').height()+2;
						var heiNow = $('#'+selfs.option.obj+' .es-select__tags').height();
						var topBefore = $('.es-select-dropdown').last().css('top');
						topBefore = topBefore != undefined ? topBefore.slice(0, topBefore.length - 2) : '';
						topBefore = topBefore.slice(0, topBefore.length - 2);
						if (heiNow > heiBefore) {
							$('#'+selfs.option.obj).find('input').css('height', heiNow+'px');
							if ($('.es-select-dropdown').last().attr('x-placement') == 'bottom-start') {
								$('.es-select-dropdown').last().css('top', (+topBefore + heiNow - heiBefore)+'px');
							}
						}
					} else {
						for (var i = 0; i < selfs.option.data.length; i++) {
							for (var j = 0; j < defaultVal.length; j++) {
								if (selfs.option.data[i].value == defaultVal[j]) {
									$('#'+ind).find('input').val(selfs.option.data[i].text);
									$('#'+ind).find('input').attr('val',selfs.option.data[i].value);
								}
							}
						}
					}
					break;
			}

			// select event
			var clickInd = 1;
			$('#'+ind).find('.es-input').off().on('click', function (e) {
				var self = this;
				e.stopPropagation();

				if (!$(self).hasClass('is-disabled')) {

					// click count
					// first clicck has to init HTML
					// and other click just change the last es-select-dropdown
					if (clickInd == 1) {
						$(self).addClass('is-focus');
						var dropHtml = '<div class="es-select-dropdown es-popper '+(multi == true ? 'is-multiple' : '')+'" x-placement=""><div class="es-scrollbar"><div class="es-select-dropdown-wrap">'+
						'<ul class="es-scrollbar__view es-select-dropdown__list">';
						if (typeof selfs.option.data != "undefined") {
							for (var i = 0; i < selfs.option.data.length; i++) {
								dropHtml += '<li class="es-select-dropdown__item" val="'+selfs.option.data[i].value+'"><span>'+selfs.option.data[i].text+'</span></li>';
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
						if (multi == false) {
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
					if (multi == false) {
						for (var j = 0; j < $('.es-select-dropdown').last().find('li').length; j++) {
	                    	for (var i = 0; i < defaultVal.length; i++) {
	                            if ($('.es-select-dropdown').last().find('li').eq(j).attr('val') == defaultVal[i]) {
	                                $('.es-select-dropdown').last().find('li').eq(j).addClass('selected').siblings().removeClass('selected');
	                            }
	                        }
	                    }
					} else {
						$('.es-select-dropdown').last().find('li').removeClass('selected');
						for (var j = 0; j < $('.es-select-dropdown').last().find('li').length; j++) {
	                    	for (var i = 0; i < defaultVal.length; i++) {
	                            if ($('.es-select-dropdown').last().find('li').eq(j).attr('val') == defaultVal[i]) {
	                                $('.es-select-dropdown').last().find('li').eq(j).addClass('selected');
	                            }
	                        }
	                    }
					}
					$('.es-select-dropdown').last().off().on('click', 'li', function (e) {
						e.stopPropagation();
						var multi = typeof selfs.option.multi != 'undefined' ? selfs.option.multi : false;
						if (multi == true) {
							var val = $(this).find('span').text();
							var id = $(this).attr('val');
							var maxSelected = typeof selfs.option.maxSelected != 'undefined' ? selfs.option.maxSelected : 5;
							if (valArr.length < +maxSelected) {
								if (valArr.indexOf(id) == -1) {
									$(this).addClass('selected');
									$('#'+ind).find('.es-select__tags').append('<span><span class="es-tag es-tag--info es-tag--small" val="'+
										id+'">'+'<span class="es-select__tags-text">'+val+'</span>'+
										'<i class="es-tag__close iconfont icon-guanbi"></i></span></span>');
									valArr.push(id);
									// valueArr.push(val);
									// $('#'+selfs.option.obj).find('.es-select input').attr('data', valueArr);
									var heiBefore = $(self).height();
									var heiNow = $('#'+selfs.option.obj+' .es-select__tags').height();
									var topBefore = $('.es-select-dropdown').last().css('top');
									topBefore = topBefore != undefined ? topBefore.slice(0, topBefore.length - 2) : '';
									topBefore = topBefore.slice(0, topBefore.length - 2);
									if (heiNow > heiBefore) {
										$(self).find('input').css('height', heiNow+'px');
										if ($('.es-select-dropdown').last().attr('x-placement') == 'bottom-start') {
											$('.es-select-dropdown').last().css('top', (+topBefore + heiNow - heiBefore)+'px');
										}
									}
								} else {
									$('#'+ind).find('.es-select__tags .es-tag[val="'+id+'"]').parent().remove();
									$(this).removeClass('selected');
									valArr.splice(valArr.indexOf(id), 1);
									// valueArr.splice(valueArr.indexOf(val), 1);
									// $('#'+selfs.option.obj).find('.es-select input').attr('data', valueArr);
									var heiBefore = $('#'+selfs.option.obj).find('.es-select input').height()+2;
									var heiNow = $('#'+selfs.option.obj+' .es-select__tags').height();
									var topBefore = $('.es-select-dropdown').last().css('top');
									topBefore = topBefore != undefined ? topBefore.slice(0, topBefore.length - 2) : '';
									if (heiNow < heiBefore && $('#'+selfs.option.obj+' .es-select .es-tag').length > 0) {
										$('#'+selfs.option.obj).find('.es-select input').css('height', heiNow+'px');
										if ($('.es-select-dropdown').last().attr('x-placement') == 'bottom-start') {
											$('.es-select-dropdown').last().css('top', (+topBefore + heiNow - heiBefore)+'px');
										}
									}
								}
							}
						} else {
							$('.es-input').removeClass('is-focus');
							var val = $(this).find('span').text();
							var id = $(this).attr('val');
							$(this).addClass('selected').siblings().removeClass('selected');
							$(self).find('input').attr('val', id).val(val);
							defaultVal = [id];
							// valueArr = [val];
							// $('#'+selfs.option.obj).find('.es-select input').attr('data', valueArr);
							$('#'+selfs.option.obj+' .es-select input').attr('data', val);
							$(self).removeClass('is-focus');
							$('.es-select-dropdown').last().hide();
						}
						if (typeof selfs.option.callbackClick == 'function') {
							selfs.option.callbackClick(e);
						}
					});
					$('body').off().on('click', function () {
						$('.es-input').removeClass('is-focus');
						$('.es-select-dropdown').last().hide();
					});
				}
			});
			// select input event
			$('#'+selfs.option.obj+' .es-select').find('.es-input input').off().on('keyup', function (e) {
				if (typeof selfs.option.callbackSelect == 'function') {
					selfs.option.callbackSelect(e);
				}
			});
			$('#'+selfs.option.obj).off().on('click', '.es-tag__close', function (e) {
				// if (!$(this).parent().parent().parent().prev().hasClass('is-disabled')) {
				var id = $(this).parent().attr('val');
				var val = $(this).prev().text();
				$(this).parent().parent().remove();
				$('.es-select-dropdown').last().find('.es-select-dropdown__item[val="'+id+'"]').removeClass('selected');
				valArr.splice(valArr.indexOf(id), 1);
				// valueArr.splice(valueArr.indexOf(val), 1);
				// $('#'+selfs.option.obj).find('.es-select input').attr('data', valueArr);

				var heiBefore = $('#'+selfs.option.obj).find('.es-select input').height()+2;
				var heiNow = $('#'+selfs.option.obj+' .es-select__tags').height();
				var topBefore = $('.es-select-dropdown').last().css('top');
				topBefore = topBefore != undefined ? topBefore.slice(0, topBefore.length - 2) : '';
				if (heiNow < heiBefore && $('#'+selfs.option.obj+' .es-select .es-tag').length > 0) {
					$('#'+selfs.option.obj).find('.es-select input').css('height', heiNow+'px');
					if ($('.es-select-dropdown').last().attr('x-placement') == 'bottom-start') {
						$('.es-select-dropdown').last().css('top', (+topBefore + heiNow - heiBefore)+'px');
					}
				}
				// }
					
				e.stopPropagation();
			});

			// input event
			$('#'+selfs.option.obj+' input').off().on('keyup', function (e) {
				if (typeof selfs.option.callbackKeyup == 'function') {
					selfs.option.callbackKeyup(e);
				}
			}).on('blur', function () {
				if ($(this).parent().attr('reg') != '' && typeof $(this).parent().attr('reg') != 'undefined') {
					var str = $(this).parent().attr('reg');
					var match = typeof $(this).parent().attr('match') == 'undefined' ? 'g' : $(this).parent().attr('match');
					var reg = new RegExp(str, match);
					var val = $(this).val();
					var text = $(this).parent().attr('text');
					if (typeof selfs.option.validate == 'object' && selfs.option.validate.constructor == Object) {
						if (reg.test(val) == true) {
							if (typeof text != 'undefined') {
								$(this).parent().siblings('.es-warning').remove();							
							} else {
								$(this).css('border-color', '#d8dce5');
							}
						} else {
							if (typeof text != 'undefined') {
								$(this).parent().parent().append('<div class="es-warning">'+text+'</div>');
							} else {
								$(this).css('border-color', 'red');
							}
							
						}
					} else if (typeof selfs.option.validate == 'string' && selfs.option.validate.constructor == String) {
						if (reg.test(val) == true) {
							$(this).css('border-color', '#d8dce5');
						} else {
							$(this).css('border-color', 'red');
						}
					}
						
				}
			}).on('focus', function() {
				$('#'+selfs.option.obj).find('input').css('color', '#5a5e66');
			});

			// radio event
			$('#'+selfs.option.obj).find('.es-radio').off().on('click', function (e) {
				if (!$(this).hasClass('is-disabled')) {
					if (selfs.option.radioBorder == true) {
						$(this).addClass('is-checked').siblings().removeClass('is-checked');
						$(this).find('.es-radio__input').addClass('is-checked');
						$(this).siblings().find('.es-radio__input').removeClass('is-checked')
					} else {
						$(this).addClass('is-checked').siblings().removeClass('is-checked');
						$(this).find('.es-radio__input').addClass('is-checked');
						$(this).siblings().find('.es-radio__input').removeClass('is-checked')
					}
					selfs.option.value = $(this).attr('val');
				}					
				e.stopPropagation();
			});

			// checkbox event
			$('#'+selfs.option.obj).find('.es-checkbox').off().on('change', function (e) {
				if (!$(this).hasClass('is-disabled')) {
					if (!!$(this).hasClass('is-checked')) {
						$(this).removeClass('is-checked');
						$(this).find('.es-checkbox__input').removeClass('is-checked');
						selfs.option.value.splice(selfs.option.value.indexOf($(this).attr('val')), 1);
					} else {
						$(this).addClass('is-checked');
						$(this).find('.es-checkbox__input').addClass('is-checked');
						if (selfs.option.checkboxBorder == true) {
							$(this).addClass('is-bordered');
						}
						selfs.option.value.push($(this).attr('val'));
					}
					if (typeof selfs.option.callbackChange == 'function') {
						selfs.option.callbackChange(selfs.option.value);
					}
				}
			});

			// button event 
			$('#'+selfs.option.obj +' button#'+ind).off().on('click', function () {
				if (!$(this).hasClass('is-disabled')) {
					if (typeof selfs.option.callbackClick == 'function') {
						selfs.option.callbackClick(this);
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

			$('#'+selfs.option.obj +' .es-input').next().find('button').off().on('click', function () {
				if (!$(this).hasClass('is-disabled')) {
					if (typeof selfs.option.rightButtonClick == 'function') {
						selfs.option.rightButtonClick(this);
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

			// buttonGroup event
			$('#'+selfs.option.obj+' #'+itemInd+' button').each(function (index, item) {
				$(item).off().on('click', function (e) {
					e.stopPropagation()
					if (!$(this).hasClass('is-disabled')) {
						if (typeof selfs.option.data[index].callbackClick == 'function') {
							selfs.option.data[index].callbackClick(this);
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
			});
			
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


			if (typeof selfs.option.initCallback == 'function') {
				selfs.option.initCallback();
			}
		},
		_setSize: function (textType) {
			var self = this;
			var size = '';
			switch(self.option.size) {
				case 'medium':
					switch(textType) {
						case 'checkbox':
							size = 'es-checkbox-medium';
							break;
						case 'button':
							size = 'es-button-medium';
							break;
						case 'buttonGroup':
							size = 'es-button-medium';
							break;
						case 'input':
							size = 'es-input-medium';
							break;
						case 'select':
							size = 'es-input-medium';
							break;
					}
					break;
				case 'small': 
					switch(textType) {
						case 'checkbox':
							size = 'es-checkbox-small';
							break;
						case 'button':
							size = 'es-button-small';
							break;
						case 'buttonGroup':
							size = 'es-button-small';
							break;
						case 'input':
							size = 'es-input-small';
							break;
						case 'select':
							size = 'es-input-small';
							break;
					}
					break;
				case 'mini':
					switch(textType) {
						case 'checkbox':
							size = 'es-checkbox-mini';
							break;
						case 'button':
							size = 'es-button-mini';
							break;
						case 'buttonGroup':
							size = 'es-button-mini';
							break;
						case 'input':
							size = 'es-input-mini';
							break;
						case 'select':
							size = 'es-input-mini';
							break;
					}
					break;
			}
			return size;
		}
	};
	Esinput.prototype.constructor = Esinput;
	return Esinput;
})
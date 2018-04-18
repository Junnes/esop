(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'form'], factory) :
		(global.forms = factory($, Module, form));
})(this, function($, Module, form) {
	function forms(_option) {
		_option = $.extend({
			data: []
		}, _option);
		this.option = _option;
		this._init();
	}
	forms.prototype = {
		_init: function() {
			var self = this;
			var formInd = 'lm' + new Date().getTime();
			$('#' + self.option.obj).html('<form id="' + formInd + '" class="es-form"></form>');
			if (typeof self.option.title != 'undefined' && self.option.title != '') {
				var titleAlign = typeof self.option.titleAlign != 'undefined' && self.option.titleAlign != '' ? self.option.titleAlign : 'center';
				$('#' + self.option.obj).prepend('<h5 class="es-form-title" style="text-align: ' + titleAlign + ';">' + self.option.title + '</h5>');
			}
			var cols = 0;
			for (var i = 0; i < self.option.data.length; i++) {
				if (self.option.data[i].length > cols) {
					cols = self.option.data[i].length;
				}
			}
			var widPar = $('#' + self.option.obj).width();
			var widItem = (1 / cols * 100).toFixed(6) + '%';
			var labelWidth = typeof self.option.labelWidth != 'undefined' ? self.option.labelWidth + 'px' : '';
			var textAlign = typeof self.option.labelPosition != 'undefined' ? self.option.labelPosition : 'right';
			var index = 0;
			var maxCols = 0;
			for (var i = 0; i < self.option.data.length; i++) {
				for (var j = 0; j < self.option.data[i].length; j++) {
					if (typeof self.option.data[i][j].cols != 'undefined' && self.option.data[i][j].cols != '') {
						if (maxCols < self.option.data[i][j].cols) {
							maxCols = self.option.data[i][j].cols;
						}
					}
				}
			}
			for (var i = 0; i < self.option.data.length; i++) {
				var itemInd = 'l' + new Date().getTime() + i.toString();
				var indexOther = 0;
				$('#' + formInd).append('<div class="es-form-item-con ' + itemInd + ' clearfix"></div>');
				for (var j = 0; j < self.option.data[i].length; j++) {
					// var ind = 'm' + new Date().getTime() + j.toString();
					var ind = itemInd + j.toString() + 'm';
					var wid = '';
					if (typeof self.option.data[i][j].labelWidth != 'undefined') {
						wid = self.option.data[i][j].labelWidth + 'px';
					} else {
						wid = labelWidth;
					}
					if (self.option.inline == true) {
						if (typeof self.option.data[i][j].cols != 'undefined' && self.option.data[i][j].cols != '' && self.option.data[i][j].cols < cols) {
							widItem = (+self.option.data[i][j].cols / cols * 100).toFixed(6) + '%';
						}
					} else {
						widItem = '100%';
					}
						
					var temp = '';
					if (self.option.data[i][j].textType != 'button' && self.option.data[i][j].textType != 'buttonGroup' && self.option.data[i][j].textType != 'formsInner') {
						var required = self.option.data[i][j].required == true ? 'is-required' : '';
						temp = '<div class="es-form-item clearfix ' + self.option.data[i][j].obj + ' '+required+'" type="' + self.option.data[i][j].textType + '" style="width: ' + widItem + '; float: left;">' +
							'<label class="es-form-item-label" style="width:' + wid + ';">' + (typeof self.option.data[i][j].label != 'undefined' ? self.option.data[i][j].label : '') + '</label>' +
							'<div class="es-form-item-content" id="' + self.option.data[i][j].obj + '" style="margin-left: ' + wid + ';">' +
							'</div></div>';
					} else if (self.option.data[i][j].textType == 'buttonGroup') {
						var opt = self.option.data[i][j];
						var align = typeof opt.btnGroupAlign != 'undefined' && opt.btnGroupAlign != '' ? 'es-btn-' + opt.btnGroupAlign : 'es-btn-right';
						var size = typeof opt.size != 'undefined' && opt.size != '' ? 'es-button-' + opt.size : '';
						temp = '<div class="es-form-item es-form-item_button clearfix ' + self.option.data[i][j].obj + '" type="'+self.option.data[i][j].textType+'" id="' + self.option.data[i][j].obj + '">';
						temp += '<div class="es-button-group ' + align + '">';
						for (var m = 0; m < opt.data.length; m++) {
							var butDisabled = typeof opt.data[m].disabled != 'undefined' ? opt.data[m].disabled == true ? 'is-disabled' : false : '';
							var text = typeof opt.data[m].text != 'undefined' ? opt.data[m].text != '' ? opt.data[m].text : '提交' : '提交';
							var plain = typeof opt.data[m].plain != 'undefined' && opt.data[m].plain != '' ? opt.data[m].plain == true ? 'is-plain' : '' : '';
							var buttonType = typeof opt.data[m].buttonType != 'undefined' && opt.data[m].buttonType != '' ? 'es-button-' + opt.data[m].buttonType : '';
							temp += '<button type="button" class="es-button ' + buttonType + ' ' + size + ' ' + plain + ' ' + butDisabled + '" val="' + opt.data[m].id + '" row="' + i + '" col="' + j + '" index="' + m + '">';
							if (typeof opt.data[m].icon != 'undefined' && opt.icon != '') {
								temp += '<i class="icon-' + opt.data[m].icon + '"></i>';
							}
							temp += '<span>' + text + '</span></button>';
						}
						temp += '</div></div>';
					} else if (self.option.data[i][j].textType == 'formsInner') {
						temp += '<div id="'+self.option.data[i][j].obj+'" class="es-forms-inner es-form-item ' + self.option.data[i][j].obj + '" type="'+self.option.data[i][j].textType+'"></div>';
						self.option.data[i][j].cols = self.option.cols;
						self.option.data[i][j].labelPosition = self.option.labelPosition;
						self.option.data[i][j].labelWidth = self.option.labelWidth;
					} else if (self.option.data[i][j].textType == 'button') {
						// es-form-item-btn
						temp += '<div class="es-form-item clearfix ' + self.option.data[i][j].obj + '" type="'+self.option.data[i][j].textType+'" id="' + self.option.data[i][j].obj + '" style="width: ' + widItem + '; float: left;"></div>';
					}
					$('.' + itemInd).append(temp);
					if (self.option.data[i][j].textType == 'input') {
						var required = self.option.data[i][j].required == true ? 'is-required' : '';
						$('#' + self.option.obj + ' .' + ind).addClass(required);
					}
					var opt = self.option.data[i][j];
					if (opt.textType != 'blank' && opt.textType != 'buttonGroup') {
						new Module(opt);
					}
					switch (textAlign) {
						case 'left':
							$('.' + ind + ' .es-form-item-label').css({
								"text-align": self.option.labelPosition
							});
							break;
						case "right":
							$('.' + ind + ' .es-form-item-label').css({
								"text-align": self.option.labelPosition
							});
							break;
						case 'top':
							if (self.option.textType == 'radio' || self.option.textType == 'checkbox') {
								$('.' + ind + ' .es-form-item-label').css('float', 'none');
								$('.' + ind + ' .es-form-item-content').attr("style", "");
							} else {
								$('.' + ind + ' .es-form-item-label').attr("style", "");
								$('.' + ind + ' .es-form-item-content').attr("style", "");
							}
							break;
					}
				}
			}
			$('#' + self.option.obj + ' .es-form-item_button button').each(function(index, item) {
				$(item).off().on('click', function(e) {
					e.stopPropagation();
					var row = $(item).attr('row'),
						col = $(item).attr('col'),
						index = $(item).attr('index');
					if (typeof self.option.data[row][col].data[index].callbackClick == 'function') {
						self.option.data[row][col].data[index].callbackClick(self, this);
					}
				}).on('mousedown', function(e) {
					e.stopPropagation();
					var buttonClass = $(this).attr('class').split(' ')[1] + '-h';
					$(this).removeClass(buttonClass);

				}).on('mouseup', function(e) {
					e.stopPropagation();
					var buttonClass = $(this).attr('class').split(' ')[1] + '-h';
					$(this).addClass(buttonClass);

				}).on('mouseenter', function(e) {
					e.stopPropagation();
					var buttonClass = $(this).attr('class').split(' ')[1] + '-h';
					$(this).addClass(buttonClass);
				}).on('mouseleave', function(e) {
					e.stopPropagation();
					var buttonClass = $(this).attr('class').split(' ')[1] + '-h';
					$(this).removeClass(buttonClass);
				});
			});

			if (typeof self.option.initCallback == 'function') {
				self.option.initCallback(self);
			}
		},
		validate: function() {
			var self = this;
			var validate = 0;
			var allThrough = false;
			$('#' + self.option.obj + ' .es-form-item[type="input"]').each(function(index, item) {
				var str = $(item).find('.es-input').attr('reg');
				var match = typeof $(item).find('.es-input').attr('match') == 'undefined' ? 'g' : $(item).find('.es-input').attr('match');
				var reg = new RegExp(str, match);
				var val = $(item).find('input').val();
				var text = $(item).find('.es-input').attr('text');
				if (typeof text != 'undefined') {
					if (reg.test(val) == true) {
						$(item).find('.es-warning').remove();
						validate += 1;
					} else {
						$(item).append('<div class="es-warning">' + text + '</div>');
						validate += 0;
					}
				} else {
					if (reg.test(val) == true) {
						$(item).find('input').css('border-color', '#d8dce5');
						validate += 1;
					} else {
						$(item).find('input').css('border-color', 'red');
						validate += 0;
					}
				}
			});
			if (validate == $('#' + self.option.obj + ' .es-form-item[type="input"]').length) {
				allThrough = true;
			} else {
				allThrough = false;
			}
			return allThrough;
		},
		jsonData: function() {
			var self = this;
			var formData = {};
			$('#' + self.option.obj + ' .es-form-item-con >.es-form-item').each(function(index, item) {
				switch ($(item).attr('type')) {
					case 'input':
						formData[$(item).find('.es-form-item-content').attr('id')] = $(item).find('input').val();
						break;
					case 'select':
						if ($(item).find('.es-select').attr('multi') == 'false') {
							formData[$(item).find('.es-form-item-content').attr('id')] = $(item).find('input').attr('val');
						} else {
							var valArr = [];
							for (var i = 0; i < $(item).find('.es-select__tags-text').length; i++) {
								valArr.push($(item).find('.es-tag').eq(i).attr('val'));
							}
							formData[$(item).find('.es-form-item-content').attr('id')] = valArr;
						}
						break;
					case 'radio':
						formData[$(item).find('.es-form-item-content').attr('id')] = $(item).find('.es-radio.is-checked').attr('val');
						break;
					case 'checkbox':
						var valArr = [];
						for (var i = 0; i < $(item).find('.es-checkbox.is-checked').length; i++) {
							valArr.push($(item).find('.es-checkbox.is-checked').eq(i).attr('val'));
						}
						formData[$(item).find('.es-form-item-content').attr('id')] = valArr;
						break;
					case 'date':
						formData[$(item).find('.es-form-item-content').attr('id')] = $(item).find('input').val();
						break;
					case 'formsInner':
						var formInnerData = {};
						var itemId = $(item).attr('id');
						$('#'+itemId+' .es-form-item').each(function (index, item0) {
							switch($(item0).attr('type')) {
								case 'input':
									formInnerData[$(item0).find('.es-input-only').attr('id')] = $(item0).find('.es-input-only input').val();
									break;
								case 'textarea':
									formInnerData[$(item0).find('.es-textarea').attr('id')] = $(item0).find('.es-textarea textarea').val();
									break;
								case 'select':
									if ($(item0).find('.es-select').attr('multi') == 'false') {
										formInnerData[$(item0).find('.es-select').attr('id')] = $(item0).find('input').attr('val');
									} else {
										var valArr = [];
										for (var i = 0; i < $(item0).find('.es-select__tags-text').length; i++) {
											valArr.push($(item0).find('.es-tag').eq(i).attr('val'));
										}
										formInnerData[$(item0).find('.es-select').attr('id')] = valArr;
									}
									break;
								case 'radio':
									formInnerData[$(item0).find('.es-form-item-content').attr('id')] = $(item0).find('.es-radio.is-checked').attr('val') == undefined ? '' : $(item0).find('.es-radio.is-checked').attr('val');
									break;
								case 'checkbox':
									var valArr = [];
									for (var i = 0; i < $(item0).find('.es-checkbox.is-checked').length; i++) {
										valArr.push($(item0).find('.es-checkbox.is-checked').eq(i).attr('val'));
									}
									formInnerData[$(item0).find('.es-form-item-content').attr('id')] = valArr;
									break;
								case 'date':
									formInnerData[$(item0).find('.es-form-item-content input').attr('id')] = $(item0).find('input').val();
									break;
							}
						});
						formData[itemId] = formInnerData;
						break;
				}
			});
			return formData;
		},
		setData: function (jsonData) {
			var self = this;
			for (var key in jsonData) {
				var textType = $('.'+key).attr('type');
				var opt;
				for (var i = 0; i < self.option.data.length; i++) {
					for (var j = 0; j < self.option.data[i].length; j++) {
						if (self.option.data[i][j].obj == key) {
							opt = self.option.data[i][j];
						}
					}
				}
				$('#'+key).empty();
				switch (textType) {
					case 'input':
						opt.value = jsonData[key];
						new Module(opt);
						break;
					case 'select':
						opt.defaultVal = [jsonData[key]];
						new Module(opt);
						break;
					case 'radio':
						opt.value = jsonData[key];
						new Module(opt);
						break;
					case 'checkbox':
						opt.value = jsonData[key];
						new Module(opt);
						break;
					case 'date':
						opt.value = jsonData[key];
						new Module(opt);
					case 'formsInner':
						for (var key0 in jsonData[key]) {
							for (var i = 0; i < opt.data.length; i++) {
								if (opt.data[i].obj == key0) {
									switch(opt.data[i].textType) {
										case 'input':
											opt.data[i].value = jsonData[key][key0];
											break;
										case 'textarea':
											opt.data[i].value = jsonData[key][key0];
											break;
										case 'select':
											opt.data[i].defaultVal = jsonData[key][key0];
											break;
										case 'radio':
											opt.data[i].value = jsonData[key][key0];
											break;
										case 'checkbox':
											opt.data[i].value = jsonData[key][key0];
											break;
										case 'date':
											opt.data[i].value = jsonData[key][key0];
											break;
									}
								}
							}
						}
						new Module(opt);
						break;
				}
			};
		}
	};
	forms.prototype.constructor = forms;
	return forms;
})
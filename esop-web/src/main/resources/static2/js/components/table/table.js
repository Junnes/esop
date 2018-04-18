(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'form', 'TurnPage', 'commonData'], factory) :
		(global.table = factory($, Module, form, TurnPage, commonData));
})(this, function($, Module, form, TurnPage, commonData) {
	function table(_option) {
		var self = this;
		_option = $.extend({
			data: [],
			thHead: [],
			width: []
		}, _option);
		self.checkedRow = [];
		if (_option.initDataUrl != '' && typeof _option.initDataUrl != 'undefined') {
			commonData.postData({
				serviceUrl: _option.initDataUrl,
				serviceData: $.extend({
					pageSize: _option.pageOpt.pageSize,
					page: (+_option.pageOpt.nowPage - 1)
				}, _option.initDataParam),
				callback: function (result) {
					_option.data = result.content;
					_option.pageOpt.maxNum = result.totalPages;
					self.option = _option;
					self._init();
				}
			});
		} else {
			self.option = _option;
			self._init();
		}
	}
	table.prototype = {
		_init: function() {
			var self0 = this;
			var checkboxConfig = typeof self0.option.checkboxConfig != 'undefined' ? self0.option.checkboxConfig : false;
			var buttonConfig = typeof self0.option.buttonConfig != 'undefined' ? self0.option.buttonConfig : false;
			var indexConfig = typeof self0.option.indexConfig != 'undefined' ? self0.option.indexConfig : false;
			var tableBorder = self0.option.tableBorder == true ? 'es-table-border' : '';
			var ind = 'l' + new Date().getTime();
			var widArr = [];
			var div = '';
			var tableShadow = typeof self0.option.tableShadow != 'undefined' && self0.option.tableShadow != '' ? 'es-table-shadow' : '';
			if (typeof self0.option.title != 'undefined' && self0.option.title != '') {
				var titleAlign = typeof self0.option.titleAlign != 'undefined' && self0.option.titleAlign != '' ? self0.option.titleAlign : 'center';
				div += '<h5 class="es-form-title" style="text-align: ' + titleAlign + ';">' + self0.option.title + '</h5>';
			}
			if (self0.option.headButton == true) {
				var align = typeof self0.option.headButtonAlign != 'undefined' && self0.option.headButtonAlign != '' ? 'es-btn-'+self0.option.headButtonAlign : 'es-btn-right';
				div += '<div class="es-head-button '+align+'">';
				if (self0.option.headButtonData != [] || typeof self0.option.headButtonData != 'undefined') {
					for (var m = 0; m < self0.option.headButtonData.length; m++) {
						var text = typeof self0.option.headButtonData[m].type != 'undefined' && self0.option.headButtonData[m].type != '' ? self0.option.headButtonData[m].type : '按钮';
						var size = typeof self0.option.headButtonData[m].size != 'undefined' ? 'es-button-' + self0.option.headButtonData[m].size : '';
						var buttonType = typeof self0.option.headButtonData[m].buttonType != 'undefined' ? 'es-button-' + self0.option.headButtonData[m].buttonType : '';
						div += '<button type="button" class="es-button ' + buttonType + ' ' + size + '" index="' + m + '"><span>' + text + '</span></button>';
					}
				}
				div += '</div>';
			}
			var tableSize = typeof self0.option.size != 'undefined' && self0.option.size != '' ? 'es-table-'+self0.option.size : '';
			div += '<div id="' + ind + '" class="es-table es-table--fit es-table--enable-row-hover es-table--enable-row-transition '+tableSize+' '+tableShadow+' '+tableBorder+'" style="width: 100%;">' +
				'<div class="hidden-columns">';
			var headLen = self0.option.thHead.length;
			if (indexConfig == true) {
				if (checkboxConfig == false) {
					headLen = headLen + 1;
					var wid0 = typeof self0.option.indexColWidth != 'undefined' ? self0.option.indexColWidth : '';
					widArr.push(wid0);
				} else {
					headLen = headLen + 2;
					var wid01 = typeof self0.option.indexColWidth != 'undefined' ? self0.option.indexColWidth : '';
					widArr.push(wid01);
					var wid11 = typeof self0.option.checkboxColWidth != 'undefined' ? self0.option.checkboxColWidth : '';
					widArr.push(wid11);
				}
			} else {
				if (checkboxConfig == true) {
					headLen = headLen + 1;
					var wid1 = typeof self0.option.checkboxColWidth != 'undefined' ? self0.option.checkboxColWidth : '';
					widArr.push(wid1);
				}
			}
			for (var i = 0; i < self0.option.thHead.length; i++) {
				var wid2 = typeof self0.option.thHead[i].width != 'undefined' ? self0.option.thHead[i].width : '';
				widArr.push(wid2);
			}
			if (buttonConfig == true) {
				headLen = headLen + 1;
				var wid3 = typeof self0.option.buttonColWidth != 'undefined' ? self0.option.buttonColWidth : '';
				widArr.push(wid3);
			}
			for (var i = 0; i < headLen; i++) {
				div += '<div></div>';
			}
			var widPar = $('#' + self0.option.obj).width();
			var sum = 0;
			var remain = 0;
			for (var i = 0; i < headLen; i++) {
				if (+widArr[i] == 0) {
					remain += 1;
				}
				sum += +widArr[i];
			}
			var widAverage = ((widPar - sum) / remain).toFixed();
			for (var i = 0; i < headLen; i++) {
				if (+widArr[i] == 0) {
					widArr[i] = widAverage;
				}
			}
			div += '</div>' +
				'<div class="es-table__header-wrapper">' +
				'<table cellspacing="0" cellpadding="0" border="0" class="es-table__header">' +
				'<colgroup>';
			for (var i = 0; i < headLen; i++) {
				var wid = widArr[i] == '' ? widAverage : widArr[i];
				div += '<col name="es-table_1_column_1' + i + '" width="' + wid + '">';
				widArr.push(wid);
			}
			var headColor = self0.option.headHighlight == true ? 'es-tr-highlight' : '';
			div += '<col name="gutter" width="">' +
				'</colgroup>' +
				'<thead class="has-gutter">' +
				'<tr class="'+headColor+'">';
			if (indexConfig == true) {
				var text = typeof self0.option.indexConfigText != 'undefined' ? self0.option.indexConfigText : '';
				if (checkboxConfig == false) {
					div += '<th colspan=" class="es-table_1_column_m is-leaf">' +
						'<div class="cell">' + text+
						'</div></th>';
				} else {
					var sty = '';
					if (self0.option.checkboxIcon == 'circle') {
						sty = 'style="border-radius: 7px;"';
					}
					div += '<th class="es-table_1_column_m is-leaf">' +
						'<div class="cell">' + '<label role="checkbox" aria-checked="" class="es-checkbox">' +
						'<span aria-checked="mixed" class="es-checkbox__input">' +
						'<span class="es-checkbox__inner" '+sty+'></span>' +
						'<input type="checkbox" class="es-checkbox__original es-select-all" value="">' +
						'</span>' +
						'</label></div></th>';
					div += '<th colspan=" class="es-table_1_column_m is-leaf">' +
						'<div class="cell">' + text +
						'</div></th>';
				}
			} else {
				if (checkboxConfig == true) {
					var sty = '';
					if (self0.option.checkboxIcon == 'circle') {
						sty = 'style="border-radius: 7px;"';
					}
					div += '<th class="es-table_1_column_m is-leaf">' +
						'<div class="cell">' + '<label role="checkbox" aria-checked="" class="es-checkbox">' +
						'<span aria-checked="mixed" class="es-checkbox__input">' +
						'<span class="es-checkbox__inner" '+sty+'></span>' +
						'<input type="checkbox" class="es-checkbox__original es-select-all" value="">' +
						'</span>' +
						'</label></div></th>';
				}
			}
			for (var i = 0; i < self0.option.thHead.length; i++) {
				var opt = self0.option.thHead[i];
				var colspan = typeof opt.colspan != 'undefined' ? opt.colspan : '1';
				var rowspan = typeof opt.rowspan != 'undefined' ? opt.rowspan : '1';
				div += '<th colspan="' + colspan + '" rowspan="' + rowspan + '" colId="'+self0.option.thHead[i].colId+'" class="es-table_1_column_m' + i + ' is-leaf">' +
					'<div class="cell">' + opt.name + '</div></th>';
			}
			if (buttonConfig == true) {
				div += '<th class="es-table_1_column_m is-leaf">' +
					'<div class="cell">' + (typeof self0.option.buttonHeadText != 'undefined' ? self0.option.buttonHeadText : '操作');
					'</div></th>';
			}
			div += '<th class="gutter" style="width: 0px;"></th>' +
				'</tr>' +
				'</thead>' +
				'</table>' +
				'</div>' +
				'<div class="es-table__body-wrapper is-scroll-left">' +
				'<table cellspacing="0" cellpadding="0" border="0" class="es-table__body">' +
				'<colgroup>';
			for (var i = 0; i < headLen; i++) {
				var wid0 = typeof widArr[i] != 'undefined' ? widArr[i] : widAverage;
				div += '<col name="es-table_1_column_1' + i + '" width="' + wid0 + '">';
			}
			div += '</colgroup>' +
				'<tbody>';
			var bodyHtml = self0._setTableBody(indexConfig, checkboxConfig, buttonConfig);
			div += bodyHtml;
			
			div += '</tbody>' +
				'</table>' +
				'</div>' +
				'<div class="es-table__column-resize-proxy" style="display: none;"></div>' +
				'<div class="resize-triggers">' +
				'<div class="expand-trigger">' +
				'<div></div>' +
				'</div>' +
				'<div class="contract-trigger"></div>' +
				'</div>' +
				'</div>';
			$('#' + self0.option.obj).html(div);

			self0._setTrHighlight();
			self0._setTableText(indexConfig, checkboxConfig);

			// pagination
			if (self0.option.pagination == true) {
				$('#'+self0.option.obj).css({'padding-bottom': '50px', 'position': 'relative'});
				$('#' + self0.option.obj).append('<div class="page">' +
					'<div class="page-number"></div>' +
					'<div class="page-current">当前第<input type="text" />页</div>' +
					'<div class="page-turn">跳转</div>' +
					'</div>');
				var opt = {
					maxNum: self0.option.pageOpt.maxNum,
					length: self0.option.pageOpt.length,
					nowPage: self0.option.pageOpt.nowPage,
					obj: self0.option.obj,
					str: self0.option.pageOpt.str,
					option: self0.option
				};
				var turnpage = new TurnPage(opt);
				turnpage.loadPage = function(page) {
					var self = this;
					self0.option.pageOpt.nowPage = page;
					if (self0.option.initDataUrl != '' && typeof self0.option.initDataUrl != 'undefined') {
						commonData.postData({
							serviceUrl: self0.option.initDataUrl,
							serviceData: $.extend({
								pageSize: self0.option.pageOpt.pageSize,
								page: +page - 1
							}, self0.option.initDataParam),
							callback: function (result) {
								self0.option.data = result.content;
								$('#'+self0.option.obj+' tbody').html(self0._setTableBody(indexConfig, checkboxConfig, buttonConfig));
								self0._setTableText(indexConfig, checkboxConfig);
								self0._setTrHighlight();
								self0._setEvent();
							}
						});
					} else {
						$('#'+self0.option.obj+' tbody').html(self0._setTableBody(indexConfig, checkboxConfig, buttonConfig));
						self0._setTableText(indexConfig, checkboxConfig);
						self0._setTrHighlight();
						self0._setEvent();
					}
					return self;
				}
				turnpage.init();
				if (typeof self0.option.pageAlign != 'undefined' && self0.option.pageAlign != '') {
					$('#'+self0.option.obj+' .page').css('text-align', self0.option.pageAlign);
				}
			}

			self0._setEvent();
			

			if (typeof self0.option.initCallback == 'function') {
				self0.option.initCallback();
			}
		},
		_setTrHighlight: function () {
			var self = this;
			if (self.option.trHighlight == 'odd') {
				$('#'+self.option.obj+' tbody tr:odd').css('background', '#d8e4e6');
				$('#'+self.option.obj+' tbody tr:even').css('background', '#fff');
			} else if (self.option.trHighlight == 'even') {
				$('#'+self.option.obj+' tbody tr:even').css('background', '#d8e4e6');
				$('#'+self.option.obj+' tbody tr:odd').css('background', '#fff');
			}
		},
		_setTableBody: function (indexConfig, checkboxConfig, buttonConfig) {
			var self = this;
			var div = '';
			for (var i = 0; i < self.option.data.length; i++) {
				div += '<tr class="es-table__row " val="">';

				if (indexConfig == true) {
					if (checkboxConfig == false) {
						div += '<td class="es-table_1_column_m">' +
							'<div class="cell">' + (i + 1) +
							'</div></td>';
					} else {
						var sty = '';
						if (self.option.checkboxIcon == 'circle') {
							sty = 'style="border-radius: 7px;"';
						}
						div += '<td class="es-table_1_column_m" index="' + 0 + '">' +
							'<div class="cell">' + '<label role="checkbox" aria-checked="" class="es-checkbox">' +
							'<span aria-checked="mixed" class="es-checkbox__input">' +
							'<span class="es-checkbox__inner" '+sty+'></span>' +
							'<input type="checkbox" class="es-checkbox__original es-select-all" value="">' +
							'</span>' +
							'</label></div></td>';
						div += '<td class="es-table_1_column_m">' +
							'<div class="cell">' + (i + 1) +
							'</div></td>';
					}
				} else {
					if (checkboxConfig == true) {
						var sty = '';
						if (self.option.checkboxIcon == 'circle') {
							sty = 'style="border-radius: 7px;"';
						}
						div += '<td class="es-table_1_column_m" index="' + 0 + '">' +
							'<div class="cell">' + '<label role="checkbox" aria-checked="" class="es-checkbox">' +
							'<span aria-checked="mixed" class="es-checkbox__input">' +
							'<span class="es-checkbox__inner" '+sty+'></span>' +
							'<input type="checkbox" class="es-checkbox__original es-select-all" value="">' +
							'</span>' +
							'</label></div></td>';
					}
				}
				for (var j = 0; j < self.option.data[i].length; j++) {
					var colorText = '';
					if (self.option.alarm == true) {
						colorText = self.option.data[i][j].alarm == true ? 'style="color: red;"' : '';
					}
					if (self.option.thHead.length > j) {
						div += '<td class="es-table_1_column_m' + j + '" '+colorText+' rowId="' + self.option.data[i][j].rowId + '" colId="'+self.option.data[i][j].colId+'">' +
							'<div class="cell"></div></td>';
					}
				}
				var len = self.option.data[i].length;
				var remain = self.option.thHead.length - j;
				for (var s = 0; s < remain; s++) {
					div += '<td class="es-table_1_column_m' + (len+s+1) + '" '+colorText+' rowId="' + self.option.data[i][0].rowId + '" colId="'+self.option.thHead[len+s].colId+'">' +
						'<div class="cell"></div></td>';
				}
				if (buttonConfig == true) {
					div += '<td class="es-table_1_column_b">' +
						'<div class="cell">'
					for (var m = 0; m < self.option.buttonCol.length; m++) {
						var text = typeof self.option.buttonCol[m].type != 'undefined' && self.option.buttonCol[m].type != '' ? self.option.buttonCol[m].type : '按钮';
						var size = typeof self.option.buttonCol[m].size != 'undefined' ? 'es-button-' + self.option.buttonCol[m].size : '';
						var buttonType = typeof self.option.buttonCol[m].buttonType != 'undefined' ? 'es-button-' + self.option.buttonCol[m].buttonType : '';
						div += '<button type="button" class="es-button ' + buttonType + ' ' + size + '" index="' + m + '" row="' + i + '"><span>' + text + '</span></button>';
					}
					div += '</div></td>';
				}
				div += '</tr>';
			}
			return div;
		},
		_setTableText: function (indexConfig, checkboxConfig) {
			var self = this;
			for (var i = 0; i < self.option.data.length; i++) {
				for (var j = 0; j < self.option.data[i].length; j++) {
					if (j < self.option.thHead.length) {
						for (var k = 0; k < self.option.thHead.length; k++) {
							if (self.option.data[i][j].colId == self.option.thHead[k].colId) {
								if (indexConfig == true) {
									if (checkboxConfig == true) {
										$('#'+self.option.obj+' tbody tr:eq('+i+') td:eq('+(k+2)+') .cell').text(self.option.data[i][j].value);
									} else {
										$('#'+self.option.obj+' tr:eq('+i+') td:eq('+(k+1)+') .cell').text(self.option.data[i][j].value);
									}
								} else {
									if (checkboxConfig == true) {
										$('#'+self.option.obj+' tbody tr:eq('+i+') td:eq('+(k+1)+') .cell').text(self.option.data[i][j].value);
									} else {
										$('#'+self.option.obj+' tbody tr:eq('+i+') td:eq('+k+') .cell').text(self.option.data[i][j].value);
									}
								}
							}
						}
					}
				}
			}
		},
		_setEvent: function () {
			var self = this;
			// button event
			$('#' + self.option.obj + ' tbody button').each(function(index, item) {
				var row = $(item).attr('row');
				// var col = $(item).attr('col');
				var index = $(item).attr('index');
				$(item).off().on('click', function(e) {
					if (typeof self.option.buttonCol[index].callbackClick == 'function') {
						var id = $(this).parent().parent().prev().eq(0).attr('rowId');
						self.option.buttonCol[index].callbackClick(self, id, this);
					}
					e.stopPropagation();
					return false;
				});
			});
			var checkboxArr = [];
			// tr event
			$('#' + self.option.obj + ' tbody tr').each(function(index, item) {
				$(item).off('click').on('click', function(e) {
					var target = e.target;
					if (target.tagName == 'SPAN') {
						if (self.option.indexConfig == true) {
							var id = $(target).parent().parent().parent().parent().nextAll().eq(1).attr('rowId');
						} else {
							var id = $(target).parent().parent().parent().parent().next().attr('rowId');
						}
						if (!!$(target).parent().hasClass('is-checked')) {
							$(target).parent().removeClass('is-checked');
							$(target).parent().parent().removeClass('is-checked');
							checkboxArr.splice(checkboxArr.indexOf(id), 1);
						} else {
							$(target).parent().addClass('is-checked');
							$(target).parent().parent().addClass('is-checked');
							if (checkboxArr.indexOf(id) == -1) {
								checkboxArr.push(id);
							}
						}
						if (self.checkedRow.length >= 1) {
							for (var i = 0; i < self.checkedRow.length; i++) {
								if (id == self.checkedRow[i].rowId) {
									self.checkedRow.splice(i, 1);
								} else {
									var row = self._getRowData($(target).parent().parent().parent().parent().parent(), id);
									self.checkedRow.push(row);
								}
							}
						} else {
							var row = self._getRowData($(target).parent().parent().parent().parent().parent(), id);
							self.checkedRow.push(row);
						}
					} else {
						$(this).addClass('current-row').siblings().removeClass('current-row');
						if (self.option.indexConfig == true) {
							if (self.option.checkboxConfig == true) {
								var rowId = $(this).find('td:eq(2)').attr('rowId');
							} else {
								var rowId = $(this).find('td:eq(1)').attr('rowId');
							}
						} else {
							if (self.checkboxConfig == true) {
								var rowId = $(this).find('td:eq(1)').attr('rowId');
							} else {
								var rowId = $(this).find('td:eq(0)').attr('rowId');
							}
						}
						var rowData = self._getRowData(this, rowId);
						if (typeof self.option.callbackRowClick == 'function') {
							self.option.callbackRowClick(rowId, rowData);
						}
						if (!!$(this).find('td .es-checkbox').hasClass('is-checked')) {
							$(this).find('td .es-checkbox').removeClass('is-checked');
							$(this).find('td .es-checkbox__input').removeClass('is-checked');
						} else {
							$(this).find('td .es-checkbox').addClass('is-checked');
							$(this).find('td .es-checkbox__input').addClass('is-checked');
						}
						var checkLen = self.checkedRow.length;
						if (self.checkedRow.length >= 1) {
							for (var i = 0; i < checkLen; i++) {
								if (rowId == self.checkedRow[i].rowId) {
									self.checkedRow.splice(i, 1);
								} else {
									self.checkedRow.push(rowData);
								}
							}
						} else {
							self.checkedRow.push(rowData);
						}
					}
					e.stopPropagation();
					return false;
				});
			});
			$('#' + self.option.obj + ' thead .es-checkbox__inner').off('click').on('click', function(e) {
				var index = $(this).parent().parent().parent().parent().attr('index');
				var classCol = $(this).parent().parent().parent().parent().attr('class').split(' ')[0];
				if (!!$(this).parent().hasClass('is-checked')) {
					$('#' + self.option.obj).find('.' + classCol).each(function(index, item) {
						$(item).find('.es-checkbox').removeClass('is-checked');
						$(item).find('.es-checkbox__input').removeClass('is-checked');
					});
					checkboxArr = [];
				} else {
					$('#' + self.option.obj).find('.' + classCol).each(function(index, item) {
						$(item).find('.es-checkbox').addClass('is-checked');
						$(item).find('.es-checkbox__input').addClass('is-checked');
						if (item.nodeName == 'TD') {
							checkboxArr.push($(item).next().attr('rowId'));
						}
					});
				}

				e.stopPropagation();
				return false;
			});
			$('#'+self.option.obj+' .es-head-button button').each(function (index, item) {
				$(item).off('click').on('click', function (e) {
					e.stopPropagation();
					if (typeof self.option.headButtonData[index].callbackClick == 'function') {
						self.option.headButtonData[index].callbackClick(self);
						self._setTrHighlight();
					}
				});
			});
		},
		_getRowData: function (item, rowId) {
			var self = this;
			var rowJson = {
				rowId: rowId
			};
			for (var i = 0; i < $(item).find('td').length; i++) {
				if ($(item).find('td').eq(i).attr('colId') != undefined) {
					rowJson[$(item).find('td').eq(i).attr('colId')] = $(item).find('td').eq(i).find('.cell').text();
				}
			}
			return rowJson;
		},
		_delMultiRow: function () {
			var self = this;
			for (var i = 0; i < self.checkedRow.length; i++) {
				for (var j = 0; j < $('#'+self.option.obj+' tbody tr').length; j++) {
					if (self.option.indexConfig == true) {
						if (self.option.checkboxConfig == true) {
							if ($('#'+self.option.obj+' tbody tr').eq(j).find('td').eq(2).attr('rowid') == self.checkedRow[i].rowId) {
								$('#'+self.option.obj+' tbody tr').eq(j).remove();
							}
						} else {
							if ($('#'+self.option.obj+' tbody tr').eq(j).find('td').eq(1).attr('rowid') == self.checkedRow[i].rowId) {
								$('#'+self.option.obj+' tbody tr').eq(j).remove();
							}
						}
					} else {
						if (self.option.checkboxConfig == true) {
							if ($('#'+self.option.obj+' tbody tr').eq(j).find('td').eq(1).attr('rowid') == self.checkedRow[i].rowId) {
								$('#'+self.option.obj+' tbody tr').eq(j).remove();
							}
						} else {
							if ($('#'+self.option.obj+' tbody tr').eq(j).find('td').eq(0).attr('rowid') == self.checkedRow[i].rowId) {
								$('#'+self.option.obj+' tbody tr').eq(j).remove();
							}
						}
					}
				}
			}
			self._setTrHighlight();
		},
		_delSingleRow: function (item) {
			var self = this;
			$(item).parent().parent().parent().remove();
			self._setTrHighlight();
		}
	};
	table.prototype.constructor = table;
	return table;
})
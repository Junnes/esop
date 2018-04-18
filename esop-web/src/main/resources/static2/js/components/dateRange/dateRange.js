(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'dateTimePicker'], factory) :
		(global.dateRange = factory ($, Module, datetimepicker));
})(this, function ($, Module, datetimepicker) {
	function dateRange (_option) {
		_option = $.extend({
			data: []
		}, _option);
		this._init(_option);
	}
	dateRange.prototype = {
		_init: function (option) {
			var ind = 'l' + new Date().getTime();
			$('#'+option.obj).html('<div class="es-date-range clearfix"><div class="es-date-range-before"><div id="m'+ind+'0" class="es-input es-input-mini">'+
				'<input id="'+ind+'0" class="es-input-inner" type="input" placeholder="请选择开始日期">'+
				'<span class="es-input-suffix">'+
					'<span class="es-input-suffix-inner">'+
						'<i class="es-input-icon iconfont icon-yanchurili"></i>'+
					'</span>'+
				'</span>'+
			'</div></div><div class="es-date-range-middle">—</div><div class="es-date-range-after"><div id="m'+ind+'1" class="es-input es-input-mini">'+
				'<input id="'+ind+'1" class="es-input-inner" type="input" placeholder="请选择结束日期">'+
				'<span class="es-input-suffix">'+
					'<span class="es-input-suffix-inner">'+
						'<i class="es-input-icon iconfont icon-yanchurili"></i>'+
					'</span>'+
				'</span>'+
			'</div></div></div>');
			$('#'+option.obj+' #'+ind+'0').datetimepicker({
		        lang: 'ch',
		        timepicker: false,
		        format: 'Y-m-d',
		        value: $('#'+option.obj+' #'+ind+'0').val(),
		        id: ind+'0date'
		    });
		    var beforeDate = '';
		    $('#'+option.obj+' #'+ind+'0').off('click').on('click', function () {
		    	var wid = $(this).parent().width() + 'px';
		    	$('#'+ind+'0date.xdsoft_datetimepicker').css('width', wid);

			    $('#'+ind+'0date.xdsoft_datetimepicker tbody').on('click', 'td', function () {
			    	var year = +$(this).attr('data-year');
			    	var month = +$(this).attr('data-month')+1;
			    	var day = $(this).attr('data-date');
			    	if (+day < 10) {
			    		day = '0' + day;
			    	}
			    	$('#'+ind+'0').attr('date-year', year).attr('date-month', month).attr('day', day);
			    	if (month == 12) {
			    		year = year + 1;
			    		month = 01;
			    	} else {
			    		month = month + 1;
			    	}
			    	$('#'+ind+'1').attr('date-year', year).attr('date-month', month).attr('day', day);
			    	beforeDate = year + '-' + month + '-' + day;
			    	$('#'+option.obj+' #'+ind+'1').datetimepicker({
				        lang: 'ch',
				        timepicker: false,
				        format: 'Y-m-d',
				        value: beforeDate,
				        id: ind + '1date'
				    });
				    $('#'+option.obj+' #'+ind+'1').off('click').on('click', function () {
				    	var wid = $(this).parent().width() + 'px';
				    	$('#'+ind+'1date.xdsoft_datetimepicker').css('width', wid);
				    	$('#'+ind+'1date.xdsoft_datetimepicker tbody').on('click', 'td', function () {
					    	var year = +$(this).attr('data-year');
					    	var month = +$(this).attr('data-month')+1;
					    	var day = $(this).attr('data-date');
					    	if (+day < 10) {
					    		day = '0' + day;
					    	}
			    			$('#'+ind+'1').attr('date-year', year).attr('date-month', month).attr('day', day);
			    			var yearBefore = $('#'+ind+'0').attr('date-year'),
			    				monthBefore = $('#'+ind+'0').attr('date-month'),
			    				dayBefore = $('#'+ind+'0').attr('date-day');
			    			if (year < yearBefore) {

			    			} else if(month < monthBefore) {

			    			} else if (day < dayBefore) {
			    				
			    			}

					    	/*if (month == 1) {
					    		year = year - 1;
					    		month = 12;
					    	} else {
					    		month = month - 1;
					    	}*/
					    	beforeDate = year + '-' + month + '-' + day;

					    });
				    });
					    
			    });
		    });
		    
				    
		}
	};
	dateRange.prototype.constructor = dateRange;
	return dateRange;
})
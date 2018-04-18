(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module', 'dateTimePicker'], factory) :
		(global.date = factory ($, Module, datetimepicker));
})(this, function ($, Module, datetimepicker) {
	function date (_option) {
		_option = $.extend({
			data: []
		}, _option);
		this._init(_option);
	}
	date.prototype = {
		_init: function (option) {
			var ind = 'l' + new Date().getTime();
			$('#'+option.obj).html('<div id="m'+ind+'" class="es-input es-input-mini ">'+
				'<input id="'+ind+'" class="es-input-inner" type="input" placeholder="请选择日期">'+
				'<span class="es-input-suffix">'+
					'<span class="es-input-suffix-inner">'+
						'<i class="es-input-icon iconfont icon-yanchurili"></i>'+
					'</span>'+
				'</span>'+
			'</div>');
			var value = typeof option.value != 'undefined' ? option.value : '';
			var format = typeof option.format != 'undefined' ? option.format : 'Y-m-d';
			$('#'+option.obj+' #'+ind).datetimepicker({
		        lang: 'ch',
		        timepicker: false,
		        format: 'Y-m-d',
		        value: value,
		        id: ind
		    });
		    $('#'+option.obj).find('input').off('click').on('click', function () {
		    	var wid = $(this).parent().width() + 'px';
		    	$('.xdsoft_datetimepicker').css('width', wid);
		    });
		}
	};
	date.prototype.constructor = date;
	return date;
})
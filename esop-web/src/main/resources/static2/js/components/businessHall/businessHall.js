// 营业厅卡片
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
        typeof define === 'function' && define.amd ? define(['jquery'], factory) : (global.businessHall = factory($));
}(this, function($) {
	function businessHall (option) {
		var _option = $.extend({
			data: {}
		}, option);
		$('#'+_option.obj).empty();
		var data = _option.data;
		var border = (!!_option.border == 1) ? '' : 'business-border';
		var template = ['<div class="business-box clearfix"><div class="business-box-left"><div class="business-left '+border+'">'];
		if (!!_option.data.orgName) {
			template.push('<div class="business-name" title="'+_option.data.orgName+'"><p>'+_option.data.orgName+'</p></div>');
		} else {
			template.push('<div class="business-name" title=""><p></p></div>');
		}
		if (!!_option.data.orgLevel) {
			var span = '';
			for (var i = 0; i < _option.data.orgLevel; i++) {
				span += '<span></span>';
			}
			template.push('<div class="business-degree">'+span+'</div>');
		} else {
			template.push('<div class="business-degree"></div>');
		}
		template.push('</div></div><div class="business-box-right '+border+'"><div class="business-right"><div class="business-right-top clearfix">');
		if (!!_option.data.orgAddr) {
			template.push('<div class="business-address"><p class="business-title">厅店位置：</p><p class="business-val" title="'+_option.data.orgAddr+'">'+_option.data.orgAddr+'</p></div>');
		} else {
			template.push('<div class="business-address"><p class="business-title">厅店位置：</p><p class="business-val"></p></div>');
		}
		if (!!_option.data.orgComp) {
			template.push('<div class="business-rival"><p class="business-title" class="business-title">合作商：</p><p class="business-val" title="'+_option.data.orgComp+'">'+_option.data.orgComp+'</p></div>');
		} else {
			template.push('<div class="business-rival"><p class="business-title" class="business-title">合作商：</p><p class="business-val"></p></div>');
		}
		template.push('</div><div class="business-right-bot clearfix">');
		if (!!_option.data.orgType) {
			template.push('<div class="business-type"><p class="business-title">厅店类型：</p><p class="business-val" title="'+_option.data.orgType+'">'+_option.data.orgType+'</p></div>');
		} else {
			template.push('<div class="business-type"><p class="business-title">厅店类型：</p><p class="business-val"></p></div>');
		}
		if (!!_option.data.orgArea) {
			template.push('<div class="business-size"><p class="business-title">厅店面积：</p><p class="business-val" title="'+_option.data.orgArea+'">'+_option.data.orgArea+'</p></div>');
		} else {
			template.push('<div class="business-size"><p class="business-title">厅店面积：</p><p class="business-val"></p></div>');
		}
		if (!!_option.data.orgNumber) {
			template.push('<div class="business-num"><p class="business-title">台席数量：</p><p class="business-val" title="'+_option.data.orgNumber+'">'+_option.data.orgNumber+'</p></div>');
		} else {
			template.push('<div class="business-num"><p class="business-title">台席数量：</p><p class="business-val"></p></div>');
		}
		template.push('</div></div></div></div>');
        var div = template.join('');
        $('#'+_option.obj).append(div);
        
        if(typeof _option.callback == 'function') {
        	_option.callback({longitude:_option.data.longitude,latitude:_option.data.latitude});
        }
        
	}
	businessHall.prototype = {};
	businessHall.prototype.constructor = businessHall;
	return businessHall;
}));
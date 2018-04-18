// 渠道卡片
(function (global, factory) {
	typeof exports == 'object' && typeof module != 'undefined' ? module.exports = factory($) : 
		typeof define == 'function' && define.amd ? define(['jquery'], factory) : (global.channel = factory($));
})(this, function ($) {
	function channel (option) {
		var _option = $.extend({
			data: {}
		}, option);
        $('#'+_option.obj).empty();
        var border = (!!_option.border == 1) ? '' : 'business-border';
		var div = '<div class="business-box clearfix">'+
                    '<div class="business-box-left '+border+'">'+
                        '<div class="business-left">'+
                            '<div class="business-name channel-name" title="">'+
                                '<p></p>'+
                            '</div>'+
                            '<div class="business-degree channel-degree"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="business-box-right '+border+'">'+
                        '<div class="business-right">'+
                            '<div class="business-right-top clearfix">'+
                                '<div class="business-address channel-address">'+
                                    '<p class="business-title">渠道位置：</p>'+
                                    '<p class="business-val"></p>'+
                                '</div>'+
                                '<div class="business-rival channel-type">'+
                                    '<p class="business-title">渠道类型：</p>'+
                                    '<p class="business-val"></p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="business-right-bot clearfix">'+
                                '<div class="business-address channel-mark">'+
                                    '<p class="business-title">上月积分：</p>'+
                                    '<p class="business-val"></p>'+
                                '</div>'+
                                '<div class="business-rival channel-reward">'+
                                    '<p class="business-title">上月酬金：</p>'+
                                    '<p class="business-val"></p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
        $('#'+_option.obj).append(div);
        if (!!_option.data.channelName) {
        	$('#'+_option.obj).find('.channel-name').attr('title', _option.data.channelName);
        	$('#'+_option.obj).find('.channel-name p').html(_option.data.channelName);
        }
        if (!!_option.data.channelLevel) {
        	var span = '';
        	for (var i = 0; i < +_option.data.channelLevel; i++) {
        		span += '<span></span>';
        	}
        	$('#'+_option.obj).find('.channel-degree').append(span);
        }
        if (!!_option.data.channelAddr) {
        	$('#'+_option.obj).find('.channel-address .business-val').html(_option.data.channelAddr);
            $('#'+_option.obj).find('.channel-address .business-val').attr('title', _option.data.channelAddr);
        }
        if (!!_option.data.channelType) {
        	$('#'+_option.obj).find('.channel-type .business-val').html(_option.data.channelType);
            $('#'+_option.obj).find('.channel-type .business-val').attr('title', _option.data.channelType);
        }
        if (!!_option.data.lastPoint) {
        	$('#'+_option.obj).find('.channel-mark .business-val').html(_option.data.lastPoint);		
            $('#'+_option.obj).find('.channel-mark .business-val').attr('title', _option.data.lastPoint);        
        }
        if (!!_option.data.lastNumber) {
        	$('#'+_option.obj).find('.channel-reward .business-val').html(_option.data.lastNumber);	
            $('#'+_option.obj).find('.channel-reward .business-val').attr('title', _option.data.lastNumber); 
        }
        
        if(typeof _option.callback == 'function') {
        	_option.callback({longitude:_option.data.longitude,latitude:_option.data.latitude});
        }
	}

	channel.prototype = {};
	channel.prototype.constructor = channel;
	return channel;
});
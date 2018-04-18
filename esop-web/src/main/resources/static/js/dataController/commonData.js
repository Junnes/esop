define(['jquery'], function($) {
	function postJson(option) {
		$.ajax({
			url: '/service'+option.serviceUrl,
			type: "post",
			dataType: 'json',
			data : $.extend({},option.serviceData),
			success: function(data) {
				if (data.status == 1) {
					option.callback(data.data,option);
				}else {
					option.defaultCb && option.defaultCb(data,option);
				}
			},
			error:function(data){
				option.defaultCb && option.defaultCb(data,option);
			}
		});
	}
	function getJson(option) {
		$.ajax({
			url: '../loadData?serviceUrl='+option.serviceUrl,
			type: "get",
			dataType: 'json',
			success: function(data) {
				if (data.status == 1) {
					option.callback(data.data,option);
				}else {
					option.defaultCb && option.defaultCb(data,option);
				}
			},
			error:function(data){
				option.defaultCb && option.defaultCb(data,option);
			}
		});
	}
	return {
		loadData: function(option) {
			getJson(option);
		},
		postData: function(option) {
			postJson(option);
		}
	};
});
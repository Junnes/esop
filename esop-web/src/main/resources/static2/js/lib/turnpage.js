/* maxNum 最大页数  length 每次最多显示的页数 nowPage当前页面数 */
define(['jquery'], function($) {
	function TurnPage(option) {
		var defaults = {
			maxNum  : 1,
			length  : 1,
			nowPage : 1,
			nowNum : 10,
			arr     : ["front_more", "front", "behind", "behind_more"]
		};
		this.oConfig = $.extend(defaults,option);
	}
	TurnPage.prototype = {
		init: function() {
			var self = this;
			// 判断参数显示长度是否超过最大页数
			if(self.oConfig.length > self.oConfig.maxNum){
				self.oConfig.length = self.oConfig.maxNum;
			}
			// 判断参数当前页是否超过最大页数
			if(self.oConfig.nowPage > self.oConfig.maxNum){
				self.oConfig.nowPage = self.oConfig.maxNum;
			}
			if(self.oConfig.maxNum == 0){
				self.oConfig.maxNum = 1;
				self.oConfig.length = 1;
				self.oConfig.nowPage =1;
			}
			//self.loadPage(self.oConfig.nowPage).initShow().initTurn();
			self.initShow().initTurn();
		},
		/* 展示换页部分 */
		initShow: function() {
			var self = this;
			$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-current").find("input").val(self.oConfig.nowPage);
			$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-number").html("<a href=\"javascript:void(0)\"><i class=\"iconfont icon-arrow-double-left\" id=\"front_more\"></i></a><a href=\"javascript:void(0)\"><i class=\"iconfont icon-back\" id=\"front\"></i></a><a href=\"javascript:void(0)\"><i class=\"iconfont icon-forward\" id=\"behind\"></i></a><a href=\"javascript:void(0)\"><i class=\"iconfont icon-arrow-double-right\" id=\"behind_more\"></i></a>");
			for (var i = self.oConfig.length; i >= 1; i--) {
				if(('#'+self.oConfig.nowPage+self.oConfig.length-1) <= self.oConfig.maxNum){
					$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-number").find("a").eq(1).after("<a href=\"javascript:void(0)\" index='"+i+"'>" + (self.oConfig.nowPage + i - 1) + "</a>");
				}else{
					var _nowPage = self.oConfig.maxNum + i - self.oConfig.length;
					$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-number").find("a").eq(1).after("<a href=\"javascript:void(0)\" index='"+i+"'>" + _nowPage + "</a>");
				}
			}
			$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-number").find("a").each(function(){
				if($(this).html() == self.oConfig.nowPage){
					$(this).addClass("page-click");
					return;
				}
			})
			return self;
		},
		initTurn: function() {
			/* 跳转页面部分 */
			var self = this;
			$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-number").find("a").unbind("click");
			$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-number").find("a").click(function (e) {
				var e = e || window.event;
				e.stopPropagation();
				var num = Number($(this).html());
				if (Number(num)) {
					/* 正常跳转   */
					if(self.oConfig.nowPage != num){
						self.oConfig.nowPage = num;
						self.init();
						self.loadPage(self.oConfig.nowPage);
					}
				} else {
					var str    = $(this).find("i").attr("id"),
						index  = $.inArray(str, self.oConfig.arr),
						_index = 0;
					switch (index) {
						case 0:
							_index = 1-self.oConfig.nowPage;
							/* <<箭头跳转 */
							break;
						case 1:
							_index = -1;
							/* <箭头跳转 */
							break;
						case 2:
							_index = 1;
							/* >箭头跳转 */
							break;
						case 3:
							_index = self.oConfig.maxNum-self.oConfig.nowPage;
							/* >>箭头跳转 */
							break;
					}
					var __nowP = eval(JSON.stringify(self.oConfig.nowPage));
					var _nowPage = _index + self.oConfig.nowPage;
					if((_nowPage >=1) && (_nowPage <= self.oConfig.maxNum)){
						self.oConfig.nowPage = _nowPage;
					}else if(_nowPage < 1){
						self.oConfig.nowPage = 1;
					}else{
						self.oConfig.nowPage = self.oConfig.maxNum;
					}
					if(__nowP != self.oConfig.nowPage){
						self.init();
						self.loadPage(self.oConfig.nowPage);
					}				
				}
			})
			/* 输入跳转页面 */
			$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-turn").unbind("click");
			$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-turn").click(function(e){
				var e = e || window.event;
				e.stopPropagation();
				var num = Number($('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-current").find("input").val());
				if(!(Math.ceil(num) == num) || !num){
					if (num > self.oConfig.maxNum) {
						$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-current").find("input").val(self.oConfig.maxNum);
						self.oConfig.nowPage = self.oConfig.maxNum;
						self.init();
						self.loadPage(self.oConfig.nowPage);
					} else if (num <= 0) {
						$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+" .page-current").find("input").val(1);
						self.oConfig.nowPage = 1;
						self.init();
						self.loadPage(self.oConfig.nowPage);
					}
						
					// alert("请输入大于0小于等于"+self.oConfig.maxNum+"的整数！");
					return;
				}
				if(self.oConfig.nowPage != num){
					$('#'+self.oConfig.option.obj).find('.'+self.oConfig.str+' .page-number a:empty').eq(num).addClass('page-click').siblings().removeClass('page-click');
					self.oConfig.nowPage = num;
					self.init();
					self.loadPage(self.oConfig.nowPage);
				}
			})
			return self;
		},
		loadPage: function(p) {
			return this;
		}
	};
	return TurnPage;
});

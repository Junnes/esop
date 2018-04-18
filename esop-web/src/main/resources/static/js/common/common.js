define(function() {
	/*changeValue({
		value: '134,557,866.66',
		unit: '元',
		max: 9,
		fixed: 2,
		rules: {
			"4": "万",
			"6": "百万",
			"7": "千万",
			"8": "亿"
		}
	});*/
	function changeValue(option) {
		var obj = {
				value: 0,
				end: ''
			},
			reg = new RegExp(/^(?=.*\d.*\b)/), //判断是否含有数字;
			breakPoint,
			valArr,
			rules = [],
			_rule,
			valMax,
			intEnd = ['个','户'],
			valCheck = ['%'],
			_flag = intEnd.indexOf(option.unit);
//		if(_flag != -1){
//			option.fixed = 0;
//		}
		breakPoint = option.value.match(/\D+/g);
		//错误处理
		if (undefined === option.value || 'undefined' === option.value || '' === option.value.trim() || !reg.test(option.value)) {
			return obj;
		}
		valArr = breakPoint && breakPoint[0] !== '.' ? option.value.split(breakPoint[0]) : [option.value];
		//参数非法处理
		if (valCheck.indexOf(option.unit) != -1 || typeof(option.rules) !== 'object' || Object.getOwnPropertyNames(rules).length === 0 || !option.max) {
			obj.value = option.value;
			obj.end = option.unit ? option.unit : '';
			return obj;
		}
		for (var item in option.rules) {
			rules.push([item, option.rules[item]]);
		}
		rules.sort(function(a, b) {
			return a[0] - b[0];
		});
		option.fixed = option.fixed + '' === '0' ? 0 - (-option.fixed) : 1 - (-option.fixed);
		for (var i = 0; i < rules.length; i++) {
			var _l = Math.round(valArr.join('') / Math.pow(10, rules[i][0])) + '';
			if (_l.length + rules[i][1].length + option.fixed + 1 <= option.max) {
				_rule = rules[i];
				break;
			}
		}
		if (_rule === undefined) _rule = rules[rules.length - 1];
		obj.end = _rule[1] + option.unit;
		option.fixed = option.fixed - 1 >= 0 ? option.fixed - 1 : 0;
		var totalVal = (valArr.join('') / (Math.pow(10, _rule[0]))).toFixed(option.fixed);
		var valHead = Math.floor(totalVal);
		var _length = Math.floor((valHead + '').length / 3);
		var valEnd = ((totalVal - valHead) * Math.pow(10, option.fixed)).toFixed(0);
		var valHeadArr = [];
		for (var j = 1; j <= _length; j++) {
			valHeadArr.unshift((valHead + '').substr((valHead + '').length - 3 * j, 3));
		}
		var _head = (valHead + '').substring(0, (valHead + '').length - 3 * (j - 1));
		totalVal = _head + (_head && _head !== '' && valHeadArr.length > 0 ? ',' : '') + valHeadArr.join(',') + (valEnd && valEnd != 0 ? String(valEnd/(Math.pow(10, option.fixed))).substring(1) : '');
		obj.value = totalVal;
		return obj;
	}
	function remove(arr, item) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != item) {
                result.push(arr[i]);
            }
        }
        return result;
    }
    
    //格式化时间
    var formatDate = function(date, format) {
        if (!date) return;
        if (!format) format = "yyyy-MM-dd";
        
        switch (typeof date) {
            case "string":
                date = fixDate(date);
                break;
            case "number":
                date = fixDate(date);
                break;
        }
        if (date instanceof Date === false) return;

        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
            return dict[arguments[0]];
        });
    };
    //获取页面url参数
    function getParmas(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]).replace("$BM$", "&");
        return null;
    }
    function getParmasSpec(name) {
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    	var r = decodeURI(window.location.search).substr(1).match(reg);
    	if (r != null) return r[2].replace("$BM$", "&");
    	return null;
    }
    
    function getSpecUrl(oldUrl) {
    	url = decodeURI(oldUrl).substr(oldUrl.indexOf('?') == -1 ? oldUrl.length : oldUrl.indexOf('?')+1).replace("$BM$", "&");
		var ppp = url.split('&');
		var newUrl = oldUrl.substring(0, oldUrl.indexOf('?') == -1 ? oldUrl.length : oldUrl.indexOf('?'));
		newUrl += '?';
		for(var j = 0; j < ppp.length; j ++) {
			if(ppp[j].indexOf('=') == -1)
				continue;
			var name = ppp[j].substr(0, ppp[j].indexOf('='));
			var val = ppp[j].substr(ppp[j].indexOf('=')+1);
			newUrl += name+'='+val+'&';
		}
		return newUrl;
    }

    function fixDate(time) {
    	function judgeLe(month){
			var dayLength;
			var thirtyOne = [1,3,5,7,8,10,12];
			var thirty = [4,6,9,11];
			if($.inArray(month,thirtyOne) !== -1){
				dayLength = 31;
			}else if($.inArray(month,thirty) !== -1){
				dayLength = 30;
			}else {
				var $y = year/100;
				var $4y = $y/4;
				var $_4y = year/4;
				if($y == parseInt($y) && $4y == parseInt($4y)){
					return 29;
				}
				if($y != parseInt($y) && $_4y == parseInt($_4y)){
					return 29;
				}
				dayLength = 28;
			}
			return dayLength;
		}
        if (!time) {
            return;
        }
        if (time instanceof Date) {
            return time;
        } else {
        	time = time+'';
            var arr = time.match(/\D+/g) ? time.split(time.match(/\D+/g)[0]) : [time,'01','01'];
			var year = arr[0];
        	var _mon = arr[1] - 1 ? arr[1] - 1 : 0;
        	var day = arr[2] ? arr[2] : judgeLe(Number(_mon)+1);
            return new Date(year, _mon, day);
        }
    }
    function setUrl(){
    	window.parent.jQuery.find('.con-tab .active')[0].setAttribute('data-url', window.document.location.href);
    }
    function disabledMouseWheel() {
    	var _top = $(document).scrollTop();
    	$(document).bind('scroll', function() {
    		$(document).scrollTop(_top);
    	});
    	document.onmousewheel = function() {
    		return false;
    	};
	}
    function reliveMouseWheel(){
    	$(document).unbind('scroll');
    	document.onmousewheel = function() {
    		return true;
    	}; 
    }
    function myBrowser(){
	    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
	    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
	    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
	    var isChrome = userAgent.indexOf('Chrome') > -1; //判断是否Chrome浏览器
	    if (isIE) {
	        var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = false;
	        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
	        reIE.test(userAgent);
	        var fIEVersion = parseFloat(RegExp["$1"]);
	        IE55 = fIEVersion == 5.5;
	        IE6 = fIEVersion == 6.0;
	        IE7 = fIEVersion == 7.0;
	        IE8 = fIEVersion == 8.0;
	        IE9 = fIEVersion == 9.0;
	        if (IE55) {
	            return "IE55";
	        }
	        if (IE6) {
	            return "IE6";
	        }
	        if (IE7) {
	            return "IE7";
	        }
	        if (IE8) {
	            return "IE8";
	        }
	        if (IE9) {
	        	return "IE9";
	        }
	    }//isIE end
	    if (isFF) {
	        return "FF";
	    }
	    if (isOpera) {
	        return "Opera";
	    }
	    if (isChrome) {
	    	return "Chrome";
	    }
	}
    //省略多余字符串 str文本内容，len 显示长度
		function cutstr(str, len) {
		  var restr = str;
		  var wlength = str.replace(/[^\x00-\xff]/g, "**").length; //把汉字或者全角用**代替来计算长度,为了让汉字或全角算成2个字符长度
		  if (wlength > len) {
		    for (var k = len / 2; k < str.length; k++) {
		      if (str.substr(0, k).replace(/[^\x00-\xff]/g, "**").length >= len) {
		        restr = str.substr(0, k) + "...";
		        break;
		      }
		    }
		  } else {
		    //如果长度没有超过，就返回原来字符串
		    return str;
		  }
		  return restr;
		}
    return {
        formatDate: formatDate,
        getParmas: getParmas,
        fixDate: fixDate,
        getParmasSpec:getParmasSpec,
        getSpecUrl:getSpecUrl,
        setUrl:setUrl,
        changeValue:changeValue,
        disabledMouseWheel:disabledMouseWheel,
        reliveMouseWheel:reliveMouseWheel,
        cutstr:cutstr,
        myBrowser: myBrowser
    };
});
define(['ec', 'jquery', 'require'], function(ec, $, require) {
	function _barGraph(option) {
		option.data = $.extend({
			zhey: {},
			zhuy: {}
		}, option.data);
		option.data.zy = $.extend({}, option.data.zhey, option.data.zhuy);
		this.zyToStr = JSON.stringify(option.data.zy);
		this.zhuyToStr = JSON.stringify(option.data.zhuy);
		this.zheyToStr = JSON.stringify(option.data.zhey);
		this.xToStr = JSON.stringify(option.data.x);
		xMax = JSON.parse(this.xToStr).sort(function(a,b){
			return a.length- b.length;
		});
		this.xMaxLength = (xMax[xMax.length-1]+'').length;
		this.xMaxLength = this.xMaxLength > 5 ? 5 : this.xMaxLength;
		option = $.extend({
			dateChoose: 0,
			color: ['#2196F3', '#FC855D', '#62CA51', 'blue', 'orange', 'purple', '#dcdcdc']
		}, option);
		this.init(option);
		this._init(option);
		var self = this;
		$(window).resize(function() {
			self.chart.resize();
		});
	}
	_barGraph.prototype = {
		init: function(option) {
			this.option = option;
			var obj = document.getElementById(option.obj);
			this.download = this.turnToBoolean(option.download);
			this.cutHead = this.turnToBoolean(option.cutHead);
			this.topLast = this.turnToBoolean(option.topLast);
			this.legend = this.turnToBoolean(option.legend);
			this.dateChoose = this.turnToBoolean(option.dateChoose);
			this.deg = this.turnToBoolean(option.deg);
			this.label = this.turnToBoolean(option.label);
			this.chart = ec.init(obj);
			this.headEndObj = {};

			this.show = true;
			this._cut(option);
		},
		_cut: function(option) {
			var _X = option.data.x;
			this.X = {
				head: _X[0],
				end: _X[_X.length - 1]
			};
			for (var item in option.data.zy) {
				option.data.zy[item].length = _X.length;
				var _Arr = option.data.zy[item];
				this.headEndObj[item] = {
					head: _Arr[0],
					end: _Arr[_Arr.length - 1]
				};
			}
		},
		_init: function(option) {
			this.chart.setOption(this._getOpt(option));
			var border = (!!option.titleBorder) ? (option.titleBorder == true ? 'only-border' : '') : '';
			$('#'+option.obj).parent().prepend('<div class="ec-title pos-absolute"><p class="'+border+'">'+ ((!!option.title) ? option.title : '') +'</p></div>');
			/*if (!!option.addTitle) {
				if (option.addTitle == true) {
					$('#'+option.obj).parent().prepend('<div class="comtit2 conlebot-title-pos">'+((!!option.title) ? option.title : '') +'</div>');
				} else {
					$('#'+option.obj).parent().prepend('<div class="comtit2 conlebot-title-pos">'+((!!option.title) ? option.title : '') +'</div>');
				}
			} else {
				$('#'+option.obj).parent().prepend('<div class="comtit2 conlebot-title-pos">'+((!!option.title) ? option.title : '') +'</div>');
			}*/
			$('#' + option.obj).append(
				'<div class="rankbtn">' +
				(this.cutHead ? '<div class="fr legendBtnOth" status="fasle">去首尾</div><div class="fr legendBtnOth hidden" status="true">显示首尾</div>' : '') +
				(this.topLast ?  '<div class="fr legendBtn legendBtnL">' +
						'<img class="no-active" src="../js/components/barGraph/img/rise.png" alt="上升">' +
						'<img class="active-img" src="../js/components/barGraph/img/rise-active.png" alt="上升">' +
						'</div>'+
						'<div class="fr legendBtn legendBtnR btnColor">' +
						'<img class="no-active" src="../js/components/barGraph/img/decline.png" alt="下降">' +
						'<img class="active-img" src="../js/components/barGraph/img/decline-active.png" alt="下降">' +
						'</div>': '') +
				(this.dateChoose ? '<div class="fr calendar">' +
					'<img src="../img/calendar.png" alt="">' +
					'<input id="' + option.obj + 'MY" readonly="true" type="text" name="">' +
					'</div>' : '') +
				'</div>');
			/*if (!!option.typeBefore) {
				if (option.typeBefore == 'doubleLine') {
					$('#'+option.obj).find('.rankbtn').hide();
				}
			}*/
			if (this.dateChoose) {
				require(['dateTimePicker'], function() {
					$("#" + option.obj + "MY").val(option.date);
					$("#" + option.obj + "MY").datetimepicker('destroy');
					$("#" + option.obj + "MY").datetimepicker({
						lang: 'ch',
						timepicker: false,
						format: option.format ? option.format : 'Y-m',
						onSelectDate: option.timeCallback ? function(time) {
							option.timeCallback.call(this, time, option);
						} : function() {}
					});
				});

			}

			this._bindEve(option);
		},
		turnToBoolean: function(str) {
			if (0 === str || '0' === str) {
				return false;
			} else {
				return true;
			}
		},
		_sort: function(option, num) {
			function _sort(a, b) {
				return (a[1] - b[1]) * num;
			}
			for (var i in option.data.zy) {
				for (var j = 0; j < option.data.zy[i].length; j++) {
					option.data.zy[i][j] = [option.data.x[j], option.data.zy[i][j]];
				}
				option.data.zy[i].sort(_sort);
				for (j = 0; j < option.data.zy[i].length; j++) {
					option.data.x[j] = option.data.zy[i][j][0];
					option.data.zy[i][j] = option.data.zy[i][j][1];
				}
				break;
			}
			return option.data.zy;
		},
		_getLength: function(zy) {
			return Object.getOwnPropertyNames(zy).length;
		},
		_getOpt: function(option) {
			var self = this;
			var series = self._setSeries(option);
			var multiple = Math.floor(self.min/(Math.pow(10,Math.floor(Math.log(self.min)/Math.log(10)))));
			var _min = Math.pow(10,Math.floor(Math.log(self.min)/Math.log(10)))*multiple || null;
			var grid = {
				top: '',
				right: '',
				bottom: '',
				left: ''

			};
			if (!!option.gridPosition) {
				grid.top = !!option.gridPosition[0] ? option.gridPosition[0] : (self.legend ? 65 : (option.titleBorder == true ? 90: 50));
				grid.right = !!option.gridPosition[1] ? option.gridPosition[1] : 15;
				grid.bottom = !!option.gridPosition[2] ? option.gridPosition[2] : (option.lineType > 1 && self.deg ? 12*(Math.sin(Math.PI * 1/3) + this.xMaxLength * Math.cos(Math.PI * 1/3)) + 5 : 25);
				grid.left = !!option.gridPosition[3] ? option.gridPosition[3] : (this.max+'').length * 7 + 20;
			} else {
				grid = {
					left: (this.max+'').length * 7 + 20,
					right: 15,
					top: self.legend ? 65 : (option.titleBorder == true ? 90: 50),
					bottom: option.lineType > 1 && self.deg ? 12*(Math.sin(Math.PI * 1/3) + this.xMaxLength * Math.cos(Math.PI * 1/3)) + 5 : 25
				};
			}
			var legendParam = {};
			if (!!option.legendPosition) {
				legendParam = {
					show: self.legend,
					type:'scroll',
					data: self.nameArr,
					// top: '10',
					// right: '0',
					right: !!option.legendPosition[1] ? option.legendPosition[1] : '',
					top: !!option.legendPosition[0] ? (option.legendPosition[0] > 0 ? option.legendPosition[0] : 'auto') : '',
					bottom: !!option.legendPosition[0] ? (option.legendPosition[0] < 0 ? -option.legendPosition[0] : 'auto') : '',
					selected: option.selected ? option.selected : '',
					textStyle: {
						color: '#fff',
						fontSize:16
					},
					icon: option.icon ? option.icon :'square'
				};
			} else {
				legendParam = {
					show: self.legend,
					type:'scroll',
					data: self.nameArr,
					right: 0,
					top: 35,
					selected: option.selected ? option.selected : '',
					textStyle: {
						color: '#fff',
						fontSize:16
					},
					icon: 'square'
				};
			}
			var opt = {
				/*title: {
					show: ((option.titleStatus !== undefined && option.titleStatus + '' === '0') ? false : true),
					text: option.title || option.data.title,
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 'bolder',
						fontFamily: 'sans-serif',
						fontSize: 13,
					},
					left: 10,
					top: 5
				},*/
				grid: grid,
				toolbox: {
					feature: {
						saveAsImage: {
							show: self.download,
							title: ' '
						}
					},
					iconStyle: {
						normal: {
							
						}
					}
				},
				legend: legendParam,
				tooltip: {
					trigger: 'axis',
					textStyle: {
						color: '#fff'
					},
					backgroundColor: '#044EE5',
					formatter: function(params) {
						var template = ['<span class="tooltip-counts">' + params[0].name + '</span>'];
						for (var i = 0; i < params.length; i++) {
							if (self.nameArr.indexOf(params[i].seriesName) === -1) {
								continue;
							}
							template = template.concat(
								['<div class="tooltip-con arealine-tooltip">',
									'<div class="tooltip-txt">',
									'<span class="item-color" style="background: ' + params[i].color + '">',
									'</span>',
									'<span class="tooltip-counts">' + params[i].seriesName,
									' :<span>',
									'<span class="tooltip-counts">' + (params[i].value != undefined ? params[i].value : "-"),
									'<span>',
									'</div>',
									'<div>'
								]);
						}
						return template.join('');
					}

				},
				xAxis: {
					boundaryGap: self.boundaryGap,
					axisLine: {
						show:true,
						lineStyle :{
							color:'#636e7e'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						interval: option.lineType > 1 ? 0 : 'auto',
						textStyle: {
							fontSize: 14,
							color: '#fff'
							// color: 'rgba(0, 0, 0, 0.54)'
						},
						rotate: option.lineType > 1 && self.deg ? 30 : 0
					},
					axisPointer:{
						show: true,
						type:'shadow',
						shadowStyle:{
							opacity:'.8'
						}
					},
					data: option.data.x
				},
				yAxis: {
					name:option.unit?option.unit:'',
					value: 'value',
					// max: self.max-self.min < 1 ? (Number(self.max+0.1).toFixed(1)) : Math.ceil(self.max),
					min: (self.min - (self.max-self.min)/10 < 0) ? (self.min > 0 ? 0 : Math.floor(self.min + (self.min)/10)): Math.floor(self.min - (self.max-self.min)/10) ,
					axisLine: {
						show: true,
						lineStyle :{
							color:'#636e7e'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: ['#fff'],
							type: 'dashed'
						}
					},
					//强制设置坐标轴分割间隔。
					// interval: option.lineType > 1 ? 0 : 'auto',
					axisLabel: {
						textStyle: {
							fontSize: 14,
							color: '#fff'
							// color: 'rgba(82, 92, 96, 0.69)'
						},
						margin: 10
					},

				},
				series: series
			};
			return opt;
		},
		_setSeries: function(option) {
			var self = this;
			var arr = [],
				styleArr = [
					['line'],
					['line', 'line'],
					['bar'],
					['line', 'bar', 'bar'],
					['line', 'line', 'line'],
					['line', 'line', 'line', 'line'],
					['line', 'line', 'line', 'line', 'line'],
					['line', 'line', 'line', 'line', 'line', 'line'],
					['line', 'line', 'line', 'line', 'line', 'line', 'line'],
					['bar', 'bar']
				][option.lineType],
				areaStyle = [{
					normal: {
						color: 'rgba(33,150,243,0.14)'
					}
				}, {}, {}, {}],
				symbolStyle = [6, 6, 0, 0],
				nameArr = [],
				valArr = [],
				_l = 0,
				_delArr = [],
				i;
			var zheLength = this._getLength(option.data.zhey);
			var zhuLength = this._getLength(option.data.zhuy);
			if (option.lineType == 1) {
				styleArr.length = zheLength;
				for (i = 0; i < zheLength; i++) {
					styleArr[i] = 'line';
				}
			} else if (option.lineType == 3) {
				styleArr.length = zheLength + zhuLength;
				for (i = 0; i < zheLength + zhuLength; i++) {
					if (i < zheLength) {
						styleArr[i] = 'line';
					} else {
						styleArr[i] = 'bar';
					}
				}
			}
			for (var item in option.data.zy) {
				_l++;
				if (_l <= styleArr.length) {
					nameArr.push(item);
					option.data.zy[item].length = option.data.x.length;
					valArr.push(option.data.zy[item]);
				} else {
					_delArr.push(item);
				}
			}
			for (item in option.data.zy) {
				if (_delArr.indexOf(item) !== -1) {
					delete option.data.zy[item];
				}
			}
			/*for (var m = 0; m < nameArr.length; m++) {
				nameArr[m] = {
					icon: option.icon ? option.icon : 'rect',
					name: nameArr[m]
				};
			}*/
			this.nameArr = nameArr;
			this.boundaryGap = [false, false, true, true][option.lineType];
			var dataArr = [];
			for (i = 0; i < styleArr.length; i++) {
				dataArr = dataArr.concat(valArr[i]);
				var _flag = false;
				if (option.pictorialBar && option.pictorialBar == 1) _flag = true;
				var itemColor = (option.lineType.toString() == '2' || option.lineType.toString() == '9') ? (
					new ec.graphic.LinearGradient(.5, 0, 0, 0, [{
	                    offset: .7,
	                    color: '#73bdf7'
	                }, {
	                    offset: .3,
	                    color: option.color[i]
	                }, {
	                	offset: 1,
	                	color: '#fff'
	                }])) : (option.color[i]);
				arr.push({
					name: nameArr[i],
					type: _flag ? 'pictorialBar' : styleArr[i],
					symbol: _flag ? 'rect' : 'circle',
					symbolRepeat: _flag,
					symbolSize: _flag ? [8, 4] : symbolStyle[option.lineType],
					showAllSymbol:true,
					symbolMargin: _flag ? 1 : 0,
					//显示区域、线条样式
					itemStyle: {
						normal: {
							color: option.color[i],
							// 颜色渐变
							barBorderRadius: option.radius ? option.radius : 3,
	                        // color: itemColor,
	                        // shadowColor: 'rgba(35,149,229,0.8)',
	                        // shadowBlur: 20,
	                        // areaStyle: {type: 'default'}
						},
						emphasis: {
							borderWidth: [5, 5, 0, 0][option.lineType],
							borderColor: '#fff'
						}
					},
					// barGap: '25%',
					barWidth: option.barWidth ? option.barWidth : '',
					barCategoryGap: '50%',
					areaStyle: areaStyle[option.lineType],
					lineStyle: {
						normal: {
							color: option.color[i],
							width: 2
						}
					},
					label: {
						normal: {
	                  		show: self.label,
	                    	position: 'top',
	                    	textStyle: {
	                    		color: 'orange'
	                    	},
	                    	formatter: function (params) {
	                    		var ind = params.value.indexOf('.');
	                    		var val = params.value.slice(0, ind);
	                    		if (val.length > 4 && val.length <= 8) {
	                    			val = val.slice(0, val.length-4) + '.' + val.slice(val.length-4);
	                    			val = Math.ceil(+val).toString() + '万';
	                    		} else if (val.length > 8) {
	                    			val = val.slice(0, val.length-8) + '.' + val.slice(val.length-8);
	                    			val = Math.ceil(+val).toString() + '亿';
	                    		}
	                    		return val;
	                    	}
	                  	}  	
					},
					data: valArr[i]
				});
			}
			var _dataArr = dataArr;
			_dataArr.sort(function(a, b) {
				return a - b;
			});
			var min;
			for(var i = 0; i < _dataArr.length; i++) {
				if(_dataArr[i] != undefined && _dataArr[i] != null){
					min = _dataArr[i];
					break;
				}
			}
			var max = _dataArr[_dataArr.length - 1];
			this.max = max;
			this.min = min;
//			max += Math.ceil(1 / 100 * max);
//			this.max = max;
			dataArr = [];
			for (var j = 0; j < (valArr[0] ? valArr[0].length : 0); j++) {
				dataArr.push(max);
			}
			this.maxFloat = max + '';
//			this.max = parseInt(max)
//			if (zhuLength === 1) {
//				arr.unshift({
//					type: 'bar',
//					itemStyle: {
//						normal: {
//							color: 'rgba(0,0,0,0.05)'
//						}
//					},
//					barMaxWidth: 25,
//					barWidth: option.shadowBarWidth ? option.shadowBarWidth : '',
//					barGap: option.barGap ? option.barGap : '-100%',
//					data: dataArr,
//					animation: false
//				});
//			}
			return arr;
		},
		_add: function(option) {
			option.data.x = JSON.parse(this.xToStr);
			option.data.zy = JSON.parse(this.zyToStr);
			option.data.zhuy = JSON.parse(this.zhuyToStr);
			option.data.zhey = JSON.parse(this.zheyToStr);
		},
		_del: function(option) {
			var thirtyOne = [1,3,5,7,8,10,12];
			var thirty = [4,6,9,11];
			var legend;
			var legendArr=[];
			var dayLength;
			var _X;
			
			if(!option.data.zhey){
				return;
			}
			for(var i in option.data.zhey){
				legend = i;
				legendArr.push(i);
			}
			if(!legend || !legend.match(/\D+/g)) return;
			legend = legend.split(legend.match(/\D+/g)[0]);
			var _index = legend[1];
			dayLength = judgeLe(Number(legend[1]));
			function judgeLe(month){
				var dayLength;
				if($.inArray(month,thirtyOne) !== -1){
					dayLength = 31;
				}else if($.inArray(month,thirty) !== -1){
					dayLength = 30;
				}else {
					dayLength = 28;
				}
				return dayLength;
			}
			
			for(var i =option.data.x.length-1;i>-1;i-- ){
				if(option.data.x[i+1] && (option.data.x[i] > option.data.x[i+1])){
					legend[1]--;
					dayLength = judgeLe(Number(legend[1]));
				}
				if(option.data.x[i] >= dayLength || option.data.x[i] == 1){
					option.data.x.splice(i, 1);
					for(var j =0;j<legendArr.length;j++){
						option.data.zhey[legendArr[j]].splice(i, 1);
					}
				}
			}
			option.data.zy = $.extend({}, option.data.zhey, option.data.zhuy);
		},
		_bindEve: function(option) {
			var self = this;

			function _change(str) {
				$(this).addClass('btnColor');
				$('#' + option.obj).find('.legendBtn' + str).removeClass('btnColor');
				$(this).find('img:eq(1)').attr('class', 'active-img');
				$(this).find('img:eq(0)').attr('class', 'no-active');
				$('#' + option.obj).find('.legendBtn' + str).find('img:eq(0)').attr('class', 'no-active');
				$('#' + option.obj).find('.legendBtn' + str).find('img:eq(1)').attr('class', 'active-img');
			}
			if (this.topLast && (option.lineType + '' === '0' || option.lineType + '' == '2')) {
				$('#' + option.obj).find('.legendBtnL').unbind('click').click(function() {
					_change.call(this, 'R');
					if(option.ascCallback) {
						option.ascCallback.call(this, self);
					} else {
						self._sort(option, 1);
						self.chart.setOption(self._getOpt(option));
					}
				});
				$('#' + option.obj).find('.legendBtnR').unbind('click').click(function() {
					_change.call(this, 'L');
					if(option.descCallback) {
						option.descCallback.call(this, self);
					} else {
						self._sort(option, -1);
						
						self.chart.setOption(self._getOpt(option));
					}
				});
			}
			if (this.cutHead) {
				$('#' + option.obj).find('.legendBtnOth').unbind('click').click(function() {
					$('#' + option.obj).find('.legendBtnOth').toggle();
					var item;
					if ($(this).attr('status') === 'true') {
						//显示首尾
						self._add(option);
					} else {
						self._del(option);
					}
					self.chart.setOption(self._getOpt(option));
				});
			}
			self.chart.on('click', function(pa) {
				option.callback && option.callback(pa, option.data.x);
			});
		}
	};
	_barGraph.prototype.constructor = _barGraph;
	return _barGraph;
});
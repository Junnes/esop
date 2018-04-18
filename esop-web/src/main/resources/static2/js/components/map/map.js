define(['ec', 'jquery'], function(ec, $) {
	function _map(option) {
		var self = this
		this._addHtml(option);
		this.init(option);
		this._addTitle(option);
		/*$.get('../js/components/map/json/shanghai.json', function(shanghaiJson) {
			ec.registerMap('上海', shanghaiJson);
			self.chart.setOption(self._getOpt(option));
			self.bindEve(option);
		});*/
		$.get('../js/components/map/json/zhejiang.json', function(zhejiangJson) {
			ec.registerMap('浙江', zhejiangJson);
			self.chart.setOption(self._getOpt(option));
			self.bindEve(option);
		});
	}
	_map.prototype = {
		init: function(option) {
			var obj = document.getElementById('map');
			this.toNext = this.turnToBoolean(option.toNext);
			this.fishBtn = this.turnToBoolean(option.fishBtn);
			this.chart = ec.getInstanceByDom(obj) || ec.init(obj);
		},
		_addHtml: function(option) {
			var mainHtml =
				'<div class="maptitle clearfix">' +
				'</div>' +
				'<div class="mask"></div>' +
				'<ul class="color-rank">' +
				'<li class="ranking1">1</li>' +
				'<li class="ranking2">2</li>' +
				'<li class="ranking3">3</li>' +
				'<li class="ranking4">4</li>' +
				'<li class="ranking5">5</li>' +
				'<li class="ranking6">6</li>' +
				'<li class="ranking7">7</li>' +
				'<li class="ranking8">8</li>' +
				'<li class="ranking9">9</li>' +
				'<li class="ranking10">10</li>' +
				'<li class="ranking11">11</li>' +
				'<li class="ranking12">12</li>' +
				'</ul>' +
				'<div class="map" id="map"></div>';
			$('#' + option.obj).html(mainHtml);
		},
		_addTitle: function(option) {
			if(this.fishBtn) {
				var titleStr =
					$('<div class="card-click-header fl">' + option.title + '</div>');
				$('.maptitle').html(titleStr);
			}
		},
		turnToBoolean: function(str) {
			if(0 === str || '0' === str) {
				return false;
			} else {
				return true;
			}
		},
		_getOpt: function(option) {
			var self = this;
			if(option.data === null || option.data.length === 0 || typeof(option.data.length) !== 'number') {
				$('.mask').show();
				option.data = [];
			} else {
				$('.mask').hide();
			}
			// var mapArr = ['南区', '西区', '北区', '闵行', '宝山', '嘉定', '东区', '金山', '松江', '青浦', '奉贤', '崇明'];
			var mapArr = ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'];
			var elArr = option.data.filter(function(el) {
				if($.inArray(el.name, mapArr) !== -1) {
					return el;
				}
			});
			elArr.sort(function(x, y) {
				return x.value - y.value;
			});
			var arr = [],
				obj = {};
			var color = ['#FF178C', '#F8AABB', '#FF8D1D', '#FFE800', '#057926', '#43FF7A', '#A33BE7', '#9C94CC', '#102451', '#3678FF', '#50B7C1'];
			for(var i = 0; i < elArr.length; i++) {
				arr.unshift(elArr[i].name);
			}
			for(var i = 0; i < arr.length; i++) {
				obj[arr[i]] = color[i];
			}
			//鼠标移入样式
			var defaultStyle = {
				normal: {
					areaColor: '#9CB1DE',
					borderColor: '#fff',
					borderWidth: 1,
				},
				emphasis: {
					areaColor: '#9CB1DE',
					borderColor: '#2196F3',
				}
			};
			//小区名称隐藏
			var defaultLabel = {
				normal: {
					show: true,
					textStyle: {
						color: 'transparent',
					},
				},
				emphasis: {
					show: false,
					textStyle: {
						color: '#fff',
					},
				}
			};
			var alarmLabel = {
				normal: {
					show: true,
					textStyle: {
						color: 'transparent',
					},
				},
				emphasis: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				}
			};
			//大区名称样式
			var defaultLabelShow = {
				normal: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				},
				emphasis: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				}
			};
			var alarmLabelShow = {
				normal: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				},
				emphasis: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				}
			};
			return {
				tooltip: {
					trigger: 'item',
					formatter: '{b}'
				},
				series: [{
					type: 'map',
					map: '浙江',
					roam: false,
					// center: option.fishBtn === 0 ? [121.43, 31.26] : [121.43, 31.21],
					zoom: 1.1,
					selectedMode: 'single',
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#262E64',
								fontStyle: 'normal',
								fontWeight: 'bold',
								fontFamily: 'sans-serif',
								fontSize: 12,
							},
						},
						emphasis: {
							show: true,
							textStyle: {
								color: '#262E64',
								fontStyle: 'normal',
								fontWeight: 'bold',
								fontFamily: 'sans-serif',
								fontSize: 12,
							},
						}
					},
					itemStyle: {
						normal: {
							areaColor: '#9CB1DE',
							borderColor: '#fff',
							borderWidth: 1,
						},
						emphasis: {
							areaColor: 'transparent',
							borderColor: '#2196F3',
						}
					},
					data: [{
						name: '杭州市',
						id: 512,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.杭州,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.杭州,
							}
						},
					}, {
						name: '宁波市',
						id: 513,
						label: defaultLabel,
						itemStyle: {
							normal: {
								// areaColor: obj.宁波,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.宁波,
							}
						},
					}, {
						name: '温州市',
						id: 514,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.温州,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.温州,
							}
						},
					}, {
						name: '嘉兴市',
						id: 515,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.嘉兴,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.嘉兴,
							}
						},
					}, {
						name: '湖州市',
						id: 516,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.湖州,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.湖州,
							}
						},
					}, {
						name: '绍兴市',
						id: 517,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.绍兴,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.绍兴,
							}
						},
					}, {
						name: '金华市',
						id: 518,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.金华,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.金华,
							}
						},
					}, {
						name: '衢州市',
						id: 519,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.衢州,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.衢州,
							}
						},
					}, {
						name: '舟山市',
						id: 520,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.舟山,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.舟山,
							}
						},
					}, {
						name: '台州市',
						id: 521,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.台州,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.台州,
							}
						},
					}, {
						name: '丽水市',
						id: 522,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.丽水,
								borderColor: '#fff',
								borderWidth: 1,
							},
							emphasis: {
								areaColor: obj.丽水,
							}
						},
					}]

				}]

			}
		},
		//下钻过后
		_getOptTwo: function(option, pa) {
			var self = this;
			var mapArr = ['南区', '西区', '北区', '闵行', '宝山', '嘉定', '东区', '金山', '松江', '青浦', '奉贤', '崇明'];
			var elArr = option.data.filter(function(el) {
				if($.inArray(el.name, mapArr) !== -1) {
					return el;
				}
			});
			elArr.sort(function(x, y) {
				return x.value - y.value;
			});
			var arr = [];
			var obj = {};
			var color = ['#FF178C', '#F8AABB', '#FF8D1D', '#FFE800', '#057926', '#43FF7A', '#A33BE7', '#9C94CC', '#102451', '#3678FF', '#50B7C1', '#AEDFE5'];

			for(var i = 0; i < elArr.length; i++) {
				arr.unshift(elArr[i].name);
			}
			for(var i = 0; i < arr.length; i++) {
				obj[arr[i]] = color[i];
			}
			//鼠标移入样式
			var defaultStyle = {
				normal: {
					areaColor: '#9CB1DE',
					borderColor: '#fff',
					borderWidth: 1,
				},
				emphasis: {
					areaColor: '#9CB1DE',
					borderColor: '#2196F3',
				}
			};
			//小区名称隐藏
			var defaultLabel = {
				normal: {
					show: true,
					textStyle: {
						color: 'transparent',
					},
				},
				emphasis: {
					show: false,
					textStyle: {
						color: '#fff',
					},
				}
			};
			var alarmLabel = {
				normal: {
					show: true,
					textStyle: {
						color: 'transparent',
					},
				},
				emphasis: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				}
			};
			//大区名称样式
			var defaultLabelShow = {
				normal: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				},
				emphasis: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				}
			};
			var alarmLabelShow = {
				normal: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				},
				emphasis: {
					show: true,
					textStyle: {
						color: '#fff',
					},
				}
			};
			return {
				tooltip: {
					trigger: 'item',
					formatter: '{b}'
				},
				series: [{
					type: 'map',
					map: '上海',
					roam: false,
					center: option.fishBtn === 0 ? [120.153576, 30.287459] : [120.153576, 30.287459],
					zoom: 1.1,
					selectedMode: 'single',
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#262E64',
								fontStyle: 'normal',
								fontWeight: 'bold',
								fontFamily: 'sans-serif',
								fontSize: 12,
							},
						},
						emphasis: {
							show: true,
							textStyle: {
								color: '#262E64',
								fontStyle: 'normal',
								fontWeight: 'bold',
								fontFamily: 'sans-serif',
								fontSize: 12,
							},
						}
					},
					itemStyle: {
						normal: {
							areaColor: '#9CB1DE',
							borderColor: '#fff',
							borderWidth: 1,
						},
						emphasis: {
							areaColor: 'transparent',
							borderColor: '#2196F3',
						}
					},
					data: [{
						name: '南区',
						id: 310101,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.南区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '南区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.南区,
								opacity: (pa.name === '南区' ? 1 : 0.3),
							}
						},
					}, {
						name: '南区',
						id: 310104,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.南区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '南区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.南区,
								opacity: (pa.name === '南区' ? 1 : 0.3),
							}
						},
					}, {
						name: '西区',
						id: 310105,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.西区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '西区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.西区,
								opacity: (pa.name === '西区' ? 1 : 0.3),
							}
						},
					}, {
						name: '西区',
						id: 310106,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.西区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '西区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.西区,
								opacity: (pa.name === '西区' ? 1 : 0.3),
							}
						},
					}, {
						name: '西区',
						id: 310107,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.西区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '西区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.西区,
								opacity: (pa.name === '西区' ? 1 : 0.3),
							}
						},
					}, {
						name: '北区',
						id: 310108,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.北区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '北区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.北区,
								opacity: (pa.name === '北区' ? 1 : 0.3),
							}
						},
					}, {
						name: '北区',
						id: 310109,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.北区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '北区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.北区,
								opacity: (pa.name === '北区' ? 1 : 0.3),
							}
						},
					}, {
						name: '北区',
						id: 310110,
						label: defaultLabel,
						itemStyle: {
							normal: {
								areaColor: obj.北区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '北区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.北区,
								opacity: (pa.name === '北区' ? 1 : 0.3),
							}
						},
					}, {
						name: '闵行',
						id: 310112,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.闵行,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '闵行' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.闵行,
								opacity: (pa.name === '闵行' ? 1 : 0.3),
							}
						},
					}, {
						name: '宝山',
						id: 310113,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.宝山,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '宝山' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.宝山,
								opacity: (pa.name === '宝山' ? 1 : 0.3),
							}
						},
					}, {
						name: '嘉定',
						id: 310114,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.嘉定,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '嘉定' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.嘉定,
								opacity: (pa.name === '嘉定' ? 1 : 0.3),
							}
						},
					}, {
						name: '东区',
						id: 310115,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.东区,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '东区' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.东区,
								opacity: (pa.name === '东区' ? 1 : 0.3),
							}
						},
					}, {
						name: '金山',
						id: 310116,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.金山,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '金山' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.金山,
								opacity: (pa.name === '金山' ? 1 : 0.3),
							}
						},
					}, {
						name: '松江',
						id: 310117,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.松江,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '松江' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.松江,
								opacity: (pa.name === '松江' ? 1 : 0.3),
							}
						},
					}, {
						name: '青浦',
						id: 310118,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.青浦,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '青浦' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.青浦,
								opacity: (pa.name === '青浦' ? 1 : 0.3),
							}
						},
					}, {
						name: '奉贤',
						id: 310120,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.奉贤,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '奉贤' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.奉贤,
								opacity: (pa.name === '奉贤' ? 1 : 0.3),
							}
						},
					}, {
						name: '崇明',
						id: 310230,
						label: defaultLabelShow,
						itemStyle: {
							normal: {
								areaColor: obj.崇明,
								borderColor: '#fff',
								borderWidth: 1,
								opacity: (pa.name === '崇明' ? 1 : 0.3),
							},
							emphasis: {
								areaColor: obj.崇明,
								opacity: (pa.name === '崇明' ? 1 : 0.3),
							}
						},
					}]

				}]

			}
		},

		bindEve: function(option) {
			var self = this;
			if(this.toNext) {
				var flag = true;
				var placeName;
				option.callback && $('#map canvas').on('click', function() {
					if($('#map div').eq(0).css('cursor') != 'pointer' && !flag) {
						self.chart.setOption(self._getOpt(option));
						option.callback.call(self, 1);
						flag = true;
					}
				}) && this.chart.on('click', function(pa) {
					if(flag) {
						self.chart.setOption(self._getOptTwo(option, pa));
						option.callback.call(self, pa);
						placeName = pa.name;
						flag = false;
					} else {
						if(pa.name == placeName) {
							self.chart.setOption(self._getOpt(option, pa));
							option.callback.call(self, 1);
							flag = true;
						} else {
							self.chart.setOption(self._getOptTwo(option, pa));
							option.callback.call(self, pa);
							placeName = pa.name;
							flag = false;
						}
					}
				});
			}
		}

	}

	_map.prototype.constructor = _map;
	return _map;
});
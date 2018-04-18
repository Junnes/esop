define(['require', 'jquery'], function(require, $) {
	function line(option) {
		require(['barGraph'], function(barGraph) {
			new barGraph($.extend(option, {
				type: 'barGraph',
				lineType: 1,
				topLast: 0, //开关：Top&Last
				typeBefore: 'doubleLine'
			}));
		});
	}
	return line;
});
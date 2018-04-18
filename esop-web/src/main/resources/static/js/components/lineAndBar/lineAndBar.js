define(['require', 'jquery'], function(require, $) {
	function line(option) {
		require(['barGraph'], function(barGraph) {
			new barGraph($.extend(option, {
				type: 'barGraph',
				lineType: 3,
				topLast: 0 //开关：Top&Last
			}));
		});
	}
	return line;
});
define(['require', 'jquery'], function(require, $) {
	function line(option) {
		require(['barGraph'], function(barGraph) {
			new barGraph($.extend(option, {
				type: 'barGraph',
				lineType: 2,
				cutHead: 0, //开关：去首尾
				typeBefore: 'bar'
			}));
		});
	}
	return line;
});
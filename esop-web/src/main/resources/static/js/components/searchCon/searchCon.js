(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory($) :
		typeof define === 'function' && define.amd ? define(['jquery', 'Module'], factory) :
		(global.searchCon = factory ($, Module));
})(this, function ($, Module) {
	function searchCon (_option) {
		this._init(_option);
	}
	searchCon.prototype = {
		_init: function (option) {
			
		}
	};
	searchCon.prototype.constructor = searchCon;
	return searchCon;
})
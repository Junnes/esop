define(['AIMapAPI'], function(AIMapAPI) {
	window.BMap_loadScriptTime = (new Date).getTime();
	window.BMap = window.BMap || {};
	window.BMap.apiLoad = function() {
		delete window.BMap.apiLoad;
		if (typeof AIMapAPI.AIMap_encapsulateBMap == "function") {
			AIMapAPI.AIMap_encapsulateBMap();
		}
	};
	
	AIMapAPI.AIMap_asysScript('apiv2.0');
//	AIMapAPI.AIMap_asysScript('../js/lib/apiv2.0.js');
});
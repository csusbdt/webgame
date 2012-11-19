(function() {

	var mapName;

	map = { };

	map.startLoad = function(mapName) {
		util.run(mapName + '.js');
	};
	
	map.endLoad = function() {
		//alert('map loaded');
	};
	
})();

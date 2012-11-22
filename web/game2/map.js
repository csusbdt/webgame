(function() {

	var mapName;

	map = { };

	map.startLoad = function(mapName) {
		$('#content').fadeOut(500, function() {
			view.removeAllDrawables();
			util.run(mapName + '.js');
		});
	};
	
	map.endLoad = function() {	
		$('#content').fadeIn(500);
	};
	
})();

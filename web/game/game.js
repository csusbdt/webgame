(function() {

	//////////////////////////////////////////////////////////////////////////////
	// Create a global game object.
	//////////////////////////////////////////////////////////////////////////////

	window.game = { };

	game.ctx = document.getElementById('canvas').getContext('2d');

	game.resizeCanvas = function(width, height) {
		document.getElementById('canvas').width = game.width = width;
		document.getElementById('canvas').height = game.height = height;
	}
	
	game.clearCanvas = function() {
		game.ctx.clearRect(0, 0, game.width, game.height);
	}
	
	game.getURLParameter = function(name) {
		var param = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
		return param === null ? null : decodeURI(param);
	}
	
	game.runScript = function(fileName) {
		var script = document.createElement('script');
		script.setAttribute('src', fileName);
		document.getElementsByTagName('head')[0].appendChild(script);
		document.getElementsByTagName('head')[0].removeChild(script);
	}

	game.loadMap = function(mapName) {
		game.clearCanvas();
		game.runScript('maps/' + mapName + '.js');
		game.mapName = mapName;	
	};
	
	game.exit = function() {
		window.location.assign('../index.html');
	}
	
	//////////////////////////////////////////////////////////////////////////////
	// Initialize game.
	//////////////////////////////////////////////////////////////////////////////
	
	game.resizeCanvas(256, 400);
	
	(function() {
		var mapName = game.getURLParameter('map');
		if (mapName === null) mapName = localStorage.getItem('mapName');
		if (mapName === null) mapName = 'home';
		game.loadMap(mapName);
	})();

})();

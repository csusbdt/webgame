(function() {

	var SHOW_GRID = true;

	//////////////////////////////////////////////////////////////////////////////
	// Create a global game object.
	//////////////////////////////////////////////////////////////////////////////

	window.game = { };

	game.ctx = document.getElementById('canvas').getContext('2d');

	game.resizeCanvas = function(width, height) {
		document.getElementById('canvas').width = game.width = width;
		document.getElementById('canvas').height = game.height = height;
	};
	
	game.setGrid = function(cellSize, cols, rows) {
		game.cellSize = cellSize;
		game.cols = cols;
		game.rows = rows;
		game.resizeCanvas(cellSize * cols, cellSize * rows);
	};
	
	game.clearCanvas = function() {
		game.ctx.clearRect(0, 0, game.width, game.height);
	};
	
	game.getURLParameter = function(name) {
		var param = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
		return param === null ? null : decodeURI(param);
	};
	
	game.runScript = function(fileName, completionCallback) {
		var script = document.createElement('script');
		script.onload = function() {
			document.getElementsByTagName('head')[0].removeChild(script);
			if (completionCallback) completionCallback();
		};
		script.type = 'text/javascript';
		script.setAttribute('src', fileName);
		document.getElementsByTagName('head')[0].appendChild(script);
	};

	game.loadMap = function(mapName, completionCallback) {
		game.clearCanvas();
		for (var draw in game.drawFunctions) {
			delete game.drawFunctions.draw;
		}
		game.runScript('maps/' + mapName + '.js', function() {
			game.mapName = mapName;
			if (SHOW_GRID) game.drawFunctions.drawGrid = game.drawGrid;
			if (completionCallback) completionCallback();
			game.redraw();
		});
	};
	
	game.exit = function() {
		window.location.assign('../index.html');
	};
	
	game.drawGrid = function() {
		var col = 0,
			row = 0,
			x = 0,
			y = 0;
		for (col = 0; col < game.cols; ++col) {
			for (row = 0; row < game.rows; ++row) {
				game.ctx.setTransform(1, 0, 0, 1, game.cellSize * col, game.cellSize * row);
				game.ctx.strokeRect(0, 0, game.cellSize, game.cellSize);
			}
		}
		game.ctx.setTransform(1, 0, 0, 1, 0, 0);
	};
	
	game.drawFunctions = { };
	
	game.redraw = function() {
		game.ctx.clearRect(0, 0, game.width, game.height);
		for (var draw in game.drawFunctions) {
			game.drawFunctions[draw]();
		}
	};
	
	game.npcs = { };
	
	//////////////////////////////////////////////////////////////////////////////
	// Initialize game.
	//////////////////////////////////////////////////////////////////////////////
		
	(function() {
		var mapName = game.getURLParameter('map');
		if (mapName === null) mapName = localStorage.getItem('mapName');
		if (mapName === null) mapName = 'home';
		game.loadMap(mapName, function() { });
	})();

})();

(function() {
	
	//////////////////////////////////////////////////////////////////////////////
	// Create a global game object.
	//////////////////////////////////////////////////////////////////////////////

	window.game = { };

	// drawing functions
	
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
		game.grid = [ ];
		for (var x = 0; x < cols; ++x) {
			var row = [ ];
			for (var y = 0; y < rows; ++y) {
				row.push([]);
			}
			game.grid.push(row);
		}
	};

	var drawableLayers = [ ];
	var WEIGHT = 0.03;
	var currentTime = new Date().getTime();
	var previousTime = currentTime;
	game.averageFrameTime = 16;
	
	function animationLoop() {
		currentTime = new Date().getTime();
		var frameTime = currentTime - previousTime;
		previousTime = currentTime;
		game.averageFrameTime = game.averageFrameTime * (1 - WEIGHT) + frameTime * WEIGHT;
		game.ctx.clearRect(0, 0, game.width, game.height);
		for (var layerIndex = 0; layerIndex < drawableLayers.length; ++layerIndex) {
			var layer = drawableLayers[layerIndex];
			for (var i = 0; i < layer.length; ++i) {
				layer[i].draw();
			}
		}
		requestAnimationFrame(animationLoop);
	};
	requestAnimationFrame(animationLoop);


	game.addDrawable = function(layerIndex, drawable, duration) {
		if (typeof drawableLayers[layerIndex] === 'undefined') {
			drawableLayers[layerIndex] = [ ];
		}
		var layer = drawableLayers[layerIndex];
		for (var i = 0; i < layer.length; ++i) {
			if (layer[i] === drawable) {
				return;
			}
		}
		layer.push(drawable);
		if (typeof duration !== 'undefined') {
			setTimeout(function() {
				game.removeDrawable(layerIndex, drawable);
			}, duration);
		}
	};
	
	game.removeDrawable = function(layerIndex, drawable) {
		var layer = drawableLayers[layerIndex];
		for (var i = 0; i < layer.length; ++i) {
			if (layer[i] === drawable) {
				layer[i] = layer[layer.length - 1];
				layer.pop();
				return;
			}
		}
	};

	// miscellaneous 
	
	game.getURLParameter = function(name) {
		var param = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
		return param === null ? null : decodeURI(param);
	};
	
	game.exit = function() {
		window.location.assign('../index.html');
	};
	
	// dynamic script execution
	
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

	game.loadMap = function(mapName) {
	
		// Clear existing map features.
		drawableLayers = [ ];
		game.controllerStack = [ ];
		game.npcs = { };
		delete game.grid;
		
		// Run map creation script.
		game.runScript('maps/' + mapName + '.js', function() {
			if (GridLines) game.addDrawable(0, new GridLines());
		});
	};

 	game.loadNpc = function(npcName, col, row, completionCallback) {
 		if (game.npcs.hasOwnProperty(npcName)) {
 			console.log('WARNING: NPC already loaded: ' + npcName);
 			return;
 		}
 		var npc = new NPC(col, row);
 		game.npcs[npcName] = npc;
 		npc.init(npcName, completionCallback);
 	};

	// input handling
	
	game.controllerStack = [ ];
	
	//////////////////////////////////////////////////////////////////////////////
	// Set up input handling.
	//////////////////////////////////////////////////////////////////////////////
		
	document.getElementsByTagName('html')[0].onkeyup = function(e) {
		if (game.controllerStack.length === 0) return;
		game.controllerStack[game.controllerStack.length - 1](e);
	};
	
	//////////////////////////////////////////////////////////////////////////////
	// Average milliseconds per animation frame.
	//
	// Note: Javascript Date object does not give reliable time values, so we
	//       maintain a moving average frame time.
	//
	//////////////////////////////////////////////////////////////////////////////

	
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

(function(window) {

	var SHOW_GRID = true;

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
	};

	var drawableLayers = [ ];

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
				game.redraw();
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
			
	game.redraw = function() {
		game.ctx.clearRect(0, 0, game.width, game.height);
		for (var layerIndex = 0; layerIndex < drawableLayers.length; ++layerIndex) {
			var layer = drawableLayers[layerIndex];
			for (var i = 0; i < layer.length; ++i) {
				layer[i].draw();
			}
		}
	};
	
	game.clearCanvas = function() {
		game.ctx.clearRect(0, 0, game.width, game.height);
	};
	
	var grid = {
		'draw': function() {
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
		}
	};
	
	// miscellaneous utilities

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
		game.clearCanvas();
		
		// Clear existing map features.
		drawableLayers = [ ];
		game.controllerStack = [ ];
		game.npcs = { };
		
		// Run map creation script.
		game.runScript('maps/' + mapName + '.js', function() {
			if (SHOW_GRID) game.addDrawable(0, grid);
			game.redraw();
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
// 		if (e.which === 87) {         // 'w'
// 		} else if (e.which === 83) {  // 's'
// 		} else if (e.which === 65) {  // 'a'
// 		} else if (e.which === 68) {  // 'd'
// 		} else if (e.which === 32) {  // space 
// 			if (game.inputHandlers.space) game.inputHandlers.space();
// 		}
	};
	
	//////////////////////////////////////////////////////////////////////////////
	// Initialize game.
	//////////////////////////////////////////////////////////////////////////////
		
	(function() {
		var mapName = game.getURLParameter('map');
		if (mapName === null) mapName = localStorage.getItem('mapName');
		if (mapName === null) mapName = 'home';
		game.loadMap(mapName, function() { });
	})();

})(window);

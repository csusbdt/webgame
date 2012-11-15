(function() {
	
	window.game = { };

	// The grid maintains information about where the npcs are.
	game.setGrid = function(cellSize, cols, rows) {
		game.cellSize = cellSize;
		game.cols = cols;
		game.rows = rows;
		game.grid = [ ];
		for (var x = 0; x < cols; ++x) {
			var row = [ ];
			for (var y = 0; y < rows; ++y) {
				row.push([]);
			}
			game.grid.push(row);
		}
		view.resize(cellSize * cols, cellSize * rows);
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
		view.clear();
		game.controllerStack = [ ];
		game.npcs = { };
		delete game.grid;
		
		// Run map creation script.
		game.runScript('maps/' + mapName + '.js', function() {
			if (GridLines) view.addDrawable(0, new GridLines());
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
	// Initialize game.
	//////////////////////////////////////////////////////////////////////////////
		
	(function() {
		var mapName = game.getURLParameter('map');
		if (mapName === null) mapName = localStorage.getItem('mapName');
		if (mapName === null) mapName = 'home';
		game.loadMap(mapName, function() { });
	})();

})();

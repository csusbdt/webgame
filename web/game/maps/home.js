(function() {

	game.setGrid(64, 4, 6);
	
	var title = {
		'draw': function() {
			game.ctx.font = "bold 12px sans-serif";
			game.ctx.fillText("welcome home.", 50, 50);
		}
	};

	game.addDrawable(0, title, 2000);
	
	var controller = function(e) {
		if (e.which === 32) game.loadMap('forest');	
	}

	game.loadNpc('pepper', 2, 3, function() {
		game.controllerStack.push(controller);
		game.redraw();
	});

})();

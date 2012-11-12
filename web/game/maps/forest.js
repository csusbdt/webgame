(function() {

	var title = {
		'draw': function() {
			game.ctx.font = "bold 12px sans-serif";
			game.ctx.fillText("welcome to the forest.", 50, 50);
		}
	};

	game.addDrawable(0, title, 2000);

	game.setGrid(64, 5, 5);
	
	game.controllerStack.push(function(e) {
		if (e.which === 32) game.loadMap('gameover');	
	});

})();

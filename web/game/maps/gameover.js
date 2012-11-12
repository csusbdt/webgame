(function() {

	var title = {
		'draw': function() {
			game.ctx.font = "bold 12px sans-serif";
			game.ctx.fillText("game over.", 50, 50);
		}
	};
	
	game.addDrawable(0, title);

	game.setGrid(64, 3, 3);	

	game.controllerStack.push(function(e) {
		if (e.which === 32) game.exit();	
	});

})();

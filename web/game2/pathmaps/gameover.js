(function() {

	view.resize(200, 200);
	
	view.addDrawable(0, {
		draw: function(dt, ctx) {
			ctx.font = 'bold 14px sans-serif';
			ctx.fillStyle = "#000000";
			ctx.fillText('Thank you for playing.', 50, 50);
			ctx.fillText('Press space to exit.', 50, 80);
		}
	});

	input.handlerStack.push(function(e) {
		if (e.which === 32) {
			util.exit();
		}
	});
	
	map.endLoad();	

})();

(function() {

	view.resize(200, 200);
	
	view.addDrawable(0, {
		draw: function(ctx) {
			ctx.font = 'bold 12px sans-serif';
			ctx.fillStyle = "#000000";
			ctx.fillText('Thank you for playing.', 50, 50);
			ctx.fillText('Press space to exit.', 50, 80);
		}
	});

	input.handlerStack.push(function(e) {
		if (e.which === 32) {
			$('#content').fadeOut(500, function() {
				util.exit();
			});
		}
	});
	
	$('#content').fadeIn(500);

	map.endLoad();	

})();

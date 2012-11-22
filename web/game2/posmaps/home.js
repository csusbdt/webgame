(function() {

	var pepperImage = util.getImage('pepper.png'),
		pepperNpc = { };

	function positionSelectHandler(e) {
		var x = e.clientX;
		var y = e.clientY;
		if (x > 100 && x < 100 + pepperImage.width &&
			y > 100 && y < 100 + pepperImage.height) {
				
				util.exit();
		}
	}
	
	pepperNpc.draw = function(dt, ctx) {
		ctx.drawImage(pepperImage, 100, 100);
	};
	
	// Fill entire viewport with canvas.	
	$('#content').css('width', '100%');
	view.resize($('#content').width(), $('#content').height());
	onresize = function() {
		view.resize($('#content').width(), $('#content').height());
	};
	
	view.addDrawable(0, pepperNpc);
	
	input.handlerStack.push(positionSelectHandler);

	map.endLoad();	

})();

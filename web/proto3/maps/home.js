(function() {

	var MOVE_SPEED = 0.1,   // pixels per millisecond
		SNAP_DISTANCE = 2,  // pixels
		floorHeight,
		pc = { },
		floor = { },
		pepperImage = new Image();

	pepperImage.src = 'images/pepper.png';
	pc.draw = function(dt, ctx) {
		var delta = MOVE_SPEED * dt;
		if (pc.x < pc.destX) {
			pc.x += delta;
			if (pc.x > pc.destX - SNAP_DISTANCE) pc.x = pc.destX;
		} else if (pc.x > pc.destX) {
			pc.x -= delta;
			if (pc.x < pc.destX + SNAP_DISTANCE) pc.x = pc.destX;
		}
		ctx.drawImage(pepperImage, pc.x, pc.y - 32);
	}

	// Fill entire viewport with canvas.
	view.resize($(window).innerWidth(), $(window).innerHeight());
	floorHeight = view.height / 2;

	pc.x = 0;
	pc.destX = pc.x;
	pc.y = view.height - floorHeight;
	pc.destY = pc.y;

	floor.draw = function(dt, ctx) {
		ctx.save();
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(0, view.height - floorHeight);
		ctx.lineTo(view.width, view.height - floorHeight);
		ctx.stroke();
		ctx.restore();
	};

	view.addDrawable(pc, 1);
	view.addDrawable(floor);  // default layer is 0
	
	$(document).click(function(e) {
		pc.destX = e.pageX - 16;
	});
	
	$(window).keypress(function(e) {
		map.startLoad('maps/flex');
	});
	
	map.endLoad();	

})();

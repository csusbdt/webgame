(function() {

	var groundHeight = view.DRAW_AREA_HEIGHT / 2,
		floor = { },
		background = { },
		MIN_X = (view.DRAW_AREA_WIDTH - view.GAME_PLAY_WIDTH) / 2,
		MAX_X = view.DRAW_AREA_WIDTH - MIN_X,
		door = { };
		
	// Construct background object.
	(function() {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = view.DRAW_AREA_WIDTH;
		canvas.height = view.DRAW_AREA_HEIGHT;
		background.image = canvas;
		context.fillStyle="#00FF00";
		context.fillRect(0, 0, view.DRAW_AREA_WIDTH, view.DRAW_AREA_HEIGHT); 
		context.fillStyle="#FF0000";
		context.fillRect(
			(view.DRAW_AREA_WIDTH - view.GAME_PLAY_WIDTH) / 2, 
			(view.DRAW_AREA_HEIGHT - view.GAME_PLAY_HEIGHT) / 2, 
			view.GAME_PLAY_WIDTH,
			view.GAME_PLAY_HEIGHT); 		
		background.draw = function(dt, ctx) {
			ctx.drawImage(background.image, 0, 0);
		};
	})();	
	view.addDrawable(background);
		
	// Construct door object.
	(function() {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = 30;
		canvas.height = 46;
		door.image = canvas;
		door.x = 200;
		door.w = 30;
		context.fillStyle="#0000FF";
		context.fillRect(0, 0, canvas.width, canvas.height); 
		door.draw = function(dt, ctx) {
			ctx.drawImage(door.image, door.x, groundHeight - canvas.height);
		};
	})();	
	view.addDrawable(door);

	pc.x = view.DRAW_AREA_WIDTH / 2;
	pc.destX = pc.x;
	pc.y = groundHeight;
	pc.destY = pc.y;
	pc.onArrival = function() { };

	view.addDrawable(pc);

	floor.draw = function(dt, ctx) {
		ctx.save();
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(0, groundHeight);
		ctx.lineTo(view.DRAW_AREA_WIDTH, groundHeight);
		ctx.stroke();
		ctx.restore();
	};

	view.addDrawable(pc, 1);
	view.addDrawable(floor);  // default layer is 0
	
	$(document).click(function(e) {
		var x = view.getX(e);
		if (x > door.x && x < door.x + door.w) {
			x = door.x + door.w / 2;
			pc.onArrival = function() {
				playClick();
				map.startLoad('maps/home');
			};
		}
		if (x < MIN_X + 16) {
			pc.destX = MIN_X + 16;
		} else if (x > MAX_X - 16) {
			pc.destX = MAX_X - 16;
		} else {
			pc.destX = x;
		}
	});

	map.endLoad();	

})();

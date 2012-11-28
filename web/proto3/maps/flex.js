(function() {

	var groundHeight = view.DRAW_AREA_HEIGHT / 2,
		pepperImage = new Image(),
		pc = { },
		floor = { },
		background = { },
		MOVE_SPEED = 0.1,   // pixels per millisecond
		SNAP_DISTANCE = 2,  // pixels
		MIN_X = (view.DRAW_AREA_WIDTH - view.GAME_PLAY_WIDTH) / 2,
		MAX_X = view.DRAW_AREA_WIDTH - MIN_X;
		
	view.addDrawable(
		{
			draw: function(dt, ctx) {
				ctx.font = 'bold 14px sans-serif';
				ctx.fillStyle = "#000000";
				ctx.fillText('This example illustrates how to adapt a gameplay area to different screens.', MIN_X, 150);
				ctx.fillText('The green rectangle is the background image.', MIN_X, 180);
				ctx.fillText('The red rectangle is the game play area.', MIN_X, 210);
				ctx.fillText('The system always keeps the game play area visible.', MIN_X, 240);
				ctx.fillText('The system tries to render as much of the green area as possible without further reducing the scale.', MIN_X, 270);
				ctx.fillText('Click on the screen to move the pepper; it will not leave the game play area.', MIN_X, 300);
			}
		},
		1);
		
	// Construct a test background object.		
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
		ctx.drawImage(pepperImage, pc.x - 16, pc.y - 32);
	}
	
	pc.x = view.DRAW_AREA_WIDTH / 2;
	pc.destX = pc.x;
	pc.y = groundHeight;
	pc.destY = pc.y;

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

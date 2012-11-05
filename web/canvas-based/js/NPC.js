define(['map'], function(map) {
	var NPC = function(imageFile) {
		this.imageFile = imageFile || 'pepper.png';
		this.col = 0;
		this.row = 0;
	}
	NPC.interact = function() {	
		if (map.pc.col === this.col && map.pc.row === this.row) {
			alert('Hi.');
		}
	}
	return NPC;
});

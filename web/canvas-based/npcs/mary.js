define(['NPC'], function(NPC) {
	var mary = new NPC('mary.png');
	mary.interact = function() {	
		alert('I am Mary.');
	}
	return mary;
});

define(['NPC'], function(NPC) {
	var mary = new NPC('fred.png');
	mary.interact = function() {	
		alert('I am Mary.');
	}
	return mary;
});

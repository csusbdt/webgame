define(['NPC'], function(NPC) {
	var pepper = new NPC('pepper.png');
	pepper.interact = function() {	
		alert('I am a pepper.');
	}
	return pepper;
});

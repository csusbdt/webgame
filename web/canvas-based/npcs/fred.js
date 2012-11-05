define(['NPC'], function(NPC) {
	var fred = new NPC('fred.png');
	fred.interact = function() {	
		alert('I am Fred. Fred I am. I am Fred I Am.');
	}
	return fred;
});

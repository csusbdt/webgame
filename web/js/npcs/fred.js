define(['jquery'], function($) {
	var fred = { 
		'update': function() {	
			if ($('#fred').siblings('#pc').length > 0) {
				alert('fred speaks');
			}
		}
	}

	return fred;
});

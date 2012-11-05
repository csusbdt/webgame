define(['jquery'], function($) {
	var mary = { 
		'update': function() {	
			if ($('#mary').siblings('#pc').length > 0) {
				alert('mary speaks');
			}
		}
	}

	return mary;
});

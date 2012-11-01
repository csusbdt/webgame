define(['jquery'], function($) {
	var npcUpdateFunctions = $.Callbacks();

	var map = {
		'init': function() {
			$('.npc').each(function() {
				var npcName = $(this).attr('id');
				curl(['npcs/' + npcName], function(npc) {
					npcUpdateFunctions.add(npc.update);
				});
			});
		},
		'pc': {
			'moveUp': function() {
				var cell = $('#pc').parent();
				var row = cell.parent();
				var rowPos = row.prevAll().length;
				if (rowPos === 0) return;
				var colPos = cell.prevAll().length;
				var destRow = row.prev();
				var destCell = destRow.children().eq(colPos);
				$('#pc').appendTo(destCell);
			}
		}
	}
		
	$('html').keypress(function(e) {
		if (e.which === 119) {        // 'w'
			map.pc.moveUp();
		} else if (e.which === 115) { // 's'
			alert('s');
		} else if (e.which === 97) {  // 'a'
			alert('a');
		} else if (e.which === 100) { // 'd'
			alert('d');
		} else if (e.which === 32) {  // space 
			alert('space');
		}
		npcUpdateFunctions.fire();
	});

	return map;
});

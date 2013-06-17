$(window).ready(function(){
	var filterInput = $('[data-filter]');

	filterInput.keyup(function(e){
		var filter = $(this).val(), count = 0;
		var filterTarget = $(this).attr("data-filter-target");
		$('[data-filter-items='+filterTarget+']').children().each(function(){
			// If the list item does not contain the text phrase fade it out
	    if ($(this).find('h4').text().search(new RegExp(filter, "i")) < 0) {
        $(this).fadeOut();
	    // Show the list item if the phrase matches and increase the count by 1
	    } else {
        $(this).fadeIn();
        count++;
	    }
		});
	// Update the count
	var numberItems = count;
	});
});
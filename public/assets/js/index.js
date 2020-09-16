$(function() {
    $('#slider-rating').slider({
		range: true,
		min: 0,
		max: 5,
		values: [ 0, 5 ],
		slide: function( event, ui ) {
			console.log(ui.values[0]);
			console.log(ui.values[1]);
		}
    });
	$('#slider-rating').slider('values', 0) + $('#slider-rating').slider('values', 1);
} );

$(function() {
    $('#slider-cost').slider({
      range: true,
      min: 0,
      max: 5,
      values: [ 0, 5 ],
    });
    $('#slider-cost').slider('values', 0) + $('#slider-cost').slider('values', 1);
} );

$(document).on('click','.display__restaurant',function(){
	let $id = $(this).attr('id');
	let $param = '/restaurant?res_id=' + $id;

	getRestaurant($param);
});

// Update restaurant when checkbox checkbox is changed
$(document).on('change', 'input:checkbox', function(){
	if('category-filter' === $(this).parent().attr('id')) {
		if($(this).is(':checked')) {
			$('#category-filter input:checkbox').not('#' + this.id).prop('checked', false); // Uncheck other category checboxes
		}
	}
	let categoryQuery = $('#category-filter').serialize();
	let cuisinesQuery = $('#cuisines-filter').serialize();

	// Modify cuisines query to match API request
	cuisinesQuery = cuisinesQuery.replace(/&cuisines=/g, '%2C');

	if('' !== categoryQuery) {
		categoryQuery = '&' + categoryQuery;
	}

	if('' !== cuisinesQuery) {
		cuisinesQuery = '&' + cuisinesQuery;
	}

	let query = cuisinesQuery + categoryQuery;

	// Load restaurants with new query parameters
	loadRestaurant(query);
});

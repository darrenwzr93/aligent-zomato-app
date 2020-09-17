$(function() {
    $('#slider-rating').slider({
		range: true,
		min: 0,
		max: 5,
		values: [ 0, 5 ],
		// Prevent slider handles from overlapping
		slide: function( event, ui ) {
			if ( ( ui.values[ 0 ] ) >= ui.values[ 1 ] ) {
				return false;
			}
			if ( ( ui.values[ 1 ] ) <= ui.values[ 0 ] ) {
				return false;
			}
		},
		change: function( event, ui ) {
			$minRating = ui.values[0];
			$maxRating = ui.values[1];
			loadRestaurant();
		}
    });
} );

$(function() {
    $('#slider-cost').slider({
      range: true,
      min: 1,
      max: 5,
	  values: [ 1, 5 ],
	  // Prevent slider handles from overlapping
	  slide: function( event, ui ) {
		if ( ( ui.values[ 0 ] ) >= ui.values[ 1 ] ) {
			return false;
		}
		if ( ( ui.values[ 1 ] ) <= ui.values[ 0 ] ) {
			return false;
		}
	},
	  change: function( event, ui ) {
		$minCost = ui.values[0];
		$maxCost = ui.values[1];
		loadRestaurant();
	}
    });
} );

$(document).on('click','.display__restaurant',function(){
	let $id = $(this).attr('id');
	let $param = '/restaurant?res_id=' + $id;

	$('.display__restaurant').removeClass('active');
	$(this).addClass('active');
	$('.display__details-results').css('display', 'flex');
	getRestaurant($param);
});

// Update restaurant when checkbox checkbox is changed
$(document).on('change', 'input:checkbox', function(){
	if('category-filter' === $(this).parent().parent().attr('id')) {
		if($(this).is(':checked')) {
			$('#category-filter .checkbox input:checkbox').not('#' + this.id).prop('checked', false); // Uncheck other category checboxes
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

	filterRestaurant(cuisinesQuery + categoryQuery);
});

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

	getRestaurant($id);
});

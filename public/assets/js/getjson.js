let $domain = 'https://developers.zomato.com/api/v2.1'; // Zomato API domain
let $query = '/search?entity_id=297&entity_type=city'; // Set city query to Adelaide
let $url = $domain + $query;
let $data = [];
let $filter = '';
let $minRating = 0;
let $maxRating = 5;
let $minCost = 0;
let $maxCost = 5;

// Fetch JSON response
async function postData(url) {
	const response = await fetch(url, {
	  method: 'POST',
	  mode: 'cors',
	  cache: 'no-cache',
	  credentials: 'same-origin',
	  headers: {
		'Content-Type': 'application/json',
		'User-Key': 'd58fab066f0fef1dcf5ba10953846cd1' // API key generated from https://developers.zomato.com/api#headline2
	  },
	  redirect: 'follow',
	  referrerPolicy: 'no-referrer',
	});
	return response.json();
}

$(document).ready(function () {
	// Get restaurant categories
	// postData($domain + '/categories')
	// .then(data=> {
	// 	$.each(data.categories.map((o) => o.categories), function(index, category) {
	// 		let $name = category.name;

	// 		$('#category-filter').append('<input type="checkbox" name="category" id="' + index + '"value = "' + index + '"><label for="' + index + '">' + $name + '</label>')
	// 	})
	// })

	// Get restaurant cuisines
	// postData($domain + '/cuisines?city_id=297') // query cuisines in Adelaide only
	// .then(data=> {
	// 	$.each(data.cuisines.map((o) => o.cuisine), function(index, cuisine) {
	// 		let $name = cuisine.cuisine_name;

	// 		$('#cuisines-filter').append('<input type="checkbox" name="cuisines" id="' + index + '"value = "' + index + '">' + $name + '</label>')
	// 	})
	// })

	loadRestaurant();
});

// Load restaurant results
function loadRestaurant() {
	$('#restaurant-list').empty();
	$('#restaurant-list').append('<li><strong>RESULTS</strong></li>');
	$('.display__details-results').css('display', 'none');

	let $start = 0;

	// Do this to return 100 restaurant results
	for(var i = 0; i < 4; i++ ) {
		postData($url + $filter + '&start=' + $start)
		.then(data=> {
			data.restaurants = filterRange(data.restaurants);
			if(data.restaurants.length > 1) {
				$.each(data.restaurants.map((o) => o.restaurant), function(index, restaurant) {
					let $name = restaurant.name;
					let $id = restaurant.id;

					$('#restaurant-list').append('<li class="display__restaurant" id="' + $id + '">' + $name + '</li>');
				})
			}
		})
		$start += 20;
	}
}

// Get restaurant and display restaurant details
function getRestaurant(param) {
	postData($domain + param)
	.then(data=> {
		let $name = data.name;
		let $thumbnail = data.thumb;
		let $address = data.location.address;
		let $bookings = data.has_table_booking;
		let $delivery = data.is_delivering_now;
		let $cuisines = data.cuisines;
		let $phone = data.phone_numbers;
		let $opening = data.timings;

		$('.display__details-image img').attr('src', $thumbnail);
		$('#restaurant-name').text($name);
		$('#restaurant-address').text($address);
		if( $bookings == 0) {
			$('#restaurant-bookings').addClass('false');
			$('#restaurant-bookings').text('No bookings');
		} else {
			$('#restaurant-bookings').addClass('true');
			$('#restaurant-bookings').text('Bookings available');
		}
		if( $delivery == 0) {
			$('#restaurant-delivery').addClass('false');
			$('#restaurant-delivery').text('No delivery');
		} else {
			$('#restaurant-delivery').addClass('true');
			$('#restaurant-delivery').text('Delivery available');
		}
		$('#restaurant-cuisines').text($cuisines);
		$('#restaurant-phone').text($phone);
		$('#restaurant-opening').text($opening);
	})
}

// Filter restaurant by category and cuisines
function filterRestaurant(query) {
	$filter = query;
	loadRestaurant();
}

// Filter restaurant by range
function filterRange(data) {
	return data.filter(val => val.restaurant.user_rating.aggregate_rating >= $minRating && val.restaurant.user_rating.aggregate_rating <= $maxRating && val.restaurant.price_range >= $minCost && val.restaurant.price_range <= $maxCost);
}

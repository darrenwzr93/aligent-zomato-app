let $domain = 'https://developers.zomato.com/api/v2.1'; // Zomato API domain
let $query = '/search?entity_id=297&entity_type=city'; // Set city query to Adelaide
let $url = $domain + $query;

// Fetch JSON response
async function postData(url) {
	const response = await fetch(url, {
	  method: 'POST',
	  mode: 'cors',
	  cache: 'no-cache',
	  credentials: 'same-origin',
	  headers: {
		'Content-Type': 'application/json',
		'User-Key': '434882b75814cf577fb2cef0fe69f8ba' // API key generated from https://developers.zomato.com/api#headline2
	  },
	  redirect: 'follow',
	  referrerPolicy: 'no-referrer',
	});
	return response.json();
}

$(document).ready(function() {
	// Get restaurant categories
	postData($domain + '/categories')
	.then(data=> {
		$.each(data.categories.map((o) => o.categories), function(index, category) {
			let $name = category.name;

			$('#category-filter').append('<input type="checkbox" id="' + index + '"><label for="' + index + '">' + $name + '</label>')
		})
	})

	// Get restaurant cuisines
	postData($domain + '/cuisines?city_id=297')
	.then(data=> {
		$.each(data.cuisines.map((o) => o.cuisine), function(index, cuisine) {
			let $name = cuisine.cuisine_name;

			$('#cuisine-filter').append('<input type="checkbox" id="' + index + '"><label for="' + index + '">' + $name + '</label>')
		})
	})

	// Get restaurants
	postData($url)
	.then(data=> {
		$.each(data.restaurants.map((o) => o.restaurant), function(index, restaurant) {
			let $name = restaurant.name;
			let $id = restaurant.id;

			$('#restaurant-list').append('<li class="display__restaurant" id="' + $id + '">' + $name + '</li>');
		})
	})
});

// Get restaurant by ID
function getRestaurant(id) {
	postData($domain + '/restaurant?res_id=' + id)
	.then(data=> {
		let $name = data.name;
		let $thumbnail = data.thumb;
		let $address = data.location.address;
		let $bookings = data.is_zomato_book_res;
		let $delivery = data.is_delivering_now;
		let $cuisines = data.cuisines;
		let $phone = data.phone_numbers;
		let $opening = data.timings;

		$('.display__details-image img').attr('src', $thumbnail);
		$('.display__details-name').text($name);
		$('.display__details-address').text($address);
		$('.display__details-bookings').text($bookings);
		$('.display__details-delivery').text($delivery);
		$('.display__details-cuisines').text($cuisines);
		$('.display__details-phone').text($phone);
		$('.display__details-opening').text($opening);
	})
}

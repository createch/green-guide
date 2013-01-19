var api_url = "api.php?";

$(document).ready(function() {


	$(".searchButton").on("click", function() {

		var q = $(".searchQuery").val();

		$.get(api_url + "q=" + q, function(data) {
			console.log(data)

			// normalize a single result into the array
			var entity = data.entities.entity;
			window.products = [];
			if (entity.length > 0)
				products = entity;
			else {
				products.push(entity);
			}


			console.log(products);

			products.forEach(function(el, index, arr) {
				// console.log(arguments)

				var html = new EJS({
	                url: 'templates/singleproduct.ejs'
	            }).render({
	            	image: el["image-url"],
	            	name: el["name"]
	            });

	            $(".results").append(html);

	            console.log(html)

			})
		});

	});

});
var api_url = "api.php?";

$(document).ready(function() {

	index();

});


var index = function() {


	var html = new EJS({
        url: 'templates/index.ejs'
    }).render({});

	$("body").html(html)

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

			searchResults(products);

		});

	});
}

var searchResults = function(products) {

	var html = new EJS({
        url: 'templates/results.ejs'
    }).render({});

	$("body").html(html)

	products.forEach(function(el, index, arr) {
		// console.log(arguments)

		var html = new EJS({
            url: 'templates/productlistitem.ejs'
        }).render({
        	id: el["id"],
        	image: el["image-url"],
        	name: el["name"],
        	value: el["value"]

        });

        $(".results").append(html);

        $(".product-list-item").on("click", function() {
        	productView( $(this).data("id") );
        });

	});

}

var productView = function(productId) {

	$.get(api_url + "id=" + productId, function(data) {

		console.log(data.entities.entity)

		var el = data.entities.entity;

		// var html = new EJS({
  //           url: 'templates/productview.ejs'
  //       }).render({
  //       	name: el["name"] || "",
  //       	image: el["image-url"] || "",
  //       	value: el["value"] || "",
  //       	overall: el.rating.value || "",
  //       	health: el.rating["sub-ratings"].rating[0].value || "",
  //       	env: el.rating["sub-ratings"].rating[1].value || "",
  //       	society: el.rating["sub-ratings"].rating[2].value || ""
  //       });

  //       $("body").html(html);		

	})

}




function executeThisCodeAfterProductsLoads(){
	var productsData = JSON.parse(this.responseText).products;
	getCategories(productsData);
}

function executeThisCodeIfProductsErrors(){
	console.log("it broken");
}

function executeThisCodeIfCategoriesErrors(){
	console.log("it broken");
}

var myProducts = new XMLHttpRequest();
myProducts.addEventListener("load", executeThisCodeAfterProductsLoads);
myProducts.addEventListener("error", executeThisCodeIfProductsErrors);
myProducts.open("GET", "products.json");
myProducts.send();

function getCategories(catz){
	var myCategories = new XMLHttpRequest();
	myCategories.addEventListener("load", executeThisCodeAfterCategoriesLoads);
	myCategories.addEventListener("error", executeThisCodeIfCategoriesErrors);
	myCategories.open("GET", "categories.json");
	myCategories.send();

	function executeThisCodeAfterCategoriesLoads(){
		var categoriesData = JSON.parse(this.responseText).categories;
		combinedArray(catz, categoriesData);
	}
}

function combinedArray(productsArray, categoriesArray){
	// console.log("productsArray", productsArray);
	// console.log("categoriesArray", categoriesArray);
	productsArray.forEach(function(product){
		var currentCategoryId = product["category_id"];
		// console.log("product category_id", currentCategoryId);
		categoriesArray.forEach(function(category){
			if(currentCategoryId === category.id){
				product["categoryName"] = category.name;
				product["seasonDiscount"] = category.season_discount;
				product["discount"] = category.discount;
				product["salePrice"] = product.price - (product.price * product.discount);
			}
		});
	});
	domString(productsArray);
};

function domString(products){
	console.log(products);
	var productString = "";
	for (var i = 0; i < products.length; i++){
		var productCard = products[i];
		productString+=`<div class="product" id="productCard-${i}">`;
		productString+=`<h1 class="name">${productCard.name}</h1>`;
		productString+=`<h2 class="price">${productCard.price}</h2>`;
		productString+=`<h2 class="category_id">${productCard.categoryName}</h2>`;
		productString+=`</div>`;
	}
	writeToDom(productString);
}

//This is my function for the season discount. 

var price = [];
var seasonDiscountPrice = [];
var productPrice = document.getElementsByClassName("price");
var selectedSeason = document.getElementById("selectList");
var season = selectedSeason.value;

function replaceRegularPriceWithDiscountPrice(products, categories){
	for (var i = 0; i < products.length; i++){
		if (season === products[i].seasonDiscount) {
			seasonDiscountPrice = products[i].salePrice;
	        productPrice[i].innerHTML = seasonDiscountPrice;  
	    } else (productPrice[i].innerHTML = price[i]);
	}
}

selectedSeason.addEventListener("change", replaceRegularPriceWithDiscountPrice);


function writeToDom(theProductString){
	var productContainerDiv = document.getElementById("product-container");
	productContainerDiv.innerHTML += theProductString;
}






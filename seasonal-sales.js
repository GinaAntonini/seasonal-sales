//I need a function that merges the two arrays. The function should loop through both arrays and match the corresponding category_id with the name of the department (Apparel, Furniture, Household), then use splice to replace the category_id with the department name. 

// var productsArray = [];
// var categoriesArray = [];
// var newArray = [];

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

function changeToDiscountedPrice () {
	selectList.addEventListener('select', discountPrice);
}

function discountPrice {
	if(seasonDiscount.value === "Winter"){
	 	=== ;
	}
		else (seasonDiscount.value === "Autumn") {
			 === ;
				}
					else (seasonDiscount.value === "Spring") {
						=== ;
					}
}
				

function writeToDom(theProductString){
	var productContainerDiv = document.getElementById("product-container");
	productContainerDiv.innerHTML += theProductString;
}






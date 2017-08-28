//I need a function that merges the two arrays. The function should loop through both arrays and match the corresponding category_id with the name of the department (Apparel, Furniture, Household), then use splice to replace the category_id with the department name. 

var productsArray = [];
var categoriesArray = [];
var newArray = [];

function mergeArrays () {
	for(var i = 0; i < productsArray.length; i++){
		for(var j = 0; j < categoriesArray.length; j++){
			if (productsArray[i].category_id === categoriesArray[j].id) {
				newArray.splice(2);

// function mergeArrays () {
// 	for(var i = 0; i < productsArray.length; i++){
// 		for(var j = 0; j < categoriesArray.length; j++){
// 			if (productsArray[i].category_id === categoriesArray[j].id) {
// 				console.log(productsArray[i]);
// 				console.log(categoriesArray[j]);
// 			}
// 		}
// 	}

// }


function domString(products){
	var productString = "";
	for (var i = 0; i < products.length; i++){
		var productCard = products[i];
		productString+=`<div class="product" id="productCard-${i}">`;
		productString+=`<h1 class="name">${productCard.name}</h1>`;
		productString+=`<h2 class="price">${productCard.price}</h2>`;
		productString+=`<h2 class="category_id">${productCard.category_id}</h2>`;
		productString+=`</div>`;
	}
	writeToDom(productString);
}


function writeToDom(theProductString){
	var productContainerDiv = document.getElementById("product-container");
	productContainerDiv.innerHTML += theProductString;
}

function executeThisCodeAfterFileLoads(){
	var data = JSON.parse(this.responseText);
	productsArray = data.products;
	console.log("in products logging productsArray", productsArray);
	console.log("in products logging categoriesArray", categoriesArray);
}

function executeThisCodeIfFileErrors(){
	console.log("it broken");
}

function executeThisCodeAfterFileLoads2(){
	var data = JSON.parse(this.responseText);
	categoriesArray = data.categories;
	console.log("in categories logging productsArray", productsArray);
	console.log("in categories logging categoriesArray", categoriesArray);
	mergeArrays();
}

function executeThisCodeIfFileErrors2(){
	console.log("it broken");
}

var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", executeThisCodeAfterFileLoads);
myRequest.addEventListener("error", executeThisCodeIfFileErrors);
myRequest.open("GET", "products.json");
myRequest.send();

var myRequest2 = new XMLHttpRequest();
myRequest2.addEventListener("load", executeThisCodeAfterFileLoads2);
myRequest2.addEventListener("error", executeThisCodeIfFileErrors2);
myRequest2.open("GET", "categories.json");
myRequest2.send();



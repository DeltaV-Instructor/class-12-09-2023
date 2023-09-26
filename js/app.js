'use strict';
console.log('app file is connected');

//global variables for grabbing html elements and we are going to set up some arrays to help us hold some values for the logic we need to render random images to the user..
let totalClicks = 0;
//pizza objects will live in here and contain the click info.
const allPizzas = [];
//store the images we have seen
let previouslyPickedPizza = [];
//grab some html elements
let pizzaImageSectionTag = document.getElementById('all_pizzas');
// console.log(totalClicks, allPizzas, previouslyPickedPizza, pizzaImageSectionTag);
let leftPizzaImage = document.getElementById('left_pizza_img');
let rightPizzaImage = document.getElementById('right_pizza_img');
console.log(leftPizzaImage, rightPizzaImage);





//create a constructor function that will create pizza objects that holds data about our pizzas and the clicking info. {pizza info in these objects.}
//function express so we a semi colon.....
const PizzaPicture = function(pizzaName, imageSrc){
  // we are assigning our args to the contextual 'this'
  this.pizzaName = pizzaName;
  this.imageSrc = imageSrc;
  //for when they are clicked on we add up by 1
  this.clicks = 0;
  // how many did we show the image
  this.timesShown = 0;
  allPizzas.push(this);
};



console.log('array? with pizza objects?',allPizzas);










/**
 * need to create a function to handle what happens when we click on the pizza
  add a check to see if we are clicking on a image
  add to our total clicks to finish rounds
  update the pizza object information times shown... both images each time - views
  count what image was clicked  - clicks
  logic -
  display our random images we are going random number from our pizza objects array
  we can then update the "src" in the html to update the image that we are seeing on the page
  add some logic for images that we just used array to store so we dont select those images again for the next round.
  lastly I want to count total clicks if statement when reach the end of 5 clicks 
  remove the event listener so the user can not click any more. 

 *  */
function handleClickOnPizza(event){
  
}


//create a function handleResult list showing ul and li on the left side of the page




//Eventually add the chart here form canvas.js big concept not much to code.


//add our event listeners for our button clicks  = 'click' events functions
//call the constructor function to create out pizza objects
//  PizzaPicture = function(pizzaName, imageSrc){
new PizzaPicture('Papa Vito\'s Thin', 'images/mwDeluxePizzaThinCrust.jpg');
new PizzaPicture('Chicago Deep Dish', 'images/chicagoPizza.jpg');
new PizzaPicture('Brick Oven Pizza', 'images/brickOvenPizza.jpg');
new PizzaPicture('Calzone', 'images/calzonePizza.jpg');
new PizzaPicture('Chicago Pizza and Oven Grinder', 'images/cpoGinderPizza.jpg');
new PizzaPicture('Detroit Style', 'images/detroitPizza.jpg');
new PizzaPicture('New York Thin', 'images/newYorkPizza.jpg');
new PizzaPicture('Shot Gun Dans', 'images/sgDansHtossedMeatLovPizza.jpg');




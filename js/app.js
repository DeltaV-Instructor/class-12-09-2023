'use strict';
console.log('app file is connected');

//global variables for grabbing html elements and we are going to set up some arrays to help us hold some values for the logic we need to render random images to the user..
let totalClicks = 0;
//pizza objects will live in here and contain the click info.
const allPizzas = [];
//store the images we have seen
let previouslyPickedPizzas = [];
//grab some html elements
let pizzaImageSectionTag = document.getElementById('all_pizzas');
// console.log(totalClicks, allPizzas, previouslyPickedPizza, pizzaImageSectionTag);
let leftPizzaImage = document.getElementById('left_pizza_img');
let rightPizzaImage = document.getElementById('right_pizza_img');
// console.log(leftPizzaImage, rightPizzaImage);
let leftPizzaOnThePage;
let rightPizzaOnThePage;

let resultsList = document.getElementById('resultsList');
let chartResults = document.getElementById('chartResults');




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



// console.log('array? with pizza objects?',allPizzas);










/**
 * need to create a function to handle what happens when we click on the pizza
  X -add a check to see if we are clicking on a image
  X -add to our total clicks to finish rounds
  X -update the pizza object information times shown... both images each time - X X -views
  count what image was clicked  - clicks
  logic -
  display our random images we are going random number from our pizza objects array
  we can then update the "src" in the html to update the image that we are seeing on the page
  add some logic for images that we just used array to store so we dont select those images again for the next round.
  lastly I want to count total clicks if statement when reach the end of 5 clicks
  remove the event listener so the user can not click any more.

 *  */
function handleClickOnPizza(event){
  // console.log('from hanlde image click', event.target);
  if(event.target.tagName !== 'IMG'){
    return;
  }
  //counts up our total clicks
  totalClicks++;
  //times shown ~ add a new global to track the current image
  leftPizzaOnThePage.timesShown++;
  rightPizzaOnThePage.timesShown++;
  console.log(totalClicks);
  if(event.target.id === 'left_pizza_img'){
    leftPizzaOnThePage.clicks++;
  }
  //counting the clicked on image and we only one of this ids per click
  if(event.target.id === 'right_pizza_img'){
    rightPizzaOnThePage.clicks++;
  }
  //handle viewing the previous images
  const tempPickedPizzas = [];

  let leftPizzaIndex;
  do{
    leftPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while(previouslyPickedPizzas.includes(allPizzas[leftPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[leftPizzaIndex]));
  tempPickedPizzas.push(allPizzas[leftPizzaIndex]);

  let rightPizzaIndex;
  do{
    rightPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while(previouslyPickedPizzas.includes(allPizzas[rightPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[rightPizzaIndex]));
  tempPickedPizzas.push(allPizzas[rightPizzaIndex]);

  leftPizzaOnThePage = allPizzas[leftPizzaIndex];
  rightPizzaOnThePage = allPizzas[rightPizzaIndex];
  console.log(leftPizzaOnThePage, rightPizzaOnThePage);
  //now update on the page
  //clickable new images being shown.
  console.log(leftPizzaOnThePage.imageSrc, rightPizzaOnThePage.imageSrc);
  leftPizzaImage.src = leftPizzaOnThePage.imageSrc;
  rightPizzaImage.src = rightPizzaOnThePage.imageSrc;

  //handle the previously picked pizzas
  previouslyPickedPizzas = [];
  previouslyPickedPizzas.push(allPizzas[leftPizzaIndex]);
  previouslyPickedPizzas.push(allPizzas[rightPizzaIndex]);
  console.log('previous',previouslyPickedPizzas);

  console.log('Tot clicks',totalClicks);
  if(totalClicks === 25){
    pizzaImageSectionTag.removeEventListener('click', handleClickOnPizza);
  }
}//closes our function


//create a function handleResult list showing ul and li on the left side of the page
function handleResultsList(){
  // console.log('proof from handle results list lis');
  document.getElementById('pizza-clicks-list').style.background = '#8197c9';
  document.getElementById('pizza-clicks-list').style.color = 'whitesmoke';
  let ul = document.getElementById('pizza-clicks-list');
  for(let i = 0; i < allPizzas.length; i++){
    let currentPizza =  allPizzas[i];
    let li = document.createElement('li');
    li.textContent = currentPizza.pizzaName + ' got ' + currentPizza.clicks + ' votes';
    // console.log('li: ',li);
    ul.appendChild(li);
  }
}



//Eventually add the chart here form canvas.js big concept not much to code.
function handleChartResults(){
  // console.log('proof from handle chart results');
  //going to call the createChart function/
  makeAPizzaChart();
}

//add our event listeners for our button clicks  = 'click' events functions
//html element. method (event looking for,  name of our() that handles the event)
pizzaImageSectionTag.addEventListener('click', handleClickOnPizza);
//add event listener for our button click
resultsList.addEventListener('click', handleResultsList);
chartResults.addEventListener('click', handleChartResults);
//add event listener for our chartResults
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
leftPizzaOnThePage = allPizzas[0];
rightPizzaOnThePage = allPizzas[1];






function makeAPizzaChart(){
  //use a for loop on our objects to pull our click info for the chart to display.
  //here is where our chart wi
  console.log('we made it to the chart function.');
  // this info is currently in our allPizza array.
  const pizzaNamesArray = [];
  const pizzaClicksArray = [];

  for(let i = 0; i < allPizzas.length; i++){
    let singlePizzaName = allPizzas[i].pizzaName;
    pizzaNamesArray.push(singlePizzaName);
    console.log(pizzaNamesArray);
  }

  for(let i = 0; i < allPizzas.length; i++){
    let singlePizzaClicks = allPizzas[i].clicks;
    pizzaClicksArray.push(singlePizzaClicks);
  }

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pizzaNamesArray,
      datasets: [{
        label: 'Pizza Clicks',
        data: pizzaClicksArray,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(0, 99, 132)',
        borderWidth: 4
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });













}

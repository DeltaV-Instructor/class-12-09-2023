'use strict';
console.log('app file is connected');
let totalClicks = 0;
const allPizzas = [];
let previouslyPickedPizzas = [];
let pizzaImageSectionTag = document.getElementById('all_pizzas');
let leftPizzaImage = document.getElementById('left_pizza_img');
let rightPizzaImage = document.getElementById('right_pizza_img');
let leftPizzaOnThePage;
let rightPizzaOnThePage;
let resultsList = document.getElementById('resultsList');
let chartResults = document.getElementById('chartResults');

//re-instantiate our POJO back into PizzaPicture objects
const PizzaPicture = function(pizzaName, imageSrc,clicks, timesShown){
  this.pizzaName = pizzaName;
  this.imageSrc = imageSrc;
  // this.clicks = 0;
  if(clicks){
    this.clicks = clicks;
  } else {
    this.clicks = 0;
  }
  // this.timesShown = 0;
  if(timesShown){
    this.timesShown = timesShown;
  } else {
    this.timesShown = 0;
  }
  allPizzas.push(this);
};

//get our local storage
let savedPizzaString = localStorage.getItem('savedPizzaVoteRound');
console.log('LS =>pizzas? ', savedPizzaString);

if(savedPizzaString){
  //we need to parse to get back from being string => objects
  let arrayOfNotPizzaObject = JSON.parse(savedPizzaString);
  console.log(arrayOfNotPizzaObject);
  //once they are POJO
  // send them to our constructor function to update our objects totals(clicks, view)
  for(let i = 0; i < arrayOfNotPizzaObject.length; i++){
    new PizzaPicture(
      arrayOfNotPizzaObject[i].pizzaName,
      arrayOfNotPizzaObject[i].imageSrc,
      arrayOfNotPizzaObject[i].clicks,
      arrayOfNotPizzaObject[i].timesShown
    );
  }
  console.log(allPizzas);
} else {
  new PizzaPicture('Papa Vito\'s Thin', 'images/mwDeluxePizzaThinCrust.jpg');
  new PizzaPicture('Chicago Deep Dish', 'images/chicagoPizza.jpg');
  new PizzaPicture('Brick Oven Pizza', 'images/brickOvenPizza.jpg');
  new PizzaPicture('Calzone', 'images/calzonePizza.jpg');
  new PizzaPicture('Chicago Pizza and Oven Grinder', 'images/cpoGinderPizza.jpg');
  new PizzaPicture('Detroit Style', 'images/detroitPizza.jpg');
  new PizzaPicture('New York Thin', 'images/newYorkPizza.jpg');
  new PizzaPicture('Shot Gun Dans', 'images/sgDansHtossedMeatLovPizza.jpg');
}

leftPizzaOnThePage = allPizzas[0];
rightPizzaOnThePage = allPizzas[1];






















function handleClickOnPizza(event){
  if(event.target.tagName !== 'IMG'){
    return;
  }
  totalClicks++;
  leftPizzaOnThePage.timesShown++;
  rightPizzaOnThePage.timesShown++;
  console.log(totalClicks);
  if(event.target.id === 'left_pizza_img'){
    leftPizzaOnThePage.clicks++;
  }
  if(event.target.id === 'right_pizza_img'){
    rightPizzaOnThePage.clicks++;
  }
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
  leftPizzaImage.src = leftPizzaOnThePage.imageSrc;
  rightPizzaImage.src = rightPizzaOnThePage.imageSrc;
  previouslyPickedPizzas = [];
  previouslyPickedPizzas.push(allPizzas[leftPizzaIndex]);
  previouslyPickedPizzas.push(allPizzas[rightPizzaIndex]);

  if(totalClicks === 25){
    //we are done voting and we have data from user clicks.
    //                    data
    // let localStoreData = JSON.stringify(allPizzas);
    // console.log(localStoreData);
    localStorage.setItem('savedPizzaVoteRound',JSON.stringify(allPizzas));
    pizzaImageSectionTag.removeEventListener('click', handleClickOnPizza);
  }
}//closes our function

function handleResultsList(){
  document.getElementById('pizza-clicks-list').style.background = '#8197c9';
  document.getElementById('pizza-clicks-list').style.color = 'whitesmoke';
  let ul = document.getElementById('pizza-clicks-list');
  for(let i = 0; i < allPizzas.length; i++){
    let currentPizza =  allPizzas[i];
    let li = document.createElement('li');
    li.textContent = currentPizza.pizzaName + ' got ' + currentPizza.clicks + ' votes';
    ul.appendChild(li);
  }
}
function handleChartResults(){
  makeAPizzaChart();
}

pizzaImageSectionTag.addEventListener('click', handleClickOnPizza);
resultsList.addEventListener('click', handleResultsList);
chartResults.addEventListener('click', handleChartResults);








function makeAPizzaChart(){
  console.log('we made it to the chart function.');
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

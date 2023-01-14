//this will count the clicks we use to win or lose the game 
let totalClicks = 1
let maxClicks = function() {return COLORS.length * 2}

// i just added an initalizer score, which will not appear in the browswer until a real score takes its place
//the 1000 just acts as a placeholder, when replaced with a real score it will be visibule to the user.
let bestScore = localStorage.getItem('best score')
let bestElement = document.getElementById('high')

if(bestScore == undefined){

  bestElement.innerHTML = `The current high score is currently not set yet, butjust like golf, the lower the better`

} else {
  
  bestElement.innerHTML = `The current high score is currently ${bestScore}, butjust like golf, the lower the better`
}

let counterElement = document.createElement('h1')
counterElement.classList.add('highscore')

counterElement.innerText = ""

const gameButton = document.getElementById('gameStart')
gameButton.addEventListener('click',function(event){
event.preventDefault()
counterElement.innerText = "0"
})

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  //"teal",
  //"black",
  //"pink",
  //"teal",
  //"black",
  //"pink",

  //extra cards can be added easily the amounts of clicks to lose the game run out dynamically using COLORS.length
  //therefore the number is currently double the amount of cards present and flexibly changes with each extra card
  //also if 3 more pairs of cards added to the game, it takes 3 more pairs sucesfully matched to win the game. 
  //again the pairs required to complete the game has been been made dynamically responsive and flexible to the array size.

];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);



// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {

//I created i for index to be implemented with each div creation
let i = 1;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    newDiv.style.backgroundColor = 'white';
   
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

   
    
    
    //this adds an index which we will use to prevent user clicking the same card twice and having a match
    newDiv.setAttribute("index",i)
    i++
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
//Users should only be able to change at most two cards at a time.
let tempArray = [];
let permanentArray = [];
let evaluationTime = 0;
let counter = 0;
let selectedArray = [];

let tempIndex = [];//store our selected cards
//We have an empty array, declared outside the click event so that it does not reset each click
//with each card selected the array updates with the color, and our counter increments

let divs = document.querySelectorAll('div')
// TODO: Implement this function!
function handleCardClick(event) {


// you can use event.target to see which element was clicked
//console.log("you just clicked", event.target);
//Clicking a card should change the background color to be the color of the class it has.
//sucessfully implemented, we extract card color using get attribute and save in a variable in the event function
//we then make a cardQ variable to assign the colour, 
//we can then assign the card of the event target with the color class attributed to it. 
let cardColor = event.target.getAttribute('class')
let cardIndex = event.target.getAttribute('index')
tempIndex.unshift(cardIndex)
let cardQ = event.target
//totalClicks++
counterElement.innerText = totalClicks;
cardQ.style.backgroundColor = cardColor
//cardQ.style.backgroundimage = cardColor;
//selectedArray.unshift(cardQ)
tempArray.unshift(cardColor)
selectedArray.unshift(cardQ)

//commented out the ability to lose, I had  it in that if you click double the amount of cards present
//you lose the game, maybe it was a bit mean, a bit too difficult, but if popular demand requires i will bring it back
//if(totalClicks >= COLORS.length * 2){
  //window.alert("you lose")
//}

if(tempIndex[0] === tempIndex[1]){
  //a conditional statement, if the index of card 1 and 2 are the same we do not allow to pick the same card twice

  
  totalClicks-=1
  
  tempIndex.shift()
  selectedArray.shift()
  tempArray.shift()
  //we remove the newest card from our selection arrays

  counter--
  counterElement.innerText=totalClicks
  window.alert("please pick a different card")
  
    //an alert notifies the user to pick a different card
  

    
   
} else if(tempIndex[0] !== tempIndex[1]){
  evaluationTime++
  counter++
  totalClicks++
  //if the 2nd selected card is different from the 1st we can proceed, we iterate our evaluation time and counter
  //evaluation time comes when we have a pair divisible by 2, and we see if there is a match
  //counter is used to index elelemts in our various selection arrays and compare them




if (evaluationTime % 2 === 0){
   console.log("time for evaluation")
   //we evaluate card pairs of two, so when we hit an even number its time to check

   if(tempArray[counter -1] !== tempArray[counter -2]){
    //if our most recent selection does not match our 2nd most recent, its not a match
    //we are comparing the get attribute of class of each element which will get its colour
    console.log("is not a match");
    
    setTimeout(function(){
    let nonmatch1 = tempTimeoutArray[0];
    let nonmatch2 = tempTimeoutArray[1];
    
    nonmatch1.style.backgroundColor = "white";
    nonmatch2.style.backgroundColor = "white";
    tempTimeoutArray = [] },900);

    let tempTimeoutArray = []
      for (let part in selectedArray){
        tempTimeoutArray.push(selectedArray[part])
      }
    counter = 0;
    tempArray = [];
    tempIndex= [];
    selectedArray = []

    /*here we have some variously timed executions, we reset our counter, and empty all of our selection arrays
    then after 900ms we change our cards back to white (flipped over) because this part is timed out, and the selection array clears after 0ms
    I had to then create a temporary array and add elements via a loop, the timed out function then operates on the temporary array and changes the colours
    then emptying the temporary array also. otherwise we could not change the style on undefined (array elements that had already been deleted)
    */
    
  
   } else if(tempArray[counter -1] === tempArray[counter -2]){
    console.log("its a match");
    //so if we combine the most recent and 2nd most recent elements selected and unshifted into our tempArray
    //we get a match, we then add the tempArray element to our permanent (scorekeeping) array
    permanentArray.push(tempArray[counter -1]);
    //then we empty all our selector arrays and go back to 0 on the counter to start an exciting new pairing opportunity
    tempArray= [];
    selectedArray = [];
    counter = 0;
    tempIndex = [];
   }
   
  }

  }

  else if (evaluationTime % 2 === 1){
    console.log("pick another")
  //if our evaluation time resolves to an uneven number it means our pair is incomplete, we need a pair of two to evalaute 
  }

  if(permanentArray.length >= COLORS.length / 2){
  //with each matching pair, the color ID stored in the temp array is unshifted into our permanent array
  //when all pairs are passed through, it will contain 5 array elements and we win the game. 
    prompt("you win!")
    
    
    
  //we will use this conditional to create new and set new highscores
    if(bestScore == undefined){
      localStorage.setItem("best score",totalClicks)
    } else if (totalClicks < parseInt(bestScore)){
      localStorage.setItem("best score",totalClicks)
      

    }
    
    let highscore = document.createElement('h1')
    highscore.setAttribute('id','score')
  
} 



}


// when the DOM loads
createDivsForColors(shuffledColors);

//a reset button with a click event to reset the entire game when pressed
let resetButton = document.createElement('button')
resetButton.innerText = 'Reset Game'
resetButton.setAttribute('id','reset')




resetButton.addEventListener('click',function(event){
totalClicks = 0
counterElement.innerHTML = totalClicks
counter = 0
evaluationTime = 0;
selectedArray = []
tempArray = []
tempIndex = []

let divs2 = document.getElementsByTagName('div')
//a query selector to identify and then loop through all cards back to white (reset)

for(let div of divs2){

  if (div.getAttribute('id') === 'game'){
    null
  } else {
    div.style.backgroundColor = "white"
  }

}




})

document.body.append(resetButton)
document.body.append(counterElement)



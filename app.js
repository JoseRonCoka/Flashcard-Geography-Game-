/*File: app.js
Project: Flashcard Geography Game. Originally Web Dev Class final project.
Author: Jose Ron Coka
History: Version 2.0 April 02, 2026. Finalized upgraded version*/

//We set the variables

//Variables for the buttons
var option1;
var option2;
var option3;
var option4;

//Array for the buttons, so we can manipulate them easier.
var options = new Array(4);

//Variable to make order of buttons global
var buttonOrderGlobal = [];

//variable for image displayed
var mapImage;

//Counter for the questions, it starts at 0 and goes to 5, when it reaches 6, the final screen is displayed.
var counter = 0;
//Global score variable, it starts with 0 and is updated with every question, the final score is displayed at the end of the game.
var globalScore = [0];

//Shuffle of the 20 countries 
const imageShuffle = shuffle(20);
//We separate the first 5 images, which are the ones that will be used in the game, and the other 15, which will be used as options for the answers.
const imageCorrect = imageShuffle.slice(0, 5);
const imageOptions = imageShuffle.slice(5, 20);

var mapName = [
  "South Korea",
  "Ecuador",
  "France",
  "Norway",
  "Egypt",
  "Guatemala",
  "Madagascar",
  "India",
  "Russia",
  "Ireland",
  "Argentina",
  "Mexico",
  "New Zealand",
  "Afghanistan",
  "Canada",
  "Finland",
  "Syria",
  "Spain",
  "Panama",
  "Vietnam",
];
var url = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Locator_map_of_South_Korea2.svg/512px-Locator_map_of_South_Korea2.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ecuador_in_South_America_%28-mini_map_-rivers%29.svg/256px-Ecuador_in_South_America_%28-mini_map_-rivers%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Locator_map_of_France.svg/512px-Locator_map_of_France.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Locator_map_of_Norway.svg/512px-Locator_map_of_Norway.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Egypt_Locator.png/512px-Egypt_Locator.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/LocationGuatemala.svg/512px-LocationGuatemala.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Locator_map_of_Madagascar_in_Africa.svg/512px-Locator_map_of_Madagascar_in_Africa.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/IndiaOnWorldMap.png/512px-IndiaOnWorldMap.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Russia_in_the_World.svg/512px-Russia_in_the_World.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Map_of_Ireland_in_Europe.svg/512px-Map_of_Ireland_in_Europe.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/ArgentinaWorldMap.png/512px-ArgentinaWorldMap.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Second_Mexican_Federal_Republic_on_the_globe.svg/512px-Second_Mexican_Federal_Republic_on_the_globe.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/New_Zealand_%28orthographic_projection%29.svg/512px-New_Zealand_%28orthographic_projection%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Afghanistan_on_the_globe_%28Afro-Eurasia_centered%29.svg/512px-Afghanistan_on_the_globe_%28Afro-Eurasia_centered%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Canada_on_the_globe_%28North_America_centered%29.svg/512px-Canada_on_the_globe_%28North_America_centered%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Finland_on_the_globe_%28Europe_centered%29.svg/512px-Finland_on_the_globe_%28Europe_centered%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Syria_on_the_globe_%28Syria_centered%29.svg/512px-Syria_on_the_globe_%28Syria_centered%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Spain_on_the_globe_%28Europe_centered%29.svg/512px-Spain_on_the_globe_%28Europe_centered%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Panama_on_the_globe_%28Americas_centered%29.svg/512px-Panama_on_the_globe_%28Americas_centered%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Vietnam_on_the_globe_%28Vietnam_centered%29.svg/512px-Vietnam_on_the_globe_%28Vietnam_centered%29.svg.png",
];

//We need a start function to set up the image place and the buttons.

function start() {
  mapImage = document.getElementById("mapPosition");

  //Extract the buttons from the HTML and store them in variables, so we can manipulate them later.
  option1 = document.getElementById("opt1");
  option2 = document.getElementById("opt2");
  option3 = document.getElementById("opt3");
  option4 = document.getElementById("opt4");

  //options is an array containing the 4 buttons
  options[0] = option1;
  options[1] = option2;
  options[2] = option3;
  options[3] = option4;

  //nextButton starts the game currently 

  var button = document.getElementById("nextButton");
  button.addEventListener("click", nextFunction, false);

  //Submit checks answer and updates score, also changes the options style to show the correct answer and wrong answers.

  var subButton = document.getElementById("submit");
  subButton.addEventListener("click", subFunction, false);
}

function nextFunction() {
  setImage(mapImage, imageCorrect[counter]);
  counter++;
  document.getElementById("count").innerHTML = "Question Number: " + counter;
  document.getElementById("scr").innerHTML =
    "Your Score=" + globalScore[globalScore.length - 1];
  if (counter == 6) {
    setFinalImage(mapImage);
  }
}

function setImage(mapPicture, index) {
  //This function display the pictures in the random order.
  mapPicture.setAttribute("src", url[index]);
  mapPicture.setAttribute("alt", "map of " + mapName[index]);

  const buttonOrder = shuffle(4);

  buttonOrderGlobal[0] = buttonOrder[0];
  buttonOrderGlobal[1] = buttonOrder[1];
  buttonOrderGlobal[2] = buttonOrder[2];
  buttonOrderGlobal[3] = buttonOrder[3];

  options[buttonOrderGlobal[0]].labels[0].setAttribute("class", "normal");
  options[buttonOrderGlobal[1]].labels[0].setAttribute("class", "normal");
  options[buttonOrderGlobal[2]].labels[0].setAttribute("class", "normal");
  options[buttonOrderGlobal[3]].labels[0].setAttribute("class", "normal");

  setOptions(buttonOrder[0]);
  setOptions(buttonOrder[1]);
  setOptions(buttonOrder[2]);
  setOptions(buttonOrder[3]);

  var ranButton = getRandomInt(0, 4);
  setCorrect(buttonOrder[0], index);
}
function setOptions(buttonInd) {
  //This function give random values to the options. It takes the options from the remaining 15 image options. 
  var ranInd = imageOptions[getRandomInt(0, 15)];
  var optionButton = options[buttonInd];
  //Change label text for radio button
  optionButton.labels[0].textContent = mapName[ranInd];
}

function setCorrect(buttonInd, correctInd) {
  //This function sets up the correct answer in the options.
  var correctButton = options[buttonInd];
  correctButton.labels[0].textContent = mapName[correctInd];
}

function subFunction() {
  //This function deals with the Submit aspect, it checks if the answer is correct, displays score and change the options style.
  if (document.getElementById("opt1").checked) {
    var answer = 0;
  } else if (document.getElementById("opt2").checked) {
    var answer = 1;
  } else if (document.getElementById("opt3").checked) {
    var answer = 2;
  } else if (document.getElementById("opt4").checked) {
    var answer = 3;
  }

  var score = globalScore[globalScore.length - 1];
  if (answer == buttonOrderGlobal[0]) {
    score += 1;
    document.getElementById("scr").innerHTML =
      "Your answer was correct!. Your Score is=" + score;
    globalScore.push(score);
  } else {
    document.getElementById("scr").innerHTML =
      "Your answer was incorrect. Your Score is=" + score;
  }

  
  options[buttonOrderGlobal[0]].labels[0].setAttribute("class", "rightAnswer");
  options[buttonOrderGlobal[1]].labels[0].setAttribute("class", "wrongAnswer");
  options[buttonOrderGlobal[2]].labels[0].setAttribute("class", "wrongAnswer");
  options[buttonOrderGlobal[3]].labels[0].setAttribute("class", "wrongAnswer");
}

function setFinalImage(mapPicture) {
  //This function sets up the final screen, removing the unnecessary  elements and displaying the final score to the user.

  mapPicture.setAttribute(
    "src",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flag-map_of_the_world.svg/512px-Flag-map_of_the_world.svg.png",
  );
  mapPicture.setAttribute("alt", "Final Picture");
  document.getElementById("scr").innerHTML =
    "Congratulations! You finished the game. Your score was: " +
    globalScore[globalScore.length - 1] +
    " out of 5. Reload to play again.";

  document.getElementById("count").remove();

  var nextButton = document.getElementById("nextButton");
  nextButton.remove();

  var subButton = document.getElementById("submit");
  subButton.remove();

  options[0].remove();
  options[1].remove();
  options[2].remove();
  options[3].remove();

  document.getElementById("optA").remove();
  document.getElementById("optB").remove();
  document.getElementById("optC").remove();
  document.getElementById("optD").remove();

  document.getElementById("labelA").remove();
  document.getElementById("labelB").remove();
  document.getElementById("labelC").remove();
  document.getElementById("labelD").remove();
}

//This function shuffles the contents of an Array, in this case arrays containing a sequence of numbers.
function shuffle(max) {
  var array = [];
  var lengthOrder = array.length;

  for (var i = 0; i < max; ++i) {
    array[i] = i;
  }

  console.log(array);

  var lastIndex = array.length - 1;

  while (lastIndex > 0) {
    var randomIndex = getRandomInt(0, lastIndex + 1);
    var temp = array[lastIndex];
    array[lastIndex] = array[randomIndex];
    array[randomIndex] = temp;
    lastIndex -= 1;
    console.log(array);
  }
  return array;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener("load", start, false);

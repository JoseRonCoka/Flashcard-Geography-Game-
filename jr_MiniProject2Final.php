<!DOCTYPE html>
<!--File: jr_MiniProject2Final
Project: CSIS3020 Mini Project 2
Author: Jose Ron Coka
History: Version 3.0 November 20, 2021-->
<html>
  <head>
    <meta charset="utf-8" />
    <title>Mini Project</title>
    <style type="text/css">
      body {font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size: 12pt;
            text-align: center;
            background-color: lightgray;}
      img {text-align: center;
            border:1px solid black;
            max-width: 30em; 
            max-height:30em;}

      .center {text-align: center;}
      .centerTable {margin-left: auto;
                    margin-right: auto;}

      .right {text-align: right;}

      table {text-align: center;}

      input {font-size: 20px;
            background-color: gray;
            color: white;}
      .normal {background-color: gray;
                pointer-events: none;}

      .rightAnswer{background-color: green;
                    pointer-events: none;}
      .wrongAnswer{background-color: red;
                    pointer-events: none;}

      .no-click {pointer-events: none;}



    </style>
   

    <?php
        $user="root";
        $password="";
        $database="mapflashcard";
        $table="jr_maps2021";

        
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $connection = mysqli_connect( 'localhost',$user,$password,$database);
    if ( !$connection ) {
        die( 'Database Connection Failed' . mysqli_error( $connection ) );
    }

    $query="SELECT indexnumber, mapname, urlimg FROM jr_maps2021;";

    $result = mysqli_query( $connection, $query );
    $stack = array();
    while( $row = mysqli_fetch_assoc( $result) ) {
        array_push( $stack, $row );
    }

    $theArray = json_encode( $stack );
    
    ?>

    <script type="text/javascript">
        

      //We set the variables
      var option1;
      var option2;
      var option3;
      var option4;
      var mapImage;
      var options = new Array(4);
      var counter=0;
      var globalScore=[0];
      var buttonOrderGlobal=[];
      const imageShuffle= shuffle(20);
      const imageCorrect=imageShuffle.slice(0, 5);
      const imageOptions=imageShuffle.slice(5,20);
  
        var mapName=[];
        var url=[];
        var dataArray= <?php echo $theArray ?> ;
        console.log(dataArray);


        for(var i = 0; i < dataArray.length; i++){
            var row_i=dataArray[i];
            console.log(row_i);
            mapName.push(row_i["mapname"]);
            url.push(row_i["urlimg"]);
    
            }
            console.log(mapName);
            console.log(url);
      //We need a start function to set up the image place and the buttons.

      function start() {

        mapImage = document.getElementById("mapPosition");

        option1 = document.getElementById("opt1");
        option2 = document.getElementById("opt2");
        option3 = document.getElementById("opt3");
        option4 = document.getElementById("opt4");

        options[0] = option1;
        options[1] = option2;
        options[2] = option3;
        options[3] = option4;

        var button = document.getElementById("nextButton");
        button.addEventListener("click", nextFunction, false);

        var subButton = document.getElementById("submit");
        subButton.addEventListener("click", subFunction, false);
      }

      
      function nextFunction() {
          
            setImage(mapImage, imageCorrect[counter]);
            counter++;
            document.getElementById("count").innerHTML ="Question Number: "+counter;
            document.getElementById("scr").innerHTML = "Your Score="+globalScore[globalScore.length-1];
            if (counter==6){
              setFinalImage(mapImage);
            }
            
      }
      
      

      function setImage(mapPicture, index) {
      //This function display the pictures in the random order. 
        mapPicture.setAttribute("src", url[index]);
        mapPicture.setAttribute("alt", "map of " + mapName[index]);

        const buttonOrder=shuffle(4);

        buttonOrderGlobal[0]=buttonOrder[0]
        buttonOrderGlobal[1]=buttonOrder[1]
        buttonOrderGlobal[2]=buttonOrder[2]
        buttonOrderGlobal[3]=buttonOrder[3]

        options[buttonOrderGlobal[0]].setAttribute("class","normal");
        options[buttonOrderGlobal[1]].setAttribute("class","normal");
        options[buttonOrderGlobal[2]].setAttribute("class","normal");
        options[buttonOrderGlobal[3]].setAttribute("class","normal");
         
        setOptions(buttonOrder[0]);
        setOptions(buttonOrder[1]);
        setOptions(buttonOrder[2]);
        setOptions(buttonOrder[3]);
        
        var ranButton=getRandomInt(0,4); 
        setCorrect(buttonOrder[0], index);
        
        
        
      }
      function setOptions(buttonInd){
      //This function give random values to the options. 
      var ranInd = imageOptions[getRandomInt(0, 15)];
      var optionButton=options[buttonInd];
      optionButton.value = mapName[ranInd];
      }
      
      
      function setCorrect(buttonInd, correctInd) {
        //This function sets up the correct answer in the options. 
        var correctButton = options[buttonInd];
        correctButton.value = mapName[correctInd];
      }
            
      

      function subFunction() {
        //This function deals with the Submit aspect, it checks if the answer is correct, displays score and change the options style. 
        if(document.getElementById("optA").checked) {
            var answer=0;
        }else if(document.getElementById("optB").checked) {
           var answer=1;
          }else if(document.getElementById("optC").checked) {
            var answer=2;
          }else if(document.getElementById("optD").checked){
            var answer=3;
          }
        
        var score=globalScore[globalScore.length-1]
        if (answer==buttonOrderGlobal[0]){
          score+=1;
          document.getElementById("scr").innerHTML = "Your answer was correct!. Your Score is="+score;
          globalScore.push(score);
        }
        else {
          document.getElementById("scr").innerHTML = "Your answer was incorrect. Your Score is="+score;
        }

        options[buttonOrderGlobal[0]].setAttribute("class","rightAnswer");
        options[buttonOrderGlobal[1]].setAttribute("class","wrongAnswer");
        options[buttonOrderGlobal[2]].setAttribute("class","wrongAnswer");
        options[buttonOrderGlobal[3]].setAttribute("class","wrongAnswer");
      }

      function setFinalImage(mapPicture) {
        //This function sets up the final screen, removing the unnecessary  elements and displaying the final score to the user. 

        mapPicture.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flag-map_of_the_world.svg/512px-Flag-map_of_the_world.svg.png");
        mapPicture.setAttribute("alt", "Final Picture");
        document.getElementById("scr").innerHTML = "Congratulations! You finished the game. Your score was: "+globalScore[globalScore.length-1]+" out of 5. Reload to play again.";
        
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

       var array=[];
       var lengthOrder=array.length;

       for ( var i = 0; i < max; ++i ){
            array[i]=i;
        }

        var lastIndex=array.length-1;

        while (lastIndex>0){
        var randomIndex= getRandomInt(0,lastIndex+1);
        var temp= array[lastIndex];
        array[lastIndex]=array[randomIndex];
        array[randomIndex]=temp;
        lastIndex-=1;
        }
        return array
        }
        
    

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      }

      window.addEventListener("load", start, false);
    </script>
  </head>

  <body>
    
    <h1>Welcome to the World Countries Map Flashcard Game.</h1>
    <p>
      When you click the Next button the highlighted map of one country is going to load. Check an answer from Options A to D. 
      Then click on Submit to check whether it was correct.
    </p>

    <!--First form element, for Next and Submit button.-->
    <form action="#">
      <input id="nextButton" type="button" value="Next" />
  
      <!--The submit button will check if the answer is correct, changing the score-->
      <input id="submit" type="button" value="Submit" />
    </form>

    <h3 id="count">Number of Maps seen= 0</h3>
    <h3 id="scr">Your Score= 0</h3>

    <!--We display an image, so we change it later with the other images-->
    <img
      id="mapPosition"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/World_Map_1689.JPG/512px-World_Map_1689.JPG";
      alt="Map picture"
    />

    
    <!--Second form element, for the answer option buttons.-->
    <form action="#">
      <table class="centerTable">
        <tr>
          <td><input id="opt1" type="button" value="Option A" class="no-click"></td>
          <td><input id="opt2" type="button" value="Option B" class="no-click"></td>
          <td><input id="opt3" type="button" value="Option C" class="no-click"></td>
          <td><input id="opt4" type="button" value="Option D" class="no-click"></td>
        </tr>
        <tr>
          <td><input type="radio" id="optA" name="answer" value="A">
            <label for="optA" id="labelA">Option A</label>
          </td>
          <td>
            <input type="radio" id="optB" name="answer" value="B">
            <label for="optB"id="labelB">Option B</label>
          </td>
          <td>
            <input type="radio" id="optC" name="answer" value="C">
            <label for="optC" id="labelC">Option C</label>
          </td>
          <td>
            <input type="radio" id="optD" name="answer" value="D">
            <label for="optD" id="labelD">Option D</label>
          </td>
        </tr>
      </table>
    </form>

  </body>

  <footer>
    <p>Created by Jose Luis Ron Coka. For comments contact me at: <a href="mailto:jr3412@mynsu.nova.edu">jr3412@mynsu.nova.edu</a></p>
  </footer>
</html>

 
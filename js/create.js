/*File: create.js
Project: Flashcard Geography Game. Originally Web Dev Class final project.
Author: Jose Ron Coka
History: Version 1.0 May 20, 2026.*/

function start() {


  const submitFlashcardForm = document.getElementById('submitFlashcard');

  if (submitFlashcardForm) {
    submitFlashcardForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await submitFlashcard();
      console.log("Flashcard Submitted");
  
    });
  
}

  
}


async function submitFlashcard() {

  console.log("Submit Flashcard function called");
  
  // Implement submit flashcard logic here
    
  //iterate through 10 question inputs and add to array if not empty
    const questions = [];

    for (let i = 1; i <= 10; i++) {
        const input = document.getElementById(`question${i}`);
        
        // Skip empty inputs
        if (input && input.value.trim() !== "") {
            questions.push(input.value.trim());
        }
    }

    console.log(questions);

  //Iterate through 10 answer inputs and add to array if not empty
    const answers = []; 

    for (let i = 1; i <= 10; i++) {
        const input = document.getElementById(`answer${i}`);
        
        // Skip empty inputs
        if (input && input.value.trim() !== "") {
            answers.push(input.value.trim());
        }
    }

    console.log(answers);

  //send fetch request to worker url

    const res = await fetch('http://127.0.0.1:8787/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ questions, answers })
    });

    const data = await res.json();
    
    if (data.success== true) {
      //alert("User registered successfully! Please Sign In to continue.");
      window.location.href = "signin.html";
    }
}

async function signIn() {
  console.log("Sign In function called");
  //e.preventDefault();

    const email = document.getElementById('email').value;
    //const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //send fetch request to worker url

    const res = await fetch('http://127.0.0.1:8787/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log(data.email);

    if (data.error== "Invalid email or password") {
      alert("Invalid email or password. Please try again.");
      return;
    }
    else {
     
      document.getElementById('flag').textContent = "Sign in successful! Welcome back, " + data.username + "!";
      console.log(data.email);
      localStorage.setItem('user', JSON.stringify(data.email));
      //alert("Sign in successful! Welcome back, " + data.username + "!");
      window.location.href = "index.html";
      
    }

}
window.addEventListener("load", start, false);
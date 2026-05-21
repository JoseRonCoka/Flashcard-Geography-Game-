/*File: user.js
Project: Flashcard Geography Game. Originally Web Dev Class final project.
Author: Jose Ron Coka
History: Version 1.0 April 17, 2026. Finalized upgraded version*/


document.addEventListener('submit', (e) => {
  console.log("GLOBAL SUBMIT DETECTED", e.target);
});

window.addEventListener('beforeunload', () => {
  console.log("PAGE IS RELOADING");
});

function start() {

  let i = 0;

setInterval(() => {
  console.log("Running...", i++);
}, 1000);
  
  console.log("UserJS loaded");
  const signUpForm = document.getElementById('signUpForm');
  const signInForm = document.getElementById('signInForm');

  if (signUpForm) {
    signUpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await signUp();
      console.log("Form submitted");
  
    });
  }

  if (signInForm) {
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await signIn();
    console.log("Form submitted");
  });
}

  
}


async function signUp() {
  console.log("Sign Up function called");
  // Implement sign-up logic here
  
    //e.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //send fetch request to worker url

    const res = await fetch('http://127.0.0.1:8787/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password })
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
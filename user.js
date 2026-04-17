  
  
  console.log("JS loaded");
  const form = document.getElementById('signUpForm');

  form.addEventListener('submit', async (e) => {

    console.log("Form submitted");
    e.preventDefault();

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
    console.log(data);
  });
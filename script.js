// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyChAKRzaWNmXVL6FAdv16RNwPcKky4maUo",
    authDomain: "adminanduser-de348.firebaseapp.com",
    databaseURL: "https://adminanduser-de348-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "adminanduser-de348",
    storageBucket: "adminanduser-de348.appspot.com",
    messagingSenderId: "330482891627",
    appId: "1:330482891627:web:ccf590169c80efafddea2e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

    const database = getDatabase(app);

    document.getElementById("submit-score-btn").addEventListener('click', function(e){
        set(ref(database, 'users/' + document.getElementById("register-username").value),{
            username: document.getElementById("register-username").value,
            password: document.getElementById("register-password").value,
            score: document.getElementById("score").value
        });
    });


<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script> 

//firebase database

//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBncmjmFmezcMEeHpksv15wrBsBXBXqgCU",
    authDomain: "comp1800-bby04-2022.firebaseapp.com",
    projectId: "comp1800-bby04-2022",
    storageBucket: "comp1800-bby04-2022.appspot.com",
    messagingSenderId: "833252751523",
    appId: "1:833252751523:web:84ce621388e391e1bce716"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//maybe we can change this so it reads the database for a name instead
var myName = prompt("Enter your name")

function sendMessage() {
    // gets message (what does value do????)
    var message = document.getElementById("message").value;

    firebase.database().ref("messages").push().set({
        sender: "myName",
        message: "message"
    })

    //form wont submit
    return false;

}

//listens for messages coming in
firebase,database().ref("messages").on("child_added", function (snapshot){
    var html = "";
    html += "<li>";
        html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</li>"

    document.getElementById("messages").innerHTML += html;
});
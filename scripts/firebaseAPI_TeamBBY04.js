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
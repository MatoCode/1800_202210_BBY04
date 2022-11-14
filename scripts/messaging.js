var messages = document.getElementById("messages")
var textbox = document.getElementById("textbox")
var button = document.getElementById("button")


//takes text input and saves it to firebase
//HOW DO I PUT THE TEXT INTO THE GROUP ID ON FIREBASE???? must be with line 17, because it sure isn't user.uid
button.addEventListener("click", function() {
    var newMessage = document.createElement("ul")

    const db = firebase.firestore();
    user = firebase.auth().currentUser;

    newMessage.innerHTML = textbox.value;
 
    messageId = textbox.value;
    db.collection("groups").doc(currGroup.id).collection("messaging").doc(messageId).set({         //what is uid fro groups???
        message: document.getElementById('textbox').value,
    }).then(function() {
        console.log("New message added to firestore");
        window.close();
    }).catch(function (error) {
        console.log("Error adding new event: " + error);
    });

    //Store username
    db.collection("groups").doc(user.uid).collection("messaging").doc(messageId).set({          
        message: document.getElementById('textbox').value,
        username: user.displayName
    }).then(function() {
        console.log("New message added to firestore");
        window.close();
    }).catch(function (error) {
        console.log("Error adding new event: " + error);
    });

    console.log(newMessage)
    //displays user name and appends to text
    const textnode = document.createTextNode(user.displayName);
    messages.appendChild(textnode);
    messages.appendChild(newMessage);
    textbox.value = "";
});


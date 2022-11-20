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
 
    //messageId = textbox.value;
    // db.collection("groups").doc(currGroup.id).collection("messaging").doc(messageId).set({         //what is uid fro groups???
    //     message: document.getElementById('textbox').value,
    // }).then(function() {
    //     console.log("New message added to firestore");
    //     //window.close();
    // }).catch(function (error) {
    //     console.log("Error adding new event: " + error);
    // });
    messageId = user.id;
    messageId = "test2";
    currGroup = "tFnveRf4TMwUGdW8T8KP";
    //Store username
    db.collection("groups").doc(currGroup).collection("messagingText").doc(messageId).set({          
        message: document.getElementById('textbox').value,
        username: user.displayName,
        timestamp: Date.now()
    }).then(function() {
        console.log("New message added to firestore");
        //window.close();
    }).catch(function (error) {
        console.log("Error adding new event: " + error);
    });

    console.log(newMessage)
    //displays user name and appends to text
    const textnode = document.createTextNode(user.displayName);
    messages.appendChild(textnode);
    messages.appendChild(newMessage);
    textbox.value = "";

    // display all the messages
    db.collection("groups").doc(currGroup).collection("messagingText").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let textnode = document.createTextNode(doc.data().username);
            messages.appendChild(textnode);
            let newMessage = document.createElement("ul")
            newMessage.innerHTML = doc.data().message;
            messages.appendChild(newMessage);
        })});

        db.collection("groups").doc(currGroup).collection("messagingText")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    console.log(change.doc.data());
                    
                });
        });
    // db.collection("groups").doc(currGroup).collection("messagingText").where("username", "!=", user.displayName)
    // .onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         let textnode = document.createTextNode(doc.data().username);
    //         let newMessage = doc.data().message;
    //         messages.appendChild(textnode);
    //         messages.appendChild(newMessage);
    //     });
        
    // });

    
    
    
    // doc
    //     .onSnapshot({
    //     // Listen for document metadata changes
    //     includeMetadataChanges: true
    // }, (doc) => {
    //     // ...
    // });
    var unsubscribe = db.collection("citigroupses").doc("currGroup").collection("messaging")
    .onSnapshot(() => {
      // Respond to data
      // ...
    });

// Later ...

// Stop listening to changes
unsubscribe();

});


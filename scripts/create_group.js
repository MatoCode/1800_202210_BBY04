// document.querySelector("#group-create-submit-button").addEventListener("click", function() { 

// if (validateName()) {
//     createGroup();
// }

// }, false);

function groupCreation() {
    if (validateName()) {
        createGroup();
    }
}

function validateName() {
    var testName = document.getElementById("group-name-dropdown-form").value;
    var nameRegex = /^(?=.*[a-zA-Z0-9]).{3,}/;
    var validateResult = nameRegex.test(testName);
    return validateResult;
}

function createGroup() {
    const db = firebase.firestore();
    user = firebase.auth().currentUser;
    
    const groupsRef = db.collection('groups');
    var userID = user.uid;
    var groupName = document.getElementById("group-name-dropdown-form").value;
    console.log(groupName);

    const ref = db.collection("groups").doc();

    ref.set({
        name: groupName,
        members: [userID]
    });

    db.collection("users").doc(userID).update({
        groups: firebase.firestore.FieldValue.arrayUnion(ref.id)
    });
    
}

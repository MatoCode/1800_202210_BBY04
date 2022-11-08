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
    let userID = user.uid;
    let groupName = document.getElementById("group-name-dropdown-form").value;
    console.log(groupName);

    const ref = db.collection("groups").doc();

    ref.set({
        name: groupName,
        members: [userID]
    });

    db.collection("users").doc(userID).update({
        groups: firebase.firestore.FieldValue.arrayUnion(ref.id)
    });

    const groupSuccessAlert = document.getElementById('group-create-success-alert')

    const alert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      groupSuccessAlert.append(wrapper)
    }

    alert('Group Created!', 'success')

    document.getElementById("group-name-dropdown-form").value = "";
}

function groupJoin() {
    let code = document.getElementById("group-code-dropdown-form").value;
    console.log("join button pressed");
    console.log(code);
}






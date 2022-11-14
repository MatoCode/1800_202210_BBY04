// document.querySelector("#group-create-submit-button").addEventListener("click", function() { 

// if (validateName()) {
//     createGroup();
// }

// }, false);
var currGroup;

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

    currGroup = ref;

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


    //Nelson's addition of code to add group name to side bar-(ADD THIS CODE TO JOIN GROUP WHEN------------------------------
    var groupSideList = document.getElementById("groupSideList")
    var newGroupName = document.createElement("a")
    newGroupName.setAttribute("href", "Group_mes_cal_page.html")                  //Need to change the html to a unique html with unique ID 
    newGroupName.innerHTML = document.getElementById("group-name-dropdown-form").value
    console.log(newGroupName);
    groupSideList.appendChild(newGroupName);
    //---------------------------------------------------------------------------------------

    document.getElementById("group-name-dropdown-form").value = "";

}

function groupJoin() { 
    let code = document.getElementById("group-code-dropdown-form").value;

    

    console.log("join button pressed");
    console.log(code);
    // idea: use window.setTimeout(function, milliseconds) to delay a "clear codes" method
    // after a user in a group creates a group code to pass to user looking
    // to join the group. the Code will exist in the group until the time passes
    // and if the joining user enters the code before the delay, they get in, if not, they don't 
    // since the code has been cleared
}

function devToolSetCurrGroup(groupName) {
    db.collection("groups").limit(1).where("name", "==", groupName).get().then(obtained => {
        if (!obtained.empty) {
            currGroup = obtained.docs[0];
            console.log("devtool " + currGroup.data().name);
            console.log("devtool " + currGroup.id);
        } else {
            console.log("empty return");
        }
        
        // obtained.forEach(doc => {
        //     console.log(doc.data().name);
        // });
        // currently this does not set the currGroup the same as the create group function. need to discuss if this method is better or not.
    });
}

function createCode() {
    var minNum = 10000;
    var maxnum = 99999;
    let newCode = Math.floor(Math.random() * (maxnum - minNum + 1)) + minNum;
    console.log(newCode);
    db.collection("groups").doc(currGroup).update({
        codes: firebase.firestore.FieldValue.arrayUnion(newCode)
    });
}

function clearCodes() {
    currGroup.update({
        codes: deleteField()
    });
}

function displayCurrGroup() {
    if (typeof(currGroup) != "undefined") {
        console.log(currGroup.data().name);
    } else {
        console.log("currGroup undefined");
    }
    
}








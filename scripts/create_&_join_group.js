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
        groups: firebase.firestore.FieldValue.arrayUnion(ref)
    });

    db.collection("groups").doc(ref.id).get()
        .then(groupRef => {
            currGroup = groupRef;
            console.log((typeof currGroup) );

        });

    const groupCreateSuccessAlert = document.getElementById('group-create-success-alert');

    const createAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      groupCreateSuccessAlert.append(wrapper)

    }

    createAlert('Group Created!', 'success')
    createGroupCalendar(ref);

    //Nelson's addition of code to add group name to side bar-(ADD THIS CODE TO JOIN GROUP WHEN------------------------------
    // var groupSideList = document.getElementById("groupSideList")
    // var newGroupName = document.createElement("button")
    // //db.collection("users").doc(user.uid).groups.forEach(element => { 
    //     //console.log(devToolSetCurrGroup(currGroup.data().name))

    //     //newGroupName.setAttribute("onclick", devToolSetCurrGroup(currGroup.data().name))     
    // //});

    // //newGroupName.setAttribute("href", "Group_mes_cal_page.html")                  //Need to change the html to a unique html with unique ID 
    // newGroupName.innerHTML = document.getElementById("group-name-dropdown-form").value
    // console.log(newGroupName);
    // groupSideList.appendChild(newGroupName);
    //---------------------------------------------------------------------------------------

    document.getElementById("group-name-dropdown-form").value = "";
    
}

function groupJoin() { 
    let name = document.getElementById("group-Name-dropdown-form").value;
    user = firebase.auth().currentUser;
    userID = user.uid;

    db.collection("groups").limit(1).where("name", "==", name).get().then(obtained => {
        if (!obtained.empty) {
            currGroup = obtained.docs[0].ref;
            currGroup.update({
                members: firebase.firestore.FieldValue.arrayUnion(user.uid)
            });

            db.collection("users").doc(userID).update({
                groups: firebase.firestore.FieldValue.arrayUnion(currGroup)
            });

            const groupJoinSuccessAlert = document.getElementById('group-join-success-alert')


            const joinAlert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                  `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                  `   <div>${message}</div>`,
                  '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                  '</div>'
                ].join('')
          
                groupJoinSuccessAlert.append(wrapper)
            }

            joinAlert('Group joined', 'success');


            currGroup.get().then(group => {
                console.log("devtool " + group.data().name);
            });

            console.log("devtool " + currGroup.id);
        } else {
            console.log("empty return");
        }

        
        // obtained.forEach(doc => {
        //     console.log(doc.data().name);
        // });
        // currently this does not set the currGroup the same as the create group function. need to discuss if this method is better or not.
    });

    console.log("join button pressed");
    // idea: use window.setTimeout(function, milliseconds) to delay a "clear codes" method
    // after a user in a group creates a group code to pass to user looking
    // to join the group. the Code will exist in the group until the time passes
    // and if the joining user enters the code before the delay, they get in, if not, they don't 
    // since the code has been cleared
}

function devToolSetCurrGroup(groupName) {
    db.collection("groups").limit(1).where("name", "==", groupName).get().then(obtained => {
        if (!obtained.empty) {
            currGroup = obtained.docs[0].ref;
            
            currGroup.get().then(function(obt) {
                console.log("devtool set name " + obt.data().name);
                console.log("devtool " + obt.data().members[0]);

            });
            console.log("devtool id " + currGroup.id);
            console.log("devtool type " + (typeof currGroup));
        } else {
            console.log("empty return");
        }
        
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
        currGroup.get().then(group => {
            console.log(group.data().name);

        });
    } else {
        console.log("currGroup undefined");
    }
    
}




//I need to get the group name list for line 194 and line 199 for this to work
//Nelson's attempt at dynamically adding groups to sidebar
function makeGroupList() {
    user = firebase.auth().currentUser;
    db.collection("users").doc(user.uid).get().then(function(userDoc) {
        userDoc.data().groups.forEach((element) => {  
            //console.log("group name here" + element.get().then())                                //for each runs thru the number of elements(groups) that the user is a part of
            var groupSideList = document.getElementById("groupSideList");
            var newGroupButton = document.createElement("button"); 
            newGroupButton.setAttribute("class", "testbuttonclassname") 
            element.get().then(function(obt) {
                //obt.data().name
                let mytextnode = String(obt.data().name);                          //This is just a test to try and turn this into a string for the func on line 215
                let currGroupName = obt.data().name;
                newGroupButton.setAttribute("class", "buttonname" + obt.data().name) 
                newGroupButton.innerHTML = obt.data().name; 
                groupSideList.appendChild(newGroupButton);
                //newGroupButton.setAttribute("onclick", console.log("this button clicks"));
                //devToolSetCurrGroup(obt.data().name)
                //setCurrGroup(obt.data().name)
                newGroupButton.setAttribute('onclick', 'setCurrGroup("' + obt.data().name + '")');    //im trying to turn the group name I get into a string for this func but I don't know how
            })
            //newGroupButton.setAttribute('onclick', 'setCurrGroup("sorry")');
            //newGroupButton.setAttribute("onclick", console.log("this button clicks"));
            //newGroupButton.innerHTML = "mytest";                  //Need a a way to get each element from the list of groups to go into inner text here instead of "mytest"
            //console.log("testing" + newGroupButton)
            //newGroupButton.innerHTML = document.getElementById("group-name-dropdown-form").value 
            //groupSideList.appendChild(newGroupButton);            //Adds button to the MyGroups list in the sidebar
            //console.log(newGroupButton) 
            //var nameEntered = document.getElementById("group-name-dropdown-form").value    
           // newGroupButton.setAttribute("onclick", devToolSetCurrGroup(nameEntered));
        });
    });
}

function testingMakeGroupList(){
    document.write("<h1>Hello</h1>");
}


function setCurrGroup(groupName){
    db.collection("groups").limit(1).where("name", "==", groupName).get().then(obtained => {
        if (!obtained.empty) {
            currGroup = obtained.docs[0].ref;
        } else {
            console.log("empty return");
        }       
    });
}




function devToolDisplayCurrUser() {
    user = firebase.auth().currentUser;
    console.log(user.uid);
}




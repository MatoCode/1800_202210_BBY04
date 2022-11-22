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
        members: [userID],
        host: userID
    });

    db.collection("users").doc(userID).update({
        groups: firebase.firestore.FieldValue.arrayUnion(ref)
    });

    db.collection("groups").doc(ref.id).get()
        .then(groupRef => {
            currGroup = groupRef;
            console.log("testing type : " + (typeof currGroup));
            console.log("testing id: " + currGroup.id);
            createGroupCalendar(ref);

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


    document.getElementById("group-name-dropdown-form").value = "";

    //add a button in main page when a new group is created
    var newGroupButton = document.createElement("button");
    newGroupButton.setAttribute("class", "testbuttonclassname")
    newGroupButton.innerHTML = groupName;
    let groupid = ref.id;
    newGroupButton.setAttribute('onclick', 'loadgroupEvents("'+ groupid + '")');
    document.getElementById("groupSideList").appendChild(newGroupButton);
}

function groupJoin() {
    let name = document.getElementById("group-Name-dropdown-form").value;
    user = firebase.auth().currentUser;
    userID = user.uid;

    db.collection("groups").limit(1).where("name", "==", name).get().then(obtained => {
        if (!obtained.empty) {
            currGroup = obtained.docs[0].ref;
            currGroup.update({
                members: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

            createGroupCalendar(currGroup);

            //add a button in main page when joined a new group
            var newGroupButton = document.createElement("button");
            newGroupButton.setAttribute("class", "testbuttonclassname")
            newGroupButton.innerHTML = name;
            let groupid = currGroup.id;
            newGroupButton.setAttribute('onclick', 'loadgroupEvents("'+ groupid + '")');
            document.getElementById("groupSideList").appendChild(newGroupButton);


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
}

function devToolSetCurrGroup(groupName) {
    db.collection("groups").limit(1).where("name", "==", groupName).get().then(obtained => {
        if (!obtained.empty) {
            currGroup = obtained.docs[0].ref;

            currGroup.get().then(function (obt) {
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

function displayCurrGroup() {
    if (typeof (currGroup) != "undefined") {
        currGroup.get().then(group => {
            console.log(group.data().name);

        });
    } else {
        console.log("currGroup undefined");
    }

}


//I need to get the group name list for line 194 and line 199 for this to work
//Nelson's attempt at dynamically adding groups to sidebar
function loadGroupList() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            var docRef = db.collection("users").doc(user.uid);

            docRef.get().then((doc) => {
                let curGrouplist = doc.data().groups;
                // let groupName = db.collection("groups").doc(curGrouplist[i]).name;
                for (let i = 0; i < curGrouplist.length; i++) {
                    groupRef = curGrouplist[i];
                    groupRef.get().then(function(docg) {
                        groupName = docg.data().name
                        let newGroupButton = document.createElement("button");
                        newGroupButton.setAttribute("class", "testbuttonclassname");
                        newGroupButton.innerHTML = groupName;
                        let groupid = docg.id;
                        // newGroupButton.setAttribute('onclick', 'loadgroupEvents("'+ groupid + '")');
                        newGroupButton.setAttribute('onclick', 'setCurrGroup("' + groupName + '")'); 
                        document.getElementById("groupSideList").appendChild(newGroupButton);
                        let newLine = document.createElement("p");
                        document.getElementById("groupSideList").appendChild(newLine);
                    })
            }
            })
        }})
}

function setCurrGroup(groupName){
    db.collection("groups").limit(1).where("name", "==", groupName).get().then(obtained => {
        if (!obtained.empty) {
            currGroup = obtained.docs[0].ref;
            // window.location.href = "Group_mes_cal_page.html";
            loadgroupEvents(currGroup.id);
            createGroupCalendar(currGroup);
        } else {
            console.log("empty return");
        }       
    });
}




loadGroupList();




function devToolDisplayCurrUser() {
    user = firebase.auth().currentUser;
    console.log(user.uid);
}

function createGroupCalendar(groupRef) {
    console.log("called create group calendar");
    groupRef.get()
        .then(function (groupDoc) {
            groupRef.collection("calendar").get().then(cal => {
                    if (cal.docs.length > 0) {
                        cal.docs.forEach((doc) => {
                            groupRef.collection("calendar").doc(doc.id).delete();
                        });
                    }

                    let memberList = groupDoc.data().members;
                memberList.forEach(member => {
                    db.collection("users").doc(member).get().then(user => {
                        db.collection("users").doc(member).collection("calendar").get()
                            .then(events => {
                                events.forEach(event => {
                                    db.collection("groups").doc(groupDoc.id).collection("calendar").add({
                                        title: user.data().name,
                                        date: event.data().date,
                                        timeslot: event.data().timeslot
                                    });

                                });
                            });
                    });
                });

            });
                
        });
}

function leaveGroup(groupRef) {
    console.log("called leave group");
        
            console.log("in leave group");
            console.log("current user:" + currentUser.uid);
            groupRef.update({
                members: firebase.firestore.FieldValue.arrayRemove(currentUser.id)
            }).then(() => {
                db.collection("users").doc(currentUser.id).update({    
                    groups: firebase.firestore.FieldValue.arrayRemove(groupRef)
                        
                });

                groupRef.get()
                    .then(function (groupDoc) {
                        console.log("members left: " + groupDoc.data().members.length);
                        if (groupDoc.data().members.length <= 0) {
                            groupRef.collection("calendar").get().then(cal => {
                                cal.docs.forEach((doc) => {
                                    groupRef.collection("calendar").doc(doc.id).delete();
                                });
                            });
                            db.collection("groups").doc(groupRef.id).delete();
                        }
                    });
                
            })
            


        
}



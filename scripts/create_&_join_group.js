var currGroup;

// Checks if the given name in the create group form is a valid name, then calls createGroup if it is.
function groupCreation() {
    if (validateName()) {
        createGroup();
    }
}

// Checks if given name in the create group from is valid name. returns true if valid.
function validateName() {
    var testName = document.getElementById("group-name-dropdown-form").value;
    var nameRegex = /^(?=.*[a-zA-Z0-9]).{3,}/;
    var validateResult = nameRegex.test(testName);
    return validateResult;
}

// On Create group submit button clicked, reads the name given in the create group form and creates a group with that name. Places the creating user as the host and it's first member.
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
    loadGroupList();
}

// On Leave group submit button pressed, read the name from the leave group form and try to find a group with the name out of the user's groups. leaves the first group with that name it finds.
function groupLeave() {
    let name = document.getElementById("leave-group-Name-dropdown-form").value;

    currentUser.get().then(user => {
        let i = 0;
        let found = false;
        while (i < user.data().groups.length && found == false) {
            user.data().groups[i].get().then(group => {
                if (group.data().name == name) {
                    console.log(i);
                    console.log(group.ref);
                    leaveGroup(group.ref);
                    console.log("Group leave successfully found");
                    found = true;
                }
            });
            i++;
        };

        if (found = false) {
            console.log("Group not found");
        }

    });
}

// On join group submit button pressed, read the name from the join group form and try to find a group with the name. joins the first group with that name that it finds.
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
            newGroupButton.setAttribute('onclick', 'loadgroupEvents("' + groupid + '")');
            document.getElementById("groupSideList").appendChild(newGroupButton);

        } else {
            console.log("empty return");
        }

    });

}

// Sets the current group to the first group with the given name -------- devtool
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

//Displays current group in console. ----- devtool
function displayCurrGroup() {
    if (typeof (currGroup) != "undefined") {
        currGroup.get().then(group => {
            console.log(group.data().name);

        });
    } else {
        console.log("currGroup undefined");
    }

}



//Dynamically loads a list of groupsthe user is a part of in the sidebar
function loadGroupList() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            //Clears the existing group buttons before adding new ones.
            var docRef = db.collection("users").doc(user.uid);
            if (document.getElementById("groupSideList").getElementsByClassName("btn btn-light").length > 0) {
                let buttons = document.getElementById("groupSideList").getElementsByClassName("btn btn-light");
                while (buttons.length > 0) {
                    document.getElementById("groupSideList").removeChild(buttons.item(0));
                }
            }

            docRef.get().then((doc) => {
                if (doc.data() != undefined) {
                    let curGrouplist = doc.data().groups;

                    // let groupName = db.collection("groups").doc(curGrouplist[i]).name;
                    for (let i = 0; i < curGrouplist.length; i++) {
                        groupRef = curGrouplist[i];
                        groupRef.get().then(function (docg) {
                            groupName = docg.data().name
                            let newGroupButton = document.createElement("button");
                            //newGroupButton.setAttribute("class", "testbuttonclassname");
                            newGroupButton.setAttribute("class", "btn btn-light");
                            newGroupButton.innerHTML = groupName;
                            let groupid = docg.id;
                            // newGroupButton.setAttribute('onclick', 'loadgroupEvents("'+ groupid + '")');
                            newGroupButton.setAttribute('onclick', 'setCurrGroup("' + groupName + '")');
                            document.getElementById("groupSideList").appendChild(newGroupButton);
                            let newLine = document.createElement("p");
                            document.getElementById("groupSideList").appendChild(newLine);
                        })
                    }
                }
            })
        }
    })
}

// sets the currGroup to the first group with given name.
function setCurrGroup(groupName) {
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



// Displays the current user ID in the console. --------- devtool
function devToolDisplayCurrUser() {
    user = firebase.auth().currentUser;
    console.log(user.uid);
}

// Creates group calendar out of the personal calendars of every member of given group.
function createGroupCalendar(groupRef) {
    // console.log("called create group calendar");
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
                                        //title: user.data().name,
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

// Removes the given group from the user's group list, and removes the user from the group's member list. If this user is the last user in the group, the group is deleted.
function leaveGroup(groupRef) {

    groupRef.update({
        members: firebase.firestore.FieldValue.arrayRemove(currentUser.id)
    }).then(() => {
        db.collection("users").doc(currentUser.id).update({
            groups: firebase.firestore.FieldValue.arrayRemove(groupRef)

        }).then(() => {
            loadGroupList();
        });

        groupRef.get()
            .then(function (groupDoc) {
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



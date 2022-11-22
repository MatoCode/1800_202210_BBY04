function makeGroupList() {
    user = firebase.auth().currentUser;
    db.collection("users").doc(user.uid).get().then(function(userDoc) {
        userDoc.data().groups.forEach((element) => {  
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
                newGroupButton.setAttribute('onclick', 'setCurrGroup("' + obt.data().name + '")');    //im trying to turn the group name I get into a string for this func but I don't know how
            })
        });
    });
}

// function setCurrGroup(groupName){
//     db.collection("groups").limit(1).where("name", "==", groupName).get().then(obtained => {
//         if (!obtained.empty) {
//             currGroup = obtained.docs[0].ref;
//             loadgroupEvents(currGroup.id);
//         } else {
//             console.log("empty return");
//         }       
//     });
// }

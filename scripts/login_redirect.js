var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function signOut() {
       firebase.auth().signOut();
}

function initCurrGroup() {
    currentUser.get().then(user => {
        if (user.data().groups.length != 0) {
            user.data().groups[0].get().then(group => {
                currGroup = group.ref;
            });
        }
    });
}
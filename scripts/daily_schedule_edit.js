
var date = sessionStorage.getItem("date");
var month = sessionStorage.getItem("month");
var year = sessionStorage.getItem("year");
var timeslot = sessionStorage.getItem("timeslot");

if (document.title == 'daily schedule edit page') {
    LoadExistingEvent();
}
function LoadExistingEvent() {
    document.getElementById("event_date").value = year + "-" + month + "-" + date;
    slotset = ['AM', 'PM', 'Eve'];
    //get time slot information
    var ele = document.getElementsByClassName('timeslot');
    for (i = 0; i < ele.length; i++) {
        if (slotset[i] == timeslot) {
            ele[i].checked = true;
        }
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // console.log(" working...10");// User is signed in.
            let docid = year + "-" + month + "-" + date + timeslot;
            var docRef = db.collection("users").doc(user.uid).collection("calendar").doc(docid);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    document.getElementById("event_title").value = doc.data().title;
                } else {
                    document.getElementById("event_title").value = "";
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
        else {
            console.log("not working...10");// User is signed out.
        }
    })
}




//add a new event. 
function insertEvent() {
    document.getElementById("event_date").value = year + "-" + month + "-" + date;

    // currently signed-in user:
    user = firebase.auth().currentUser;
    if (user) {

        //get time slot information
        var ele = document.getElementsByClassName('timeslot');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                timeslot_selected = ele[i].value;
        }

        //write event information to firestore users/calendar collection
        data_selected = document.getElementById('event_date').value;
        calendarId = data_selected + timeslot_selected;
        db.collection("users").doc(user.uid).collection("calendar").doc(calendarId).set({         //write to firestore. We are using the UID for the ID in users collection
            title: document.getElementById('event_title').value,
            date: data_selected,
            timeslot: timeslot_selected
        }).then(function () {
            console.log("New calendar added to firestore");
            window.opener && window.opener.location.reload();//refresh calendar page
            window.close();
        }).catch(function (error) {
            console.log("Error adding new event: " + error);
        });


    } else {
        // No user is signed in.
    }

}


function confirmation() {
    var result = confirm("Are you sure to delete?");
    if (true) {
        console.log("Deleting");// Delete logic goes here
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log(" working...10");// User is signed in.
                let docid = year + "-" + month + "-" + date + timeslot;
                db.collection("users").doc(user.uid).collection("calendar").doc(docid).delete().then(() => {
                    console.log("Document successfully deleted!");
                    alert("Event deleted!");
                    window.opener && window.opener.location.reload();//refresh calendar page
                    window.close();
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });

                
                // docRef.get().then((doc) => {
                //     if (doc.exists) {
                //         console.log("confirming");
                //         console.log(docRef);
                //         docRef.delete();
                //         // alert("Event deleted!");
                //         window.opener && window.opener.location.reload();//refresh calendar page
                //         window.close();
                //     } else {
                //         console.log("not existing");
                //     }
                // }).catch((error) => {
                //     console.log("Error getting document:", error);
                // });
            }
            else {
                console.log("not working...10");// User is signed out.
            }
        })
    }
}


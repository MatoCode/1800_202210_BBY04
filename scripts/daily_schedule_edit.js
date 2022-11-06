
var date = sessionStorage.getItem("date");
var month = sessionStorage.getItem("month");
var year = sessionStorage.getItem("year");
var cellid = sessionStorage.getItem("cellid");
document.getElementById("event_date").value = year + "-" + month + "-" + date;

//add a new event. 
function insertEvent() {

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
        calendarId = cellid + timeslot_selected;
        db.collection("users").doc(user.uid).collection("calendar").doc(calendarId).set({         //write to firestore. We are using the UID for the ID in users collection
            title: document.getElementById('event_title').value,
            date: document.getElementById('event_date').value,
            timeslot: timeslot_selected
        });
        console.log("New calendar added to firestore");
        // window.close();
    } else {
        // No user is signed in.
    }

}


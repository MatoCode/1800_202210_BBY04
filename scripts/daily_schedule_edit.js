
var date = sessionStorage.getItem("date");
var month = sessionStorage.getItem("month");
var year = sessionStorage.getItem("year");
var timeslot = sessionStorage.getItem("timeslot");
var groupid = sessionStorage.getItem("groupid");


if (document.title == 'daily schedule edit page') {
    // if (date < 10) {
    //     document.getElementById("event_date").value = year + "-" + month + "-0" + date;
    // } else {
    //     document.getElementById("event_date").value = year + "-" + month + "-" + date;
    // }
    

    if (groupid == "") {
        document.getElementById("pagetitle").innerText = "Edit Event";
        LoadExistingEvent();
        if (date < 10) {
            document.getElementById("event_date").value = year + "-" + month + "-0" + date;
        } else {
            document.getElementById("event_date").value = year + "-" + month + "-" + date;
        }
    }

    else {
        if (date < 10) {
            document.getElementById("event_date").value = year + "-" + month + "-0" + date;
        } else {
            document.getElementById("event_date").value = year + "-" + month + "-" + date;
        }
        document.getElementById("pagetitle").innerText = "Add Group Event";
    }
}

function LoadExistingEvent() {
    if (date < 10) {
        document.getElementById("event_date").value = year + "-" + month + "-0" + date;
    } else {
        document.getElementById("event_date").value = year + "-" + month + "-" + date;
    }
    // document.getElementById("event_date").value = year + "-" + month + "-" + date;
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
    console.log("insertEvent....");
    if (date < 10) {
        document.getElementById("event_date").value = year + "-" + month + "-0" + date;
    } else {
        document.getElementById("event_date").value = year + "-" + month + "-" + date;
    }
    // document.getElementById("event_date").value = year + "-" + month + "-" + date;
    if (groupid == "") {
        // currently signed-in user:
        user = firebase.auth().currentUser;
        if (user) {

            // var ele = document.getElementsByClassName('grouplist');
            // for (i = 0; i < ele.length; i++) {
            //     if (ele[i].checked)
            //         console.log(ele[i].value);
            // }

            //write event information to firestore users/calendar collection
            data_selected = document.getElementById('event_date').value;
            //get time slot information
            var ele = document.getElementsByClassName('timeslot');
            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    timeslot_selected = ele[i].value;
                else
                    continue;
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
            }

        } else {
            // No user is signed in.
        }
    } else {
        var groupRef = db.collection("groups").doc(groupid);
        //write event information to firestore users/calendar collection
        data_selected = document.getElementById('event_date').value;
        var ele = document.getElementsByClassName('timeslot');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                timeslot_selected = ele[i].value;
        }
        calendarId = data_selected + timeslot_selected;
        db.collection("users").where("groups", "array-contains", groupRef)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    db.collection("users").doc(doc.id).collection("calendar").doc(calendarId).set({         //write to firestore. We are using the UID for the ID in users collection
                        title: document.getElementById('event_title').value,
                        date: data_selected,
                        timeslot: timeslot_selected
                    }).then(function () {
                        console.log("New calendar added to firestore");
                        // window.opener && window.opener.location.reload();//refresh calendar page
                        window.opener.location.reload(true);
                        if(document.readyState === "complete") {
                             loadgroupEvents(groupid);
                        }                       
                        window.close();
                    }).catch(function (error) {
                        console.log("Error adding new event: " + error);
                    });

                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });








        // docRef.get().then((doc) => {
        //     let curMemberlist = doc.data().members;
        //     // let groupName = db.collection("groups").doc(curGrouplist[i]).name;
        //     for (let useri = 0; useri < curMemberlist.length; useri++) {
        //         userRefid = curMemberlist[useri];
        //         //get time slot information
        //         var ele = document.getElementsByClassName('timeslot');
        //         for (i = 0; i < ele.length; i++) {
        //             if (ele[i].checked)
        //                 timeslot_selected = ele[i].value;
        //             else
        //                 continue;
        //             calendarId = data_selected + timeslot_selected;
        //             db.collection("users").doc(userRefid).collection("calendar").doc(calendarId).set({         //write to firestore. We are using the UID for the ID in users collection
        //                 title: document.getElementById('event_title').value,
        //                 date: data_selected,
        //                 timeslot: timeslot_selected
        //             }).then(function () {
        //                 console.log("New calendar added to firestore");
        //             }).catch(function (error) {
        //                 console.log("Error adding new event: " + error);
        //             });
        //         }
        //     }
        //     window.opener && window.opener.location.reload();//refresh calendar page
        //     window.close();
        // })
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
            }
            else {
                console.log("not working...10");// User is signed out.
            }
        })
    }
}

    // // as a host of group add events for all the members
    // if (document.title == 'daily schedule edit page') {
    //     // LoadExistingEvent();

    // }
    // function insertEvent() {
    //     var docRef = db.collection("groups").doc(groupid);
    //     //write event information to firestore users/calendar collection
    //     data_selected = document.getElementById('event_date').value;

    //     docRef.get().then((doc) => {
    //         let curMemberlist = doc.data().members;
    //         // let groupName = db.collection("groups").doc(curGrouplist[i]).name;
    //         for (let i = 0; i < curMemberlist.length; i++) {
    //             userRefid = curMemberlist[i];
    //             //get time slot information
    //             var ele = document.getElementsByClassName('timeslot');
    //             for (i = 0; i < ele.length; i++) {
    //                 if (ele[i].checked)
    //                     timeslot_selected = ele[i].value;
    //                 else
    //                     continue;
    //                 calendarId = data_selected + timeslot_selected;
    //                 db.collection("users").doc(userRefid).collection("calendar").doc(calendarId).set({         //write to firestore. We are using the UID for the ID in users collection
    //                     title: document.getElementById('event_title').value,
    //                     date: data_selected,
    //                     timeslot: timeslot_selected
    //                 }).then(function () {
    //                     console.log("New calendar added to firestore");
    //                 }).catch(function (error) {
    //                     console.log("Error adding new event: " + error);
    //                 });
    //             }
    //         }
    //         window.opener && window.opener.location.reload();//refresh calendar page
    //         window.close();
    //     })
    // }
    // if (document.title == 'daily schedule edit page') {
    //     LoadExistingEvent();
    // }


    // function LoadExistingEvent() {
    //     document.getElementById("event_date").value = year + "-" + month + "-" + date;
    //     slotset = ['AM', 'PM', 'Eve'];
    //     //get time slot information
    //     var ele = document.getElementsByClassName('timeslot');
    //     for (i = 0; i < ele.length; i++) {
    //         if (slotset[i] == timeslot) {
    //             ele[i].checked = true;
    //         }
    //     }

    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             // console.log(" working...10");// User is signed in.
    //             let docid = year + "-" + month + "-" + date + timeslot;
    //             var docRef = db.collection("users").doc(user.uid).collection("calendar").doc(docid);

    //             docRef.get().then((doc) => {
    //                 if (doc.exists) {
    //                     document.getElementById("event_title").value = doc.data().title;
    //                 } else {
    //                     document.getElementById("event_title").value = "";
    //                 }
    //             }).catch((error) => {
    //                 console.log("Error getting document:", error);
    //             });
    //         }
    //         else {
    //             console.log("not working...10");// User is signed out.
    //         }
    //     })
    // }


    //add a new event.
    // function insertEvent() {
    //     document.getElementById("event_date").value = year + "-" + month + "-" + date;

    //     // currently signed-in user:
    //     user = firebase.auth().currentUser;
    //     if (user) {

    //         // var ele = document.getElementsByClassName('grouplist');
    //         // for (i = 0; i < ele.length; i++) {
    //         //     if (ele[i].checked)
    //         //         console.log(ele[i].value);
    //         // }

    //         //write event information to firestore users/calendar collection
    //         data_selected = document.getElementById('event_date').value;
    //         //get time slot information
    //         var ele = document.getElementsByClassName('timeslot');
    //         for (i = 0; i < ele.length; i++) {
    //             if (ele[i].checked)
    //                 timeslot_selected = ele[i].value;
    //             else
    //                 continue;
    //             calendarId = data_selected + timeslot_selected;
    //             db.collection("users").doc(user.uid).collection("calendar").doc(calendarId).set({         //write to firestore. We are using the UID for the ID in users collection
    //                 title: document.getElementById('event_title').value,
    //                 date: data_selected,
    //                 timeslot: timeslot_selected
    //             }).then(function () {
    //                 console.log("New calendar added to firestore");
    //                 window.opener && window.opener.location.reload();//refresh calendar page
    //                 window.close();
    //             }).catch(function (error) {
    //                 console.log("Error adding new event: " + error);
    //             });
    //         }

    //     } else {
    //         // No user is signed in.
    //     }

    // }


//     function confirmation() {
//         var result = confirm("Are you sure to delete?");
//         if (true) {
//             console.log("Deleting");// Delete logic goes here
//             firebase.auth().onAuthStateChanged(user => {
//                 if (user) {
//                     // console.log(" working...10");// User is signed in.
//                     let docid = year + "-" + month + "-" + date + timeslot;
//                     db.collection("users").doc(user.uid).collection("calendar").doc(docid).delete().then(() => {
//                         console.log("Document successfully deleted!");
//                         alert("Event deleted!");
//                         window.opener && window.opener.location.reload();//refresh calendar page
//                         window.close();
//                     }).catch((error) => {
//                         console.error("Error removing document: ", error);
//                     });
//                 }
//                 else {
//                     console.log("not working...10");// User is signed out.
//                 }
//             })
//         }
//     }
// }

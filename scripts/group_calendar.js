function createGroupCalendar(groupRef) {
    console.log("called create group calendar");
   groupRef.get()
        .then(function(groupDoc) {
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
}
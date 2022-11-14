function createGroupCalendar(groupRef) {
   db.collection("groups").doc(groupRef).get()
        .then(function(groupDoc) {
            let memberList = groupDoc.data().members;
            memberList.forEach(member => {
                let memberCal = db.collection("users").doc(member).collection("calendar");
                memberCal.forEach(memEvent => {
                    groupDoc.collection("calendar").add({
                        title: member.name,
                        date: memEvent.date,
                        timeslot: memEvent.timeslot
                    });
                });
            });
        });
}
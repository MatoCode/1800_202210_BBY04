if (edited) {
    // Do something for the currently logged-in user here: 
    
    schedule_Title = edited.title;
    $("#name-goes-here").text(schedule_Title); //using jquery

} else {
    // No user is signed in.
}
function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(1970, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
} else {
    months = monthDefault;
    days = dayDefault;
}

/** This section shows Sun, Mon, Tue, etc */
var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";
//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear,"");
loadEvents();


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear,"");
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear,"");
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear,"");
}

function showCalendar(month, year,groupid) {
    sessionStorage.setItem("groupid", groupid);
    var firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body");


    tbl.innerHTML = "";


    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for (var i = 0; i < 6; i++) {

        var row = document.createElement("tr");


        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                (function () {
                    cell = document.createElement("td");
                    cell.setAttribute("data-date", date);
                    cell.setAttribute("data-month", month + 1);
                    cell.setAttribute("data-year", year);
                    cell.setAttribute("data-month_name", months[month]);
                    // cell.addEventListener("click", () => {});
                    var t1 = date;
                    var t2 = month + 1;
                    var t3 = year;
                    // var cellid = t3 * 10000 + t2 * 100 + t1;
                    if (t2 < 10) {
                        if (t1 < 10) {
                            cellid = t3 + "0" + t2 + "0" + t1;
                        } else {
                            cellid = t3 + "0" + t2 + t1;
                        }
                    } else if (t1 < 10) {
                        cellid = t3 + "" + t2 + "0" + t1;
                    }
                    else {
                        cellid = t3 + "" + t2 + t1;
                    }
                    // var cellid = "" + t3 + t2 + t1;
                    // console.log(t1);
                    // cell.setAttribute("id", cellid);
                    // cell.addEventListener("click", function () {
                    //     makeItHappen(t1, t2, t3, cellid);
                    // });
                    cell.className = "date-picker";
                    // cell.innerHTML = "<span>" + date + "</span>";
                    cell.innerHTML = "<span>" + date + "</span><br>"
                        + "<button class='ameventdisplay' id=" + cellid + "1 onclick='myFunction(" + t1 + "," + t2 + "," + t3 + ",\"AM\",\"" + groupid+ "\")'></button><br>"
                        + "<button class='pmeventdisplay' id=" + cellid + "2 onclick='myFunction(" + t1 + "," + t2 + "," + t3 + ",\"PM\",\"" + groupid+ "\")'></button><br>"
                        + "<button class='eveeventdisplay' id=" + cellid + "3 onclick='myFunction(" + t1 + "," + t2 + "," + t3 + ",\"Eve\",\"" + groupid+ "\")'></button>";

                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.className = "date-picker selected";
                    }
                    row.appendChild(cell);
                    date++;


                }());
            }


        }

        tbl.appendChild(row);
    }

    // loadEvents();
    // or loadgroupEvents(groupid);
}

function loadMyCal() {
    showCalendar(currentMonth, currentYear,"");
    loadEvents();
    document.getElementById("messaging").style.display="none";
}
function myFunction(elem1, elem2, elem3, elem4,elem5) {
    console.log("button works");
    // makeItHappen(t1, t2, t3, cellid);
    sessionStorage.setItem("date", elem1);
    sessionStorage.setItem("month", elem2);
    sessionStorage.setItem("year", elem3);
    sessionStorage.setItem("timeslot", elem4);
    sessionStorage.setItem("groupid", elem5);
    // console.log("timeslot:" + elem4);
    window.open('daily_schedule_edit.html', "newwindow", "height=600, width=500, top=(screen.height - 600) / 2, left=(screen.width - 500) / 2, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
}
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        document.getElementById("username_goes_here").innerHTML = user.displayName;
    }})

function loadEvents() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // console.log(" working...10");// User is signed in.

            db.collection("users").doc(user.uid).collection("calendar").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.data()
                    eventdate = doc.data().date;
                    // console.log(eventdate);
                    console.log(eventdate);
                    if (eventdate.substring(0, 7) == (currentYear + '-' + (currentMonth + 1))) {
                        eventname = doc.data().title;

                        let displaycell = eventdate.substring(0, 4) + eventdate.substring(5, 7) + eventdate.substring(8, 10);
                        if (doc.data().timeslot == 'AM') {
                            displaycell += 1;
                            document.getElementById(displaycell).style.backgroundColor = 'lightpink';
                        } else if (doc.data().timeslot == 'PM') {
                            displaycell += 2;
                            document.getElementById(displaycell).style.backgroundColor = 'lightskyblue';
                        } else {
                            displaycell += 3;
                            document.getElementById(displaycell).style.backgroundColor = 'lightseagreen';
                        }
                        // console.log("displaycell" + ":" + displaycell + "; eventname:" + eventname);
                        document.getElementById(displaycell).innerText = eventname;
                    }

                });
            })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
        else {
            console.log("not working...10");// User is signed out.
        }
    })


}

function loadgroupEvents(groupid) {
    loadgroupMessage(groupid);
    showCalendar(currentMonth, currentYear,groupid);
    document.getElementById("messaging").style.display="block";
    document.getElementById("textbox").style.margin="auto";
    document.getElementById("button").style.margin="auto";
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementsByClassName("date-picker").innerText = "";
            if (db.collection("groups").doc(groupid).host != user.id) {
                document.getElementsByClassName("date-picker").disabled = true;
            } else {
                document.getElementsByClassName("date-picker").disabled = false;
            }

            db.collection("groups").doc(groupid).collection("calendar").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.data()
                    eventdate = doc.data().date;

                    if (eventdate.substring(0, 7) == (currentYear + '-' + (currentMonth + 1))) {
                        eventname = doc.data().title;
                        let displaycell = eventdate.substring(0, 4) + eventdate.substring(5, 7) + eventdate.substring(8, 10);
                        if (doc.data().timeslot == 'AM') {
                            displaycell += 1;
                            document.getElementById(displaycell).style.backgroundColor = 'lightpink';
                        } else if (doc.data().timeslot == 'PM') {
                            displaycell += 2;
                            document.getElementById(displaycell).style.backgroundColor = 'lightskyblue';
                        } else {
                            displaycell += 3;
                            document.getElementById(displaycell).style.backgroundColor = 'lightseagreen';
                        }
                        // console.log("displaycell" + ":" + displaycell + "; eventname:" + eventname);
                        // document.getElementById(displaycell).innerText = eventname.substring(0,6);
                        document.getElementById(displaycell).innerText += eventname.substring(0, 1).toUpperCase() + ".";
                        document.getElementById(displaycell).disabled = true;
                    }

                });
            })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
        else {
            console.log("not working...10");// User is signed out.
        }
    })


}

//load group message history
function loadgroupMessage(groupid) {
    // display all the messages
    document.getElementById("messages").innerText="";
    var messageRef = db.collection("groups").doc(groupid).collection("messagingText");
    messageRef.orderBy("timestamp")
    .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let textnode = document.createTextNode(doc.data().username);
            messages.appendChild(textnode);
            let newMessage = document.createElement("ul")
            newMessage.innerHTML = doc.data().message;
            messages.appendChild(newMessage);
        })});
}

var messages = document.getElementById("messages")
var textbox = document.getElementById("textbox")
var button = document.getElementById("button")

button.addEventListener("click", function() {
    var currentGroup = sessionStorage.getItem("groupid");
    var newMessage = document.createElement("ul")

    const db = firebase.firestore();
    user = firebase.auth().currentUser;

    newMessage.innerHTML = textbox.value;
 
      //Store username
      db.collection("groups").doc(currentGroup).collection("messagingText").add({          
          message: document.getElementById('textbox').value,
          username: user.displayName,
          timestamp: Date.now()
      }).then(function() {
          console.log("New message added to firestore");
          //window.close();
      }).catch(function (error) {
          console.log("Error adding new event: " + error);
      });
  
      console.log(newMessage)
      //displays user name and appends to text
      const textnode = document.createTextNode(user.displayName);
      messages.appendChild(textnode);
      messages.appendChild(newMessage);
      textbox.value = "";
    })
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
showCalendar(currentMonth, currentYear);



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

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
                    var cellid = t3 * 10000 + t2 * 100 + t1;
                    cell.setAttribute("id", cellid);
                    cell.addEventListener("click", function () {
                        makeItHappen(t1, t2, t3);
                    });
                    cell.className = "date-picker";
                    cell.innerHTML = "<span>" + date + "</span>";

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
    function makeItHappen(elem1, elem2, elem3) {
        console.log(elem1);
        sessionStorage.setItem("date", elem1);
        sessionStorage.setItem("month", elem2);
        sessionStorage.setItem("year", elem3);
        window.open('daily_schedule_edit.html', "newwindow", "height=600, width=500, top=(screen.height - 600) / 2, left=(screen.width - 500) / 2, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
    }

}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function loadEvents() {
    // $("#" + cellid).html('<span style="background-color: rgba(56, 114, 180, 0.3);z-index:-1;text-align:left">busy</span>');
    var tag = document.createElement("p");
    var text = document.createTextNode("busy sleeping");
    tag.appendChild(text);
    var element = document.getElementById(cellid);
    element.appendChild(tag);
    console.log(cellid);
}


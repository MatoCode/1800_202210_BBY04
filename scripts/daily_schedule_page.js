
function show0() {
    document.getElementsByClassName("day_schedule")[0].style.display = "block";
    document.getElementsByClassName("day_schedule")[1].style.display = "none";
}
function show1() {
    document.getElementsByClassName("day_schedule")[0].style.display = "none";
    document.getElementsByClassName("day_schedule")[1].style.display = "block";
}


let button_init = "<a onclick=\"window.open('daily_schedule_edit.html','popup','width=600,height=600'); return false;\">"
    + "<button class=\"hour_button\" type=\"button\">make a schedule</button> </a>";
let str = "<tr><td><p class=\"hour_line_odd\">" + 12 + ":00 am" + "</p></td>" + "<td>" + button_init + "</td></tr>";
for (let i = 1; i < 12; i++) {
    str += "<tr><td><p class=\"hour_line_odd\">" + i + ":00 am" + "</p></td>" + "<td>" + button_init + "</td></tr>";
}
str += "<tr><td><p class=\"hour_line_odd\">" + "12:00 pm" + "</p></td>" + "<td>" + button_init + "</td></tr>";
for (let i = 1; i < 12; i++) {
    str += "<tr><td><p class=\"hour_line_odd\">" + i + ":00 pm" + "</p></td>" + "<td>" + button_init + "</td></tr>";
}
document.querySelector('#schedule_table_body').innerHTML = str;


var date = new Date();
var week = date.getDay();
var days_in_months = 31;
if (date.getMonth == 11) {
    days_in_months = 30;
}


$("#date0-goes-here").text((date.getDate() - week -1) % days_in_months + 1);
$("#date1-goes-here").text((date.getDate() - week ) % days_in_months + 1);
$("#date2-goes-here").text((date.getDate() - week +1 ) % days_in_months +1 );
$("#date3-goes-here").text((date.getDate() - week +2 ) % days_in_months + 1);
$("#date4-goes-here").text((date.getDate() - week +3 ) % days_in_months +1 );
$("#date5-goes-here").text((date.getDate() - week +4 ) % days_in_months + 1);
$("#date6-goes-here").text((date.getDate() - week +5 ) % days_in_months + 1);


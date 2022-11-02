document.getElementsByClassName("day_schedule")[1].style.display = "none";
function show0() {
    document.getElementsByClassName("day_schedule")[0].style.display = "";
    document.getElementsByClassName("day_schedule")[1].style.display = "none";
}
function show1() {
    document.getElementsByClassName("day_schedule")[0].style.display = "none";
    document.getElementsByClassName("day_schedule")[1].style.display = "";
}


let str = "";
for (let i = 0; i < 24; i++) {
    str += "<tr><td><p class=\"hour_line_odd\">" + i + ":00" + "</p></td>" + "<td>" + "\
    <button class=\"hour_button\" type=\"button\" id=\"button" + i + "\" onclick=\"changeSchedule(id)\">make a schedule</button>" + "</td></tr>";
}
document.querySelector('#schedule_table_body').innerHTML = str;
let str_day1 = "";
for (let i = 0; i < 24; i++) {
    str_day1 += "<tr><td><p class=\"hour_line_odd\">" + i + ":00" + "</p></td>" + "<td>" + "\
    <button class=\"hour_button\" type=\"button\" id=\"button" + i + "_day1\" onclick=\"changeSchedule(id)\">make a schedule</button>" + "</td></tr>";
}
document.querySelector('#schedule_table_body_day1').innerHTML = str_day1;
function changeSchedule(button_id){
    element=document.getElementById(button_id);
    element.style.backgroundColor = "lightblue";  
    element.innerText = "schedule made";
    
    window.open('daily_schedule_edit.html','popup','width=600,height=600'); 
}

var date = new Date();
var week = date.getDay();

var days_in_months = 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();;
// if (date.getMonth == 11) {
//     days_in_months = 30;
// }


$("#date0-goes-here").text((date.getDate() - week -1 + days_in_months) % days_in_months + 1);
$("#date1-goes-here").text((date.getDate() - week + days_in_months) % days_in_months + 1);
$("#date2-goes-here").text((date.getDate() - week +1 + days_in_months) % days_in_months +1 );
$("#date3-goes-here").text((date.getDate() - week +2 + days_in_months ) % days_in_months + 1);
$("#date4-goes-here").text((date.getDate() - week +3 + days_in_months ) % days_in_months +1 );
$("#date5-goes-here").text((date.getDate() - week +4 + days_in_months ) % days_in_months + 1);
$("#date6-goes-here").text((date.getDate() - week +5 + days_in_months ) % days_in_months + 1);


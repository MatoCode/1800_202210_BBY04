var messages = document.getElementById("messages")
var textbox = document.getElementById("textbox")
var button = document.getElementById("button")



button.addEventListener("click", function() {
    var newMessage = document.createElement("ul")
    newMessage.innerHTML = textbox.value;
    messages.appendChild(newMessage);
    textbox.value = "";
});

//cell.addEventListener("click", function creat() {
//    window.location= 'daily_schedule_page.html';
//}, false);
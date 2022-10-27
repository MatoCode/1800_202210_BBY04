var group1 = ["group 1", "index.html", "login.html"];
var group2 = ["group 2", "login.html", "index.html"];
var tempGroupData = [group1, group2];

function loadGroups(){

    const dest = document.getElementById("group-list");
    var listing = document.createElement("ul", {class: "list-group list-group-horizontal"});
    for(var i in tempGroupData) {
        var name = document.createElement("li", {class: "list-group-item"});
        name.appendChild(document.createTextNode(tempGroupData[i[0]]));
        var calendar_button = document.createElement("button", { type: "button"});
        calendar_button.setAttribute("class", "list-group-item list-group-item-action")
        var messages_button = document.createElement("button", { type: "button"});
        messages_button.setAttribute("class", "list-group-item list-group-item-action")
        
        listing.appendChild(name);
        listing.appendChild(calendar_button);
        listing.appendChild(messages_button);
    }
    dest.appendChild(listing);
}
loadGroups();
var group1 = ["group 1", "index.html", "login.html"];
var group2 = ["group 2", "login.html", "index.html"];
var group3 = ["group 3", "placeholder", "placeholder"];
var group4 = ["group 4", "placeholder", "placeholder"];
var tempGroupData = [group1, group2, group3, group4];

function loadGroups(){

    const dest = document.getElementById("group-list");
    var list = document.createElement("ul");
    list.setAttribute("class", "list-group");
    for(var i in tempGroupData) {

        var listing = document.createElement("ul");
        listing.setAttribute("class", "list-group list-group-horizontal");

        var name = document.createElement("li");
        name.setAttribute("class", "list-group-item");
        name.appendChild(document.createTextNode(tempGroupData[i][0]));

        var calendar_button = document.createElement("button");
        calendar_button.setAttribute("class", "list-group-item list-group-item-action list-group-item-primary");
        calendar_button.setAttribute("type", "button");
        calendar_button.setAttribute("onclick", "location.href = '" + tempGroupData[i][1] + "'");
        calendar_button.appendChild(document.createTextNode("Calendar"));
        
        var messages_button = document.createElement("button");
        messages_button.setAttribute("class", "list-group-item list-group-item-action list-group-item-success");
        messages_button.setAttribute("type", "button");
        messages_button.appendChild(document.createTextNode("Messages"));


        listing.appendChild(name);
        listing.appendChild(calendar_button);
        listing.appendChild(messages_button);
        list.appendChild(listing);
    }
    dest.appendChild(list);
}
loadGroups();
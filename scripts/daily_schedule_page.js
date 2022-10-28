function show0(){
    document.getElementsByClassName("day_schedule")[0].style.display = "block";
    document.getElementsByClassName("day_schedule")[1].style.display = "none";
}
function show1(){
    document.getElementsByClassName("day_schedule")[0].style.display = "none";
    document.getElementsByClassName("day_schedule")[1].style.display = "block";
}
    var date = new Date();
    var week = date.getDay();
    if (week == 0) {
        $("#date0-goes-here").text(date.getDate()); 
        $("#date1-goes-here").text(date.getDate()+1); 
        $("#date2-goes-here").text(date.getDate()+2); 
        $("#date3-goes-here").text(date.getDate()+3); 
        $("#date4-goes-here").text(date.getDate()+4); 
        $("#date5-goes-here").text(date.getDate()+5); 
        $("#date6-goes-here").text(date.getDate()+6); 
    } else if (week == 4){
        $("#date0-goes-here").text(date.getDate()-1); 
        $("#date1-goes-here").text(date.getDate()); 
        $("#date2-goes-here").text(date.getDate()+1); 
        $("#date3-goes-here").text(date.getDate()+2); 
        $("#date4-goes-here").text(date.getDate()+3); 
        $("#date5-goes-here").text(date.getDate()+4); 
        $("#date6-goes-here").text((date.getDate()+5)%31); 
    }else if (week == 5){
        $("#date0-goes-here").text(date.getDate()-4); 
        $("#date1-goes-here").text(date.getDate()-3); 
        $("#date2-goes-here").text(date.getDate()-2); 
        $("#date3-goes-here").text(date.getDate()-1); 
        $("#date4-goes-here").text(date.getDate()); 
        $("#date5-goes-here").text(date.getDate()+1); 
        $("#date6-goes-here").text((date.getDate()+2)%31); 
    }

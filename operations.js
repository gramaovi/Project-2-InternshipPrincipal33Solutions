function addRow() {
          
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var data = document.getElementById("date");
    var img_path = document.getElementById("img_path");
    var sex = document.getElementById("sex");


    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 
    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= nume.value;
    row.insertCell(2).innerHTML= prenume.value;
    row.insertCell(3).innerHTML= email.value;
    row.insertCell(4).innerHTML= data.value;
    row.insertCell(5).innerHTML= "test";
    row.insertCell(6).innerHTML= "test";
  

 
}
 
function deleteRow(obj) {
      
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    
}
 
window.onbeforeunload = function() {
    return ("dsdsdS");
}
function load() {
    
    console.log("Page load finished");
 
}
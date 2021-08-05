function addRow() {
          
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var data = document.getElementById("date");
    var img_path = document.getElementById("img_path");

    var select = document.getElementById('sex');
    var sex_value = select.options[select.selectedIndex].value;
    var sex = document.getElementById("sex");


    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 

    row.insertCell(0).innerHTML= nume.value;
    row.insertCell(1).innerHTML= prenume.value;
    row.insertCell(2).innerHTML= email.value;
    row.insertCell(3).innerHTML= data.value;
    row.insertCell(4).innerHTML= "test";
    row.insertCell(5).innerHTML= sex_value;
    row.insertCell(6).innerHTML= '<input type="button" value = " X " onClick="Javacsript:deleteRow(this)">';
  

 
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
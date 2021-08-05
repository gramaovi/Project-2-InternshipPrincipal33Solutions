function addRow() {
          
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var data = document.getElementById("date");
    var img_path = document.getElementById("img_path");
    
    var select = document.getElementById('sex');
    var sex_value = select.options[select.selectedIndex].value;
   // var sex = document.getElementById("sex");

    if(document.getElementById("nume").value.length == 0 ||
    document.getElementById("prenume").value.length == 0 ||
    document.getElementById("email").value.length == 0 )
   //  sex_value.has("option").length <= 0 )

   //if(!data.value)
    //data!=null ||    
   // document.getElementById("img_path").value.length == 0||

  {
    alert("Complete all fields!");
    console.log(data.value);
}
   
    else{
        
        var table = document.getElementById("myTableData");
 
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
     
        row.insertCell(0).innerHTML= "test";
        row.insertCell(1).innerHTML= nume.value;
        row.insertCell(2).innerHTML= prenume.value;
        row.insertCell(3).innerHTML= email.value;
        row.insertCell(4).innerHTML= data.value;
        row.insertCell(5).innerHTML= sex_value;
        row.insertCell(6).innerHTML= '<input type="button" value = " X " onClick="Javacsript:deleteRow(this)">';
    }
    
  

 
}
 
function deleteRow(obj) {
      
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    
}
 
/*
window.onbeforeunload = function() {
    return ("dsdsdS");
}
*/


var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
function addRow() {


    /*
        //--load image
        var loadFile = function(event) {
            var reader = new FileReader();
            reader.onload = function(){
              var output = document.getElementById('output');
              output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
          };
          //-load image
          */
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var data = document.getElementById("date");
    var img_path = document.getElementById("img_path");

    var select = document.getElementById('sex');
    var sex_value = select.options[select.selectedIndex].value;
   // var sex = document.getElementById("sex");
/*
   var elements = document.getElementsByTagName("INPUT");
for (var i = 0; i < elements.length; i++) {
    elements[i].oninvalid = function(e) {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
            e.target.setCustomValidity("This field cannot be left blank");
        }
    };
    elements[i].oninput = function(e) {
        e.target.setCustomValidity("");
    };
}
*/
    
   //  sex_value.has("option").length <= 0 )

   //if(!data.value)
    //data!=null ||    
   // document.getElementById("img_path").value.length == 0||
   if(document.getElementById("nume").value.length == 0 ||
   document.getElementById("prenume").value.length == 0 ||
   document.getElementById("email").value.length == 0 ||
   document.getElementById("date").value=="2028-04-04"||
   document.getElementById("output").src=="http://127.0.0.1:5500/nullSource"||
   sex_value=="")
  {
    alert("Complete all fields!");
    console.log(data.value);
}
   
    else{
        console.log(sex_value);
        var table = document.getElementById("myTableData");
 
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
     
        row.insertCell(0).innerHTML= '<td align="center"><img src=' + document.getElementById("output").src + ' style="width:50px;border-radius: 50%;"></td>';
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


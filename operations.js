var myListofArrays;
var deletedArray;
function createArray()
{
    myListofArrays = [];
    deletedArray=[];
    
}
function viewArray()
{

}
function addTableRows(table)
{
   
    myListofArrays.forEach((element) => {
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML= '<td align="center"><img src=' 
        + element[0]
        + ' style="width:50px;border-radius: 50%;"></td>';
        row.insertCell(1).innerHTML= element[1];
        row.insertCell(2).innerHTML= element[2];
        row.insertCell(3).innerHTML= element[3];
        row.insertCell(4).innerHTML= element[4];
        row.insertCell(5).innerHTML= element[5];
        row.insertCell(6).innerHTML= '<input type="button" style="border-radius: 35%;" value = " X " onClick="Javacsript:deleteRow(this)">';
     
    }
);

}
function deleteRows(table)
{

while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}
var loadFile = function(event){
    var reader = new FileReader();
    reader.onload = function()
        {
            var output = document.getElementById('output');
            output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
 };
function addRow() {
    
    var img_path=document.getElementById("output").src
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var data = document.getElementById("date");
    

    var select = document.getElementById('sex');
    var sex_value = select.options[select.selectedIndex].value;
   
   if(document.getElementById("nume").value.length == 0 ||
   document.getElementById("prenume").value.length == 0 ||
   document.getElementById("email").value.length == 0 ||
   document.getElementById("date").value=="2028-04-04"||
   document.getElementById("output").src=="http://127.0.0.1:5500/nullSource"||
   sex_value=="")
    {
        alert("Complete all fields!");
    }  
    else{

        var dateFormat = new Date(data.value);
        var month = dateFormat.getMonth()+1;
        var day=dateFormat.getDate();
        var year=dateFormat.getFullYear();

        switch(month){
            case 1:
                month="Ianuarie";
                break;
            case 2:
                month="Februarie";
                break;
            case 3:
                month="Martie";
                break;
            case 4:
                month="Aprilie";
                break;
            case 5:
                month="Mai";
                break;
            case 6:
                month="Iunie";
                break;
            case 7:
                month="Iulie";
                break;
            case 8:
                month="August";
                break;
            case 9:
                month="Septembrie";
                break;
            case 10:
                month="Octombrie";
                break;
            case 11:
                month="Noiembrie";
                break;
            case 12:
                month="Decembrie";
                break;

}
        var newDate=day+"-"+month+"-"+year;
        var table = document.getElementById("myTableData");
        var array=[img_path,nume.value,prenume.value,email.value,newDate,sex_value];
        myListofArrays.push(array);
        deleteRows(table);
        addTableRows(table);
    }
}
function array_search()
{

}
function deleteRow(obj) {
     
   /* 
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    deletedArray=[table.rows[index].cells[1].innerHTML,table.rows[index].cells[2].innerHTML,table.rows[index].cells[3].innerHTML,table.rows[index].cells[4].innerHTML,table.rows[index].cells[5].innerHTML,table.rows[index].cells[6].innerHTML]
    console.log(deletedArray.toString());
    */
    sortedArray_Nume();
    
}
function searchByKeywords()
{

    function filterItems(arr, query) {
        return arr.filter(function(el) {
            return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
      }
}
function sortedArray_Nume()
{
    var sortedArray = myListofArrays.sort(function(a, b) {
        return b[1] - a[1];
      });
      sortedArray.forEach((element) => {
          console.log(element[1]);
      }
      );
}



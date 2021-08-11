var actualEmail;
var myListofArrays;
var deletedArray;
var orderNumeAsc=false;;
var orderPrenumeAsc=false;;
var orderNumeDesc=false;
var orderPrenumeDesc=false;
var sex_rar=false;
var sex_foarterar=false;
var sex_des=false;;
var sex_virgin=false;
var has_picture=false;
var has_no_picture=false;
var date_between_start=false;
var date_between_end=false;
var keyword_not_empty;
var keyword;
var dateFormat_start;
var dateFormat_end;


function createArray()
{
    myListofArrays = [];
    deletedArray=[];
    trueArray=[];
    
}
function firestore_write(img_path, nume, prenume,email,data,sex)
{
    let db = firebase.firestore();
    var citiesRef = db.collection("users");

    citiesRef.doc(email).set({
        profile_picture:img_path,
        nume:nume,
        prenume:prenume,
        email: email,
        bday:data,
        sex:sex
         });

}
function resetSort()
{
    orderNumeAsc=false;
    orderPrenumeAsc=false;
    orderNumeDesc=false;
    orderPrenumeDesc=false;
}
function reset()
{
  
    var select = document.getElementById('sex_filter');
    select.selectedIndex = 0;
    var select2 = document.getElementById('has_picture');
    select2.selectedIndex = 0;
   
   resetSort();
    sex_rar=false;
    sex_foarterar=false;
    sex_des=false;
    sex_virgin=false;
    has_picture=false;
    has_no_picture=false;
    date_between_start=false;
    date_between_end=false;
    keyword_not_empty=false;
}
function sortedAsc_Nume()
{
    resetSort();
    alert("Sorting by Nume ASC")
    orderNumeAsc=true;
}
function sortedAsc_Prenume()
{
    resetSort();
    alert("Sorting by Prenume ASC")
    orderPrenumeAsc=true;
}
function sortedDesc_Nume()
{
    resetSort();
    alert("Sorting by Nume DESC")
    orderNumeDesc=true;
}
function sortedDesc_Prenume()
{
    resetSort();
    alert("Sorting by Prenume DESC")
    orderPrenumeDesc=true;
}
function functions_checker()
{
    
    var search_keyword = document.getElementById("search_keyword");
    
    
    var select = document.getElementById('sex_filter');
    var sex_value = select.options[select.selectedIndex].value;   //sex value selected

    var select2 = document.getElementById('has_picture');
    var has_picture_value = select2.options[select2.selectedIndex].value;
    var date_start = document.getElementById('date_start');
    var date_end = document.getElementById('date_end');

   
  
    
    switch(sex_value)
    {
        case 'rar':
            sex_rar=true;
           // default:sex_rar=false;
            return;
        case 'foarterar':
            sex_foarterar=true;
            //default:sex_foarterar=false;
            return;
        case 'des':
            sex_des=true;
            //default:sex_des=false;
            return;
        case 'virgin':
            sex_virgin=true;
           // default:sex_virgin=false;
            return;
    }
    
  
    switch(has_picture_value)
    {

        case 'with_p':
            has_picture=true;
          //  default:has_picture=false;
            return;
        case 'without_p':
            has_no_picture=true;
           // default:has_no_picture=false;
            return;
    }
   // alert(has_picture_value);
    if(search_keyword.value.length>0)
    {
        keyword_not_empty=true;
        keyword=search_keyword.value;
    }
    if(date_start.value!=null)
    {
       // date_between_start=true;
    }
    if(date_end.value!=null)
    {
     //   date_between_end=true;
    }
     dateFormat_start = new Date(date_start.value);
     dateFormat_end = new Date(date_end.value);
 

   
   
}
function insertTable()
{   
    
    functions_checker();
    var db = firebase.firestore();
    deleteRows();
    //orderAsc=true;
    var usersRef = db.collection("users")
    if(has_picture==true)
        //alert("haspicture");
    
    //    alert(keyword);
    if(orderNumeDesc==true)
    {
        usersRef=usersRef.orderBy('nume','desc');
    }
    if(orderNumeAsc==true)
    {
        usersRef=usersRef.orderBy('nume','asc');
    }
    if(orderPrenumeDesc==true)
    {
        usersRef=usersRef.orderBy('prenume','desc');
    }
    if(orderPrenumeAsc==true)
    {
        usersRef=usersRef.orderBy('prenume','asc');
    }
    
    console.log(orderNumeAsc+" "+orderNumeDesc+" "+orderPrenumeAsc+" "+orderPrenumeDesc)
    if(sex_rar==true)
    {
        usersRef=usersRef.where("sex", "==", 'rar');
    }
    if(sex_des==true)
    {
        usersRef=usersRef.where("sex", "==", 'des');
    }
    if(sex_foarterar==true)
    {
        usersRef=usersRef.where("sex", "==", 'foarterar');
    }
    if(sex_virgin==true)
    {
        usersRef=usersRef.where("sex", "==", 'virgin');
    }
   
    if(has_picture==true)
    {
        usersRef=usersRef.where('profile_picture','!=','http://127.0.0.1:5500/nullSource');
    }
    if(has_no_picture==true)
    {
        usersRef=usersRef.where('profile_picture','==','http://127.0.0.1:5500/nullSource');
    }
    if(keyword_not_empty==true)
    {
        console.log(keyword);
      usersRef=usersRef.where('nume', ">=", keyword)
      .where('nume', "<", keyword +'z');
    }
    if(date_between_start==true)
    {
        let start = new Date('7/10/2021');
       
        usersRef=usersRef.where('bday', '>', date_start);
        
    }
    if(date_between_end==true)
    {
        let end = new Date('9/10/2021');
        usersRef=usersRef.where('bday', '<', date_end);
    }

    usersRef.get()
    .then(snapshot => {
    snapshot.forEach(doc => {
        
        //addTableRows2(Object.values(doc.data()));
        var array=[doc.get("profile_picture"),doc.get("nume"),doc.get("prenume"),doc.get("email"),doc.get("bday"),doc.get("sex")];
  // console.log(doc.get("profile_picture"));
         addTableRows2(array);

        //console.log(Object.values(doc.data()));
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
  reset();
}
/*
function search_Keyword()
{let db = firebase.firestore();
   // Create a reference to the cities collection
var citiesRef = db.collection("cities");

// Create a query against the collection.
db.collection("cities").where("capital", "==", true)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           
      console.log(doc.id, " => ",  Object.values(doc.data()) );
   
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}
*/
async function writeUserData(img_path, nume, prenume,email,data,sex,userId) {
    
    //let lastid = await getLastID()  ;
    
    var database = firebase.database();
    const dbRef = firebase.database().ref();
    var lastid;
    
    dbRef.limitToLast(1).on('child_added', function(snapshot) {
    
         snapshot.forEach((child) =>  {
          lastid=child.key;      
       });
       //console.log(lastid);
       lastid=parseInt(lastid);
       lastid+=1;
       firebase.database().ref('users/' + lastid).set({
           profile_picture:img_path,
           nume:nume,
           prenume:prenume,
           email: email,
           bday:data,
           sex:sex
           
         });
       
    });

//console.log(lastid);
    lastid=parseInt(lastid);
    lastid+=1;
    firebase.database().ref('users/' + 1).set({
        profile_picture:img_path,
        nume:nume,
        prenume:prenume,
        email: email,
        bday:data,
        sex:sex
      });
}
/*
async function getLastID()
{
    var database = firebase.database();
    const dbRef = firebase.database().ref();
    var lastid;
    dbRef.limitToLast(1).on('child_added', function(snapshot) {
    
         snapshot.forEach((child) =>  {
          lastid=child.key;      
       });
       
    });
    return lastid;
}
*/
function readData()
{
  
    deleteRows();
    var database = firebase.database();
    const dbRef = firebase.database().ref();

    dbRef.child("users").child(100).get().then((snapshot) => {
      if (snapshot.exists()) {
        myListofArrays.push(snapshot.val());
        logShowArray(myListofArrays);
      //  addTableRows2(Object.values(snapshot.val()));
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
}
function addTableRows2(element)
{
    var dateFormat = new Date(element[4]);
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
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML= '<td align="center"><img src=' 
        + element[0]
        + ' style="width:50px;border-radius: 50%;"></td>';
        row.insertCell(1).innerHTML= element[1];
        row.insertCell(2).innerHTML= element[2];
        row.insertCell(3).innerHTML= element[3];
        row.insertCell(4).innerHTML= newDate;
        row.insertCell(5).innerHTML= element[5];
        actualEmail=element[3];
        row.insertCell(6).innerHTML= '<input type="button" style="border-radius: 35%;" value = " X " onClick="Javacsript:deleteRow(this)">';
     


}
function logShowArray(arr)
{
    arr.forEach((element) => {
        console.log(element[0]+" "+element[1]+" "+element[2]+" "+element[3]+" "+element[4]+" "+element[5]);
    });
}
function addTableRows(arr)
{
    var table = document.getElementById("myTableData");
    arr.forEach((element) => {
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
        row.insertCell(6).innerHTML= '<input type="button" style="border-radius: 35%;" value = " X " onClick="Javacsript:deleteRow(this,'+element[4]+')">';
     
    }
);

}
function deleteRows()
{
    var table = document.getElementById("myTableData");
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
 function resetInputs()
 {
 
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var select = document.getElementById('sex');
    var data = document.getElementById("date");
    var img_path=document.getElementById("output");
    //img_path.src="nullSource";
   // img_path.value="";
    data.value="2028-04-04";
    select.selectedIndex = 0;
    nume.value="";
    prenume.value="";
    email.value="";

  
 }
 function addRow()
 {
    var img_path=document.getElementById("output").src
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var data = document.getElementById("date");
    

    var select = document.getElementById('sex');
    var sex_value = select.options[select.selectedIndex].value;
  

    var array=[img_path,nume.value,prenume.value,email.value,new Date(data.value).toLocaleDateString(),sex_value];
    myListofArrays.push(array);
    //writeUserData(img_path,nume.value,prenume.value,email.value,new Date(newDate).toLocaleDateString(),sex_value,100);
    firestore_write(img_path,nume.value,prenume.value,email.value,new Date(data.value).toLocaleDateString(),sex_value);
    deleteRows();
    insertTable();
    
    resetInputs();
  //  console.log(img_path.src);
  //  addTableRows(myListofArrays);
 }
 function onLoad()
 {
     createArray();
     config();
     const sortNume = document.getElementById('sortNume');
     const sortPrenume = document.getElementById('sortPrenume');
     const refresh = document.getElementById('refresh');
/*
     //--sort event handlers
     const sortNume = document.getElementById('sortNume');
     sortNume.oncontextmenu = function(e) {
        sortedDesc_Nume();
        e.preventDefault();
      }          
    sortNume.addEventListener('click',sortedAsc_Nume);

    const sortPrenume = document.getElementById('sortPrenume');
    sortPrenume.oncontextmenu = function(e) {
    sortedDesc_Prenume();
    e.preventDefault();
    }          
    sortPrenume.addEventListener('click',sortedAsc_Prenume);
      //--sort event handlers*/

var clickCount = 0;

sortNume.addEventListener('click', function() {
    clickCount++;
        if (clickCount === 1) {
            singleClickTimer = setTimeout(function() {
                clickCount = 0;
                sortedAsc_Nume();
            }, 200);
        } else if (clickCount === 2) {
            clearTimeout(singleClickTimer);
            clickCount = 0;
            sortedDesc_Nume();
        }
    }, false);
 
 sortPrenume.addEventListener('click', function() {
    clickCount++;
        if (clickCount === 1) {
            singleClickTimer = setTimeout(function() {
                clickCount = 0;
                sortedAsc_Prenume();
            }, 200);
        } else if (clickCount === 2) {
            clearTimeout(singleClickTimer);
            clickCount = 0;
            sortedDesc_Prenume();
        }
    }, false);

    refresh.addEventListener('click', function() {
        clickCount++;
            if (clickCount === 1) {
                singleClickTimer = setTimeout(function() {
                    clickCount = 0;
                    insertTable();
                }, 200);
            } else if (clickCount === 2) {
                clearTimeout(singleClickTimer);
                clickCount = 0;
                reset();
                alert("RESET!");
            }
        }, false);
}
//--sort event handlers
 

 
 /*
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
*/
function array_search()
{

}
function deleteRow(obj) {
    let db = firebase.firestore();
    var currentRow=$(obj).closest("tr"); 
    var col3=currentRow.find("td:eq(3)").text();
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    
    table.deleteRow(index);
    
    //console.log(col3);
    db.collection("users").doc(col3).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
   // myListofArrays.splice(index-2,1);
  // logShowArray(myListofArrays);

    
    
}
function searchByKeywords()
{

    function filterItems(arr, query) {
        return arr.filter(function(el) {
            return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
      }
}
function Comparator_Nume(a, b) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }
function sortedArray_Nume()
{
    deleteRows();
    var sortedArray = Array.from(myListofArrays).sort(Comparator_Nume);
      sortedArray.forEach((element) => {
      //   console.log(element[1]);
      }
      );
      addTableRows(sortedArray);
}
function Comparator_Prenume(a, b) {
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
  }
function sortedArray_Prenume()
{
    deleteRows();
    var sortedArray = Array.from(myListofArrays).sort(Comparator_Prenume);
      sortedArray.forEach((element) => {
        // console.log(element[1]);
      }
      );
      addTableRows(sortedArray);
}
function filteredArray_rar()
{
    deleteRows();
    var filteredArray = myListofArrays.filter(function (item){
        return item[5] == 'rar';
    })
    addTableRows(filteredArray);
}
function filteredArray_poza()
{
    deleteRows();
    var filteredArray = myListofArrays.filter(poza => poza[0].length > 500);
    addTableRows(filteredArray);


}
function filterArray_dates()
{
    var data_min= new Date('02/02/2020').toLocaleDateString();
    var data_max= new Date('02/02/2030').toLocaleDateString();
    Date()
    deleteRows();
    var filteredArray = myListofArrays.filter(function (item){
        if(item[4] > data_min && item[4]<data_max)
        return item[4];
    })
    addTableRows(filteredArray);
}
function filterByKeyword()
{
    deleteRows();
    var filteredArray = myListofArrays.filter(function (item){
        return item.includes("ovi");
    })
    addTableRows(filteredArray);
}

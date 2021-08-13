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

async function onLoad()
 {
   
     createArray();
     config();
     onLoadImg();
     const nullPath = await readNullImagePath();
     document.getElementById("imgPreview").src=nullPath;
     refreshTable();
 
   //  const profile_img=await getImage("dsadsaasdcom");
   //  console.log(profile_img);
     const sortNume = document.getElementById('sortNume');
     const sortPrenume = document.getElementById('sortPrenume');
     const refresh = document.getElementById('refresh');

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
                    refreshTable();
                }, 200);
            } else if (clickCount === 2) {
                clearTimeout(singleClickTimer);
                clickCount = 0;
                reset();
                alert("RESET!");
            }
        }, false);
}

function createArray()
{
    myListofArrays = [];
    deletedArray=[];
    
    
}
function firestore_write(img_path, nume, prenume,email,data,sex,has_picture)
{
    let db = firebase.firestore();
    var usersRef = db.collection("users");

    usersRef.doc(email).set({
        profile_picture:img_path,
        nume:nume,
        prenume:prenume,
        email: email,
        bday:data,
        sex:sex,
        has_picture
         });
       //  insertNullImage(img_path);

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
            break;
            
        case 'foarterar':
            sex_foarterar=true;
            break;
         
        case 'des':
            sex_des=true;
            break;
            
         case 'virgin':  
            sex_virgin=true;
            break;


    }
    
  
    switch(has_picture_value)
    {
        case 'with_p':
            has_picture=true;
            break;
            
        case 'without_p':
            has_no_picture=true;
            break;

    }
   // alert(has_picture_value);
    if(search_keyword.value.length>0)
    {
        keyword_not_empty=true;
        keyword=search_keyword.value;
    }
    if(date_start.value!="")
    {
    
        date_between_start=true;
    }
    if(date_end.value!="")
    {
        date_between_end=true;
    }
     //console.log(date_start.value) ;
    // dateFormat_end = new Date(date_end.value);
   
}
function insertNullImage(img_path)
{
    var db = firebase.firestore();
    var usersRef = db.collection("nullimage");
    usersRef.doc("nullImage").set({
        profile_picture:img_path,
      
         });

}
async function readNullImagePath()
{
    
    var db = firebase.firestore();
    var imgpathRef = db.collection("nullimage");
    var nullimgpath;
  
        await imgpathRef.get("nullImage")
        .then(snapshot => {
        snapshot.forEach(doc => {

            nullimgpath=doc.get("profile_picture");
                //->aici am acces la nullimgpath si afiseaza bine daca ii dau un log
           
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  
   
  
 return nullimgpath;

  //->aici imi da undefined in loc sa-mi dea valoarea corect
}
async function refreshTable()
{   
    var date_start = document.getElementById('date_start');
    var date_end = document.getElementById('date_end');
    functions_checker();
    var db = firebase.firestore();
    deleteRows();
    
    var imgpathRef = db.collection("nullimage");

    var usersRef = db.collection("users")

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
   
    if(keyword_not_empty==true)
    {
        console.log(keyword);
      usersRef=usersRef.where('nume', ">=", keyword)
      .where('nume', "<", keyword +'z');
    }
    if(date_between_start==true)
    {
       
       var secs=new Date(date_start.value).getTime()/1000;
      
       usersRef=usersRef.where('bday', '>', secs);
        
    }
    if(date_between_end==true)
    {
        var secs=new Date(date_end.value).getTime()/1000;
      
        usersRef=usersRef.where('bday', '<', secs);
    }

    if(has_picture==true)
    {
        usersRef=usersRef.where("has_picture", "==", 'true');
        
    }
    if(has_no_picture==true)
    {
        usersRef=usersRef.where("has_picture", "==", 'false');
    }
   //console.log(has_picture+"sex "+sex_des);
    let uref = await usersRef.get()
    // console.log('uref: ', uref)

    for (doc of uref.docs) {
        // console.log('doc: ', doc)

        if (doc) {
            
            // console.log('doc: ', doc)
            // console.log('doc email: ', doc.get("email"))
            const email = await doc.get("email")

            if (email && email.length > 0) {
               // const getLink = await getImage(email)
               //if(new Date(doc.get("bday")) > new Date(date_start.value))
            //console.log("sds"+ new Date(doc.get("bday")));
                // if (getLink) {
                    var array=[
                        //getLink,
                        doc.get("profile_picture"),
                        doc.get("nume"),
                        doc.get("prenume"),
                        doc.get("email"),
                        doc.get("bday"),
                        doc.get("sex")];
            
                    addTableRows2(array);
               // }

            }
        }
    }
    reset();
}

async function addTableRows2(element)
{
    var dateFormat = new Date(element[4]*1000);
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



    actualEmail=element[3];
    // const nullPath = await readNullImagePath();
    // const uploadTask= await uploadImage(actualEmail);

    // console.log('image src: ', element[0])

        row.insertCell(0).innerHTML= '<td align="center"><img src=' 
        + element[0]
        + ' style="width:50px;border-radius: 50%;"></td>';
        row.insertCell(1).innerHTML= element[1];
        row.insertCell(2).innerHTML= element[2];
        row.insertCell(3).innerHTML= element[3];
        row.insertCell(4).innerHTML= newDate;
        row.insertCell(5).innerHTML= element[5];
        
        row.insertCell(6).innerHTML= '<input type="button" style="border-radius: 35%;" value = " X " onClick="Javacsript:deleteRow(this)">';

    
}
function logShowArray(arr)
{
    arr.forEach((element) => {
        console.log(element[0]+" "+element[1]+" "+element[2]+" "+element[3]+" "+element[4]+" "+element[5]);
    });
}

 async function resetInputs()
 {
 
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var select = document.getElementById('sex');
    var data = document.getElementById("date");
    const nullPath = await readNullImagePath();
     document.getElementById("imgPreview").src=nullPath;
    //img_path.src="nullSource";
   // img_path.value="";
    data.value="";
    select.selectedIndex = 0;
    nume.value="";
    prenume.value="";
    email.value="";

  
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
    var date_start = document.getElementById('date_start');
    var date_end = document.getElementById('date_end');
   date_start.value="";
   date_end.value="";
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
function date_start()
{
    date_between_start=true;
}
function datE_end(){
    date_between_end=true;
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
async function uploadProfilePicture(email)
{
    const uploadTask=await uploadImage(email)
    const upload=await uploadUrl(uploadTask,email);
    return upload;
}
 async function addUser()
 {
    
  
  
    var img_path=document.getElementById("imgPreview").src
    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var email = document.getElementById("email");
    var data = document.getElementById("date");
    
    var secs=new Date(data.value).getTime()/1000;
    var select = document.getElementById('sex');
    var sex_value = select.options[select.selectedIndex].value;
    
    if(data.value=="" || nume.value.length==0 ||prenume.value.length==0||email.value.length==0||sex_value=="")
    {
        alert("Complete all fields");
    }
    else
    {
        const upload=await uploadProfilePicture(email.value);
        if(upload==true){
            
        
            const nullPath = await readNullImagePath();
                if(img_path==nullPath)
                {
                    
                    firestore_write(nullPath,nume.value,prenume.value,email.value,secs,sex_value,'false');
                }
                else
                {
                    // console.log('trying to get image at line 506 with value: ', email.value)
                    const getlink = await getImage(email.value);
                    if (getlink) {
                
                        firestore_write(getlink,nume.value,prenume.value,email.value,secs,sex_value,'true');
                    }
                }
    
            
        }
        else
        alert("Upload unsuccesfull.Try again!");
    

    deleteRows();
    await refreshTable();
    
    resetInputs();

    }

}

function deleteRows()
{
    var table = document.getElementById("myTableData");
    while (table.rows.length > 1) 
    {
        table.deleteRow(1);
    }
}
function deleteRow(row) {
    let db = firebase.firestore();
    var currentRow=$(row).closest("tr"); 
    var col3=currentRow.find("td:eq(3)").text();
    var index = row.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    
    table.deleteRow(index);

    db.collection("users").doc(col3).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
}

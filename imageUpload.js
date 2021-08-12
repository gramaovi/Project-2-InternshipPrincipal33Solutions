var ImgName, ImgUrl;
var files= [];
var reader;
function onLoadImg()
{
    document.getElementById("selectImg").onclick= function(e)
    {
        var input=document.createElement('input');
        input.type='file';
        
        input.onchange=e=>{
            files=e.target.files;
            reader=new FileReader();
            reader.onload=function()
            {
               
                document.getElementById("imgPreview").src = reader.result;
            }
            reader.readAsDataURL(files[0]);
        }
        input.click();
    
    }
}
async function uploadImage(mystring)
{  
    var email=mystring;
    email=email.replace('@','');
    email=email.replace('.','');
    
    
     var uploadTask=await firebase.storage().ref('ProfilePicture/'+email).put(files[0]);

     
return uploadTask;

}
async function uploadUrl(uploadTask,mystring)
{
    var email=mystring;
    email=email.replace('@','');
    email=email.replace('.','');

   //console.log(uploadTask);
 const url=await uploadTask.ref.getDownloadURL()

    
        
        var db = firebase.firestore();
        var usersRef = db.collection("Pictures");
        usersRef.doc(email).set({
            profile_picture:url
             });
    
    
        alert("Image added succesfully");
    
}
async function getImage(mystring)
{
    var link;
    var email=mystring;
    email=email.replace('@','');
    email=email.replace('.','');
    var db = firebase.firestore();
    
    var imgpathRefAsync = await  db.collection("Pictures").doc(email).get();
    
    let imgPathRef = imgpathRefAsync.data().profile_picture;
    console.log(imgpathRefAsync.data().profile_picture);
    return imgPathRef;
    
    // .then(snapshot => {
    // snapshot.forEach(doc => {
       
    //     link=doc.get("profile_picture");
    //     console.log(new String(link).toString()) ;
    // });
    // })
    // .catch(err => {
    //     console.log('Error getting documents', err);
    // });
    // return new String(link).toString();
    
    
}
   
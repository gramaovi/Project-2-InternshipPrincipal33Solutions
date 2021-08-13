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
    
     var uploadTask=await firebase.storage().ref('ProfilePicture/'+mystring).put(files[0]);

     
return uploadTask;

}
async function uploadUrl(uploadTask,mystring)
{
    // console.log('uploadtask: ', uploadTask)
 const url=await uploadTask.ref.getDownloadURL()

    
        
        var db = firebase.firestore();
        var usersRef = db.collection("users");
        usersRef.doc(mystring).set({
            profile_picture:url
             });
    
    
        alert("Image added succesfully");
// console.log("upload->!!!!!")
    return true;
    
}
async function getImage(mystring)
{
    // console.log("get->>!!")
    if (mystring && mystring.length > 0 ) {
        var db = firebase.firestore();
    
        var imgpathRefAsync = await  db.collection("users").doc(mystring).get();
     
        const imgPathRef = await imgpathRefAsync.data().profile_picture;
     
        return imgPathRef;
    }


    return undefined
 
}
   
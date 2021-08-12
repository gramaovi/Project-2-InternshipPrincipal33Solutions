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
    
    
     var uploadTask=firebase.storage().ref('ProfilePicture/'+email+".png").put(files[0]);
         uploadTask.on('state_changed', function(snapshot)
        { 
            var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
            document.getElementById('upProgress').innerHTML='Uploaded' + progress +"%";
        },
          function(error)
        {
            alert("Error save");
        },
          function()
        {
          uploadTask.snapshot.ref.getDownloadURL().then( async url =>
            {

                const ImgUrl=await url;
                console.log(ImgUrl);
                
                var db = firebase.firestore();
                var usersRef = db.collection("Pictures");
                usersRef.doc("ProfilePicture").set({
                    email:email,
                    profile_picture:ImgUrl
                     });
            
            
                alert("Image added succesfully");
            });
        });
    return  ImgUrl;

}
async function getImage(mystring)
{
    var email=mystring;
    email=email.replace('@','');
    email=email.replace('.','');
    var db = firebase.firestore();
    
    var imgpathRef =await  db.collection("Pictures").where("email","==",email);
    
     imgpathRef.get("ProfilePicture")
    
    .then(snapshot => {
    snapshot.forEach(doc => {
       
        nullimgpath=doc.get("profile_picture");
        console.log(nullimgpath);
    });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

    
    
}
   
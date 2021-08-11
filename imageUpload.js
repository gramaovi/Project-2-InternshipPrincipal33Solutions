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
                console.log(reader.result);
                document.getElementById("imgPreview").src = reader.result;
            }
            reader.readAsDataURL(files[0]);
        }
        input.click();
    
    }
}
function uploadImage(email)
{

  
    document.getElementById('addData').onclick=function(){

        var uploadTask=firebase.storage().ref('ProfilePicture/'+email+".png").put(files[0]);
        uploadTask.on('state_changed',function(snapshot)
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
            uploadTask.snapshot.ref.getDownloadURL().then(function(url)
            {
                ImgUrl=url;
            
                firebase.database().ref('Picture/'+ImgName).set(
                {
                    Name:email,
                    Link:ImgUrl
                });
                alert("Image added succesfully");
            });
        });
    }

}
async function getImage(email)
{
    fdb=firebase.database()
    await fdb.ref('ProfilePicture/'+email).on('value', function(snapshot){
        return snapshot.val().Link;
    });
}
   
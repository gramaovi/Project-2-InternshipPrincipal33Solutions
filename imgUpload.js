function uploadImg(email) {
    // Return a promise that will either resolve or emit an error
    return new Promise((resolve, reject) => {
        console.log('Uploading image ...');
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('user-uploads/images/' + email).put(email);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
                // An error occurred so inform the caller
                reject(error);
            },
            async () => {
                const imgURL = await uploadTask.snapshot.ref.getDownloadURL();
                console.log('uploaded image: ' + imgURL);
                this.newMarker.imgURL = imgURL;

                // We 'awaited' the imgURL, now resolve this Promise
                resolve(imgURL);
            }
        );
    });
};
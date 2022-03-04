    const uploadTask = storage.ref("PostImages" + data.image.name).put(data.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress;
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(progress);
      },(error) => {
        // Error function ...
        console.log(error);
      },  () => {
        storage.ref("PostImages").child(data.image.name).getDownloadURL().then((imageUrl) => {
          
            
                    db.collection("posts").add({
                      blogHeader: blogHeader,
                      blogBody: blogBody,
                      description: user.email,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                
                    setBlogHeader("");
                    setBlogBody("");
        }
        )}

);
        



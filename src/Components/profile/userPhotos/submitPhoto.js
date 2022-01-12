import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

export default function SubmitPhoto({ photoUrl, fullPath, selectFile }) {
  const handleSubmitPhoto = () => {
    // Create a root reference
    const storage = getStorage();

    // Create the file metadata
    //   /** @type {any} */
    const metadata = {
      contentType: 'images/jpeg',
    };

    // Create a reference to 'somaName.jpg'
    const userssRef = ref(storage, photoUrl);

    // Create a reference to 'images/someName.jpg'
    const usersImagesRef = ref(
      storage,
      fullPath

      // + selectFile.name
    );
    const uploadTask = uploadBytesResumable(
      usersImagesRef,
      selectFile,
      metadata
    );
    console.log(uploadTask);

    // While the file names are the same, the references point to different files
    const compRef = userssRef.name === usersImagesRef.name; // true
    //   userssRef.fullPath === usersImagesRef.fullPath; // false
    console.log(compRef);

    // Listen for state changes, errors, and completion of the upload.
    return uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('Something wrong');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log('Please authorized in you account');
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log('User canceled photo');
            break;
          // ...
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log('You choose unknown photo');
            break;
          default:
            return null;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };
  return {
    handleSubmitPhoto,
  };
}

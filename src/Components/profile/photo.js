import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import React, { useState } from 'react';

export default function Photo() {
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectFile, setSelectFile] = useState(null);
  const [fullPath, setFullPath] = useState(
    'gs://todolist-64991.appspot.com/images/'
  );

  const handleSubmitPhoto = () => {
    // Create a root reference
    const storage = getStorage();

    // Create the file metadata
    //   /** @type {any} */
    const metadata = {
      contentType: 'images/jpeg, images/jpg, images/png ',
    };

    // Create a reference to 'somaName.jpg'
    const mountainsRef = ref(storage, photoUrl);

    // Create a reference to 'images/someName.jpg'
    const mountainImagesRef = ref(storage, fullPath + selectFile.name);
    const uploadTask = uploadBytesResumable(
      mountainImagesRef,
      selectFile,
      metadata
    );
    console.log(uploadTask);

    // While the file names are the same, the references point to different files
    const compRef = mountainsRef.name === mountainImagesRef.name; // true
    //   mountainsRef.fullPath === mountainImagesRef.fullPath; // false
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

  const validSizeNumber = (num) => {
    return num.toString().replace(/(?=\d)(?=(\d{3})+(?!\d))/g, ' ');
  };

  const convertDataSize = () => {
    if (selectFile) {
      // Convert number of bytes what have size of bytes 1M or greater
      var convertMBMoreThan1B = selectFile.size / 1000000 / 1.024;
      // Convert number of bytes what have size of bytes 100Thousands or greater
      var convertKBMoreThan100Thousands = selectFile.size / 1000 / 1.024;
      // Convert number of bytes what have size of bytes 10Thousands or greater
      var convertKBMoreThan10Thousands = selectFile.size / 1000 / 1.024;
      // Convert number of bytes what have size of bytes 1Thousands or greater
      var convertKBMoreThan1Thousands = selectFile.size / 1000 / 1.024;

      // Display number of bytes what greater or equal 1M bytes
      if (selectFile.size >= 1000000) {
        console.log(convertMBMoreThan1B);
        return (
          <div>{`${validSizeNumber(convertMBMoreThan1B.toFixed(3))} MB`}</div>
        );
      }

      // Display number of bytes what greater or equal 100Thousands bytes
      else if (selectFile.size >= 100000) {
        console.log(convertKBMoreThan100Thousands);
        return (
          <p>{`${validSizeNumber(
            convertKBMoreThan100Thousands.toFixed(3)
          )} KB`}</p>
        );
      }

      // Display number of bytes what greater or equal 10Thousands bytes
      else if (selectFile.size >= 10000) {
        console.log(convertKBMoreThan10Thousands);
        return (
          <p>{`${validSizeNumber(
            convertKBMoreThan10Thousands.toFixed(3)
          )} KB`}</p>
        );
      }
      // Display number of bytes what greater or equal 1Thousands bytes
      else if (selectFile.size >= 1000) {
        console.log(convertKBMoreThan1Thousands);
        return (
          <p>{`${validSizeNumber(
            convertKBMoreThan1Thousands.toFixed(3)
          )} KB`}</p>
        );
      } else {
        console.log('Cannot convert this bytes of info');
      }
    }
  };
  const dataFile = () => {
    if (selectFile) {
      return (
        <div>
          <p>{selectFile.name}</p>
          <p>{selectFile.type}</p>
          {convertDataSize()}
        </div>
      );
    }
  };

  return (
    <div className='m-6'>
      <form
        method='POST'
        onSubmit={(event) => {
          selectFile.name >= 1
            ? handleSubmitPhoto(event)
            : event.preventDefault();
        }}
      >
        <h1 className='text-4xl font-bold'>Photo settings</h1>
        <input
          type='file'
          className='p-4 text-2xl m-2'
          onChange={(e) => setSelectFile(e.target.files[0])}
        />
        <button onClick={handleSubmitPhoto}>Set photo</button>
      </form>
      {dataFile()}
    </div>
  );
}

import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { DEFAULT_IMAGE_PATH } from '../../constants/defaultPaths';

import UserContext from '../../context/user';
import useUser from '../../hooks/user';

export default function HeaderToDo({ user: photoUser }) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  // const storage = getStorage();
  // const path = `gs://todolist-64991.appspot.com`;
  // const [fullPath, setFullPath] = useState(
  //   path + `/images/avatars/${user?.username}`
  // );

  // // Create a reference to 'images/someName.jpg'
  // const usersImagesRef = ref(
  //   storage,
  //   `${fullPath}.png` || `${fullPath}.jpg` || `${fullPath}.jpeg`
  //   // + selectFile.name
  // );
  // console.log(fullPath, user?.username);
  // useEffect(() => {
  //   const getPhoto = async () => {
  //     await getDownloadURL(usersImagesRef)
  //       .then((url) => {
  //         // Insert url into an <img> tag to "download"
  //         console.log(url);
  //         const img = document.getElementById('myimg');
  //         img.setAttribute('src', url);
  //       })
  //       .catch((error) => {
  //         // A full list of error codes is available at
  //         // https://firebase.google.com/docs/storage/web/handle-errors
  //         switch (error.code) {
  //           case 'storage/object-not-found':
  //             // File doesn't exist
  //             console.log(error);
  //             break;
  //           case 'storage/unauthorized':
  //             // User doesn't have permission to access the object
  //             break;
  //           case 'storage/canceled':
  //             // User canceled the upload
  //             break;
  //           default:
  //             console.log(error.code);
  //             break;
  //           // ...
  //           case 'storage/unknown':
  //             // Unknown error occurred, inspect the server response
  //             break;
  //         }
  //       });
  //   };
  //   getPhoto();
  // }, [usersImagesRef]);

  return (
    <div>
      {user && (
        <div className='flex border-l border-red-600 h-4 p-4 py-8 rounded-lg'>
          <div className='flex items-center'>
            {/* <Link to={`/p/${user?.username}`}>
              <img
                id='myimg'
                className='rounded-full h-8 w-8 flex'
                src={usersImagesRef.name}
                alt={`${user?.username} profile`}
                onError={(e) => {
                  e.target.src = DEFAULT_IMAGE_PATH;
                }}
              />
            </Link> */}{' '}
            <i className='text-3xl'>
              <strong>{user?.username}</strong>
            </i>
          </div>
        </div>
      )}
    </div>
  );
}

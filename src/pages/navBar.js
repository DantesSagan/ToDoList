import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import FirebaseContext from '../context/firebaseContext';
import UserContext from '../context/user';
import useUser from '../hooks/user';

import * as ROUTES from '../constants/routes';
import { DEFAULT_IMAGE_PATH } from '../constants/defaultPaths';

export default function NavBarAndHeader({ user: photoUser }) {
  const { firebaseLib } = useContext(FirebaseContext);
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const navigate = useNavigate();
  const path = `gs://todolist-64991.appspot.com`;
  const [fullPath, setFullPath] = useState(
    path + `/images/avatars/${photoUser?.username}`
  );
  const storage = getStorage();
  // Create a reference to 'images/someName.jpg'
  const mountainImagesRef = ref(
    storage,
    fullPath

    // + selectFile.name
  );

  const uploadTask = uploadBytesResumable(mountainImagesRef);
  const photo = () => {
    return uploadTask.on('state_changed', () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        return downloadURL;
      });
    });
  };

  console.log(mountainImagesRef.name);
  return (
    <header className='h-16 bg-black border-t border-8 border-red-600 mb-8 p-6 shadow-inner'>
      <div className='container mx-auto max-w-screen-lg h-full'>
        <div className='flex justify-between h-full'>
          <div className='text-white text-center flex items-center align-items cursor-pointer'>
            <Link to={ROUTES.DASHBOARD} />
          </div>
          <div className='text-white text-center flex items-center align-items cursor-pointer'>
            {loggedInUser ? (
              <>
                <Link to={ROUTES.DASHBOARD}>
                  {' '}
                  <div className='bg-white font-bold text-sm rounded-lg text-black p-2'>
                    DASHBOARD
                  </div>
                </Link>

                <button
                  className='bg-black font-bold text-sm rounded-lg text-white w-20 h-8'
                  type='button'
                  title='Sign Out'
                  onClick={() => {
                    firebaseLib.auth().signOut();
                    navigate(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebaseLib.auth().signOut();
                      navigate(ROUTES.LOGIN);
                    }
                  }}
                >
                  Sign Out
                </button>
                {user && (
                  <div className='flex items-center cursor-pointer'>
                    <Link to={`/p/${user?.username}`}>
                      <img
                        className='rounded-full h-8 w-8 flex'
                        src={`/images/avatars/${photoUser?.username}.jpg`}
                        alt={`${user?.username} profile`}
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type='button'
                    className='bg-white font-bold text-sm rounded-lg text-black p-2 w-22 h-10'
                  >
                    Log In{' '}
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type='button'
                    className='bg-black font-bold text-sm rounded-lg text-white w-22 h-10 p-2'
                  >
                    Sign-Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

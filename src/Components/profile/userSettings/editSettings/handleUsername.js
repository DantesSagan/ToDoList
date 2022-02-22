import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

import { doesUsernameExist, getUsername } from '../../../../services/firebase';

import IndexSetting from '../index.setting';
import { useEffect } from 'react';

export default function HandleUsername() {
  const {
    user,
    firebaseLib,
    username,
    setUsername,
    setError,
    userArray,
    setUserArray,
  } = IndexSetting();
  const isInvalidUsername = username === '';

  useEffect(() => {
    getUsername(setUserArray);
  }, []);

  const handleUsername = async (event) => {
    event.preventDefault();

    setUsername('');

    const auth = getAuth();
    const usernameExists = await doesUsernameExist(username);

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          username: username.toLowerCase(),
        })
          .then(() => {
            console.log('Username changed successfully: ', username);
            alert('Username changed successfully: ', username);
          })
          .catch((error) => {
            console.error('Error with username changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });

    if (!usernameExists) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then((docRef) => {
            console.log('Changes name successfully: ', user?.username);
            alert('Changes name successfully: ', docRef);
          })
          .catch((error) => {
            console.error('Error with name changes: ', error);
          });
      } catch (error) {
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
  };
  const UsernameDisplay = Object.keys(userArray).map((secondArray) => {
    let currentDisplayUsername = userArray[secondArray].username;
    let currentUserID = user?.userId === userArray[secondArray].userId;
    return (
      <div>
        {currentUserID ? (
          <div className={`${isInvalidUsername && 'opacity-60'}`}>
            <input
              minLength={4}
              maxLength={30}
              aria-label='Enter your username'
              type='text'
              placeholder={
                !currentDisplayUsername ? 'Gender' : currentDisplayUsername
              }
              className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <button
              disabled={isInvalidUsername}
              className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
              type='submit'
              onClick={handleUsername}
            >
              Change username
            </button>
          </div>
        ) : null}
      </div>
    );
  });
  return UsernameDisplay;
}

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail } from 'firebase/auth';

import IndexSetting from '../../Components/profile/userSettings/index.setting';
import { useEffect, useState } from 'react';
import { getUsername } from '../../services/firebase';

export default function HandleForgotEmail() {
  const { userArray, setUserArray } = IndexSetting();
  const [nickName, setNickName] = useState('');

  const { user, firebaseLib, emailAddress, setEmailAddress } = IndexSetting();
  const isInvalidEmailAddress = emailAddress === '';

  useEffect(() => {
    getUsername(setUserArray);
  }, []);

  const toDoArray = [];
  Object.keys(userArray).map((secondArray) => {
    return toDoArray.push(userArray[secondArray].username);
  });

  // In this case this will be find index of array = toDoArray by current auth user
  const length = toDoArray.indexOf(nickName);

  const handleEmailAddress = async (event) => {
    event.preventDefault();

    setEmailAddress('');
    const auth = getAuth();

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    // await updateEmail(auth.currentUser, emailAddress).then((item) => {
    //   console.log('Email provider changed successfully:  ', item);
    //   alert('Email provider changed successfully:  ', item);
    // });
    
    return Object.keys(userArray).map((secondArray) => {
      return querySnapshot.forEach((doc) => {
        console.log(userArray[secondArray].username === toDoArray[length]);
        if (
          doc.id === userArray[secondArray].userId &&
          userArray[secondArray].username === toDoArray[length]
        ) {
          updateDoc(doc.ref, {
            emailAddress: emailAddress.toLowerCase(),
          })
            .then((docRef) => {
              console.log('Email changed successfully: ', emailAddress);
              alert('Email changed successfully: ', emailAddress);
            })
            .catch((error) => {
              console.error('Error with email changed: ', error);
            });
        } else {
          console.log('Error with changing Email Address');
          return null;
        }
      });
    });
  };

  return (
    <div className={`${isInvalidEmailAddress && 'opacity-60'}`}>
      {' '}
      <input
        minLength={6}
        maxLength={50}
        aria-label='Enter your nickName'
        type='text'
        placeholder='Enter your nickName'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setNickName(target.value)}
        value={nickName}
      />
      <input
        minLength={6}
        maxLength={50}
        aria-label='Enter your email address'
        type='email'
        placeholder='Change you email address'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setEmailAddress(target.value)}
        value={emailAddress}
      />
      <button
        className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
        type='submit'
        onClick={handleEmailAddress}
      >
        Change email address
      </button>
    </div>
  );
}

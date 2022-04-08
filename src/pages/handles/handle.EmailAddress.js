import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail } from 'firebase/auth';

import IndexSetting from '../../Components/profile/userSettings/index.setting';
import { useEffect, useState } from 'react';
import { getUsername } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

export default function HandleForgotEmail() {
  const { userArray, setUserArray } = IndexSetting();
  const [nickName, setNickName] = useState('');

  const {
    user,
    firebaseLib,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    setError,
    checkEmailAddress,
    setCheckEmailAddress,
  } = IndexSetting();
  const isInvalidEmailAddress = emailAddress === '';

  const navigate = useNavigate();

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

    try {
      await firebaseLib
        .auth()
        .signInWithEmailAndPassword(checkEmailAddress, password);

      Object.keys(userArray).map((secondArray) => {
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

      await updateEmail(auth.currentUser, emailAddress.toLowerCase()).then(
        (item) => {
          firebaseLib.auth().signOut();
          navigate(ROUTES.FORGOTTENEMAIL);
          console.log('Email provider changed successfully:  ', item);
          alert('Email provider changed successfully:  ', item);
        }
      );
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);

      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  return (
    <div>
      {' '}
      <div className='border-2 border-red-600 rounded-lg p-1'>
        <h1 className='text-2xl font-bold text-center border-b-2 border-red-600 mb-6'>
          Enter you data for check.
        </h1>{' '}
        <div className='relative mb-4'>
          <input
            minLength={6}
            maxLength={50}
            id='nick'
            name='nick'
            placeholder='dantes@gmail.com'
            type='text'
            className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
            onChange={({ target }) => setNickName(target.value)}
            value={nickName}
          />
          <label
            className='absolute
                left-0
                -top-6
                text-gray-600
                transition-all
                duration-200
                text-sm
                peer-placeholder-shown:text-base
                peer-placeholder-shown:top-2
                peer-placeholder-shown:left-3
                peer-focus:-top-6
                peer-focus:text-gray-600
                peer-focus:text-sm
                select-none
                pointer-events-none
                '
            for='nick'
          >
            Last used nick
          </label>
        </div>
        {/* Sign in for 1 sec to update email insert current email address */}{' '}
        <div className='relative mb-4'>
          <input
            minLength={6}
            maxLength={50}
            id='email'
            name='email'
            placeholder='dantes@gmail.com'
            type='text'
            className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
            onChange={({ target }) => setCheckEmailAddress(target.value)}
            value={checkEmailAddress}
          />
          <label
            className='absolute
                left-0
                -top-6
                text-gray-600
                transition-all
                duration-200
                text-sm
                peer-placeholder-shown:text-base
                peer-placeholder-shown:top-2
                peer-placeholder-shown:left-3
                peer-focus:-top-6
                peer-focus:text-gray-600
                peer-focus:text-sm
                select-none
                pointer-events-none
                '
            for='email'
          >
            Last used email
          </label>
        </div>
        {/* Sign in for 1 sec to update email to insert current password for auth  */}
        <div className='relative mb-4'>
          <input
            minLength={6}
            maxLength={30}
            id='password'
            name='password'
            placeholder='dantes@gmail.com'
            type='text'
            className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <label
            className='absolute
                left-0
                -top-6
                text-gray-600
                transition-all
                duration-200
                text-sm
                peer-placeholder-shown:text-base
                peer-placeholder-shown:top-2
                peer-placeholder-shown:left-3
                peer-focus:-top-6
                peer-focus:text-gray-600
                peer-focus:text-sm
                select-none
                pointer-events-none
                '
            for='password'
          >
            Last used password
          </label>
        </div>
      </div>
      {/* This is input for change current emailAddress for new address that 
      was added in this input
      */}{' '}
      <h1 className='text-2xl font-bold text-center mb-6'>Enter new email</h1>{' '}
      <div className='relative mb-4'>
        <input
          minLength={6}
          maxLength={50}
          id='email'
          name='email'
          placeholder='dantes@gmail.com'
          type='text'
          className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
          onChange={({ target }) => setEmailAddress(target.value)}
          value={emailAddress}
        />
        <label
          className='absolute
                left-0
                -top-6
                text-gray-600
                transition-all
                duration-200
                text-sm
                peer-placeholder-shown:text-base
                peer-placeholder-shown:top-2
                peer-placeholder-shown:left-3
                peer-focus:-top-6
                peer-focus:text-gray-600
                peer-focus:text-sm
                select-none
                pointer-events-none
                '
          for='email'
        >
          New email address
        </label>
      </div>
      <button
        className={`w-full bg-black hover:bg-red-600 text-white mt-2 mb-2 p-2 rounded-lg font-bold ${
          isInvalidEmailAddress && 'opacity-60'
        }`}
        type='submit'
        onClick={handleEmailAddress}
      >
        Change email address
      </button>
    </div>
  );
}

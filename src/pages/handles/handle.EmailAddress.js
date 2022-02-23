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

    // if (checkEmailAddress !== emailAddress) {
    //   alert('Wrong email, confirm email');
    //   console.log('Wrong email, confirm email');
    //   return null;
    // } else {
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
          navigate(ROUTES.FORGOTDATA);
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
    // }
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
      {/* Sign in for 1 sec to update email insert current email address */}
      <input
        minLength={6}
        maxLength={50}
        aria-label='Enter your email address'
        type='email'
        placeholder='Change you email address'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setCheckEmailAddress(target.value)}
        value={checkEmailAddress}
      />
      {/* Sign in for 1 sec to update email to insert current password for auth  */}
      <input
        minLength={6}
        maxLength={30}
        aria-label='Enter your password'
        type='password'
        placeholder='Enter your password'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setPassword(target.value)}
        value={password}
      />
      {/* This is input for change current emailAddress for new address that 
      was added in this input
      */}
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

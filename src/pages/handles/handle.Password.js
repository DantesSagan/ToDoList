import { updatePassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';

import IndexSetting from '../../Components/profile/userSettings/index.setting';
import { firebaseLib } from '../../firebaseLibrary/firebaseLib';

export default function HandleForgotPassword() {
  const {
    password,
    setPassword,
    setError,
    emailAddress,
    setEmailAddress,
    checkPassword,
    setCheckPassword,
  } = IndexSetting();
  const [changePassword, setChangePassword] = useState('');

  const passOne = changePassword;
  const passTwo = checkPassword;

  const [nickName, setNickName] = useState('');

  const isInvalidPassword = password === '';
  const handlePass = async (event) => {
    event.preventDefault();

    const auth = getAuth();

    if (passOne !== passTwo) {
      alert('Wrong password, confirm pass');
      console.log('Wrong password, confirm pass');
      return null;
    } else {
      await updatePassword(auth.currentUser, changePassword)
        .then((item) => {
          console.log('Password changed successfully: ', item);
          alert('Password changed successfully: ', item);
        })
        .catch((error) => {
          console.log('Error with password changed', error);
          setError(error);
        });
      console.log('Password confirmed');
    }
    try {
      await firebaseLib
        .auth()
        .signInWithEmailAndPassword(emailAddress, password);

      if (passOne !== passTwo) {
        alert('Wrong password, confirm pass');
        console.log('Wrong password, confirm pass');
        return null;
      } else {
        await updatePassword(auth.currentUser, changePassword)
          .then((item) => {
            console.log('Password changed successfully: ', item);
            alert('Password changed successfully: ', item);
          })
          .catch((error) => {
            console.log('Error with password changed', error);
            setError(error);
          });
        console.log('Password confirmed');
      }
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
      <div className='border-2 border-red-600 rounded-lg p-1'>
        <h1 className='text-2xl font-bold text-center border-b-2 border-red-600'>
          Enter you data for check.
        </h1>{' '}
        <h1 className='text-1xl font-bold'>Last used email</h1>{' '}
        {/* Sign in for 1 sec to update email insert current email address */}
        <input
          minLength={6}
          maxLength={50}
          aria-label='Enter your email address'
          type='email'
          placeholder='Change you email address'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
          onChange={({ target }) => setEmailAddress(target.value)}
          value={emailAddress}
        />
        <h1 className='text-1xl font-bold'>Last used password</h1>
        {/* Sign in for 1 sec to update email to insert current password for auth  */}
        <input
          minLength={6}
          maxLength={30}
          aria-label='Enter your password'
          type='password'
          placeholder='Enter your password'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
      </div>
      <h1 className='text-2xl font-bold text-center mb-2'>
        Enter new password
      </h1>{' '}
      <input
        minLength={6}
        maxLength={35}
        aria-label='Enter your new password'
        type='password'
        placeholder='Enter your new password'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setChangePassword(target.value)}
        value={passOne}
      />
      <input
        minLength={6}
        maxLength={35}
        aria-label='Confirm your new password'
        type='password'
        placeholder='Confirm your new password'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setCheckPassword(target.value)}
        value={passTwo}
      />
      <button
        disabled={isInvalidPassword}
        className={`float-right bg-black hover:bg-red-600 text-white rounded-lg m-3 p-1 font-bold ${
          isInvalidPassword && 'opacity-60'
        }`}
        type='submit'
        onClick={handlePass}
      >
        Change password
      </button>
    </div>
  );
}

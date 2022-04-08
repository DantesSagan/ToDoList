import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '@mui/material';
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

  const [toggle, setToggle] = useState(true);
  const [type, setType] = useState('password');

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
        <h1 className='text-2xl font-bold text-center border-b-2 border-red-600 mb-6'>
          Enter you data for check.
        </h1>{' '}
        {/* Sign in for 1 sec to update email insert current email address */}
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
        {/* Sign in for 1 sec to update email to insert current password for auth  */}
        <div className='relative mb-4'>
          <div className='grid grid-rows-1 grid-flow-col gap-1'>
            <input
              minLength={6}
              maxLength={30}
              id='password'
              name='password'
              placeholder='dantes@gmail.com'
              type={type}
              className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <div
              className='ml-48 mt-1 eyePass absolute
                transition-all
                peer-placeholder-shown:top-0
                peer-placeholder-shown:left-0'
            >
              {toggle ? (
                <Button
                  style={{
                    maxWidth: '80px',
                    minWidth: '30px',
                  }}
                  size='small'
                  variant='text'
                  aria-label='toggle password visibility'
                  onClick={() => {
                    setType('text');
                    setToggle(!toggle);
                  }}
                >
                  <VisibilityOff />
                </Button>
              ) : (
                <Button
                  style={{
                    maxWidth: '80px',
                    minWidth: '30px',
                  }}
                  size='small'
                  variant='text'
                  aria-label='toggle password invisible'
                  onClick={() => {
                    setType('password');
                    setToggle(!toggle);
                  }}
                >
                  <Visibility />
                </Button>
              )}
            </div>{' '}
            <label
              className='absolute
                left-0
                -top-6
                text-gray-600
                transition-all
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
      </div>
      <h1 className='text-2xl font-bold text-center mb-6 mt-2'>
        Enter new password
      </h1>{' '}
      <div className='relative mb-4'>
        <input
          minLength={6}
          maxLength={30}
          id='password'
          name='password'
          placeholder='dantes@gmail.com'
          type='password'
          className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
          onChange={({ target }) => setChangePassword(target.value)}
          value={passOne}
        />
        <label
          className='absolute
                left-0
                -top-6
                text-gray-600
                transition-all
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
          New password
        </label>
      </div>
      <div className='relative mb-4'>
        <input
          minLength={6}
          maxLength={30}
          id='password'
          name='password'
          placeholder='dantes@gmail.com'
          type='password'
          className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
          onChange={({ target }) => setCheckPassword(target.value)}
          value={passTwo}
        />
        <label
          className='absolute
                left-0
                -top-6
                text-gray-600
                transition-all
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
          Compare to check password
        </label>
      </div>
      <button
        disabled={isInvalidPassword}
        className={` bg-black hover:bg-red-600 text-white rounded-lg p-2 w-full font-bold mb-2 ${
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

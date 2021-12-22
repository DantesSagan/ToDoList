import { useEffect } from 'react';

import NavBarAndHeader from '../../pages/navBar';
import HandleEmailAddress from './toDoSettings/editSettings/handleEmailAddress';
import HandleFullName from './toDoSettings/editSettings/handleFullName';
import HandlePassword from './toDoSettings/editSettings/handlePassword';
import HandleUsername from './toDoSettings/editSettings/handleUsername';

import DeleteUserAccount from './toDoSettings/settings.deleteUserAccount';
import HandleEditToDoConst from './toDoSettings/settings.handleEditToDo';

import { CheckUserProfile } from './toDoSettings/settings.checkUserProfile';
import HandlePhone from './toDoSettings/editSettings/handlePhone';

export default function Setting() {
  const { country, setCountry, city, setCity, gender, setGender } =
    HandleEditToDoConst();

  const { handlePass, password, setPassword, passOne, passTwo, setCheckPass } =
    HandlePassword();
  const { handleEmailAddress, emailAddress, setEmailAddress } =
    HandleEmailAddress();
  const { handleFullName, fullName, setFullName } = HandleFullName();
  const { handleUsername, username, setUsername } = HandleUsername();
  const { handlePhone, phone, setPhone } = HandlePhone();
  const { DUA } = DeleteUserAccount();

  const isInvalidPassword = password === '';
  const isInvalidEmailAddress = emailAddress === '';
  const isInvalidFullName = fullName === '';
  const isInvalidUsername = username === '';
  const isInvalidPhone = phone === '';

  useEffect(() => {
    document.title = 'Settings - ToDoList';
  }, []);

  return (
    <div>
      <NavBarAndHeader />
      <form
        className='container block mx-auto max-w-screen-sm item-center justify-center'
        method='POST'
      >
        <fieldset className='border border-gray-primary p-4'>
          <legend className='block m-auto'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12'
              fill='none'
              viewBox='0 0 24 24'
              stroke='black'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
          </legend>
          <div className='text-3xl text-center text-black underline p-4'>
            Change data Form
          </div>
          {/* GENDER */}
          <input
            placeholder='Gender/sex/floor/ground xd'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setGender(target.value)}
            type='text'
            checked
            value={gender}
          />
          {/* CITY */}
          <input
            aria-label='Enter your city'
            type='text'
            placeholder='City'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setCity(target.value)}
            value={city}
          />
          {/* COUNTRY */}
          <input
            aria-label='Enter your Country'
            type='text'
            placeholder='Country'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setCountry(target.value)}
            value={country}
          />
          {/* PHONE */}
          <div className={`${isInvalidPhone && 'opacity-60'}`}>
            <input
              aria-label='Enter your phone number'
              type='tele'
              placeholder='Phone Number'
              className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setPhone(target.value)}
              value={phone}
            />
            <button
              disabled={isInvalidPhone}
              className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
              type='submit'
              onClick={handlePhone}
            >
              Change phone
            </button>
          </div>
          {/* USERNAME */}
          <div className={`${isInvalidUsername && 'opacity-60'}`}>
            <input
              minLength={4}
              maxLength={30}
              aria-label='Enter your username'
              type='text'
              placeholder='Username'
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
          {/* FULL NAME */}
          <div className={`${isInvalidFullName && 'opacity-60'}`}>
            <input
              aria-label='Enter your full name'
              type='text'
              placeholder='Full name'
              className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <button
              disabled={isInvalidFullName}
              className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
              type='submit'
              onClick={handleFullName}
            >
              Change full name
            </button>
          </div>
          {/* EMAIL ADDRESS */}
          <div className={`${isInvalidEmailAddress && 'opacity-60'}`}>
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
          {/* PASSWORD */}
          <div className={`${isInvalidPassword && 'opacity-60'}`}>
            <input
              minLength={6}
              maxLength={30}
              aria-label='Enter your password'
              type='password'
              placeholder='Enter your password'
              className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setPassword(target.value)}
              value={passOne}
            />
            <input
              minLength={6}
              maxLength={30}
              aria-label='Confirm your password'
              type='password'
              placeholder='Confirm your password'
              className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setCheckPass(target.value)}
              value={passTwo}
            />
            <button
              disabled={isInvalidPassword}
              className={`float-right bg-black hover:bg-red-600 text-white rounded-lg m-3 p-1 font-bold `}
              type='submit'
              onClick={handlePass}
            >
              Change password
            </button>
          </div>
        </fieldset>
        <div className='p-4'>
          {/* CHECK USER PROFILE */}
          <button
            onClick={CheckUserProfile}
            type='button'
            className='bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold'
          >
            Check User Profile
          </button>
        </div>
        <div className='p-4'>
          {/* DELETE USER ACCOUNT */}
          <button
            onClick={DUA}
            type='button'
            className='bg-red-700 hover:bg-red-600 text-white w-full rounded h-8 font-bold'
          >
            Delete user account
          </button>
        </div>
      </form>
    </div>
  );
}

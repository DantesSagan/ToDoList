import { useState, useEffect } from 'react';

import NavBarAndHeader from '../../pages/navBar';

import { CheckUserProfile } from './toDoSettings/settings.checkUserProfile';
import DeleteUserAccount from './toDoSettings/settings.deleteUserAccount';
import HandleEditToDoConst from './toDoSettings/settings.handleEditToDo';

export default function Setting() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const { DUA } = DeleteUserAccount();
  const { handleEditToDo } = HandleEditToDoConst();
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
          <input
            placeholder='Gender/sex/floor/ground xd'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setGender(target.value)}
            type='text'
            checked
            value={gender}
          />
          <input
            aria-label='Enter your city'
            type='text'
            placeholder='City'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setCity(target.value)}
            value={city}
          />
          <input
            aria-label='Enter your Country'
            type='text'
            placeholder='Country'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setCountry(target.value)}
            value={country}
          />
          <input
            aria-label='Enter your phone number'
            type='tele'
            placeholder='Phone Number'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setPhone(target.value)}
            value={phone}
          />
          <input
            aria-label='Enter your username'
            type='text'
            placeholder='Username'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            aria-label='Enter your full name'
            type='text'
            placeholder='Full name'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setFullName(target.value)}
            value={fullName}
          />
          <input
            aria-label='Enter your email address'
            type='email'
            placeholder='Email address'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            aria-label='Enter your password'
            type='password'
            placeholder='Password'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />{' '}
        </fieldset>
        <button
          onClick={handleEditToDo}
          type='submit'
          className={`bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold `}
        >
          Change
        </button>
        <div className='p-4'>
          <button
            onClick={CheckUserProfile}
            type='button'
            className='bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold'
          >
            Check User Profile
          </button>
        </div>
        <div className='p-4'>
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

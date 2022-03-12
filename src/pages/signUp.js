import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import HandleSingUp from './handles/handle.SignUp';

export default function SignUp() {
  const {
    SignUp,
    username,
    setUsername,
    fullName,
    setFullName,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    country,
    setCountry,
    phone,
    setPhone,
    city,
    setCity,
    gender,
    setGender,
    error,
    passOne,
    passTwo,
    setCheckPass,
  } = HandleSingUp();

  const isInvalid = password === '' || emailAddress === '' || username === '';

  useEffect(() => {
    document.title = 'Sign Up - ToDoList';
  }, []);

  return (
    <section className='bgLogin'>
      <div className='container flex mx-auto max-w-screen-sm items-center justify-center h-screen arrow-down arrow-up'>
        <div className='flex flex-col w-2/4 border-t border-8 border-red-600'>
          <div className='flex flex-col items-center bg-white p-4 border border-gray-primary rounded'>
            <h1 className='flex justify-center w-full'>
              {/* <img
              src='/images/logo.png'
              alt='Instagram'
              className='mt-2 w-6/12 mb-4'
            /> */}
            </h1>

            {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

            <form onSubmit={SignUp} method='POST'>
              {' '}
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
                <div className='text-3xl text-center text-black p-4 mb-6 border-b-2 border-red-600'>
                  Sign-Up Form
                </div>
                {/* SET GENDER */}
                <input
                  className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                  onChange={({ target }) => setGender(target.value)}
                  type='text'
                  placeholder='Pick you gender/sex/ground or wh u like'
                  value={gender}
                />
                {/* SET CITY */}
                <input
                  aria-label='Enter your city'
                  type='text'
                  placeholder='City'
                  className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                  onChange={({ target }) => setCity(target.value)}
                  value={city}
                />
                {/* SET COUNTRY */}
                <input
                  aria-label='Enter your Country'
                  type='text'
                  placeholder='Country'
                  className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                  onChange={({ target }) => setCountry(target.value)}
                  value={country}
                />
                {/* SET PHONE */}
                <input
                  aria-label='Enter your phone number'
                  type='tele'
                  placeholder='Phone Number'
                  className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                  onChange={({ target }) => setPhone(target.value)}
                  value={phone}
                />
                {/* SET USERNAME */}
                <input
                  minLength={4}
                  maxLength={30}
                  required
                  aria-label='Enter your username'
                  type='text'
                  placeholder='Username'
                  className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                  onChange={({ target }) => setUsername(target.value)}
                  value={username}
                />
                {/* SET FULLNAME */}
                <input
                  required
                  aria-label='Enter your full name'
                  type='text'
                  placeholder='Full name'
                  className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                  onChange={({ target }) => setFullName(target.value)}
                  value={fullName}
                />
                {/* SET EMAIL ADDRESS */}
                <input
                  minLength={12}
                  maxLength={50}
                  required
                  aria-label='Enter your email address'
                  type='email'
                  placeholder='Email address'
                  className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                  onChange={({ target }) => setEmailAddress(target.value)}
                  value={emailAddress}
                />
                {/* SET PASSWORD */}
                <div
                  className={`border-t border-4 border-red-600 p-1 ${
                    isInvalid && 'opacity-40'
                  }`}
                >
                  <input
                    minLength={6}
                    maxLength={35}
                    aria-label='Enter your password'
                    type='password'
                    placeholder='Enter your password'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target }) => setPassword(target.value)}
                    value={passOne}
                  />
                  <input
                    minLength={6}
                    maxLength={35}
                    aria-label='Confirm your password'
                    type='password'
                    placeholder='Confirm your password'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target }) => setCheckPass(target.value)}
                    value={passTwo}
                  />
                </div>
              </fieldset>
              <button
                disabled={isInvalid}
                type='submit'
                className={`bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-40'}`}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray'>
            <p className='text-sm'>
              Have an account?{' '}
              <Link to={ROUTES.LOGIN} className='font-bold text-blue'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doesUsernameExist } from '../services/firebase';

import FirebaseContext from '../context/firebaseContext';
import * as ROUTES from '../constants/routes';

export default function SignUp() {
  const navigate = useNavigate();
  const { firebaseLib } = useContext(FirebaseContext);

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

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebaseLib
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebaseLib
          .firestore()
          .collection('users')
          .add({
            gender: gender,
            city: city,
            phone: phone,
            country: country,
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: ['2'],
            followers: [],
            dateCreated: Date.now(),
          });

        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        setCity('');
        setPhone('');
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  return (
    <div className='container flex mx-auto max-w-screen-sm items-center justify-center h-screen'>
      <div className='flex flex-col w-2/4'>
        <div className='flex flex-col items-center bg-white p-4 border border-gray-primary rounded'>
          <h1 className='flex justify-center w-full'>
            {/* <img
              src='/images/logo.png'
              alt='Instagram'
              className='mt-2 w-6/12 mb-4'
            /> */}
          </h1>

          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

          <form onSubmit={handleSignUp} method='POST'>
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
              <div className='text-3xl text-center text-black underline'>
                Sign-Up Form
              </div>
              <div
                className='h-full w-full mr-3 py-5 px-4 h-2 mb-2'
                id='gender'
              >
                <label>
                  Gender<span class='text-danger'></span>
                </label>
                <br />
                <label id='male'>
                  <input
                    className='form-radio'
                    onChange={({ target }) => setGender(target.value)}
                    type='radio'
                    name='user-prefer'
                    unchecked
                    value={gender}
                  />
                  Male
                </label>
                <br />
                <label>
                  <input
                    className='form-radio'
                    onChange={({ target }) => setGender(target.value)}
                    id='female'
                    type='radio'
                    name='user-prefer'
                    unchecked
                    value={gender}
                  />
                  Female
                </label>
              </div>
              <input
                required
                aria-label='Enter your city'
                type='text'
                placeholder='City'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setCity(target.value)}
                value={city}
              />
              <input
                required
                aria-label='Enter your Country'
                type='text'
                placeholder='Country'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setCountry(target.value)}
                value={country}
              />
              <input
                required
                aria-label='Enter your phone number'
                type='tele'
                placeholder='Phone Number'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setPhone(target.value)}
                value={phone}
              />
              <input
                required
                aria-label='Enter your username'
                type='text'
                placeholder='Username'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setUsername(target.value)}
                value={username}
              />
              <input
                required
                aria-label='Enter your full name'
                type='text'
                placeholder='Full name'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setFullName(target.value)}
                value={fullName}
              />
              <input
                required
                aria-label='Enter your email address'
                type='email'
                placeholder='Email address'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
              />
              <input
                required
                aria-label='Enter your password'
                type='password'
                placeholder='Password'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />{' '}
              <button
                disabled={isInvalid}
                type='submit'
                className={`bg-black hover:bg-gray-600 text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-40'}`}
              >
                Sign Up
              </button>
            </fieldset>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray mt-1'>
          <p className='text-sm'>
            Have an account?{' '}
            <Link to={ROUTES.LOGIN} className='font-bold text-blue'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

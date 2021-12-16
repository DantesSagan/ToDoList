import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebaseContext';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const navigate = useNavigate();
  const { firebaseLib } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebaseLib
        .auth()
        .signInWithEmailAndPassword(emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - ToDoList';
  }, []);
  return (
    <div className='container flex mx-auto max-w-screen-sm items-center justify-center h-screen'>
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
          <form onSubmit={handleLogin} method='POST'>
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
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              </legend>
              <div className='text-3xl text-center text-black underline mb-6'>
                Log-In
              </div>
              <input
                aria-label='Enter your email address'
                type='text'
                placeholder='Email address (ex: Dantes@gmail.com)'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({target}) => setEmailAddress(target.value)}
                value={emailAddress}
              />
              <input
                aria-label='Enter your email password'
                type='password'
                placeholder='Password (ex: DanteskillsPushkin1837)'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({target}) => setPassword(target.value)}
                value={password}
              />
              <button
                disabled={isInvalid}
                type='submit'
                className={`bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold 
            ${isInvalid && 'opacity-50'}`}
              >
                Login
              </button>
            </fieldset>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary mt-1'>
          <p className='text-sm'>
            Don't have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

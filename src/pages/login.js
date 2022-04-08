import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebaseContext';
import * as ROUTES from '../constants/routes';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const navigate = useNavigate();
  const { firebaseLib } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [lock, setLock] = useState(true);

  const [toggle, setToggle] = useState(true);
  const [type, setType] = useState('');

  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();
    setLock(!lock);

    try {
      await firebaseLib
        .auth()
        .signInWithEmailAndPassword(emailAddress, password);

      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      if (error) {
        setLock(!lock);
      }
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - ToDoList';
  }, []);

  // console.log(
  //   lock
  //     ? console.log(`Locked value ${lock}`)
  //     : error
  //     ? console.log(`Locked value error ${error}`)
  //     : console.log(`Unlocked value ${lock}`)
  // );
  return (
    <section className='bgLogin'>
      <div className='container flex mx-auto max-w-screen-sm items-center justify-center h-screen arrow-down arrow-up '>
        {/* <img
        src='/todolistred-removebg-preview.png'
        alt='todolist'
        className='float-right'
      /> */}
        <div className='flex flex-col 2xl:w-2/4 1xl:w-2/4 xl:w-2/4 lg:w-2/4 md:w-2/4 sm:w-2/4 border-t border-8 border-red-600 greetPages'>
          <div className='flex flex-col items-center bg-white p-4 border border-gray-primary rounded pb-8'>
            {/* <button onClick={() => setLock(!lock)}>Console lock</button> */}
            {error && (
              <p className='text-sm text-red-600 text-left'>{error}</p>
            )}{' '}
            <form onSubmit={handleLogin} method='POST'>
              <fieldset className='border border-gray-primary p-4'>
                <legend className='block m-auto'>
                  {lock ? (
                    // Locked value
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 transition duration-300'
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
                  ) : error ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 border-red-600 border-2 rounded-lg bg-black transition duration-300'
                      fill='red'
                      viewBox='0 0 24 24'
                      stroke='white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  ) : (
                    // Unlocked value when you type data into two valid email and password
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 transition duration-300'
                      fill='red'
                      viewBox='0 0 24 24'
                      stroke='black'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
                      />
                    </svg>
                  )}
                </legend>
                <div className='text-3xl text-center text-black p-4 mb-8 border-b-2 border-red-600'>
                  Log-In
                </div>
                <div className='relative mb-4'>
                  <input
                    id='email'
                    name='email'
                    placeholder='dantes@gmail.com'
                    type='text'
                    className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-b-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
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
                    Email address
                  </label>
                </div>
                <div className='relative'>
                  <div className='grid grid-rows-1 grid-flow-col gap-1'>
                    {' '}
                    <input
                      required
                      id='password'
                      name='password'
                      type={type}
                      placeholder='Password (ex: DanteskillsPushkin1837)'
                      className='peer focus:outline-none focus:border-red-600 text-sm text-gray-900 w-full mr-3 py-5 px-4 h-2 border-b-2 border-gray-primary rounded mb-2 placeholder-transparent select-none'
                      onChange={({ target }) => setPassword(target.value)}
                      value={password}
                    />{' '}
                    <div
                      className='ml-40 mt-1 eyePass absolute
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
                          <VisibilityOff color='red' />
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
                      Password
                    </label>
                  </div>
                </div>
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
          <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
            <p className='text-sm'>
              Don't have an account?{' '}
              <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
                Sign up
              </Link>
            </p>
          </div>
          <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
            <p className='text-sm'>
              Forgot{` `}
              <Link
                to={ROUTES.FORGOTTENPASSWORD}
                className='font-bold text-blue-medium hover:underline'
              >
                password
              </Link>
              {` `}or{` `}
              <Link
                to={ROUTES.FORGOTTENEMAIL}
                className='font-bold text-blue-medium hover:underline'
              >
                email?
              </Link>
            </p>
          </div>
          <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
            <p className='text-sm'>
              <Link
                to={ROUTES.ABOUT}
                className='font-bold text-blue-medium hover:underline'
              >
                About
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

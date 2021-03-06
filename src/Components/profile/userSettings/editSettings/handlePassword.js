import { updatePassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

import IndexSetting from '../index.setting';

export default function HandlePassword() {
  const { password, setPassword, setError, setCheckPass, passOne, passTwo } =
    IndexSetting();
  const isInvalidPassword = password === '';

  const handlePass = async (event) => {
    event.preventDefault();

    const auth = getAuth();

    if (passOne !== passTwo) {
      alert('Wrong password, confirm pass');
      console.log('Wrong password, confirm pass');
      return null;
    } else {
      await updatePassword(auth.currentUser, password)
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
  };
  return (
    <div>
      {' '}
      <section className='border border-red-500 mb-2 p-1'>
        <h1 className='text-center underline text-3xl mb-2'>Password</h1>
        <div className='grid grid-cols-1 gap-4'>
          <input
            minLength={6}
            maxLength={30}
            aria-label='Enter your password'
            type='password'
            placeholder='Enter your password'
            className='col-span-1 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setPassword(target.value)}
            value={passOne}
          />
          <input
            minLength={6}
            maxLength={30}
            aria-label='Confirm your password'
            type='password'
            placeholder='Confirm your password'
            className='col-span-1 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setCheckPass(target.value)}
            value={passTwo}
          />
          <button
            disabled={isInvalidPassword}
            className={`bg-black hover:bg-red-600 text-white rounded-lg m-3 p-1 font-bold ${
              isInvalidPassword && 'opacity-60'
            }`}
            type='submit'
            onClick={handlePass}
          >
            Change password
          </button>
        </div>
      </section>
    </div>
  );
}

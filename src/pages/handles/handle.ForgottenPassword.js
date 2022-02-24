import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import HandleForgotPassword from './handle.Password';

export default function ForgottenPassword() {
  return (
    <div className='container flex mx-auto max-w-screen-sm items-center justify-center h-screen arrow-down arrow-up'>
      <div className='flex flex-col w-2/4 border-t border-8 border-red-600 '>
        <div className='flex flex-col items-center bg-white p-4 border border-gray-primary rounded pb-8'>
          <div className='text-3xl text-center text-black mb-6 border-b-2 border-red-600'>
            Change forgotten password
          </div>
          <div className='border-b-2 border-red-600 mb-4'>
            <HandleForgotPassword />
          </div>
          <Link to={ROUTES.LOGIN} className='font-bold w-full rounded-lg'>
            <div className='flex justify-center items-center flex-col  bg-black p-4 rounded border border-gray-primary hover:bg-red-600 hover:text-white text-white rounded-lg'>
              <p className='text-sm'> {`<= Log-in`}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

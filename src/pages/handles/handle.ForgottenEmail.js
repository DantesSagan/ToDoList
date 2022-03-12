import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import HandleForgotEmail from './handle.EmailAddress';
// import HandleForgotPassword from './handle.Password';

export default function ForgottenEmail() {
  return (
    <section className='bgLogin'>
      <div className='container flex mx-auto max-w-screen-sm items-center justify-center 2xl:h-screen 1xl:h-screen xl:h-screen lg:h-full md:h-full heightPages arrow-down arrow-up'>
        <div className='flex flex-col 2xl:w-2/4 1xl:w-2/4 xl:w-2/4 lg:w-2/4 md:w-2/4 sm:w-2/4 border-t border-8 border-red-600 greetPages'>
          <div className='flex flex-col items-center bg-white p-4 border border-gray-primary rounded pb-8'>
            <div className='text-3xl text-center text-black mb-6 border-b-2 border-red-600'>
              Change forgotten email
            </div>
            <div className='border-b-2 border-red-600 mb-4'>
              <HandleForgotEmail />
              {/* <p className='text-lg text-black text-center'>Password</p>
            <HandleForgotPassword /> */}
            </div>
            <Link to={ROUTES.LOGIN} className='font-bold w-full rounded-lg'>
              <div className='flex justify-center items-center flex-col  bg-black p-4 rounded border border-gray-primary hover:bg-red-600 hover:text-white text-white rounded-lg'>
                <p className='text-sm'> {`<= Log-in`}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

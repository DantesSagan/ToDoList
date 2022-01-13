import React from 'react';
import HandleCity from './editSettings/handleCity';
import HandleCountry from './editSettings/handleCountry';
import HandleEmailAddress from './editSettings/handleEmailAddress';
import HandleFullName from './editSettings/handleFullName';
import HandleGender from './editSettings/handleGender';
import HandlePassword from './editSettings/handlePassword';
import HandlePhone from './editSettings/handlePhone';
import HandleUsername from './editSettings/handleUsername';
import DeleteUserAccount from './settings.deleteUserAccount';
import { CheckUserProfile } from './settings.checkUserProfile';

export default function DisplayUser() {
  return (
    <div>
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
          <HandleGender />
          {/* CITY */}
          <HandleCity />
          {/* COUNTRY */}
          <HandleCountry />
          {/* PHONE */}
          <HandlePhone />
          {/* USERNAME */}
          <HandleUsername />
          {/* FULL NAME */}
          <HandleFullName />
          {/* EMAIL ADDRESS */}
          <HandleEmailAddress />
          {/* PASSWORD */}
          <HandlePassword />
        </fieldset>
        {/* CHECK USER PROFILE */}
        <CheckUserProfile />
        {/* DELETE USER ACCOUNT */}
        <DeleteUserAccount />
      </form>
    </div>
  );
}

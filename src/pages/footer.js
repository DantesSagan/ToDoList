import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

export default function Footer() {
  return (
    <footer className='border-b border-8 border-red-600 w-full bg-black text-sm h-16 relative mt-64'>
      <div className='inset-x-0 bottom-0 mx-auto max-w-screen-lg absolute'>
        <section className='grid grid-col-1 grid-flow-col  grid-gap-2'>
          <i className='text-white ml-2 m-2'>
            <strong className='text-left text-white font-bold'>
              <a
                href='https://github.com/DantesSagan/ToDoList'
                className='hover:bg-red-600 transition duration-300 rounded-lg p-2'
              >
                {' '}
                Coded by @DantesSagan
              </a>
            </strong>
          </i>
          <Link to={ROUTES.ABOUT}>
            <p className='font-bold text-white text-right m-2 '>
              <span className='hover:bg-red-600 transition duration-300 rounded-lg p-2'>
                About
              </span>
            </p>
          </Link>
        </section>
      </div>
    </footer>
  );
}

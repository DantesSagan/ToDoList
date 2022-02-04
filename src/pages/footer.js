import React from 'react';

export default function Footer() {
  return (
    <footer className='border-b border-8 border-red-600 w-full bg-black text-sm h-16 relative mt-64'>
      <div className='inset-x-0 bottom-0 mx-auto max-w-screen-lg absolute'>
        <i className='text-white ml-2'>
          <strong className='text-left text-white font-bold border-2 border-red-700'>
            <a href='https://github.com/DantesSagan/ToDoList'>
              {' '}
              Coded by @DantesSagan
            </a>
          </strong>
        </i>
      </div>
    </footer>
  );
}

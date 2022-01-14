import React from 'react';

export default function Footer() {
  return (
    <footer className='border-b border-8 border-red-600 h-16 w-full bg-black text-sm '>
      <div>
        <i className='text-white ml-2'>
          Created and coded by{' '}
          <strong className='text-white font-bold border-2 border-red-700'>
            <a href='https://github.com/DantesSagan/ToDoList'>@DantesSagan</a>
          </strong>
        </i>
      </div>
    </footer>
  );
}

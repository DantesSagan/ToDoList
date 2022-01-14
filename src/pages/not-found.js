import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - toDoList';
  }, []);

  return (
    <div className='m-24 rounded-lg bg-red-600'>
      <div className='mx-auto max-w-screen-lg'>
        <p className='text-center text-4xl text-white'>Not Found!</p>
      </div>
    </div>
  );
}

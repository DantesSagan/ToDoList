import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - toDoList';
  }, []);

  return (
    <div className='bg-red-600'>
      <div className='mx-auto max-w-screen-lg'>
        <p className='text-center text-4x1 text-white'>Not Found!</p>
      </div>
    </div>
  );
}

import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - toDoList';
  }, []);
  return (
    <div className='bg-gray-background'>
      <div className='mx-auto max-w-screen-lg'>
        <p className='text-center text-2x1'>Not Found!</p>
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect } from 'react';
import { getToDo } from '../../services/firebase';

import { formatTime } from './indexConst';
import { ToDoArr } from './toDoArr';

export default function RouterToDo({ title, toDosArray, user, loading, setToDoSArray, setLoading }) {
  const disNameArray = toDosArray;

  useEffect(() => {
    getToDo(setToDoSArray).then((data) => {
      setLoading(false);
    });
  }, []);

  console.log(disNameArray);

  const toDoArray = [];

  Object.keys(toDosArray).map((item) => {
    return toDoArray.push(toDosArray[item].toDosArray.displayName);
  });

  // In this case this will be find index of array = toDoArray by current auth user
  const length = toDoArray.indexOf(user?.username);
  // console.log(toDoArray[length] === user?.username);
  // console.log(toDoArray[length]);
  const skeletonArray = Array(6).fill('');

  return (
    <form className='justify-center text-1xl pl-0 pr-5 rounded-xl'>
      {/* And here this comparison check
        if current auth user strict-equal to username in created todo by current user so
        display const variable toDoArr
        else if it not true display welcome section which displayed that you don't have any todos
        */}
      {loading ? (
        <>
          {skeletonArray.map((fall) => {
            return (
              <Skeleton
                animation='wave'
                variant='rectangular'
                height={200}
                width={600}
                className='rounded-lg mb-2'
                key={fall.id}
              >
                {fall}
              </Skeleton>
            );
          })}
        </>
      ) : (
        <div className='h-full'>
          {user?.username === toDoArray[length] ? (
            <ToDoArr
              disNameArray={disNameArray}
              user={user}
              formatTime={formatTime}
            />
          ) : (
            <div className='text-3xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 m-auto block transform hover:-translate-y-16 duration-700 hover:scale-125'
                fill='red'
                viewBox='0 0 24 24'
                stroke='black'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeidth='2'
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
              <p className='title'>
                Hello fellows, seems like you didn't have any of todo! <br />{' '}
                Can you create you own todo in upper form?
              </p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

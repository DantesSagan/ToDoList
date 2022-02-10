/* eslint-disable react-hooks/exhaustive-deps */
import Skeleton from '@material-ui/lab/Skeleton';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firebaseLib } from '../../firebaseLibrary/firebaseLib';

import { getToDo } from '../../services/firebase';

export default function RouterToDo({
  toDoID,
  title,
  toDosArray,
  user,
  setToDoSArray,
}) {
  // const [welcome, setWelcome] = useState(false);
  // const [pagination, setPagination] = useState(1);
  // const PaginationToDo = async () => {
  //   const toDoArrKeys = Object.keys(disNameArray).map(async (item) => {
  //     const first = query(
  //       collection(firebaseLib.firestore(), 'todos'),
  //       orderBy(disNameArray[item][0].createdAt),
  //       limit(3)
  //     );
  //     const docSnap = await getDocs(first);
  //     return docSnap.forEach((item) => {
  //       return item;
  //     });
  //   });
  //   return toDoArrKeys;
  // };

  const [loading, setLoading] = useState(true);

  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  useEffect(() => {
    getToDo(setToDoSArray).then((data) => {
      setLoading(false);
    });
  }, []);

  const toDoArr = Object.keys(disNameArray).map((item, index) => {
    // console.log(getNestedToDo(setToDoSArray, disNameArray, item));

    return (
      <div
        className='justify-center bg-white rounded-xl hover:bg-red-600 hover:text-white shadow-inner mb-2'
        key={index}
        style={{ width: '600px' }}
      >
        {user?.username === disNameArray[item][0].displayName ? (
          <Link to={`/todolist/${disNameArray[item][0].toDoID}`} key={item.id}>
            {' '}
            <div className='text-3xl font-bold p-4 title' key={item.id}>
              {disNameArray[item][0].title} <br key={item.id} />
            </div>
            <hr className='border border-red-600 ml-4 mr-4 m-2' key={item.id} />
            <div className='text-1xl p-4' key={item.id}>
              {disNameArray[item][0].doneToDo ? (
                <s className='opacity-50'>
                  {disNameArray[item][0].toDo} <br key={item.id} />
                </s>
              ) : (
                <div>
                  {' '}
                  {disNameArray[item][0].toDo} <br key={item.id} />
                </div>
              )}
            </div>
            {` `}
          </Link>
        ) : null}
      </div>
    );
  });

  const toDoArray = [];
  Object.keys(disNameArray).map((item) => {
    return toDoArray.push(disNameArray[item][0].displayName);
  });

  // In this case this will be find index of array = toDoArray by current auth user
  const length = toDoArray.indexOf(user?.username);
  console.log(toDoArray[length] === user?.username);
  const skeletonArray = Array(6).fill('');
  return (
    <form className='justify-center text-2xl pl-0 pr-5 rounded-xl '>
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
                sx={{ bgcolor: 'red.800' }}
                animation='wave'
                variant='rect'
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
        <div>
          {user?.username === toDoArray[length] ? (
            toDoArr
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
      {/* <div className='text-1xl text-black font-bold justify-center'>
        - {pagination} -
      </div> */}
      {/* <PaginationToDo /> */}
      {/* Here need to add pagination button to see a list of tasks by (any number) by page in it */}
    </form>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import Skeleton from '@material-ui/lab/Skeleton';
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firebaseLib } from '../../firebaseLibrary/firebaseLib';

import { getToDo } from '../../services/firebase';
import { formatTime } from './indexConst';
import { ToDoArr } from './toDoArr';

export default function RouterToDo({
  toDoID,
  title,
  toDosArray,
  user,
  setToDoSArray,
}) {
  const [loading, setLoading] = useState(true);


  console.log(formatTime());
  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });
  const collectionRef = collection(firebaseLib.firestore(), 'users');
  const first = query(
    collectionRef,
    where('dateCreated', '<=', 1642257759964),
    orderBy('dateCreated')
  );

  const getData = () => {
    onSnapshot(first, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
      let todolist = [];
      data.docs.map((item) => {
        todolist.push(item.data());
      });
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getToDo(setToDoSArray).then((data) => {
        setLoading(false);
      });
      getData();
    }, 500);
  }, []);

  // console.log(first);

  const toDoArray = [];
  Object.keys(disNameArray).map((item) => {
    return toDoArray.push(disNameArray[item][0].displayName);
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
      {/* <div className='text-1xl text-black font-bold justify-center'>
        - {pagination} -
      </div> */}
      {/* <PaginationToDo /> */}
      {/* Here need to add pagination button to see a list of tasks by (any number) by page in it */}
    </form>
  );
}

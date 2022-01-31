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
  
  const [pagination, setPagination] = useState(1);
  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  const PaginationToDo = async () => {
    const toDoArrKeys = Object.keys(disNameArray).map(async (item) => {
      const first = query(
        collection(firebaseLib.firestore(), 'todos'),
        orderBy(disNameArray[item][0].createdAt),
        limit(3)
      );
      const docSnap = await getDocs(first);
      console.log('Hello world');
      return docSnap.forEach((item) => {
        console.log(item.id, item.data(), item);
        return item;
      });
    });
    return toDoArrKeys;
  };

  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);
  
  const toDoArr = Object.keys(disNameArray).map((item, index) => {
    // console.log(getNestedToDo(setToDoSArray, disNameArray, item));

    return (
      <div
        className='justify-center text-2xl bg-white rounded-xl m-2 hover:bg-red-600 hover:text-white shadow-inner'
        key={index}
      >
        {user?.username === disNameArray[item][0].displayName &&
        setToDoSArray ? (
          <Link to={`/todolist/${disNameArray[item][0].toDoID}`} key={item.id}>
            {' '}
            <div
              className='text-1xl font-bold pb-4 pr-4 pl-4 pt-4'
              key={item.id}
            >
              {disNameArray[item][0].title} <br key={item.id} />
            </div>
            <hr className='border border-red-600 ml-4 mr-4 m-2' key={item.id} />
            <div className='text-2xl pb-4 pr-4 pl-4 pt-4' key={item.id}>
              {disNameArray[item][0].toDo} <br key={item.id} />
            </div>
            {` `}
          </Link>
        ) : null}
      </div>
    );
  });
  console.log(toDoArr);

  return (
    <div>
      {' '}
      <form className='justify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl w-full'>
        <div className='m-4 p-4 rounded-lg'>{toDoArr}</div>
        {/* <div className='text-1xl text-black font-bold justify-center'>
        - {pagination} -
      </div> */}
        {/* <PaginationToDo /> */}
        {/* Here need to add pagination button to see a list of tasks by (any number) by page in it */}
      </form>
    </div>
  );
}

import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { firebaseLib } from '../../firebaseLibrary/firebaseLib';

import { useQuery } from 'react-query';
import axios from 'axios';

export default function RouterToDo({ toDoID, title, toDosArray, user }) {
  const [pagination, setPagination] = useState(1);
  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });
  // const PaginationToDo = async () => {
  //   const fetchColors = (pageNumber) => {
  //     const first = firebaseLib
  //       .firestore()
  //       .collection('todos')
  //       .orderBy('createdAt')
  //       .limit(pageNumber);
  //     return first;
  //   };

  //   const { isError, error, isLoading, isFetching, data } = useQuery(
  //     ['todos', pagination],
  //     () => fetchColors(pagination),
  //     {
  //       keepPreviousData: true,
  //     }
  //   );

  //   const firstPage = await getDocs(
  //     collection(firebaseLib.firestore(), 'todos')
  //   );
  //   firstPage.forEach((doc) => {
  //     console.log(doc.id);
  //     return doc;
  //   });

  //   const first = firebaseLib
  //     .firestore()
  //     .collection('todos')
  //     .orderBy('createdAt')
  //     .limit(2);

  //   const snapshot = await first.get();

  //   // Get the last document
  //   const last = snapshot.docs[snapshot.docs.length];

  //   // Construct a new query starting at this document.
  //   // Note: this will not have the desired effect if multiple
  //   // cities have the exact same population value.
  //   const next = firebaseLib
  //     .firestore()
  //     .collection('todos')
  //     .orderBy('createdAt')
  //     .startAfter(last.data().createdAt)
  //     .limit(2);
  //   console.log(last);
  //   return next;
  // };

  const toDoArr = Object.keys(disNameArray).map((item, index) => {
    // const toDoRef = await getDocs(collection(firebaseLib.firestore(), 'todos'));
    // toDoRef.forEach((doc) => {
    //   console.log(
    //     doc.orderBy('createdAt').limit(2)
    //   );
    // });
    return (
      <div
        className='justify-center text-2xl bg-white rounded-xl m-2 hover:bg-red-600 hover:text-white shadow-inner'
        key={index}
      >
        {user?.username === disNameArray[item][0].displayName ? (
          <Link to={`/todolist/${disNameArray[item][0].toDoID}`} key={item.id}>
            {' '}
            <div
              className='text-3xl font-bold pb-4 pr-4 pl-4 pt-4'
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
    <form className='justify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl w-full'>
      <div className='m-4 p-4 rounded-lg'>{toDoArr}</div>
      {/* <div className='text-3xl text-black font-bold justify-center'>
        - {pagination} -
      </div> */}
      {/* <PaginationToDo /> */}
      {/* Here need to add pagination button to see a list of tasks by (any number) by page in it */}
    </form>
  );
}

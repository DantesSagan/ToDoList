/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { firebaseLib } from '../../firebaseLibrary/firebaseLib';
import {
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import { getToDo } from '../../services/firebase';
import { deleteTodo } from '../../services/firebase';
// import { editToDo } from '../../services/firebase';
export default function ListOfToDo({
  toDosArray,
  title,
  toDo,
  setTitle,
  setToDo,
  displayName,
}) {
  async function editToDo() {
    const editRef = doc(firebaseLib.firestore(), 'todos', 'ToDoList');

    const timestamp = await updateDoc(editRef, {
      timestamp: serverTimestamp(),
    });
    
    await updateDoc(editRef, {
      'toDosArray.displayName': displayName,
      'toDosArray.timestamp': new Date().toISOString(),
      'toDosArray.title': title,
      'toDosArray.toDo': toDo,
    })
      .then((updated) => {
        console.log('Document updated was successfully: ', updated);
        alert('Document updated was successfully: ', updated);
      })
      .catch((error) => {
        console.error('Document updated error: ', error);
        alert('Document updated error: ', error);
      });
    return timestamp;
  }

  return (
    <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
      {toDosArray.map((item, index) => (
        <div className='m-4 p-4 shadow-inner rounded-lg' key={index}>
          {item.toDosArray.map((second) => (
            <div key={index}>
              {' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 cursor-pointer stroke'
                fill='black'
                viewBox='0 0 24 24'
                stroke='black'
                onClick={deleteTodo}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              <div className='text-2xl font-bold p-2'>
                {second?.title}
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />{' '}
              </div>
              <hr className='border border-red-600' />
              <div className='text-xl'>
                {second?.toDo}
                <textarea
                  value={toDo}
                  onChange={(e) => setToDo(e.target.value)}
                />{' '}
              </div>
              <button onClick={editToDo}>edit</button>
              <div className='text-lg'>{second?.createdAt}</div>
              <div
                className='text-sm font-bold p-2 underline'
                defaultValue={displayName}
              >
                {second?.displayName}
              </div>
            </div>
          ))}
        </div>
      ))}
    </form>
  );
}
ListOfToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};

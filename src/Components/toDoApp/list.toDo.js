/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { firebaseLib } from '../../firebaseLibrary/firebaseLib';
import {
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { deleteTodo } from '../../services/firebase';
// import { editToDo } from '../../services/firebase';
export default function ListOfToDo({
  toDosArray,
  title,
  toDo,
  setTitle,
  setToDo,
  displayName,
  setToDoSArray,
  createdAt,
}) {
  async function editToDo(event) {
    event.preventDefault();

    setToDoSArray([...toDosArray, { displayName, title, toDo, createdAt }]);
    setToDo('');
    setTitle('');

    const editRef = doc(firebaseLib.firestore(), 'todos', 'ToDoList');

    await updateDoc(editRef, {
      toDosArray: arrayUnion({
        displayName: displayName,
        createdAt: new Date().toISOString(),
        title: title,
        toDo: toDo,
      }),
    })
      .then((updated) => {
        console.log('Array updated was successfully: ', updated);
        alert('Array updated was successfully: ', updated);
      })
      .catch((error) => {
        console.error('Array updated error: ', error);
        alert('Array updated error: ', error);
      });
  }

  async function deleteToDo(event) {
    event.preventDefault();

    const editRef = doc(firebaseLib.firestore(), 'todos', 'ToDoList');

    await updateDoc(editRef, {
      toDosArray: arrayRemove({
        displayName,
        createdAt,
        title,
        toDo,
      }),
    })
      .then((updated) => {
        console.log('Array was deleted successfully: ', updated);
        alert('Array was deleted successfully: ', updated);
      })
      .catch((error) => {
        console.error('Array deleted error: ', error);
        alert('Array deleted error: ', error);
      });
  }

  return (
    <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
      {toDosArray.map((item) => (
        <div className='m-4 p-4 shadow-inner rounded-lg' key={item.id}>
          {item.toDosArray.map((second) => (
            <div key={second.toDosArray}>
              {' '}
              <svg
                key={second.delete}
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 cursor-pointer stroke'
                fill='black'
                viewBox='0 0 24 24'
                stroke='black'
                onClick={deleteTodo}
              >
                <path
                  key={second.path}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              <div className='text-2xl font-bold p-2' key={second.title}>
                {second?.title}
                <textarea
                  key={second.setTitle}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />{' '}
              </div>
              <hr className='border border-red-600' key={second.hr} />
              <div className='text-xl' key={second.toDo}>
                {second?.toDo}
                <textarea
                  key={second.setToDo}
                  value={toDo}
                  onChange={(e) => setToDo(e.target.value)}
                />{' '}
              </div>
              <div
                className=' duration-200 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2'
                key={second.div}
              >
                <button
                  key={second.buttonEdit}
                  className={`w-full h-full text-lg font-bold text-white ${
                    !toDo && !title && 'opacity-25'
                  }`}
                  type='button'
                  disabled={toDo.length < 1 && title.length < 1}
                  onClick={editToDo}
                >
                  Edit
                </button>
              </div>
              <div className='text-lg' key={second.createdAt}>
                {second?.createdAt}
              </div>
              <div
                className='text-sm font-bold p-2 underline'
                defaultValue={displayName}
                key={second.displayName}
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

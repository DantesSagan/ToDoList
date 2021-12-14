/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import {
  doc,
  deleteDoc,
  limit,
  deleteField,
  updateDoc,
} from 'firebase/firestore';
import { getToDo } from '../../services/firebase';
import { deleteTodo } from '../../services/firebase';

export default function ListOfToDo({
  toDosArray,
  displayName,
  title,
  toDo,
  createdAt,
  setTitle,
  setToDo,
  setToDoSArray,
  firebaseLib,
  FieldValue,
  user,
  loading,
  setIsLoading,
  error,
  setError,
}) {
  useEffect(() => {
    // getToDo(setToDoSArray, setIsLoading, setError);
  }, []);

  async function deleteTodo() {
    // const todoRef = doc(firebaseLib.firestore(), 'todos', 'ToDoList');
    // await updateDoc(todoRef, {
    //   title: deleteField(),
    // });

    const batch = firebaseLib.firestore().batch();
    const getTodos = await firebaseLib
      .firestore()
      .collection('todos')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
          console.log(doc);
        });
      });

    await batch
      .commit()
      .then((docRef) => {
        console.log('Document was deleted with ID: ', docRef);
        alert('Document was deleted with ID: ', docRef);
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
    return getTodos;

    // const test = await firebaseLib
    //   .firestore()
    //   .collection('todos')
    //   .get()
    //   .then((item) => {
    //     item.forEach((doc) => {
    //       doc.ref.delete(doc.ref);
    //       console.log(doc);
    //     });
    //   })
    //   .then((docRef) => {
    //     console.log('Document was deleted with ID: ', docRef);
    //   })
    //   .catch((error) => {
    //     console.error('Error deleting document: ', error);
    //   });

    // return test;
  }

  return (
    <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
      {toDosArray.map((item, index) => (
        <div className='m-4 p-4 shadow-inner rounded-lg' key={index} id='li'>
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
              <div className='text-2xl font-bold p-2'>{second?.title} </div>
              <hr className='border border-red-600' />
              <div className='text-xl'>{second?.toDo}</div>
              <div className='text-lg'>{second?.createdAt}</div>
              <div className='text-sm font-bold p-2 underline'>
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

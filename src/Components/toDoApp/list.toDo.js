/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { doc, deleteDoc, limit } from 'firebase/firestore';
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
  doc,
}) {
  useEffect(() => {
    // getToDo(setToDoSArray, setIsLoading, setError);
  }, []);

  function deleteTodo(doc, e) {
    firebaseLib
      .firestore()
      .collection('todos')
      .get()
      .then((item) => {
        item.forEach((doc) => {
          deleteTodo(doc);
        });
      });

    firebaseLib
      .firestore()
      .collection('todos')
      .doc(doc.id)
      .delete()
      .then((docRef) => {
        console.log('Document was deleted with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
  }

  return (
    <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
      {toDosArray.map((item, index, doc) => (
        <div className='m-4 p-4 shadow-inner rounded-lg' key={index} id='li'>
          {item.toDosArray.map((second) => (
            <div key={index}>
              <div className='text-2xl font-bold p-2'>
                {second?.title}{' '}
                <div>
                  <div onClick={deleteTodo}>DeleteDoc</div>
                </div>
              </div>
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

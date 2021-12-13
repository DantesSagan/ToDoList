/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { doc, deleteDoc } from 'firebase/firestore';
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
    getToDo(setToDoSArray, setIsLoading, setError);
  }, []);

  // const handleEditToDo = (event) => {
  //   event.preventDefault();

  //   setToDoSArray([...toDosArray, { displayName, title, toDo, createdAt }]);
  //   setToDo('');
  //   setTitle('');

  //   return firebaseLib
  //     .firestore()
  //     .collection('todos')
  //     .doc(firebaseLib.auth().currentUser()?.uid || user)
  //     .update({
  //       toDosArray: FieldValue.arrayUnion({
  //         title,
  //         toDo,
  //       }),
  //     });
  // };

  async function deleteTodo() {
    // const id = firebaseLib.collection('todos').doc().getId();
    // await firebaseLib.collection('todos').doc(id).set().deleteDoc();
    // await deleteDoc(doc(firebaseLib, 'todos', 'toDo'));
    return await firebaseLib
      .firestore()
      .collection('todos')
      .doc('toDo')
      .delete()
      .then(function (docRef) {
        console.log('Document was deleted with ID: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error deleting document: ', error);
      });
  }

  return (
    <form
      className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'
      // onChange={(e) => handleEditToDo(e)}
    >
      {toDosArray.map((item, index) => (
        <div className='m-4 p-4 shadow-inner rounded-lg' key={index}>
          {item.toDosArray.map((second) => (
            <div key={index}>
              <div
                className='text-2xl font-bold p-2'
                // onClick={(e) => handleEditToDo(e)}
                // method='PUT'
              >
                {second?.title}{' '}
                <div>
                  <div onClick={deleteTodo}>DeleteDoc</div>
                </div>
              </div>
              <hr className='border border-red-600' />
              <div
                className='text-xl'
                // onClick={(e) => handleEditToDo(e)}
                // method='PUT'
              >
                {second?.toDo}
              </div>
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

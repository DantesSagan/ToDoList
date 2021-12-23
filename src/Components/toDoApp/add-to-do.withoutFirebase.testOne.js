/* eslint-disable react-hooks/exhaustive-deps */
// import { addDoc } from 'firebase/firestore';
import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { getToDo } from '../../services/firebase';
import PropTypes from 'prop-types';

import { doc, arrayUnion, setDoc } from 'firebase/firestore';
import UserContext from '../../context/user';
import useUser from '../../hooks/user';
import { getAuth } from 'firebase/auth';
export default function FormToDo({
  toDo,
  setToDo,
  title,
  setTitle,
  toDosArray,
  setToDoSArray,
  firebaseLib,
  displayName,
  refTodo,
  createdAt,
  toDoID,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const handleSubmitToDo = async (event) => {
    event.preventDefault();

    setToDoSArray([
      ...toDosArray,
      { displayName, title, toDo, createdAt, toDoID },
    ]);
    setToDo('');
    setTitle('');
    // await addDoc(collection(firebaseLib.firestore(), 'todos'), {
    //   toDosArray: arrayUnion({
    //     displayName: displayName,
    //     createdAt: new Date().toISOString(),
    //     title: title,
    //     toDo: toDo,
    //   }),
    // })
    //   .then((docRef) => {
    //     console.log('Document written with ID: ', docRef);
    //     alert('Document written with ID: ', docRef);
    //   })
    //   .catch((error) => {
    //     console.error('Error adding document: ', error);
    //   });

    // function getRandomNumber(max, min) {
    //   return Math.max(Math.random() * (max - min) + min).toFixed(0);
    // }
    // let resultID = getRandomNumber(2000000000000, 5);
    const auth = getAuth();
    const userAuth = auth.currentUser.uid;

    const editRef = doc(firebaseLib.firestore(), 'todos', toDoID);

    await setDoc(editRef, {
      toDosArray: arrayUnion({
        displayName: displayName,
        createdAt: new Date().toISOString(),
        title: title,
        toDo: toDo,
        toDoID: toDoID,
        userId: userAuth,
      }),
    })
      .then(() => {
        console.log('Document written with title: ', title);
        console.log('Document written with displayName: ', displayName);
        console.log('Document written with ID: ', toDoID);
        alert('ToDo was added');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };
  console.log(toDosArray);

  return (
    <div>
      {loggedIn ? (
        <>
          <form
            className='block justify-between shadow-inner bg-white pl-5 pr-5 hover:bg-black border border-gray-300 rounded-xl mt-2 pt-5'
            method='POST'
            onSubmit={(event) =>
              toDo.length >= 1
                ? handleSubmitToDo(event)
                : event.preventDefault()
            }
          >
            <textarea
              aria-label='Add a comment'
              autoComplete='off'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 rounded-xl'
              type='text'
              name='title'
              placeholder='Заголовок задачи...'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              ref={refTodo}
            />
            <textarea
              aria-label='Add a comment'
              autoComplete='off'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 rounded-xl'
              type='text'
              name='toDo'
              placeholder='Напишите задачу...'
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              ref={refTodo}
            />
          </form>
          <div className='transform hover:rotate-0 transition duration-300 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2'>
            <button
              className={`w-full h-full text-lg font-bold text-white ${
                !toDo && !title && 'opacity-25'
              }`}
              type='button'
              disabled={toDo.length < 1 && title.length < 1}
              onClick={handleSubmitToDo}
            >
              Добавить задачу
            </button>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

FormToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
  toDo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

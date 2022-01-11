/* eslint-disable react-hooks/exhaustive-deps */
// import { addDoc } from 'firebase/firestore';
import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { getToDo } from '../../../services/firebase';
import PropTypes from 'prop-types';

import {
  doc,
  arrayUnion,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from 'firebase/firestore';
import UserContext from '../../../context/user';
import useUser from '../../../hooks/user';
import { getAuth } from 'firebase/auth';

export default function FormToDoToDoID({
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
    const auth = getAuth();
    const userAuth = auth.currentUser.uid;

    const commaTitle = title.split(',');
    const commaToDo = toDo.split(',');
    event.preventDefault();

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    const checkExistingID = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    return Object.keys(checkExistingID).map(async (item) => {
      // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
      let comparisonName =
        user?.username === checkExistingID[item][0].displayName;

      // This is check if currentURL and RouterPath strict-equal
      // To undestand what u want to delete in current equl parameters of URL
      let getCurrentUrl = window.location.pathname;
      let getRouterPathToDo = `/todolist/${checkExistingID[item][0].toDoID}`;

      let checkPathID = getCurrentUrl === getRouterPathToDo;

      if (checkPathID && comparisonName) {
        console.log('Error this toDoID existing, try again');
      } else {
        const getDocTodos = await getDocs(
          collection(firebaseLib.firestore(), 'todos')
        );
        setToDoSArray([
          ...toDosArray,
          { displayName, commaTitle, commaToDo, createdAt, toDoID },
        ]);
        setToDo('');
        setTitle('');
        getDocTodos.forEach(async (doc) => {
          if (comparisonName && doc.if === checkExistingID[item][0].toDoID) {
            await setDoc(doc.ref, {
              toDosArray: arrayUnion({
                displayName: displayName,
                createdAt: new Date().toISOString(),
                title: commaTitle,
                toDo: commaToDo,
                toDoID: toDoID,
                userId: userAuth,
              }),
            })
              .then(() => {
                console.log('Document written with title: ', commaTitle);
                console.log('Document written with displayName: ', displayName);
                console.log('Document written with ID: ', toDoID);
                alert(`ToDo ${title} was added`);
              })
              .catch((error) => {
                console.error('Error adding document: ', error);
              })
              .then(() => {
                window.location.reload();
              });
          } else {
            return null;
          }
        });
      }
      return checkExistingID[item][0].toDoID;
    });
  };
  console.log(toDosArray);

  return (
    <div>
      {loggedIn ? (
        <>
          <form
            className='block justify-between shadow-inner bg-white pl-5 pr-5 hover:bg-red-600 border border-gray-300 rounded-xl mt-2 pt-5'
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

FormToDoToDoID.propTypes = {
  toDosArray: PropTypes.array.isRequired,
  toDo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

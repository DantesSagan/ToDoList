/* eslint-disable react-hooks/exhaustive-deps */
// import { addDoc } from 'firebase/firestore';
import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { getToDo } from '../../../services/firebase';
import PropTypes from 'prop-types';

import {
  arrayUnion,
  getDocs,
  collection,
  updateDoc,
  setDoc,
  doc,
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

  const handleSubmitToDo = async () => {
    setToDoSArray([
      ...toDosArray,
      { displayName, title, toDo, createdAt, toDoID },
    ]);
    setToDo('');
    setTitle('');

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const formatTime = () => {
      var date = new Date();
      // Year part from the timestamp
      var year = date.getFullYear();
      // Month part from the timestamp
      var month = date.getMonth();
      // Days part from the timestamp
      var days = date.getDate();
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = date.getMinutes();
      // Seconds part from the timestamp
      var seconds = date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime = `Posted time toDo: ${year} year, ${month} month, ${days} day, ${hours}:${minutes}:${seconds}`;
      return formattedTime;
    };

    return Object.keys(disNameArray).map(async (item) => {
      return Object.keys(disNameArray[item]).map(async (ind) => {
        // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
        let comparisonName =
          user?.username === disNameArray[item][ind].displayName;

        // This is check if currentURL and RouterPath strict-equal
        // To undestand what u want to change
        let getCurrentUrl = window.location.pathname;
        let getRouterPathToDo = `/todolist/${disNameArray[item][ind].toDoID}`;

        let checkPathIDToDoList = getCurrentUrl === getRouterPathToDo;

        // This is check if currentURL and RouterPath strict-equal
        // So do confirm what u want to change in toDoList
        if (checkPathIDToDoList) {
          window.confirm(
            `Are you sure you want to add this toDo = ${disNameArray[item][ind].toDo}? Вы уверены, что хотите добавить дополнительный список дел ${disNameArray[item][ind].title}?`
          );
        } else {
          console.log('error change');
          return null;
        }

        // Get all doc in todos collection
        const getDocTodosOne = await getDocs(
          collection(firebaseLib.firestore(), 'todos')
        );

        // Get ref for creating nested toDo sublcollection with own toDoID in parent route for
        // improving flexibility and changing nested todos
        const nestedRef = doc(
          firebaseLib.firestore(),
          'todos',
          disNameArray[item][ind].toDoID,
          'nestedToDo',
          toDoID
        );
        console.log(nestedRef);
        return comparisonName && checkPathIDToDoList
          ? getDocTodosOne.forEach(async (doc) => {
              // In this case need to compare two equal parameters for find user who create toDo
              // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
              // So updateDoc of toDoList otherwise - no
              let auth = getAuth();
              let userAuth = auth.currentUser.uid;

              let checkDockIDToDo = doc.id === disNameArray[item][ind].toDoID;
              let checkUserName =
                user?.username === disNameArray[item][ind].displayName;

              // Check if current auth user and check if current doc id equals to parent toDoID
              // And if all is it true so set new subcolletion with new toDoID like a child toDo in parent router path
              return checkUserName && checkDockIDToDo
                ? await setDoc(nestedRef, {
                    toDosArray: arrayUnion({
                      displayName: disNameArray[item][ind].displayName,
                      createdAt: formatTime(),
                      title: title,
                      toDo: toDo,
                      userId: userAuth,
                      toDoID: toDoID,
                      parentID: disNameArray[item][ind].toDoID,
                    }),
                  })
                    .then(() => {
                      console.log('Document updated with title: ', title);
                      console.log(
                        'Document updated with displayName: ',
                        displayName
                      );
                      alert('Array updated was successfully: ', title);
                    })
                    .catch((error) => {
                      console.error('Array updated error: ', error);
                      alert('Array updated error: ', error);
                    })
                    .then(() => {
                      window.location.reload();
                    })
                : console.log('Something wrong with edit doc data');
            })
          : null;
      });
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
          <div className='transform hover:rotate-ind transition duration-300 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2'>
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

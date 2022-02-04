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
  createToDo,
  setCreateToDo,
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

    const checkExistingID = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });
    return Object.keys(checkExistingID).map(async (item) => {
      if (checkExistingID[item][0].toDoID === toDoID) {
        console.log('Error this toDoID existing, try again');
      } else {
        const editRef = doc(firebaseLib.firestore(), 'todos', toDoID);
        setToDoSArray([
          ...toDosArray,
          { displayName, commaTitle, commaToDo, createdAt, toDoID },
        ]);
        setToDo('');
        setTitle('');

        // function getRandomNumber(max, min) {
        //   return Math.max(Math.random() * (max - min) + min).toFixed(0);
        // }
        // let resultID = getRandomNumber(2000000000000, 5);
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
        await setDoc(editRef, {
          toDosArray: arrayUnion({
            displayName: displayName,
            createdAt: formatTime(),
            title: commaTitle,
            toDo: commaToDo,
            toDoID: toDoID,
            userId: userAuth,
            doneToDo: false,
          }),
        })
          .then(() => {
            console.log('Document written with title: ', commaTitle);
            console.log('Document written with displayName: ', displayName);
            console.log('Document written with ID: ', toDoID);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          })
          .then(() => {
            window.location.reload();
          });
      }
      return checkExistingID[item][0].toDoID;
    });
  };
  console.log(toDosArray);

  return (
    <div>
      {loggedIn && createToDo ? (
        <>
          <form
            className='flex flex-col shadow-inner bg-white pl-5 pr-5 hover:bg-red-600 border-2 border-red-600 rounded-xl mt-2 pt-5'
            method='POST'
            onSubmit={(event) =>
              toDo.length >= 1
                ? handleSubmitToDo(event)
                : event.preventDefault()
            }
            style={{width: '600px'}}
          >
            <textarea
              aria-label='Add a comment'
              autoComplete='off'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 rounded-xl h-14'
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
              className='text-sm text-gray-base w-full mr-3 mt-3 mb-3 py-5 px-4 rounded-xl '
              type='text'
              name='toDo'
              placeholder='Напишите задачу...'
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              ref={refTodo}
            />{' '}
          </form>
          <div className='inline'>
            <button
              className={`text-lg font-bold text-white transition duration-300 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2  w-44 ${
                !toDo && !title && 'opacity-25'
              }`}
              type='button'
              disabled={toDo.length < 1 && title.length < 1}
              onClick={handleSubmitToDo}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class={`h-6 w-6 inline-block m-auto  ${
                  !toDo && !title && 'transform hover:rotate-12'
                } 
                `}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M12 4v16m8-8H4'
                />
              </svg>
            </button>{' '}
            <button
              type='button'
              onClick={() => setCreateToDo(!createToDo)}
              className='p-2 m-2 bg-red-600 hover:bg-red-400 rounded-lg focus:ring-black focus:ring  transition duration-200 text-white w-22'
            >
              Cancel
            </button>
          </div>{' '}
        </>
      ) : (
        <button
          onClick={() => setCreateToDo(!createToDo)}
          className='p-4 m-2 bg-black hover:bg-red-400 rounded-lg focus:ring-black text-white focus:ring focus:ring-red-600 transition duration-200'
        >
          Create ToDo
        </button>
      )}
    </div>
  );
}

FormToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
  toDo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

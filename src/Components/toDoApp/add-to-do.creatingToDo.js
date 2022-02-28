/* eslint-disable react-hooks/exhaustive-deps */
// import { addDoc } from 'firebase/firestore';
import React, { useEffect, useContext, useState } from 'react';
import { getToDo } from '../../services/firebase';
import PropTypes from 'prop-types';

import UserContext from '../../context/user';
import useUser from '../../hooks/user';
import HandleSubmitToDo from './actions/handleSubmitToDo';
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
  // const { user } = useUser(loggedIn?.uid);
  const [untilTime, setUntilTime] = useState(Number);
  const [deadLine, setDeadLine] = useState(false);
  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const { handleSubmitToDo } = HandleSubmitToDo({
    title,
    toDo,
    toDosArray,
    toDoID,
    untilTime,
    displayName,
    createdAt,
    setToDoSArray,
    setToDo,
    setTitle,
    firebaseLib,
  });

  return (
    <div>
      {loggedIn && createToDo ? (
        <div className='border-2 border-red-600 rounded-lg m-2'>
          <form
            className='flex flex-col shadow-inner bg-white pl-5 pr-5 hover:bg-red-600 border-2 border-red-600 rounded-md pt-5 transition duration-700'
            method='POST'
            onSubmit={(event) =>
              toDo.length >= 1
                ? handleSubmitToDo(event)
                : event.preventDefault()
            }
            style={{ width: '600px' }}
          >
            <textarea
              id='titleInput'
              aria-label='Add a comment'
              autoComplete='off'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 rounded-lg h-16 overflow-auto resize-none'
              type='text'
              name='title'
              placeholder='Write titles with commas for separate items'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              ref={refTodo}
            />
            <textarea
              aria-label='Add a comment'
              autoComplete='off'
              className='text-sm text-gray-base w-full mr-3 mt-3 mb-3 py-5 px-4 rounded-lg overflow-auto'
              type='text'
              name='toDo'
              placeholder='Write todos with commas for separate items.'
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              ref={refTodo}
            />{' '}
          </form>
          <div className='inline'>
            <>
              {' '}
              {deadLine ? (
                <>
                  <input
                    className='text-xl m-2 p-2 border-solid border-red-200 transition ease-in-out hover:bg-red-400  focus:ring focus:outline-none focus:ring-red-600 pb-2 rounded-lg hover:text-white'
                    onChange={(e) => setUntilTime(e.target.value)}
                    type='date'
                    id='until'
                    name='trip-start'
                    value={untilTime}
                    min='2021-12-31'
                    max='2078-12-31'
                  />{' '}
                  <button
                    className='p-2 m-2 bg-red-600 hover:bg-red-400 rounded-lg focus:ring-black focus:ring  transition duration-200 text-white w-22'
                    onClick={() => setDeadLine(!deadLine)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className='p-2 m-2 bg-black hover:bg-red-400 rounded-lg focus:ring-black focus:ring  transition duration-200 text-white w-22'
                  onClick={() => setDeadLine(!deadLine)}
                >
                  Deadline
                </button>
              )}
            </>
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
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
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
        </div>
      ) : (
        <button
          onClick={() => setCreateToDo(!createToDo)}
          className='p-2 m-2 bg-black hover:bg-red-400 rounded-lg focus:ring-black text-white focus:ring focus:ring-red-600 transition duration-200 w-2/5'
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

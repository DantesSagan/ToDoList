/* eslint-disable react-hooks/exhaustive-deps */
// import { addDoc } from 'firebase/firestore';
import React, { useEffect, useContext, useState } from 'react';
import { getToDo } from '../../../services/firebase';
import PropTypes from 'prop-types';

import UserContext from '../../../context/user';
import useUser from '../../../hooks/user';
import HandleSubmitSubToDo from './subcollectionToDo/toDoMembers/handleSubmitToDo';

export default function FormToDoToDoID({
  toDo,
  setToDo,
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

  const [createdToDo, setCreateToDo] = useState(false);
  const [untilTime, setUntilTime] = useState(Number);

  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const { handleSubmitSubToDo } = HandleSubmitSubToDo({
    toDo,
    setToDoSArray,
    toDosArray,
    displayName,
    createdAt,
    toDoID,
    untilTime,
    setToDo,
    user,
    firebaseLib,
  });

  return (
    <div>
      {loggedIn && createdToDo ? (
        <>
          <form
            className='shadow-inner bg-white pl-5 pr-5 border border-gray-300 rounded-xl mt-2 pt-5'
            style={{ width: '600px' }}
            method='POST'
            onSubmit={(event) =>
              toDo.length >= 1
                ? handleSubmitSubToDo(event)
                : event.preventDefault()
            }
          >
            <textarea
              aria-label='Add a comment'
              autoComplete='off'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 rounded-lg'
              type='text'
              name='toDo'
              placeholder='Напишите задачу...'
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              ref={refTodo}
            />{' '}
          </form>
          <div className='inline'>
            <input
              className='text-2xl m-2 p-2 border-solid border-red-200 transition ease-in-out hover:bg-red-400  focus:ring focus:outline-none focus:ring-red-600 pb-2 rounded-lg hover:text-white'
              onChange={(e) => setUntilTime(e.target.value)}
              type='date'
              id='until'
              name='trip-start'
              value={untilTime}
              min='2021-12-31'
              max='2078-12-31'
            />
            <button
              className={`text-lg font-bold text-white transition duration-300 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2  w-44 ${
                !toDo && 'opacity-25'
              }`}
              type='button'
              disabled={toDo.length < 1}
              onClick={handleSubmitSubToDo}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class={`h-6 w-6 inline-block m-auto  ${
                  !toDo && 'transform hover:rotate-12'
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
              onClick={() => setCreateToDo(!createdToDo)}
              className='p-2 m-2 bg-red-600 hover:bg-red-400 rounded-lg focus:ring-black focus:ring  transition duration-200 text-white 20'
            >
              Cancel
            </button>
          </div>{' '}
        </>
      ) : (
        <button
          onClick={() => setCreateToDo(!createdToDo)}
          className='p-4 m-2 bg-black hover:bg-red-400 rounded-lg focus:ring-black text-white focus:ring focus:ring-red-600 transition duration-200'
        >
          Create ToDo
        </button>
      )}
    </div>
  );
}

FormToDoToDoID.propTypes = {
  toDosArray: PropTypes.array.isRequired,
  toDo: PropTypes.string.isRequired,
};

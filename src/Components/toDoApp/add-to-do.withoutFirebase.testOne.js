/* eslint-disable react-hooks/exhaustive-deps */
// import { addDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getToDo } from '../../services/firebase';
// import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

export default function FormToDo({
  toDo,
  setToDo,
  title,
  setTitle,
  toDosArray,
  setToDoSArray,
  firebaseLib,
  FieldValue,
  displayName,
  refTodo,
}) {
  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const handleSubmitToDo = (event) => {
    event.preventDefault();

    setToDoSArray([...toDo, { displayName, title, toDo }]);
    setToDo('');
    setTitle('');

    return firebaseLib
      .firestore()
      .collection('todos')
      .add({
        toDosArray: FieldValue.arrayUnion({
          displayName,
          title,
          toDo,
          createdAt: new Date().toISOString(),
        }),
      });
  };
  console.log(toDosArray);

  return (
    <div>
      {/* {displayName ? (
              <> */}
      <form
        className='block justify-between pl-0 pr-5 hover:bg-black border border-gray-300 rounded-xl mt-2'
        method='POST'
        onSubmit={(event) =>
          toDo.length >= 1 ? handleSubmitToDo(event) : event.preventDefault()
        }
      >
        <textarea
          aria-label='Add a comment'
          autoComplete='off'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Заголовок задачи...'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          ref={refTodo}
        />
        <textarea
          aria-label='Add a comment'
          autoComplete='off'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Напишите задачу...'
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          ref={refTodo}
        />
      </form>
      <div className='transform hover:rotate-0 transition duration-300 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2'>
        <button
          className={`w-full h-full text-sm font-bold text-white ${
            !toDo && !title && 'opacity-25'
          }`}
          type='button'
          disabled={toDo.length < 1 && title.length < 1}
          // onClick={() => setToDoS([itemsArrayTitle, itemsArray])}
          onClick={handleSubmitToDo}
        >
          Добавить задачу
        </button>
      </div>
      {/* </>
            ) : (
              <Outlet />
            )} */}
    </div>
  );
}

FormToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
  toDo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

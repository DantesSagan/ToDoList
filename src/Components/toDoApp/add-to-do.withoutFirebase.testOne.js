/* eslint-disable react-hooks/exhaustive-deps */
// import { addDoc } from 'firebase/firestore';
import React, { useState, useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import FirebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/user';
import useUser from '../../hooks/user';

import PropTypes from 'prop-types';

import { DEFAULT_IMAGE_PATH } from '../../constants/defaultPaths';
export default function AddToDoTwo() {
  const [toDo, setToDo] = useState('');
  const [title, setTitle] = useState('');

  const [toDosArray, setToDoSArray] = useState([]);

  const { firebaseLib, FieldValue } = useContext(FirebaseContext);

  const {
    user: { displayName },
  } = useContext(UserContext);

  const { user } = useUser(displayName?.uid);

  useEffect(() => {
    getToDo();
  }, []);

  async function getToDo() {
    const result = await firebaseLib
      .firestore()
      .collection('todos')
      .get()
      .then((serverUpdate) => {
        let todolist = [];
        serverUpdate.docs.forEach((_doc) => {
          todolist.push(_doc.data());
        });
        setToDoSArray(todolist);
      });
    return result;
  }

  // async function getNesteDataOfToDo() {
  //   const result = await firebaseLib
  //     .firestore()
  //     .collection('todos')
  //     .get()
  //     .child('title')
  //   return result;
  // }

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
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center'>
      <div className='flex flex-col w-2/4'>
        <div className='flex flex-col items-center'>
          <div className='h-full w-full py-5 px-4 text-xl '>
            {/* {displayName ? (
              <> */}
            {user && (
              <div className='flex border-b border-gray-primary h-4 p-4 py-8'>
                <div className='flex items-center'>
                  <Link to={`/p/${user?.username}`}>
                    <img
                      className='rounded-full h-8 w-8 flex'
                      src={`/images/avatars/${user?.username}.jpg`}
                      alt={`${user?.username} profile`}
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_PATH;
                      }}
                    />
                  </Link>
                </div>
              </div>
            )}
            <form
              className='block justify-between pl-0 pr-5 hover:bg-black '
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
                className='text-sm text-gray-base w-full mr-3 py-5 px-4'
                type='text'
                name='add-comment'
                placeholder='Заголовок задачи...'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
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
                // ref={toDoTextArea}
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
            <form className='justrify-center text-2xl border-2 border-red-600 pl-0 pr-5 bg-gray-300'>
              <div>
                {toDosArray.map((item) => (
                  <div>
                    <div key={item}>
                      {item.toDosArray.map((itemOne) => (
                        <div key={itemOne.title}>{itemOne.title}</div>
                      ))}
                    </div>
                    <div key={item}>
                      {item.toDosArray.map((itemTwo) => (
                        <div key={itemTwo.toDo}>{itemTwo.toDo}</div>
                      ))}
                    </div>
                    <div key={item}>
                      {item.toDosArray.map((itemThree) => (
                        <div key={itemThree.createdAt}>
                          {itemThree.createdAt}
                        </div>
                      ))}
                    </div>
                    {/* <div key={item}>
                    {item.toDosArray.map((itemFour) => (
                      <div key={itemFour.displayName}>{itemFour.displayName}</div>
                    ))}
                  </div> */}
                  </div>
                ))}
              </div>
            </form>
            {/* </>
            ) : (
              <Outlet />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

AddToDoTwo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
  toDo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

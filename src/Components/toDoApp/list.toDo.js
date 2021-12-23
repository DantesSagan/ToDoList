/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import useUser from '../../hooks/user';

import UserContext from '../../context/user';

import { firebaseLib } from '../../firebaseLibrary/firebaseLib';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  collection,
  getDoc,
} from 'firebase/firestore';
import { deleteTodo } from '../../services/firebase';
import { getAuth } from 'firebase/auth';
export default function ListOfToDo({
  toDosArray,
  title,
  toDo,
  setTitle,
  setToDo,
  displayName,
  setToDoSArray,
  createdAt,
  toDoID,
  userId,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const checkComparison = async () => {
    const auth = getAuth();
    const userAuth = auth.currentUser.uid;
    const checkIt = await getDocs(collection(firebaseLib.firestore(), 'todos'));
    checkIt.forEach((doc) => {
      if (user?.userId === userAuth) {
        console.log('Yes, this is comparison strict-equality');
        return true;
      } else {
        console.log('No, this not a strict-equality');
        return false;
      }
    });
  };

  async function editToDo(event) {
    event.preventDefault();

    setToDoSArray([
      ...toDosArray,
      { displayName, title, toDo, createdAt, toDoID },
    ]);
    setToDo('');
    setTitle('');

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );
    getDocTodos.forEach((doc) => {
      if (displayName === user?.username) {
        updateDoc(doc.ref, {
          toDosArray: arrayUnion({
            displayName: displayName,
            createdAt: new Date().toISOString(),
            title: title,
            toDo: toDo,
          }),
        })
          .then(() => {
            console.log('Document updated with title: ', title);
            console.log('Document updated with displayName: ', displayName);
            // console.log('Document updated with ID: ', toDoID);
            alert('Array updated was successfully: ', toDosArray);
          })
          .catch((error) => {
            console.error('Array updated error: ', error);
            alert('Array updated error: ', error);
          });
      } else {
        console.log('Something wrong with edit doc data');
        return null;
      }
    });
  }

  async function deleteToDo(event) {
    event.preventDefault();

    const editRef = doc(firebaseLib.firestore(), 'todos', 'ToDoList');

    await updateDoc(editRef, {
      toDosArray: arrayRemove({
        displayName,
        createdAt,
        title,
        toDo,
      }),
    })
      .then(() => {
        console.log('Array was deleted successfully: ', toDosArray);
        alert('Array was deleted successfully: ', toDosArray);
      })
      .catch((error) => {
        console.error('Array deleted error: ', error);
        alert('Array deleted error: ', error);
      });
  }
  const getUID = async () => {
    // const getData = await toDosArray.map((item) => {
    //   return (
    //     <div>
    //       {item.toDosArray.map((second) => {
    //         return second.userId;
    //       })}
    //     </div>
    //   );
    // });
    const findValue = toDosArray.find((item) => {
      return item.userId;
    });
    console.log(findValue);
  };
  const getU = getUID();
  const GetToDoData = () => {
    return (
      <div>
        {user?.userId === getU && (
          <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
            {toDosArray.map((item) => (
              <div className='m-4 p-4 shadow-inner rounded-lg' key={item.id}>
                {item.toDosArray.map((second) => (
                  <div key={second.toDosArray}>
                    {' '}
                    <svg
                      key={second.delete}
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-8 w-8 cursor-pointer stroke'
                      fill='black'
                      viewBox='0 0 24 24'
                      stroke='black'
                      onClick={deleteTodo}
                    >
                      <path
                        key={second.path}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                    <div className='text-2xl font-bold p-2' key={second.title}>
                      {second.title}
                      <textarea
                        key={second.setTitle}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />{' '}
                    </div>
                    <hr className='border border-red-600' key={second.hr} />
                    <div className='text-xl' key={second.toDo}>
                      {second.toDo}
                      <textarea
                        key={second.setToDo}
                        value={toDo}
                        onChange={(e) => setToDo(e.target.value)}
                      />{' '}
                    </div>
                    <div
                      className=' duration-200 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2'
                      key={second.div}
                    >
                      <button
                        key={second.buttonEdit}
                        className={`w-full h-full text-lg font-bold text-white ${
                          !toDo && !title && 'opacity-25'
                        }`}
                        type='button'
                        disabled={toDo.length < 1 && title.length < 1}
                        onClick={editToDo}
                      >
                        Edit
                      </button>
                    </div>
                    <div className='text-lg' key={second.createdAt}>
                      {second.createdAt}
                    </div>
                    <div
                      className='text-sm font-bold p-2 underline'
                      defaultValue={displayName}
                      key={second.displayName}
                    >
                      {second.displayName}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </form>
        )}
      </div>
    );
  };
  return (
    <div>
      {loggedIn ? (
        <div>
          <div className='p-4 mx-auto justify-center'>
            Now is loggedIn - {user?.username} - USER.
          </div>
          <button onClick={getUID}>Check</button>
          {/* {user?.username === currentAuthUserDisplayName ? (
            <div>false</div>
          ) : (
            <div>true</div>
          )} */}
          <GetToDoData />
        </div>
      ) : (
        <div className='p-4 mx-auto justify-center'>
          Now is loggedIn - {user?.username} USER?
          <br /> You might be don't know what you can do but
          <br />
          what i know u can create you own ToDoList!
        </div>
      )}
    </div>
  );
}
ListOfToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};

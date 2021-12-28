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
  query,
  where,
} from 'firebase/firestore';
import { deleteTodo } from '../../services/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

  // This is comparison for checking strict-equality parameters
  // what needed for comparison and get data exaclty what comparison do
  const checkComparison = async () => {
    // DOC ID IN TODOS
    const resultDocId = await firebaseLib.firestore().collection('todos').get();
    const usersDocId = resultDocId.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));

    const mapDocID = usersDocId.map((item) => item.docId);

    // console.log(usersDocId);
    // console.log(usersDocId.map((item) => item.docId));

    // TODOID IN TODOSARRAY IN TODOS
    const result = await firebaseLib.firestore().collection('todos').get();
    const users = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));

    const mapToDoID = users.map((item) =>
      item.toDosArray.map((item) => item.userId)
    );
    const twoMapToDoID = mapToDoID.map((item) => item[0] === user?.userId);
    // console.log(
    //   users.map((item) =>
    //     item.toDosArray.map((itemTwo, i) =>
    //       itemTwo[i].map((itemThree) => itemThree.toDoID)
    //     )
    //   )
    // );
    console.log(users);
    console.log(users.map((item) => item.docId));
    console.log(users.map((item) => item.toDosArray));
    console.log(twoMapToDoID);
    // console.log(
    //   users.map((item) =>
    //     item.toDosArray.map((itemTwo, i) =>
    //       itemTwo.map((itemThree) =>
    //         itemThree.map((itemFour) => itemFour.toDoID)
    //       )
    //     )
    //   )
    // );

    if (user?.userId === twoMapToDoID) {
      console.log('Yes, its comparable');
    } else {
      console.log('No, its no');
    }

    // const querySnapshotToDo = await getDocs(qToDo);
    // querySnapshotToDo.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   if (doc) {
    //     console.log('Yes, its comparable');
    //   } else {
    //     console.log('No, its no');
    //   }
    //   console.log(doc, ' => ', doc.data());
    // });
    // console.log(querySnapshotToDo);

    // const qCollection = query(collection(firebaseLib.firestore(), 'todos'));

    // const querySnapshotInner = await getDocs(qCollection);
    // querySnapshotInner.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   if (doc.id) {
    //     console.log('Yes, its comparable');
    //   } else {
    //     console.log('No, its no');
    //   }
    //   console.log(doc.id, ' => ', doc.data());
    // });
    // console.log(querySnapshotInner);
    // const toDoRef = collection(firebaseLib.firestore(), 'todos');
  };

  // Ths is function for editing posted ToDo
  async function editToDo(event) {
    event.preventDefault();

    setToDoSArray([
      ...toDosArray,
      { displayName, title, toDo, createdAt, toDoID },
    ]);
    setToDo('');
    setTitle('');

    const toDoRef = collection(firebaseLib.firestore(), 'todos');

    // Create a query against the collection.
    const q = query(toDoRef, where('tDosArray', 'array-contains', 'toDoID'));
    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((item) => {
      return item;
    });
    console.log(qSnapshot);

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );
    getDocTodos.forEach((doc) => {
      // In this case need to compare two equal parameters for find user who create toDo
      if (qSnapshot === doc.id) {
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

  // deleteToDo but doesn't work now
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
    const getData = await toDosArray.map((item) => {
      return (
        <div>
          {item.toDosArray.map((second) => {
            return second.userId;
          })}
        </div>
      );
    });
    console.log(getData);
    return getData;
  };
  const Checking = async () => {
    const result = await firebaseLib.firestore().collection('todos').get();
    const users = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));

    const mapToDoID = users.map((item) =>
      item.toDosArray.map((item) => item.userId)
    );
    const twoMapToDoID = mapToDoID.map((item) => item[0] === user?.userId);
    return twoMapToDoID;
  };
console.log(Checking  );
  return (
    <div>
      {/* Check if user is loggendIn */}
      {loggedIn ? (
        <div>
          <div className='p-4 mx-auto justify-center'>
            Now is loggedIn - {user?.username} - USER.
          </div>
          {/* Checking comparison */}
          <button onClick={checkComparison}>Check</button>
          {Checking ? <div>true</div> : <div>false</div>}
          <div>
            {/* Check if authorized user posted any of ToDoList
              if === yes => you can see own ToDoList,
              if === no => you can't see any of you own ToDoList
              but unfortunately for now it's not working 
            */}
            {Checking()  && (
              <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
                {toDosArray.map((item) => (
                  <div
                    className='m-4 p-4 shadow-inner rounded-lg'
                    key={item.id}
                  >
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
                        <div
                          className='text-2xl font-bold p-2'
                          key={second.title}
                        >
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

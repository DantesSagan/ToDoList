/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes, { object } from 'prop-types';
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
  // const checkComparison = async () => {
  //   console.log(loggedIn);
  //   console.log(user);
  //   console.log(displayName);
  //   console.log(user?.username);
  //   // DOC ID IN TODOS
  //   const resultDocId = await firebaseLib.firestore().collection('todos').get();
  //   const usersDocId = resultDocId.docs.map((item) => ({
  //     ...item.data(),
  //     docId: item.id,
  //   }));

  //   const mapDocID = usersDocId.map((item) => item.docId);

  //   // console.log(usersDocId);
  //   // console.log(usersDocId.map((item) => item.docId));

  //   // TODOID IN TODOSARRAY IN TODOS
  //   const result = await firebaseLib.firestore().collection('todos').get();
  //   const users = result.docs.map((item) => ({
  //     ...item.data(),
  //     docId: item.id,
  //   }));

  //   const mapToDoID = users.map((item) =>
  //     item.toDosArray.map((item) => item.userId)
  //   );
  //   const twoMapToDoID = mapToDoID.map((item) => item[0]);

  //   // method forEach execute function ones for every element in array
  //   // what extract value userId what we are needed
  //   twoMapToDoID.forEach((item) => {
  //     if (user?.userId === item) {
  //       console.log('Yes, its comparable');
  //     } else {
  //       console.log('No, its no');
  //     }
  //     console.log(item, `=> userId in todos`);
  //   });

  //   // console.log(users);
  //   // console.log(users.map((item) => item.docId));
  //   // console.log(users.map((item) => item.toDosArray));
  //   console.log(twoMapToDoID);
  // };

  // Ths is function for editing posted ToDo
  async function editToDo(event) {
    event.preventDefault();

    setToDoSArray([
      ...toDosArray,
      { displayName, title, toDo, createdAt, toDoID },
    ]);
    setToDo('');
    setTitle('');

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    // const formatTime = () => {
    //   var date = new Date(createdAt * 1000);
    //   // Hours part from the timestamp
    //   var hours = date.getHours();
    //   // Minutes part from the timestamp
    //   var minutes = date.getMinutes();
    //   // Seconds part from the timestamp
    //   var seconds = date.getSeconds();

    //   // Will display time in 10:30:23 format
    //   var formattedTime = hours + ':' + minutes + ':' + seconds;
    //   return formattedTime;
    // };

    const disName = Object.keys(disNameArray).map((item) => {
      getDocTodos.forEach((doc) => {
        // In this case need to compare two equal parameters for find user who create toDo
        // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
        // So updateDoc of toDoList otherwise - no
        if (
          doc.id === disNameArray[item][0].toDoID &&
          user?.username === disNameArray[item][0].displayName &&
          disNameArray[item][0].toDoID === disNameArray[item][0].doubleToDoID
        ) {
          console.log(
            doc.id === disNameArray[item][0].toDoID &&
              user?.username === disNameArray[item][0].displayName
          );
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
            })
            .then(() => {
              window.location.reload();
            });
        } else {
          console.log('Something wrong with edit doc data');
          return null;
        }
      });

      return disNameArray[item][0].toDoID;
    });
    return disName;
  }

  // deleteToDo but doesn't work now
  async function deleteToDo(event) {
    event.preventDefault();

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    // const formatTime = () => {
    //   var date = new Date(createdAt * 1000);
    //   // Hours part from the timestamp
    //   var hours = date.getHours();
    //   // Minutes part from the timestamp
    //   var minutes = date.getMinutes();
    //   // Seconds part from the timestamp
    //   var seconds = date.getSeconds();

    //   // Will display time in 10:30:23 format
    //   var formattedTime = hours + ':' + minutes + ':' + seconds;
    //   return formattedTime;
    // };

    const disName = Object.keys(disNameArray).map((item) => {
      getDocTodos.forEach((doc) => {
        // In this case need to compare two equal parameters for find user who create toDo
        // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
        // So updateDoc of toDoList otherwise - no
        if (
          doc.id === disNameArray[item][0].toDoID &&
          user?.username === disNameArray[item][0].displayName
        ) {
          console.log(
            doc.id === disNameArray[item][0].toDoID &&
              user?.username === disNameArray[item][0].displayName
          );
          updateDoc(doc.ref, {
            toDosArray: arrayRemove({
              displayName: displayName,
              createdAt: new Date().toISOString(),
              title: title,
              toDo: toDo,
            }),
          })
            .then(() => {
              console.log('Array was deleted successfully: ', toDosArray);
              alert('Array was deleted successfully: ', toDosArray);
            })
            .catch((error) => {
              console.error('Array deleted error: ', error);
              alert('Array deleted error: ', error);
            })
            .then(() => {
              window.location.reload();
            });
        } else {
          console.log('Something wrong with edit doc data');
          return null;
        }
      });
      return disNameArray[item][0].toDoID;
    });
    window.location.reload();
    return disName;
  }
  console.log(user);
  // const check = async () => {
  //   const result = await firebaseLib.firestore().collection('todos').get();
  //   const users = result.docs.map((item) => ({
  //     ...item.data(),
  //     docId: item.id,
  //   }));

  //   //  Get - displayName - in toDosArray
  //   const mapDisplayName = users.map((item) =>
  //     item.toDosArray.map((item) => item.displayName)
  //   );
  //   const twoMapDisplayName = mapDisplayName.map((item) => item[0]);

  //   const itemDisplayName = twoMapDisplayName.forEach((item) => {
  //     console.log(item, `=> displayName in todos`);
  //     return item;
  //   });
  //   console.log(itemDisplayName);
  //   //  Get - createdAt - in toDosArray

  //   const mapCreatedAt = users.map((item) =>
  //     item.toDosArray.map((item) => item.createdAt)
  //   );
  //   const twoMapCreatedAt = mapCreatedAt.map((item) => item[0]);

  //   // method forEach execute function ones for every element in array
  //   // what extract value createdAt what we are needed
  //   const itemCreatedAt = twoMapCreatedAt.forEach((item) => {
  //     console.log(item, `=> createdAt in todos`);
  //     return item;
  //   });

  //   //  Get - ToDoID - in toDosArray

  //   const mapToDoID = users.map((item) =>
  //     item.toDosArray.map((item) => item.toDoID)
  //   );
  //   const twoMapToDoID = mapToDoID.map((item) => item[0]);

  //   // method forEach execute function ones for every element in array
  //   // what extract value ToDoID what we are needed
  //   const itemToDoID = twoMapToDoID.forEach((item) => {
  //     console.log(item, `=> toDoID in todos`);
  //     return item;
  //   });

  //   //  Get - Title - in toDosArray

  //   const mapTitle = users.map((item) =>
  //     item.toDosArray.map((item) => item.title)
  //   );
  //   const twoMapTitle = mapTitle.map((item) => item[0]);

  //   // method forEach execute function ones for every element in array
  //   // what extract value title what we are needed
  //   const itemTitle = twoMapTitle.forEach((item) => {
  //     console.log(item, `=> title in todos`);
  //     return item;
  //   });

  //   //  Get - toDo - in toDosArray

  //   const mapToDo = users.map((item) =>
  //     item.toDosArray.map((item) => item.toDo)
  //   );
  //   const twoMapToDo = mapToDo.map((item) => item[0]);

  //   // method forEach execute function ones for every element in array
  //   // what extract value ToDo what we are needed
  //   const itemToDo = twoMapToDo.forEach((item) => {
  //     console.log(item, `=> toDo in todos`);
  //     return item;
  //   });

  //   //  Get - userId - in toDosArray

  //   const mapUserId = users.map((item) =>
  //     item.toDosArray.map((item) => item.userId)
  //   );
  //   const twoMapUserId = mapUserId.map((item) => item[0]);

  //   // method forEach execute function ones for every element in array
  //   // what extract value userId what we are needed
  //   const itemUserId = twoMapUserId.forEach((item) => {
  //     console.log(item, `=> userId in todos`);
  //     return item;
  //   });
  //   return {
  //     itemDisplayName,
  //     itemToDoID,
  //     itemCreatedAt,
  //     itemTitle,
  //     itemToDo,
  //     itemUserId,
  //     disName,
  //   };
  // };
  // console.log(check);
  // const {
  //   itemDisplayName,
  //   itemToDoID,
  //   itemCreatedAt,
  //   itemTitle,
  //   itemToDo,
  //   itemUserId,
  // } = check();
  // const disNameArray = Object.keys(toDosArray).map((item) => {
  //   return toDosArray[item].toDosArray;
  // });
  // const disName = Object.keys(disNameArray).map((item) => {
  //   console.log(disNameArray[item][0].toDoID === user?.username);
  //   return disNameArray[item][0].displayName;
  // });

  return (
    <div>
      {/* Check if user is loggendIn */}
      {loggedIn ? (
        <div>
          <div className='p-4 mx-auto justify-center'>
            Now is loggedIn - {user?.username} - USER.
          </div>
          {/* Checking comparison */}
          {/* <button onClick={checkComparison}>Check</button> */}
          <div>
            {/* Check if authorized user posted any of ToDoList
              if === yes => you can see own ToDoList,
              if === no => you can't see any of you own ToDoList
              but unfortunately for now it's not working 
            */}
            {
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
                          onClick={deleteToDo}
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
            }
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

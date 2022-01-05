/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import useUser from '../../../hooks/user';

import UserContext from '../../../context/user';

import { firebaseLib } from '../../../firebaseLibrary/firebaseLib';
import { updateDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { DisplayTodoByID } from './displayToDoRouter';
import { getToDo } from '../../../services/firebase';

export default function ListOfDisplayToDo({
  toDosArray,
  title,
  toDo,
  setTitle,
  setToDo,
  displayName,
  setToDoSArray,
  createdAt,
  toDoID,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);
  async function deleteToDo(event) {
    event.preventDefault();

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );
    Object.keys(disNameArray).map((item) => {
      let comparisonName = user?.username === disNameArray[item][0].displayName;

      return comparisonName
        ? getDocTodos.forEach((doc) => {
            let comparisonID = doc.id === disNameArray[item][0].toDoID;
            // In this case need to compare two equal parameters for find user who create toDo
            // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
            // So updateDoc of toDoList otherwise - no
            let titleSelect = window.confirm(
              `Are you sure you want to delete this toDo = ${disNameArray[item][0].title}? Вы уверены, что хотите удалить список дел ${disNameArray[item][0].title}?`
            );
            return titleSelect === true ? (
              comparisonID ? (
                deleteDoc(doc.ref)
                  .then(() => {
                    console.log(
                      `Array was deleted successfully: 
                    ${disNameArray[item][0].title}`
                    );
                    alert(
                      `Array was deleted successfully: 
                    ${disNameArray[item][0].title}`
                    );
                  })
                  .catch((error) => {
                    console.error(`Array deleted error: ${error}`);
                    alert(`Array deleted error: ${error}`);
                  })
                  .then(() => {
                    window.location.reload();
                  })
              ) : (
                <div>{`Cannot delete this ${disNameArray[item][0].title}`}</div>
              )
            ) : null;
          })
        : null;
    });
  }
  console.log(user);

  const editToDo = async () => {
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

    return Object.keys(disNameArray).map((item) => {
      let comparisonName = user?.username === disNameArray[item][0].displayName;

      return comparisonName
        ? getDocTodos.forEach((doc) => {
            // In this case need to compare two equal parameters for find user who create toDo
            // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
            // So updateDoc of toDoList otherwise - no
            let auth = getAuth();
            let userAuth = auth.currentUser.uid;
            let titleSelect = window.confirm(
              `Are you sure you want to edit this toDo = ${disNameArray[item][0].title}? Вы уверены, что хотите поменять список дел ${disNameArray[item][0].title}?`
            );
            let checkDockID = doc.id === disNameArray[item][0].toDoID;
            let checkUserName =
              user?.username === disNameArray[item][0].displayName;

            return titleSelect === true
              ? checkDockID && checkUserName
                ? updateDoc(doc.ref, {
                    toDosArray: [
                      {
                        displayName: displayName,
                        createdAt: formatTime(),
                        title: title,
                        toDo: toDo,
                        userId: userAuth,
                        toDoID: disNameArray[item][0].toDoID,
                      },
                    ],
                  })
                    .then(() => {
                      console.log('Document updated with title: ', title);
                      console.log(
                        'Document updated with displayName: ',
                        displayName
                      );
                      alert('Array updated was successfully: ', toDosArray);
                    })
                    .catch((error) => {
                      console.error('Array updated error: ', error);
                      alert('Array updated error: ', error);
                    })
                    .then(() => {
                      window.location.reload();
                    })
                : console.log('Something wrong with edit doc data')
              : null;
          })
        : null;
    });
  };
  console.log(toDosArray)
  console.log(DisplayTodoByID);
  return (
    <div>
      <DisplayTodoByID
        toDosArray={toDosArray}
        user={user}
        deleteToDo={deleteToDo}
        title={title}
        setTitle={setTitle}
        toDo={toDo}
        setToDo={setToDo}
        editToDo={editToDo}
      />
    </div>
  );
}
ListOfDisplayToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};

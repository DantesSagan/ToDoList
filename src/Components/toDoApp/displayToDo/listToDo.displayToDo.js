/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import useUser from '../../../hooks/user';

import UserContext from '../../../context/user';

import { updateDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { DisplayTodoByID } from './displayToDoRouter';
import { getToDo } from '../../../services/firebase';
import ToDoEditToDo from '../actions/toDoMembers/toDo.editToDo';

import DeleteToDo from '../actions/deleteToDo';

export default function ListOfDisplayToDo({ title, setTitle }) {
  // need to alias parameters from deleteToDo and editToDo
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  const {
    editToDoList,
    displayName,
    createdAt,
    toDoID,
    toDo,
    setToDo,
    toDosArray,
    setToDoSArray,
    firebaseLib,
  } = ToDoEditToDo();

  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const { deleteToDo } = DeleteToDo();

  const editTitle = async () => {
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
      let getCurrentUrl = window.location.pathname;
      let getRouterPathToDo = `/todolist/${disNameArray[item][0].toDoID}`;

      let checkPathIDTitle = getCurrentUrl === getRouterPathToDo;
      if (checkPathIDTitle) {
        window.confirm(
          `Are you sure you want to edit this toDo = ${disNameArray[item][0].title}? Вы уверены, что хотите поменять список дел ${disNameArray[item][0].title}?`
        );
      } else {
        console.log('error change');
        return null;
      }
      return comparisonName && checkPathIDTitle
        ? getDocTodos.forEach((doc) => {
            // In this case need to compare two equal parameters for find user who create toDo
            // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
            // So updateDoc of toDoList otherwise - no
            let auth = getAuth();
            let userAuth = auth.currentUser.uid;

            let checkDockID = doc.id === disNameArray[item][0].toDoID;
            let checkUserName =
              user?.username === disNameArray[item][0].displayName;

            return checkDockID && checkUserName
              ? updateDoc(doc.ref, {
                  toDosArray: [
                    {
                      displayName: disNameArray[item][0].displayName,
                      createdAt: formatTime(),
                      title: title,
                      toDo: disNameArray[item][0].toDo,
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
              : console.log('Something wrong with edit doc data');
          })
        : null;
    });
  };

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
        // editToDo={editToDo}
        editToDoList={editToDoList}
        editTitle={editTitle}
      />
    </div>
  );
}
ListOfDisplayToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};

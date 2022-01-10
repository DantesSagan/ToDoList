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
import ToDoEditToDo from '../actions/toDoMembers/toDo.editToDo';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

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
  // need to alias parameters from deleteToDo and editToDo
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  const navigate = useNavigate();

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
    return Object.keys(disNameArray).map((item) => {
      // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
      let comparisonName = user?.username === disNameArray[item][0].displayName;

      // This is check if currentURL and RouterPath strict-equal
      // To undestand what u want to delete in current equl parameters of URL
      let getCurrentUrl = window.location.pathname;
      let getRouterPathToDo = `/todolist/${disNameArray[item][0].toDoID}`;

      let checkPathID = getCurrentUrl === getRouterPathToDo;

      // This is check if currentURL and RouterPath strict-equal
      // So do confirm what u want to delete whole toDoList with all data in it
      if (checkPathID) {
        window.confirm(
          `Are you sure you want to delete this toDo = ${disNameArray[item][0].title}? Вы уверены, что хотите поменять список дел ${disNameArray[item][0].title}?`
        );
      } else {
        console.log('error change, ошибка в подтверждении удаления toDo');
        return null;
      }

      return comparisonName && checkPathID
        ? getDocTodos.forEach((doc) => {
            let comparisonID = doc.id === disNameArray[item][0].toDoID;
            // In this case need to compare two equal parameters for find user who create toDo
            // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
            // So updateDoc of toDoList otherwise - no

            return comparisonID ? (
              deleteDoc(doc.ref)
                .then(() => {
                  console.log(
                    `Array was deleted successfully: 
                    ${disNameArray[item][0].toDoID}`
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
                  alert(
                    `Deleted successfully - ${disNameArray[item][0].title}`
                  );
                  navigate(ROUTES.DASHBOARD);
                })
            ) : (
              <div>{`Cannot delete this ${disNameArray[item][0].title}`}</div>
            );
          })
        : null;
    });
  }

  const editToDoList = async () => {
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
      // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
      let comparisonName = user?.username === disNameArray[item][0].displayName;

      // This is check if currentURL and RouterPath strict-equal
      // To undestand what u want to change
      let getCurrentUrl = window.location.pathname;
      let getRouterPathToDo = `/todolist/${disNameArray[item][0].toDoID}`;

      let checkPathIDToDoList = getCurrentUrl === getRouterPathToDo;

      // This is check if currentURL and RouterPath strict-equal
      // So do confirm what u want to change in toDoList
      if (checkPathIDToDoList) {
        window.confirm(
          `Are you sure you want to edit this toDo = ${disNameArray[item][0].toDo}? Вы уверены, что хотите поменять список дел ${disNameArray[item][0].title}?`
        );
      } else {
        console.log('error change');
        return null;
      }

      return comparisonName && checkPathIDToDoList
        ? getDocTodos.forEach((doc) => {
            // In this case need to compare two equal parameters for find user who create toDo
            // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
            // So updateDoc of toDoList otherwise - no
            let auth = getAuth();
            let userAuth = auth.currentUser.uid;

            let checkDockIDToDo = doc.id === disNameArray[item][0].toDoID;
            let checkUserName =
              user?.username === disNameArray[item][0].displayName;

            return checkDockIDToDo && checkUserName
              ? updateDoc(doc.ref, {
                  toDosArray: [
                    {
                      displayName: disNameArray[item][0].displayName,
                      createdAt: formatTime(),
                      title: disNameArray[item][0].title,
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
              : console.log('Something wrong with edit doc data');
          })
        : null;
    });
  };
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
  // const { editToDoList, toDo, setToDo } = ToDoEditToDo();

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

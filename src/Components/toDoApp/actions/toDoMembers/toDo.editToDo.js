/* eslint-disable react-hooks/exhaustive-deps */
import UserContext from '../../../../context/user';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { getToDo } from '../../../../services/firebase';

import useUser from '../../../../hooks/user';

export default function ToDoEditToDo({
  setToDoSArray,
  toDosArray,
  displayName,
  toDo,
  createdAt,
  toDoID,
  setToDo,
  firebaseLib,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const editToDoList = async () => {
    setToDoSArray([...toDosArray, { displayName, toDo, createdAt, toDoID }]);
    setToDo('');

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
      return Object.keys(disNameArray[item]).map((ind) => {
        // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
        let comparisonName =
          user?.username === disNameArray[item][ind].displayName;

        // This is check if currentURL and RouterPath strict-equal
        // To undestand what u want to change
        let getCurrentUrl = window.location.pathname;
        let getRouterPathToDo = `/todolist/nested/${disNameArray[item][ind].toDoID}`;

        let checkPathIDToDoList = getCurrentUrl === getRouterPathToDo;

        // This is check if currentURL and RouterPath strict-equal
        // So do confirm what u want to change in toDoList
        if (checkPathIDToDoList) {
          window.confirm(
            `Are you sure you want to edit this toDo = ${disNameArray[item][ind].toDo}? Вы уверены, что хотите поменять список дел ${disNameArray[item][ind].title}?`
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

              let checkDockIDToDo = doc.id === disNameArray[item][ind].toDoID;
              let checkUserName =
                user?.username === disNameArray[item][ind].displayName;

              return checkDockIDToDo && checkUserName
                ? updateDoc(doc.ref, {
                    toDosArray: [
                      {
                        displayName: disNameArray[item][ind].displayName,
                        createdAt: formatTime(),
                        title: disNameArray[item][ind].title,
                        toDo: toDo,
                        userId: userAuth,
                        toDoID: disNameArray[item][ind].toDoID,
                      },
                    ],
                  })
                    .then(() => {
                      console.log(
                        'Document updated with displayName: ',
                        displayName
                      );
                      alert('Array updated was successfully: ', toDo);
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
    });
  };
  console.log(editToDoList);
  console.log(toDosArray);
  return {
    editToDoList,
  };
}

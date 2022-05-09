/* eslint-disable react-hooks/exhaustive-deps */
import UserContext from '../../../../context/user';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { getToDo } from '../../../../services/firebase';

import useUser from '../../../../hooks/user';
import { formatTime } from '../../indexConst';

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

    const commaToDo = toDo.split(',');

    const disNameArray = toDosArray;

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    return Object.keys(disNameArray).map((item) => {
      // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
      let comparisonName =
        user?.username === disNameArray[item].toDosArray.displayName;

      // This is check if currentURL and RouterPath strict-equal
      // To undestand what u want to change
      let getCurrentUrl = window.location.pathname;
      let getRouterPathToDo = `/todolist/nested/${disNameArray[item].toDosArray.toDoID}`;

      let checkPathIDToDoList = getCurrentUrl === getRouterPathToDo;

      // This is check if currentURL and RouterPath strict-equal
      // So do confirm what u want to change in toDoList
      if (checkPathIDToDoList) {
        window.confirm(
          `Are you sure you want to edit this toDo = ${disNameArray[item].toDosArray.toDo}? Вы уверены, что хотите поменять список дел ${disNameArray[item].toDosArray.title}?`
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

            let checkDockIDToDo =
              doc.id === disNameArray[item].toDosArray.toDoID;
            let checkUserName =
              user?.username === disNameArray[item].toDosArray.displayName;

            return checkDockIDToDo && checkUserName
              ? updateDoc(doc.ref, {
                  toDosArray: {
                    displayName: disNameArray[item].toDosArray.displayName,
                    createdAt: formatTime(),
                    title: disNameArray[item].toDosArray.title,
                    toDo: commaToDo,
                    userId: userAuth,
                    toDoID: disNameArray[item].toDosArray.toDoID,
                    doneToDo: disNameArray[item].toDosArray.doneToDo,
                    untilTime: disNameArray[item].toDosArray.untilTime,
                    importance: disNameArray[item].toDosArray.importance,
                  },
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
  };
  console.log(editToDoList);
  console.log(toDosArray);
  return {
    editToDoList,
  };
}

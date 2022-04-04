/* eslint-disable react-hooks/exhaustive-deps */
import UserContext from '../../../../../context/user';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { getToDo } from '../../../../../services/firebase';

import useUser from '../../../../../hooks/user';

export default function RedFlag({
  setToDoSArray,
  toDosArray,
  firebaseLib,
  colors,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const redFlagToDoList = async () => {
    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

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
            `Are you sure you want to edit this toDo = ${disNameArray[item][ind].importance}? Вы уверены, что хотите поменять список дел ${disNameArray[item][ind].title}?`
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
                        createdAt: disNameArray[item][ind].createdAt,
                        title: disNameArray[item][ind].title,
                        toDo: disNameArray[item][ind].toDo,
                        userId: userAuth,
                        toDoID: disNameArray[item][ind].toDoID,
                        doneToDo: disNameArray[item][ind].doneToDo,
                        untilTime: disNameArray[item][ind].untilTime,
                        importance: colors,
                      },
                    ],
                  })
                    .then(() => {
                      console.log('Document updated with flag color: ', colors);
                    })
                    .catch((error) => {
                      console.error('Array updated error: ', error);
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
  console.log(redFlagToDoList);
  console.log(toDosArray);
  return {
    redFlagToDoList,
  };
}

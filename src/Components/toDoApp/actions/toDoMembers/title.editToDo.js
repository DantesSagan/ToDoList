/* eslint-disable react-hooks/exhaustive-deps */
import UserContext from '../../../../context/user';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { getToDo } from '../../../../services/firebase';

import useUser from '../../../../hooks/user';
import { formatTime } from '../../indexConst';

export default function TitleEditToDo({
  displayName,
  createdAt,
  toDoID,
  toDosArray,
  setToDoSArray,
  firebaseLib,
  title,
  setTitle,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const commaTitle = title.split(',');

  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const editTitle = async () => {
    setToDoSArray([...toDosArray, { displayName, title, createdAt, toDoID }]);
    setTitle('');

    const disNameArray = toDosArray;

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    return Object.keys(disNameArray).map((item) => {
      let comparisonName =
        user?.username === disNameArray[item].toDosArray.displayName;
      let getCurrentUrl = window.location.pathname;
      let getRouterPathToDo = `/todolist/nested/${disNameArray[item].toDosArray.toDoID}`;

      let checkPathIDTitle = getCurrentUrl === getRouterPathToDo;
      if (checkPathIDTitle) {
        window.confirm(
          `Are you sure you want to edit this toDo = ${disNameArray[item].toDosArray.title}? Вы уверены, что хотите поменять список дел ${disNameArray[item].toDosArray.title}?`
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

            let checkDockID = doc.id === disNameArray[item].toDosArray.toDoID;
            let checkUserName =
              user?.username === disNameArray[item].toDosArray.displayName;

            return checkDockID && checkUserName
              ? updateDoc(doc.ref, {
                  toDosArray: {
                    displayName: disNameArray[item].toDosArray.displayName,
                    createdAt: formatTime(),
                    title: commaTitle,
                    toDo: disNameArray[item].toDosArray.toDo,
                    userId: userAuth,
                    toDoID: disNameArray[item].toDosArray.toDoID,
                    doneToDo: disNameArray[item].toDosArray.doneToDo,
                    untilTime: disNameArray[item].toDosArray.untilTime,
                    importance: disNameArray[item].toDosArray.importance,
                  },
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
  return {
    editTitle,
  };
}

/* eslint-disable react-hooks/exhaustive-deps */
import UserContext from '../../../../../context/user';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { getNestedToDo, getToDo } from '../../../../../services/firebase';

import useUser from '../../../../../hooks/user';
import { formatTime } from '../../../indexConst';

export default function EditSubToDo({
  setToDoSArray,
  toDosArray,
  displayName,
  toDo,
  createdAt,
  toDoID,
  setToDo,
  firebaseLib,
  setNestedArrayToDo,
  arrayID,
  setArrayID,
  nestedArrayToDo,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  useEffect(() => {
    try {
      getNestedToDo(setNestedArrayToDo, setArrayID);
    } catch (error) {
      setNestedArrayToDo([]);
      console.log(error);
    }
    getToDo(setToDoSArray);
  }, []);

  const nestedToDoArray = nestedArrayToDo;

  console.log(nestedToDoArray);

  const editSubToDo = async (event) => {
    const commaToDo = toDo.split(',');

    setNestedArrayToDo([
      ...nestedArrayToDo,
      { displayName, toDo, createdAt, toDoID },
    ]);
    setToDo('');

    return Object.keys(nestedToDoArray).map(async (itemsNested) => {
      // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
      let comparisonName =
        user?.username === nestedToDoArray[itemsNested].toDosArray.displayName;

      // This is check if currentURL and RouterPath strict-equal
      // To undestand what u want to change
      let getCurrentUrl = window.location.pathname;
      let getRouterPathToDo = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested].toDosArray.toDoID}`;

      let checkPathID = getCurrentUrl === getRouterPathToDo;

      const getDocTodos = await getDocs(
        collection(firebaseLib.firestore(), 'todos')
      );

      if (checkPathID) {
        console.log('Edit subToDo confirm');
        window.confirm(
          `Are you sure you want to edit this toDo =
                  ${nestedToDoArray[itemsNested].toDosArray.toDo}?`
        );
      } else {
        console.log('error change, ???????????? ?? ?????????????????????????? ???????????????????????????? toDo');
        return null;
      }
      return checkPathID
        ? getDocTodos.forEach(async (docParent) => {
            // In this case need to compare two equal parameters for findex user who create toDo
            // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
            // So updateDoc of toDoList otherwise - no
            let auth = getAuth();
            let userAuth = auth.currentUser.uid;
            let getID = docParent.id;

            let checkID =
              getID === nestedToDoArray[itemsNested].toDosArray.parentID;

            const getDocSub = await getDocs(
              collection(firebaseLib.firestore(), 'todos', getID, 'nestedToDo')
            );

            return (
              comparisonName &&
              checkID &&
              checkPathID &&
              getDocSub.forEach((docSub) => {
                let comparisonID =
                  docSub.id === nestedToDoArray[itemsNested].toDosArray.toDoID;

                // This is check if currentURL and RouterPath strict-equal
                // So do confirm what u want to change in toDoList

                return comparisonID && comparisonName
                  ? updateDoc(docSub.ref, {
                      toDosArray: {
                        displayName:
                          nestedToDoArray[itemsNested].toDosArray.displayName,
                        createdAt: formatTime(),
                        toDo: commaToDo,
                        userId: userAuth,
                        toDoID: nestedToDoArray[itemsNested].toDosArray.toDoID,
                        doneToDo:
                          nestedToDoArray[itemsNested].toDosArray.doneToDo,
                        parentID: docParent.id,
                        importance:
                          nestedToDoArray[itemsNested].toDosArray.importance,
                        untilTime:
                          nestedToDoArray[itemsNested].toDosArray.untilTime,
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
            );
          })
        : null;
    });
  };

  console.log(toDosArray);
  return {
    editSubToDo,
  };
}

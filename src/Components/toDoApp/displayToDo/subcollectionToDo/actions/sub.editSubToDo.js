/* eslint-disable react-hooks/exhaustive-deps */
import UserContext from '../../../../../context/user';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { getNestedToDo, getToDo } from '../../../../../services/firebase';

import useUser from '../../../../../hooks/user';

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

  const nestedToDoArray = Object.keys(nestedArrayToDo).map((item) => {
    return nestedArrayToDo[item].toDosArray;
  });

  console.log(nestedToDoArray);

  const editSubToDo = async (event) => {
    const commaToDo = toDo.split(',');

    setNestedArrayToDo([
      ...nestedArrayToDo,
      { displayName, toDo, createdAt, toDoID },
    ]);
    setToDo('');

    const formatTime = () => {
      let date = new Date();
      // Year part from the timestamp
      let year = date.getFullYear();
      // Month part from the timestamp
      let month =
        date.getMonth() + 1 === 10 || 11 || 12
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      // Days part from the timestamp
      let days =
        date.getDate() === 10 ||
        11 ||
        12 ||
        13 ||
        14 ||
        15 ||
        16 ||
        17 ||
        18 ||
        19 ||
        20 ||
        21 ||
        22 ||
        23 ||
        24 ||
        25 ||
        26 ||
        27 ||
        28 ||
        29 ||
        30 ||
        31
          ? `${date.getDate()}`
          : date.getDate()
          ? `0${date.getDate()}`
          : date.getDate();
      // Hours part from the timestamp
      let hours = date.getHours();
      // Minutes part from the timestamp
      let minutes = date.getMinutes();
      // Seconds part from the timestamp
      let seconds = date.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime = `Posted time toDo: ${year} year, ${month} month, ${days} day, ${hours}:${minutes}:${seconds}`;
      return formattedTime;
    };

    return Object.keys(nestedToDoArray).map(async (itemsNested) => {
      return Object.keys(nestedToDoArray[itemsNested]).map(async (index) => {
        // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
        let comparisonName =
          user?.username === nestedToDoArray[itemsNested][index].displayName;

        // This is check if currentURL and RouterPath strict-equal
        // To undestand what u want to change
        let getCurrentUrl = window.location.pathname;
        let getRouterPathToDo = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested][index].toDoID}`;

        let checkPathID = getCurrentUrl === getRouterPathToDo;

        const getDocTodos = await getDocs(
          collection(firebaseLib.firestore(), 'todos')
        );

        if (checkPathID) {
          console.log('Edit subToDo confirm');
          window.confirm(
            `Are you sure you want to edit this toDo =
                  ${nestedToDoArray[itemsNested][index].toDo}?`
          );
        } else {
          console.log(
            'error change, ошибка в подтверждении редактировании toDo'
          );
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
                getID === nestedToDoArray[itemsNested][index].parentID;

              const getDocSub = await getDocs(
                collection(
                  firebaseLib.firestore(),
                  'todos',
                  getID,
                  'nestedToDo'
                )
              );

              return (
                comparisonName &&
                checkID &&
                checkPathID &&
                getDocSub.forEach((docSub) => {
                  let comparisonID =
                    docSub.id === nestedToDoArray[itemsNested][index].toDoID;

                  // This is check if currentURL and RouterPath strict-equal
                  // So do confirm what u want to change in toDoList

                  return comparisonID && comparisonName
                    ? updateDoc(docSub.ref, {
                        toDosArray: [
                          {
                            displayName:
                              nestedToDoArray[itemsNested][index].displayName,
                            createdAt: formatTime(),
                            toDo: commaToDo,
                            userId: userAuth,
                            toDoID: nestedToDoArray[itemsNested][index].toDoID,
                            doneToDo:
                              nestedToDoArray[itemsNested][index].doneToDo,
                            parentID: docParent.id,
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
              );
            })
          : null;
      });
    });
  };

  console.log(toDosArray);
  return {
    editSubToDo,
  };
}

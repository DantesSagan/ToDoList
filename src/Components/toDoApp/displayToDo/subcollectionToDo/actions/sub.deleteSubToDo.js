/* eslint-disable react-hooks/exhaustive-deps */
import { getDocs, collection, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import UserContext from '../../../../../context/user';
import { getNestedToDo, getToDo } from '../../../../../services/firebase';
import useUser from '../../../../../hooks/user';
import IndexConst from '../../../indexConst';

import * as ROUTES from '../../../../../constants/routes';

export default function DeleteSubToDo({
  setNestedArrayToDo,
  setArrayID,
  arrayID,
  nestedArrayToDo,
}) {
  const { setToDoSArray, firebaseLib } = IndexConst();

  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const navigate = useNavigate();

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

  const deleteSubToDo = async (event) => {
    event.preventDefault();

    return Object.keys(nestedToDoArray).map(async (itemsNested) => {
      // console.log(nestedArrayToDo);
      //  4th
      // Need to create comparison what will be strict-equal
      // by router toDoID in compar with toDoID in toDosArray
      let comparisonName =
        user?.username === nestedToDoArray[itemsNested].toDosArray.displayName;

      // This is check if currentURL and RouterPath strict-equal
      // To undestand what u want to delete in current equl parameters of URL
      let getCurrentUrl = window.location.pathname;
      let getRouterPathToDo = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested].toDosArray.toDoID}`;

      let checkPathID = getCurrentUrl === getRouterPathToDo;
      // This is check if currentURL and RouterPath strict-equal
      // So do confirm what u want to delete whole toDoList with all data in it

      const getDocSubToDoOnes = await getDocs(
        collection(firebaseLib.firestore(), 'todos')
      );

      return checkPathID
        ? getDocSubToDoOnes.forEach(async (getDoc) => {
            let getID = getDoc.id;

            let checkID =
              getID === nestedToDoArray[itemsNested].toDosArray.parentID;

            const getDocTodos = await getDocs(
              collection(firebaseLib.firestore(), 'todos', getID, 'nestedToDo')
            );

            return comparisonName && checkPathID && checkID
              ? getDocTodos.forEach((doc) => {
                  let comparisonID =
                    doc.id === nestedToDoArray[itemsNested].toDosArray.toDoID;
                  // In this case need to compare two equal parameters
                  // for find user who create toDo
                  // And second compare with if - user - IS loggedIn
                  // and this - currentUser - strict-equal to displayName in toDosArray
                  // So updateDoc of toDoList otherwise - no
                  const confirm = window.confirm(
                    `Are you sure you want to delete this toDo = 
            ${nestedToDoArray[itemsNested].toDosArray.toDo}? `
                  );
                  if (
                    confirm &&
                    checkPathID &&
                    checkID &&
                    comparisonID &&
                    comparisonName
                  ) {
                    console.log('Deleted');
                  } else {
                    console.log(
                      'error change, ошибка в подтверждении удаления toDo'
                    );
                    return null;
                  }
                  return comparisonID ? (
                    deleteDoc(doc.ref)
                      .then(() => {
                        console.log(
                          `Subcollection toDo was deleted successfully: 
                        ${nestedToDoArray[itemsNested].toDosArray.toDoID}`
                        );
                        alert(
                          `Subcollection toDo was deleted successfully: 
                        ${nestedToDoArray[itemsNested].toDosArray.toDo}`
                        );
                      })
                      .catch((error) => {
                        console.error(`ToDo deleted error: ${error}`);
                        alert(`ToDo deleted error: ${error}`);
                      })
                      .then(() => {
                        navigate(ROUTES.DASHBOARD);
                      })
                  ) : (
                    <div>{`Cannot delete this ${nestedToDoArray[itemsNested].toDosArray.toDo}`}</div>
                  );
                })
              : null;
          })
        : null;
    });
  };
  return { deleteSubToDo };
}

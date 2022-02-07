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

  console.log(arrayID);

  const nestedToDoArray = Object.keys(nestedArrayToDo).map((item) => {
    return nestedArrayToDo[item].toDosArray;
  });

  const deleteSubToDo = async (event) => {
    event.preventDefault();

    return Object.keys(nestedToDoArray).map(async (itemsNested) => {
      // console.log(nestedArrayToDo);
      //  4th
      return Object.keys(nestedToDoArray[itemsNested]).map(async (index) => {
        // Need to create comparison what will be strict-equal
        // by router toDoID in compar with toDoID in toDosArray
        let comparisonName =
          user?.username === nestedToDoArray[itemsNested][index].displayName;

        // This is check if currentURL and RouterPath strict-equal
        // To undestand what u want to delete in current equl parameters of URL
        let getCurrentUrl = window.location.pathname;
        let getRouterPathToDo = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested][index].toDoID}`;

        let checkPathID = getCurrentUrl === getRouterPathToDo;
        console.log(checkPathID);
        // This is check if currentURL and RouterPath strict-equal
        // So do confirm what u want to delete whole toDoList with all data in it

        const getDocSubToDoOnes = await getDocs(
          collection(firebaseLib.firestore(), 'todos')
        );

        return checkPathID
          ? getDocSubToDoOnes.forEach(async (getDoc) => {
              let getID = getDoc.id;

              let checkID =
                getID === nestedToDoArray[itemsNested][index].parentID;

              const getDocTodos = await getDocs(
                collection(
                  firebaseLib.firestore(),
                  'todos',
                  getID,
                  'nestedToDo'
                )
              );

              return comparisonName && checkPathID && checkID
                ? getDocTodos.forEach((doc) => {
                    console.log(doc.id);
                    let comparisonID =
                      doc.id === nestedToDoArray[itemsNested][index].toDoID;
                    // In this case need to compare two equal parameters
                    // for find user who create toDo
                    // And second compare with if - user - IS loggedIn
                    // and this - currentUser - strict-equal to displayName in toDosArray
                    // So updateDoc of toDoList otherwise - no
                    const confirm = window.confirm(
                      `Are you sure you want to delete this toDo = 
            ${doc.id}? 
            Вы уверены, что хотите поменять список дел 
            ${doc.id}?`
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
                            `Array was deleted successfully: 
                        ${nestedToDoArray[itemsNested][index].toDoID}`
                          );
                          alert(
                            `Array was deleted successfully: 
                        ${nestedToDoArray[itemsNested][index].title}`
                          );
                        })
                        .catch((error) => {
                          console.error(`Array deleted error: ${error}`);
                          alert(`Array deleted error: ${error}`);
                        })
                        .then(() => {
                          alert(
                            `Deleted successfully - ${nestedToDoArray[itemsNested][index].title}`
                          );
                          navigate(ROUTES.DASHBOARD);
                        })
                    ) : (
                      <div>{`Cannot delete this ${nestedToDoArray[itemsNested][index].title}`}</div>
                    );
                  })
                : null;
            })
          : null;
      });
    });
  };
  return { deleteSubToDo };
}

import { getDocs, collection, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import UserContext from '../../../../../context/user';
import { getToDo } from '../../../../../services/firebase';
import useUser from '../../../../../hooks/user';
import IndexConst from '../../../indexConst';

import * as ROUTES from '../../../../../constants/routes';

export default function DeleteSubToDo() {
  const { setToDoSArray, toDosArray, firebaseLib } = IndexConst();

  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const navigate = useNavigate();

  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  const deleteToDo = async (event) => {
    event.preventDefault();

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
        // To undestand what u want to delete in current equl parameters of URL
        let getCurrentUrl = window.location.pathname;
        let getRouterPathToDo = `/todolist/nested/${disNameArray[item][ind].toDoID}`;

        let checkPathID = getCurrentUrl === getRouterPathToDo;

        // This is check if currentURL and RouterPath strict-equal
        // So do confirm what u want to delete whole toDoList with all data in it
        if (checkPathID) {
          window.confirm(
            `Are you sure you want to delete this toDo = ${disNameArray[item][ind].title}? Вы уверены, что хотите поменять список дел ${disNameArray[item][0].title}?`
          );
        } else {
          console.log('error change, ошибка в подтверждении удаления toDo');
          return null;
        }

        return comparisonName && checkPathID
          ? getDocTodos.forEach((doc) => {
              let comparisonID = doc.id === disNameArray[item][ind].toDoID;
              // In this case need to compare two equal parameters for find user who create toDo
              // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
              // So updateDoc of toDoList otherwise - no

              return comparisonID ? (
                deleteDoc(doc.ref)
                  .then(() => {
                    console.log(
                      `Array was deleted successfully: 
                    ${disNameArray[item][ind].toDoID}`
                    );
                    alert(
                      `Array was deleted successfully: 
                    ${disNameArray[item][ind].title}`
                    );
                  })
                  .catch((error) => {
                    console.error(`Array deleted error: ${error}`);
                    alert(`Array deleted error: ${error}`);
                  })
                  .then(() => {
                    alert(
                      `Deleted successfully - ${disNameArray[item][ind].title}`
                    );
                    navigate(ROUTES.DASHBOARD);
                  })
              ) : (
                <div>{`Cannot delete this ${disNameArray[item][ind].title}`}</div>
              );
            })
          : null;
      });
    });
  };
  return { deleteToDo };
}

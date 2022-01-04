/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useUser from '../../hooks/user';

import UserContext from '../../context/user';

import { firebaseLib } from '../../firebaseLibrary/firebaseLib';
import { updateDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { DisplayTodoByUser } from './displayToDo/displayToDo';
import { getAuth } from 'firebase/auth';
import { editToDo } from './actions/editToDo';
export default function ListOfToDo({
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
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  // This is comparison for checking strict-equality parameters
  // what needed for comparison and get data exaclty what comparison do
  // const checkComparison = async () => {
  //   console.log(loggedIn);
  //   console.log(user);
  //   console.log(displayName);
  //   console.log(user?.username);
  //   // DOC ID IN TODOS
  //   const resultDocId = await firebaseLib.firestore().collection('todos').get();
  //   const usersDocId = resultDocId.docs.map((item) => ({
  //     ...item.data(),
  //     docId: item.id,
  //   }));

  //   const mapDocID = usersDocId.map((item) => item.docId);

  //   // console.log(usersDocId);
  //   // console.log(usersDocId.map((item) => item.docId));

  //   // TODOID IN TODOSARRAY IN TODOS
  //   const result = await firebaseLib.firestore().collection('todos').get();
  //   const users = result.docs.map((item) => ({
  //     ...item.data(),
  //     docId: item.id,
  //   }));

  //   const mapToDoID = users.map((item) =>
  //     item.toDosArray.map((item) => item.userId)
  //   );
  //   const twoMapToDoID = mapToDoID.map((item) => item[0]);

  //   // method forEach execute function ones for every element in array
  //   // what extract value userId what we are needed
  //   twoMapToDoID.forEach((item) => {
  //     if (user?.userId === item) {
  //       console.log('Yes, its comparable');
  //     } else {
  //       console.log('No, its no');
  //     }
  //     console.log(item, `=> userId in todos`);
  //   });

  //   // console.log(users);
  //   // console.log(users.map((item) => item.docId));
  //   // console.log(users.map((item) => item.toDosArray));
  //   console.log(twoMapToDoID);
  // };

  // Ths is function for editing posted ToDo

  // deleteToDo = work, but not i needed
  // async function deleteToDo(event) {
  //   event.preventDefault();

  //   const disNameArray = Object.keys(toDosArray).map((item) => {
  //     return toDosArray[item].toDosArray;
  //   });

  //   const getDocTodos = await getDocs(
  //     collection(firebaseLib.firestore(), 'todos')
  //   );

  //   const disName = Object.keys(disNameArray).map(async (item) => {
  //     getDocTodos.forEach((doc) => {
  //       // In this case need to compare two equal parameters for find user who create toDo
  //       // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
  //       // So updateDoc of toDoList otherwise - no
  //       if (
  //         doc.id === disNameArray[item][0].toDoID &&
  //         user?.username === disNameArray[item][0].displayName
  //       ) {
  //         console.log(
  //           doc.id === disNameArray[item][0].toDoID &&
  //             user?.username === disNameArray[item][0].displayName
  //         );
  //         deleteDoc(doc.ref, disNameArray[item][0].toDoID)
  //           .then(() => {
  //             console.log('Array was deleted successfully: ', toDosArray);
  //             alert('Array was deleted successfully: ', toDosArray);
  //           })
  //           .catch((error) => {
  //             console.error('Array deleted error: ', error);
  //             alert('Array deleted error: ', error);
  //           })
  //           .then(() => {
  //             window.location.reload();
  //           });
  //       } else {
  //         console.log('Something wrong with edit doc data');
  //         return null;
  //       }
  //     });
  //   });
  //   return disName;
  // }

  async function deleteToDo(event) {
    event.preventDefault();

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );
    Object.keys(disNameArray).map((item) => {
      const comparisonName =
        user?.username === disNameArray[item][0].displayName;

      return comparisonName
        ? getDocTodos.forEach((doc) => {
            const comparisonID = doc.id === disNameArray[item][0].toDoID;
            // In this case need to compare two equal parameters for find user who create toDo
            // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
            // So updateDoc of toDoList otherwise - no
            var titleSelect = window.confirm(
              `Are you sure you want to delete this toDo = ${disNameArray[item][0].title}? Вы уверены, что хотите удалить список дел ${disNameArray[item][0].title}?`
            );
            return titleSelect === true ? (
              comparisonID ? (
                deleteDoc(doc.ref)
                  .then(() => {
                    console.log(
                      `Array was deleted successfully: 
                    ${disNameArray[item][0].title}`
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
                    window.location.reload();
                  })
              ) : (
                <div>{`Cannot delete this ${disNameArray[item][0].title}`}</div>
              )
            ) : null;
          })
        : null;
    });
  }
  console.log(user);

  console.log(DisplayTodoByUser);
  return (
    <div>
      <editToDo
        setToDoSArray={setToDoSArray}
        toDosArray={toDosArray}
        displayName={displayName}
        title={title}
        toDo={toDo}
        createdAt={createdAt}
        toDoID={toDoID}
        setToDo={setToDo}
        setTitle={setTitle}
        getDocs={getDocs}
        collection={collection}
        firebaseLib={firebaseLib}
        updateDoc={updateDoc}
        user={user}
        getAuth={getAuth}
      />
      <DisplayTodoByUser
        toDosArray={toDosArray}
        user={user}
        deleteToDo={deleteToDo}
        title={title}
        setTitle={setTitle}
        toDo={toDo}
        setToDo={setToDo}
        editToDo={editToDo}
      />
    </div>
  );
}
ListOfToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};

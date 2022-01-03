/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useUser from '../../hooks/user';

import UserContext from '../../context/user';

import { firebaseLib } from '../../firebaseLibrary/firebaseLib';
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  collection,
} from 'firebase/firestore';
import { deleteTodo } from '../../services/firebase';
import { DisplayTodoByUser } from './displayToDo/displayToDo';
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
  async function editToDo(event) {
    event.preventDefault();

    setToDoSArray([
      ...toDosArray,
      { displayName, title, toDo, createdAt, toDoID },
    ]);
    setToDo('');
    setTitle('');

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    // const formatTime = () => {
    //   var date = new Date(createdAt * 1000);
    //   // Hours part from the timestamp
    //   var hours = date.getHours();
    //   // Minutes part from the timestamp
    //   var minutes = date.getMinutes();
    //   // Seconds part from the timestamp
    //   var seconds = date.getSeconds();

    //   // Will display time in 10:30:23 format
    //   var formattedTime = hours + ':' + minutes + ':' + seconds;
    //   return formattedTime;
    // };

    const disName = Object.keys(disNameArray).map((item) => {
      getDocTodos.forEach((doc) => {
        // In this case need to compare two equal parameters for find user who create toDo
        // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
        // So updateDoc of toDoList otherwise - no
        if (
          doc.id === disNameArray[item][0].toDoID &&
          user?.username === disNameArray[item][0].displayName
        ) {
          console.log(
            doc.id === disNameArray[item][0].toDoID &&
              user?.username === disNameArray[item][0].displayName
          );
          updateDoc(doc.ref, {
            toDosArray: arrayUnion({
              displayName: displayName,
              createdAt: new Date().toISOString(),
              title: title,
              toDo: toDo,
            }),
          })
            .then(() => {
              console.log('Document updated with title: ', title);
              console.log('Document updated with displayName: ', displayName);
              // console.log('Document updated with ID: ', toDoID);
              alert('Array updated was successfully: ', toDosArray);
            })
            .catch((error) => {
              console.error('Array updated error: ', error);
              alert('Array updated error: ', error);
            })
            .then(() => {
              window.location.reload();
            });
        } else {
          console.log('Something wrong with edit doc data');
          return null;
        }
      });

      return disNameArray[item][0];
    });
    return disName;
  }

  // deleteToDo but doesn't work now
  async function deleteToDo(event) {
    event.preventDefault();

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    // const formatTime = () => {
    //   var date = new Date(createdAt * 1000);
    //   // Hours part from the timestamp
    //   var hours = date.getHours();
    //   // Minutes part from the timestamp
    //   var minutes = date.getMinutes();
    //   // Seconds part from the timestamp
    //   var seconds = date.getSeconds();

    //   // Will display time in 10:30:23 format
    //   var formattedTime = hours + ':' + minutes + ':' + seconds;
    //   return formattedTime;
    // };

    const disName = Object.keys(disNameArray).map((item) => {
      getDocTodos.forEach((doc) => {
        // In this case need to compare two equal parameters for find user who create toDo
        // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
        // So updateDoc of toDoList otherwise - no
        if (
          doc.id === disNameArray[item][0].toDoID &&
          user?.username === disNameArray[item][0].displayName
        ) {
          console.log(
            doc.id === disNameArray[item][0].toDoID &&
              user?.username === disNameArray[item][0].displayName
          );
          updateDoc(doc.ref, {
            toDosArray: arrayRemove({
              displayName: displayName,
              createdAt: new Date().toISOString(),
              title: title,
              toDo: toDo,
            }),
          })
            .then(() => {
              console.log('Array was deleted successfully: ', toDosArray);
              alert('Array was deleted successfully: ', toDosArray);
            })
            .catch((error) => {
              console.error('Array deleted error: ', error);
              alert('Array deleted error: ', error);
            })
            .then(() => {
              window.location.reload();
            });
        } else {
          console.log('Something wrong with edit doc data');
          return null;
        }
      });
      return disNameArray[item][0].toDoID;
    });
    window.location.reload();
    return disName;
  }
  console.log(user);

  console.log(DisplayTodoByUser);
  return (
    <div>
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

import IndexConst from '../../indexConst';
import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { getToDo } from '../../../../services/firebase';

export default function ToDoEditToDo() {
  const { toDo, setToDo, toDosArray, setToDoSArray, firebaseLib, user } =
    IndexConst();
  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);
  const editToDoList = async (event) => {
    event.preventDefault();
    setToDo('');

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    const getDocTodos = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );
    console.log(firebaseLib);
    console.log(disNameArray);
    const formatTime = () => {
      var date = new Date();
      // Year part from the timestamp
      var year = date.getFullYear();
      // Month part from the timestamp
      var month = date.getMonth();
      // Days part from the timestamp
      var days = date.getDate();
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = date.getMinutes();
      // Seconds part from the timestamp
      var seconds = date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime = `Posted time toDo: ${year} year, ${month} month, ${days} day, ${hours}:${minutes}:${seconds}`;
      return formattedTime;
    };
    return Object.keys(disNameArray).map((item) => {
      let comparisonName = user?.username === disNameArray[item][0].displayName;

      return comparisonName
        ? getDocTodos.forEach((doc) => {
            // In this case need to compare two equal parameters for find user who create toDo
            // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
            // So updateDoc of toDoList otherwise - no
            let auth = getAuth();
            let titleSelect = window.confirm(
              `Are you sure you want to edit this toDo = ${disNameArray[item][0].title}? Вы уверены, что хотите поменять список дел ${disNameArray[item][0].title}?`
            );
            let checkDockID = doc.id === disNameArray[item][0].toDoID;
            let checkUserName =
              user?.username === disNameArray[item][0].displayName;
            console.log(checkUserName);
            return titleSelect === true
              ? checkDockID && checkUserName
                ? updateDoc(doc.ref, {
                    toDosArray: [
                      {
                        toDo: toDo,
                      },
                    ],
                  })
                    .then(() => {
                      console.log('Document updated with toDo: ', toDo);
                      alert('Array updated was successfully: ', toDo);
                    })
                    .catch((error) => {
                      console.error('Array updated error: ', error);
                      alert('Array updated error: ', error);
                    })
                    .then(() => {
                      window.location.reload();
                    })
                : console.log('Something wrong with edit doc data')
              : null;
          })
        : null;
    });
  };
  console.log(editToDoList);
  console.log(toDosArray);
  return {
    editToDoList,
    toDo,
    setToDo,
  };
}

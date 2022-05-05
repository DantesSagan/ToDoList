import { getAuth } from 'firebase/auth';
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { formatTime } from '../../../indexConst';

export default function HandleSubmitSubToDo({
  toDo,
  setToDoSArray,
  toDosArray,
  displayName,
  createdAt,
  toDoID,
  untilTime,
  setToDo,
  user,
  firebaseLib,
}) {
  const handleSubmitSubToDo = async () => {
    const commaToDo = toDo.split(',');

    setToDoSArray([
      ...toDosArray,
      { displayName, commaToDo, createdAt, toDoID, untilTime },
    ]);
    setToDo('');

    const disNameArray = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });

    
    return Object.keys(disNameArray).map(async (item) => {
      return Object.keys(disNameArray[item]).map(async (ind) => {
        // Need to create comparison what will be strict-equal by router toDoID in compar with toDoID in toDosArray
        let comparisonName =
          user?.username === disNameArray[item][ind].displayName;

        // This is check if currentURL and RouterPath strict-equal
        // To undestand what u want to change
        let getCurrentUrl = window.location.pathname;
        let getRouterPathToDo = `/todolist/${disNameArray[item][ind].toDoID}`;

        let checkPathIDToDoList = getCurrentUrl === getRouterPathToDo;

        // This is check if currentURL and RouterPath strict-equal
        // So do confirm what u want to change in toDoList
        if (checkPathIDToDoList) {
          window.confirm(
            `Are you sure you want to add this toDo = ${disNameArray[item][ind].toDo}? Вы уверены, что хотите добавить дополнительный список дел ${disNameArray[item][ind].title}?`
          );
        } else {
          console.log('error change');
          return null;
        }

        // Get all doc in todos collection
        const getDocTodosOne = await getDocs(
          collection(firebaseLib.firestore(), 'todos')
        );

        // Get ref for creating nested toDo sublcollection with own toDoID in parent route for
        // improving flexibility and changing nested todos
        const nestedRef = doc(
          firebaseLib.firestore(),
          'todos',
          disNameArray[item][ind].toDoID,
          'nestedToDo',
          toDoID
        );
        console.log(nestedRef);
        return comparisonName && checkPathIDToDoList
          ? getDocTodosOne.forEach(async (doc) => {
              // In this case need to compare two equal parameters for find user who create toDo
              // And second compare with if - user - IS loggedIn and this - currentUser - strict-equal to displayName in toDosArray
              // So updateDoc of toDoList otherwise - no
              let auth = getAuth();
              let userAuth = auth.currentUser.uid;

              let checkDockIDToDo = doc.id === disNameArray[item][ind].toDoID;
              let checkUserName =
                user?.username === disNameArray[item][ind].displayName;

              // Check if current auth user and check if current doc id equals to parent toDoID
              // And if all is it true so set new subcolletion with new toDoID like a child toDo in parent router path
              return checkUserName && checkDockIDToDo
                ? await setDoc(nestedRef, {
                    toDosArray: arrayUnion({
                      displayName: disNameArray[item][ind].displayName,
                      createdAt: formatTime(),
                      toDo: commaToDo,
                      userId: userAuth,
                      toDoID: toDoID,
                      parentID: disNameArray[item][ind].toDoID,
                      untilTime: untilTime,
                      doneToDo: false,
                      importance: ['white'],
                    }),
                  })
                    .then(() => {
                      console.log('Document updated with title: ', toDo);
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
          : null;
      });
    });
  };

  return { handleSubmitSubToDo };
}

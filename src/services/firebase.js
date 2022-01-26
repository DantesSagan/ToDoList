import { firebaseLib, FieldValue } from '../firebaseLibrary/firebaseLib';
import { updateDoc, doc, getDocs, collection } from 'firebase/firestore';

export async function doesUsernameExist(username) {
  const result = await firebaseLib
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebaseLib
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebaseLib
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}
export async function getToDoByUserId(userId) {
  const result = await firebaseLib
    .firestore()
    .collection('todos')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((listId) => ({
    ...listId.data(),
    docId: listId.id,
  }));

  return user;
}

export async function getToDo(setToDoSArray) {
  const docId = await firebaseLib
    .firestore()
    .collection('todos')
    .get()
    .then((serverUpdate) => {
      let todolist = [];
      serverUpdate.docs.forEach((doc) => {
        todolist.push(doc.data());
      });
      setToDoSArray(todolist);
    })
    .catch((error) => {
      console.error('Error to get document: ', error);
    });

  return docId;
}

export async function getNestedToDo(
  disNameArray,
  item,
  ind,
  setNestedArrayToDo,
  setArrayID
) {
  const refNested = await firebaseLib
    .firestore()
    .collection('todos')
    .doc(disNameArray[item][ind].toDoID)
    .collection('nestedToDo')
    .get()
    .then((getDoc) => {
      let nestedToDo = [];
      let arrayToDoID = [];

      getDoc.docs.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        nestedToDo.push(doc.data());
        arrayToDoID.push(doc.id);
      });

      setArrayID(arrayToDoID);
      setNestedArrayToDo(nestedToDo);
    })
    .catch((error) => {
      console.log('Error with fetching nested todo data: ', error);
    });
  return refNested;
}

export async function deleteTodo() {
  const batch = firebaseLib.firestore().batch();
  const getTodos = await firebaseLib
    .firestore()
    .collection('todos')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
        console.log(doc.ref);
      });
    });

  await batch
    .commit()
    .then((docRef) => {
      console.log('Document was deleted with ID: ', docRef);
      alert('Document was deleted with ID: ', docRef);
    })
    .catch((error) => {
      console.error('Error deleting document: ', error);
    });
  return getTodos;

  // const todoRef = doc(firebaseLib.firestore(), 'todos', 'ToDoList');
  // await updateDoc(todoRef, {
  //   title: deleteField(),
  // });

  // const test = await firebaseLib
  //   .firestore()
  //   .collection('todos')
  //   .get()
  //   .then((item) => {
  //     item.forEach((doc) => {
  //       doc.ref.delete(doc.ref);
  //       console.log(doc);
  //     });
  //   })
  //   .then((docRef) => {
  //     console.log('Document was deleted with ID: ', docRef);
  //   })
  //   .catch((error) => {
  //     console.error('Error deleting document: ', error);
  //   });

  // return test;
}

// export async function editToDo(title, toDo, displayName) {
//   const editRef = doc(firebaseLib.firestore(), 'todos', 'ToDoList');

//   await updateDoc(editRef, {
//     'toDosArray.displayName': displayName,
//     'toDosArray.timestamp': new Date().toISOString(),
//     'toDosArray.title': title,
//     'toDosArray.toDo': toDo,
//   })
//     .then((updated) => {
//       console.log('Document updated was successfully: ', updated);
//       alert('Document updated was successfully: ', updated);
//     })
//     .catch((error) => {
//       console.error('Document updated error: ', error);
//       alert('Document updated error: ', error);
//     });
// }

import { firebaseLib, FieldValue } from '../firebaseLibrary/firebaseLib';
import { updateDoc, doc, getDocs, collection } from 'firebase/firestore';
import { useEffect } from 'react';
import { async } from '@firebase/util';

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

export async function getToDo(setToDoSArray, setToDoDOC) {
  const docId = await firebaseLib
    .firestore()
    .collection('todos')
    .get()
    .then((serverUpdate) => {
      let todolist = [];
      let docID = [];
      serverUpdate.docs.forEach((doc) => {
        todolist.push(doc.data());
        docID.push(doc.id);
      });
      setToDoSArray(todolist);
      setToDoDOC(docID);
    })
    .catch((error) => {
      console.error('Error to get document: ', error);
    });

  return docId;
}

export async function getNestedToDo(setNestedArrayToDo, setArrayID) {
  const result = await firebaseLib.firestore().collection('todos').get();
  const docID = result.docs.map((listId) => ({
    ...listId.data(),
    docId: listId.id,
  }));

  // Object.keys(docID).forEach(async (nestedDoc) => {
  //   console.log(docID[nestedDoc].docId);
  // });
  var nestedToDo = [];
  var arrayToDoID = [];
  Promise.all(arrayToDoID, nestedToDo).then((get) => {
    console.log(get, 'get Data');
  });
  return Object.keys(docID).map(async (nestedDoc) => {
    console.log(docID[nestedDoc].docId);
    const refNested = await firebaseLib
      .firestore()
      .collection('todos')
      .doc(docID[nestedDoc].docId)
      .collection('nestedToDo')
      .get()
      .then((getDoc) => {
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
  });
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

import { collection, getDocs } from 'firebase/firestore';
import { firebaseLib } from '../firebaseLibrary/firebaseLib';

export async function doesUsernameExist(username) {
  const result = await firebaseLib
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}

export async function getUsername(setUserArray) {
  const docId = await firebaseLib
    .firestore()
    .collection('users')
    .get()
    .then((serverUpdate) => {
      let todolist = [];
      serverUpdate.docs.forEach((doc) => {
        todolist.push(doc.data());
      });
      setUserArray(todolist);
    })
    .catch((error) => {
      console.error('Error to get document: ', error);
    });
  return docId;
}

export async function getUserByUsername(username) {
  const result = await firebaseLib
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
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

export async function getNestedToDo(setNestedArrayToDo, setArrayID) {
  const nestedToDo = [];
  const arrayToDoID = [];
  Promise.all(arrayToDoID, nestedToDo).then((get) => {
    console.log(get, 'get Data');
  });

  const getDocTodosOne = await getDocs(
    collection(firebaseLib.firestore(), 'todos')
  );

  return getDocTodosOne.forEach(async (getDoc) => {
    let get = getDoc.id;

    const refNested = await firebaseLib
      .firestore()
      .collection('todos')
      .doc(get)
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

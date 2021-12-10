import { firebaseLib, FieldValue } from '../firebaseLibrary/firebaseLib';

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

export async function getToDo(setToDoSArray) {
  const result = await firebaseLib
    .firestore()
    .collection('todos')
    .get()
    .then((serverUpdate) => {
      let todolist = [];
      serverUpdate.docs.forEach((_doc) => {
        todolist.push(_doc.data());
      });
      setToDoSArray(todolist);
    });
  return result;
}

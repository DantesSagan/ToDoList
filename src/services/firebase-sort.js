import { collection, getDocs } from 'firebase/firestore';
import { firebaseLib } from '../firebaseLibrary/firebaseLib';

export async function DoneToDoByFalse(setToDoSArray) {
  const docId = await firebaseLib
    .firestore()
    .collection('todos')
    .where('toDosArray.doneToDo', '==', false)
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

export async function DoneToDoByTrue(setToDoSArray) {
  const docId = await firebaseLib
    .firestore()
    .collection('todos')
    .where('toDosArray.doneToDo', '==', true)
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

export async function DoneSubToDoByTrue(setNestedArrayToDo, setArrayID) {
  const nestedToDo = [];
  const arrayToDoID = [];

  const getDocTodosOne = await getDocs(
    collection(firebaseLib.firestore(), 'todos')
  );

  return getDocTodosOne.forEach(async (getDoc) => {
    let get = getDoc.id;

    const docId = await firebaseLib
      .firestore()
      .collection('todos')
      .doc(get)
      .collection('nestedToDo')
      .where('toDosArray.doneToDo', '==', true)
      .get()
      .then((serverUpdate) => {
        serverUpdate.docs.forEach((doc) => {
          nestedToDo.push(doc.data());
          arrayToDoID.push(doc.id);
        });
        setArrayID(arrayToDoID);
        setNestedArrayToDo(nestedToDo);
      })
      .catch((error) => {
        console.error('Error to get document: ', error);
      });

    return docId;
  });
}

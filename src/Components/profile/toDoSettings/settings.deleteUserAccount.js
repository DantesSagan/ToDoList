import { getAuth } from 'firebase/auth';
import { deleteUser } from 'firebase/auth';
import { useContext } from 'react';

import UserContext from '../../../context/user';
import FirebaseContext from '../../../context/firebaseContext';

import useUser from '../../../hooks/user';

export default function DeleteUserAccount() {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  const { firebaseLib } = useContext(FirebaseContext);

  const DUA = async () => {
    const userAuth = getAuth();
    const userDel = userAuth.currentUser;

    const getTodos = await firebaseLib
      .firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var userSelect = window.confirm(
            `Are you sure you want to delete this user = ${user?.username}? Вы уверены, что хотите удалить пользователя${user?.username}?`
          );
          if (userSelect === true) {
            if (doc.id === user?.username) {
              doc.ref.delete(doc.id);
            } else {
              return null;
            }
            console.log(doc.id);
          }
        });
      })
      .then((docRef) => {
        console.log('Document was deleted with ID: ', docRef);
        alert('Document was deleted with ID: ', docRef);
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });

    await deleteUser(userDel)
      .then((del) => {
        console.log('User deleted successfully: ', del);
        alert('User deleted successfully: ', del);
      })
      .catch((error) => {
        console.log('User deleted error: ', error);
        alert('User deleted error: ', error);
      });
    return getTodos;
  };
  return { DUA };
}

import { getAuth } from 'firebase/auth';
import { deleteUser } from 'firebase/auth';
import { getDocs, collection, deleteDoc } from 'firebase/firestore';
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

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );
    querySnapshot.forEach((doc) => {
      var userSelect = window.confirm(
        `Are you sure you want to delete this user = ${user?.username}? Вы уверены, что хотите удалить пользователя${user?.username}?`
      );
      return userSelect === true
        ? doc.id === user?.userId
          ? deleteDoc(doc.ref)
              .then(() => {
                console.log('Document was deleted with ID: ');
                alert('Document was deleted with ID: ');
              })
              .catch((error) => {
                console.error('Error deleting document: ', error);
              })
          : null
        : console.log(doc.id);
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
  };
  return (
    <div className='p-4 border-4 border-solid border-red-600 bg-black'>
      <h1 className='text-white text-center text-3xl p-4 underline'>DANGER ZONE!!!</h1>
      <button
        onClick={DUA}
        type='button'
        className='bg-red-700 text-white w-full rounded h-8 font-bold transition ease-in-out duration-300 hover:bg-black focus:border-red-700 border-4 border-solid'
      >
        Delete user account
      </button>
    </div>
  );
}

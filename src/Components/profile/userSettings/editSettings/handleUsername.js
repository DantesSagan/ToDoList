import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

import { doesUsernameExist } from '../../../../services/firebase';

import IndexSetting from '../index.setting';

export default function HandleUsername() {
  const { user, firebaseLib, username, setUsername, setError } = IndexSetting();
  const handleUsername = async (event) => {
    event.preventDefault();

    setUsername('');

    const auth = getAuth();
    const usernameExists = await doesUsernameExist(username);

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          username: username.toLowerCase(),
        })
          .then(() => {
            console.log('Username changed successfully: ', username);
            alert('Username changed successfully: ', username);
          })
          .catch((error) => {
            console.error('Error with username changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });

    if (!usernameExists) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then((docRef) => {
            console.log('Changes name successfully: ', user?.username);
            alert('Changes name successfully: ', docRef);
          })
          .catch((error) => {
            console.error('Error with name changes: ', error);
          });
      } catch (error) {
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
  };
  return {
    handleUsername,
    username,
    setUsername,
  };
}

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail } from 'firebase/auth';

import IndexSetting from '../index.setting';

export default function HandleEmailAddress() {
  const { user, firebaseLib, emailAddress, setEmailAddress } = IndexSetting();

  const handleEmailAddress = async (event) => {
    event.preventDefault();

    setEmailAddress('');

    const auth = getAuth();

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );
    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          emailAddress: emailAddress.toLowerCase(),
        })
          .then((docRef) => {
            console.log('Email changed successfully: ', docRef);
            alert('Email changed successfully: ', docRef);
          })
          .catch((error) => {
            console.error('Error with changed email: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });

    await updateEmail(auth.currentUser, emailAddress).then((item) => {
      console.log('Email provider changed successfully:  ', item);
      alert('Email provider changed successfully:  ', item);
    });
  };
  return {
    handleEmailAddress,
    emailAddress,
    setEmailAddress,
  };
}

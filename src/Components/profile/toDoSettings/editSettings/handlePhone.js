import IndexSetting from '../index.setting';

import { getAuth, updatePhoneNumber, } from 'firebase/auth';

import { getDocs, collection, updateDoc } from 'firebase/firestore';

export default function HandlePhone() {
  const { user, firebaseLib, phone, setPhone, setError } = IndexSetting();

  const handlePhone = async (event) => {
    event.preventDefault();

    setPhone('');

    // const auth = getAuth();

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          phone: phone,
        })
          .then(() => {
            console.log('Phone changes successfully: ', phone);
            alert('Phone changes successfully: ', phone);
          })
          .catch((error) => {
            console.error('Error with phone changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });

    // try {
    //   await updatePhoneNumber(auth.currentUser, {
    //     phoneNumber: phone,
    //   })
    //     .then((docRef) => {
    //       console.log('Phone provider changes successfully: ', docRef);
    //       alert('Phone provider changes successfully: ', docRef);
    //     })
    //     .catch((error) => {
    //       console.error('Error with phone provider changed: ', error);
    //     });
    // } catch (error) {
    //   setPhone('');
    //   setError(error.message);
    // }
  };
  return {
    handlePhone,
    phone,
    setPhone,
  };
}

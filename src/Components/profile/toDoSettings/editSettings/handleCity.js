import IndexSetting from '../index.setting';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
export default function HandleCity() {
  const { user, firebaseLib, city, setCity } = IndexSetting();

  const handleCity = async (event) => {
    event.preventDefault();

    // UPDATE INPUT WHEN A DATA WAS EDIT SUCCESSFULLY
    setCity('');

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          city: city,
        })
          .then((docRef) => {
            console.log('Changes successfully: ', docRef);
            alert('Changes successfully: ', docRef);
          })
          .catch((error) => {
            console.error('Error with changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });
  };
  return {
    handleCity,
    city,
    setCity,
  };
}

import { updateDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import IndexSetting from '../index.setting';

export default function HandleCountry() {
  const { user, firebaseLib, country, setCountry } = IndexSetting();
  const handleCountry = async (event) => {
    event.preventDefault();

    // UPDATE INPUT WHEN A DATA WAS EDIT SUCCESSFULLY
    setCountry('');

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          country: country,
        })
          .then((docRef) => {
            console.log('Country changed successfully: ', docRef);
            alert('Country changed successfully: ', docRef);
          })
          .catch((error) => {
            console.error('Error with country changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });
  };
  return {
    handleCountry,
    country,
    setCountry,
  };
}

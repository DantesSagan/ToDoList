import IndexSetting from '../index.setting';

import { getDocs, collection, updateDoc } from 'firebase/firestore';

export default function HandleGender() {
  const { user, firebaseLib, gender, setGender } = IndexSetting();
  const handleGender = async (event) => {
    event.preventDefault();

    // UPDATE INPUT WHEN A DATA WAS EDIT SUCCESSFULLY
    setGender('');

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          gender: gender,
        })
          .then(() => {
            console.log('Gender hanged successfully: ', gender);
            alert('Gender hanged successfully: ', gender);
          })
          .catch((error) => {
            console.error('Error with gender changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });
  };
  return {
    handleGender,
    gender,
    setGender,
  };
}

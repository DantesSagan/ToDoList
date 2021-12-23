import IndexSetting from '../index.setting';
import { getDocs, collection, updateDoc } from 'firebase/firestore';

export default function HandleFullName() {
  const { user, firebaseLib, fullName, setFullName } = IndexSetting();

  const handleFullName = async (event) => {
    event.preventDefault();

    setFullName('');

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          fullName,
        })
          .then(() => {
            console.log('FullName changed successfully: ', fullName);
            alert('FullName changes successfully: ', fullName);
          })
          .catch((error) => {
            console.error('Error with fullName changes: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });
  };
  return {
    handleFullName,
    fullName,
    setFullName,
  };
}

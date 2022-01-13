import IndexSetting from '../index.setting';

import { getDocs, collection, updateDoc } from 'firebase/firestore';

export default function HandleGender() {
  const { user, firebaseLib, gender, setGender } = IndexSetting();
  const isInvalidGender = gender === '';
  
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
  return (
    <div className={`${isInvalidGender && 'opacity-60'}`}>
      <input
        placeholder='Gender/sex/floor/ground xd'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setGender(target.value)}
        type='text'
        checked
        value={gender}
      />
      <button
        disabled={isInvalidGender}
        className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
        type='submit'
        onClick={handleGender}
      >
        Change gender
      </button>
    </div>
  );
}

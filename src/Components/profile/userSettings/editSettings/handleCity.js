import IndexSetting from '../index.setting';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
export default function HandleCity() {
  const { user, firebaseLib, city, setCity } = IndexSetting();
  const isInvalidCity = city === '';
  
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
            console.log('City changed successfully: ', docRef);
            alert('City changed successfully: ', docRef);
          })
          .catch((error) => {
            console.error('Error with city changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });
  };

  return (
    <div className={`${isInvalidCity && 'opacity-60'}`}>
      <input
        aria-label='Enter your city'
        type='text'
        placeholder='City'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setCity(target.value)}
        value={city}
      />
      <button
        disabled={isInvalidCity}
        className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
        type='submit'
        onClick={handleCity}
      >
        Change city
      </button>
    </div>
  );
}

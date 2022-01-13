import { updateDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import IndexSetting from '../index.setting';

export default function HandleCountry() {
  const { user, firebaseLib, country, setCountry } = IndexSetting();
  const isInvalidCountry = country === '';
  
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
  return (
    <div className={`${isInvalidCountry && 'opacity-60'}`}>
      <input
        aria-label='Enter your Country'
        type='text'
        placeholder='Country'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setCountry(target.value)}
        value={country}
      />{' '}
      <button
        disabled={isInvalidCountry}
        className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
        type='submit'
        onClick={handleCountry}
      >
        Change country
      </button>
    </div>
  );
}

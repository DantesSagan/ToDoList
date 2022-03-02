import IndexSetting from '../index.setting';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { getUsername } from '../../../../services/firebase';
export default function HandleCity() {
  const { user, firebaseLib, city, setCity, userArray, setUserArray } =
    IndexSetting();
  const isInvalidCity = city === '';

  useEffect(() => {
    getUsername(setUserArray);
  }, []);

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

  const CityDisplay = Object.keys(userArray).map((secondArray) => {
    let currentDisplayedCity = userArray[secondArray].city;
    let currentUserID = user?.userId === userArray[secondArray].userId;
    return (
      <div>
        {currentUserID ? (
          <section className='border border-red-500 mb-2 p-1'>
            {' '}
            <h1 className='text-center underline text-3xl mb-2'>City</h1>
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <input
                placeholder={
                  !currentDisplayedCity ? 'Gender' : currentDisplayedCity
                }
                className='col-span-3 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setCity(target.value)}
                type='text'
                checked
                value={city}
              />
              <button
                disabled={isInvalidCity}
                className={`bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold ${
                  isInvalidCity && 'opacity-60'
                }`}
                type='submit'
                onClick={handleCity}
              >
                Change city
              </button>
            </div>{' '}
          </section>
        ) : null}
      </div>
    );
  });
  return CityDisplay;
}

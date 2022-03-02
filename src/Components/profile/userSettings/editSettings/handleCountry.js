import { updateDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { useEffect } from 'react';
import { getUsername } from '../../../../services/firebase';

import IndexSetting from '../index.setting';

export default function HandleCountry() {
  const { user, firebaseLib, country, setCountry, userArray, setUserArray } =
    IndexSetting();
  const isInvalidCountry = country === '';

  useEffect(() => {
    getUsername(setUserArray);
  }, []);

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

  const CountryDisplay = Object.keys(userArray).map((secondArray) => {
    let currentDisplayedCountry = userArray[secondArray].country;
    let currentUserID = user?.userId === userArray[secondArray].userId;
    return (
      <div>
        {currentUserID ? (
          <section className='border border-red-500 mb-2 p-1'>
            {' '}
            <h1 className='text-center underline text-3xl mb-2'>Country</h1>
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <input
                placeholder={
                  !currentDisplayedCountry ? 'Gender' : currentDisplayedCountry
                }
                className='col-span-3 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setCountry(target.value)}
                type='text'
                checked
                value={country}
              />
              <button
                disabled={isInvalidCountry}
                className={`bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold ${
                  isInvalidCountry && 'opacity-60'
                }`}
                type='submit'
                onClick={handleCountry}
              >
                Change country
              </button>
            </div>{' '}
          </section>
        ) : null}
      </div>
    );
  });
  return CountryDisplay;
}

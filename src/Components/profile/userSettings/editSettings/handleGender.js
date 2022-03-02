import IndexSetting from '../index.setting';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { getUsername } from '../../../../services/firebase';

export default function HandleGender() {
  const { user, firebaseLib, gender, setGender, userArray, setUserArray } =
    IndexSetting();
  const isInvalidGender = gender === '';

  useEffect(() => {
    getUsername(setUserArray);
  }, []);

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
            console.log('Gender changed successfully: ', gender);
            alert('Gender changed successfully: ', gender);
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

  const GenderDisplay = Object.keys(userArray).map((secondArray) => {
    let currentDisplayGender = userArray[secondArray].gender;
    let currentUserID = user?.userId === userArray[secondArray].userId;
    return (
      <div>
        {currentUserID ? (
          <section className='border border-red-500 mb-2 p-1'>
            {' '}
            <h1 className='text-center underline text-3xl mb-2'>Gender</h1>
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <input
                placeholder={
                  !currentDisplayGender ? 'Gender' : currentDisplayGender
                }
                className='col-span-3 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setGender(target.value)}
                type='text'
                checked
                value={gender}
              />
              <button
                disabled={isInvalidGender}
                className={`bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold ${
                  isInvalidGender && 'opacity-60'
                }`}
                type='submit'
                onClick={handleGender}
              >
                Change gender
              </button>
            </div>{' '}
          </section>
        ) : null}
      </div>
    );
  });
  return GenderDisplay;
}

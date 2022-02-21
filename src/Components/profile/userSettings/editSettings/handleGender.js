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

  const UsernameDisplay = Object.keys(userArray).map((secondArray) => {
    let currentAuthUsername = userArray[secondArray].gender;
    return (
      <div>
        {user?.userId === userArray[secondArray].userId ? (
          <section>
            <div className='pb-2 '>
              Current floor -{' '}
              <span className='font-bold'>{currentAuthUsername}</span>
            </div>
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
          </section>
        ) : null}
      </div>
    );
  });
  return UsernameDisplay;
}

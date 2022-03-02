import IndexSetting from '../index.setting';
import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { getUsername } from '../../../../services/firebase';

export default function HandleFullName() {
  const { user, firebaseLib, fullName, setFullName, userArray, setUserArray } =
    IndexSetting();
  const isInvalidFullName = fullName === '';

  useEffect(() => {
    getUsername(setUserArray);
  }, []);

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
            alert('FullName changed successfully: ', fullName);
          })
          .catch((error) => {
            console.error('Error with FullName changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });
  };

  const FullNameDisplay = Object.keys(userArray).map((secondArray) => {
    let currentDisplayFullName = userArray[secondArray].fullName;
    let currentUserID = user?.userId === userArray[secondArray].userId;
    return (
      <div>
        {currentUserID ? (
          <section className='border border-red-500 mb-2 p-1'>
            {' '}
            <h1 className='text-center underline text-3xl mb-2'>Full Name</h1>
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <input
                placeholder={
                  !currentDisplayFullName ? 'Gender' : currentDisplayFullName
                }
                className='col-span-3 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setFullName(target.value)}
                type='text'
                checked
                value={fullName}
              />
              <button
                disabled={isInvalidFullName}
                className={`bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold ${
                  isInvalidFullName && 'opacity-60'
                }`}
                type='submit'
                onClick={handleFullName}
              >
                Change full name
              </button>
            </div>{' '}
          </section>
        ) : null}
      </div>
    );
  });
  return FullNameDisplay;
}

import IndexSetting from '../index.setting';

import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getUsername } from '../../../../services/firebase';
import { useEffect } from 'react';
import { getAuth, updatePhoneNumber } from 'firebase/auth';

export default function HandlePhone() {
  const {
    user,
    firebaseLib,
    phone,
    setPhone,
    userArray,
    setUserArray,
    setError,
  } = IndexSetting();
  const isInvalidPhone = phone === '';

  useEffect(() => {
    getUsername(setUserArray);
  }, []);

  const auth = getAuth();

  const handlePhone = async (event) => {
    event.preventDefault();

    setPhone('');

    // const auth = getAuth();

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          phone: phone,
        })
          .then(() => {
            console.log('Phone changed successfully: ', phone);
            alert('Phone changed successfully: ', phone);
          })
          .catch((error) => {
            console.error('Error with phone changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });

    // try {
    //   await updatePhoneNumber(auth.currentUser, {
    //     phoneNumber: phone,
    //   })
    //     .then((docRef) => {
    //       console.log('Phone provider changes successfully: ', docRef);
    //       alert('Phone provider changes successfully: ', docRef);
    //     })
    //     .catch((error) => {
    //       console.error('Error with phone provider changed: ', error);
    //     });
    // } catch (error) {
    //   setPhone('');
    //   setError(error.message);
    // }
  };
  const PhoneDisplay = Object.keys(userArray).map((secondArray) => {
    let currentDisplayPhone = userArray[secondArray].phone;
    let currentUserID = user?.userId === userArray[secondArray].userId;

    return (
      <div>
        {currentUserID ? (
          <section className='border border-red-500 mb-2 p-1'>
            {' '}
            <h1 className='text-center underline text-3xl mb-2'>Phone</h1>
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <input
                placeholder={
                  !currentDisplayPhone ? 'Gender' : currentDisplayPhone
                }
                className='col-span-3 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setPhone(target.value)}
                type='text'
                checked
                value={phone}
              />
              <button
                disabled={isInvalidPhone}
                className={`bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold ${
                  isInvalidPhone && 'opacity-60'
                }`}
                type='submit'
                onClick={handlePhone}
              >
                Change phone
              </button>
            </div>{' '}
          </section>
        ) : null}
      </div>
    );
  });
  return PhoneDisplay;
}

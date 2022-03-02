import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail } from 'firebase/auth';

import IndexSetting from '../index.setting';
import { useEffect } from 'react';
import { getUsername } from '../../../../services/firebase';

export default function HandleEmailAddress() {
  const {
    user,
    firebaseLib,
    emailAddress,
    setEmailAddress,
    userArray,
    setUserArray,
  } = IndexSetting();
  const isInvalidEmailAddress = emailAddress === '';

  useEffect(() => {
    getUsername(setUserArray);
  }, []);

  const handleEmailAddress = async (event) => {
    event.preventDefault();

    setEmailAddress('');

    const auth = getAuth();

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );
    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          emailAddress: emailAddress.toLowerCase(),
        })
          .then((docRef) => {
            console.log('Email changed successfully: ', emailAddress);
            alert('Email changed successfully: ', emailAddress);
          })
          .catch((error) => {
            console.error('Error with email changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });

    await updateEmail(auth.currentUser, emailAddress).then((item) => {
      console.log('Email provider changed successfully:  ', item);
      alert('Email provider changed successfully:  ', item);
    });
  };

  const EmailDisplay = Object.keys(userArray).map((secondArray) => {
    let currentDisplayedEmail = userArray[secondArray].emailAddress;
    let currentUserID = user?.userId === userArray[secondArray].userId;

    return (
      <div>
        {currentUserID ? (
          <section className='border border-red-500 mb-2 p-1'>
            {' '}
            <h1 className='text-center underline text-3xl mb-2'>Email Address</h1>
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <input
                placeholder={
                  !currentDisplayedEmail ? 'Gender' : currentDisplayedEmail
                }
                className='col-span-3 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                onChange={({ target }) => setEmailAddress(target.value)}
                type='text'
                checked
                value={emailAddress}
              />
              <button
                disabled={isInvalidEmailAddress}
                className={`bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold ${
                  isInvalidEmailAddress && 'opacity-60'
                }`}
                type='submit'
                onClick={handleEmailAddress}
              >
                Change email address
              </button>
            </div>{' '}
          </section>
        ) : null}
      </div>
    );
  });
  return EmailDisplay;
}

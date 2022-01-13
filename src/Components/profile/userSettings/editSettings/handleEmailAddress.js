import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail } from 'firebase/auth';

import IndexSetting from '../index.setting';

export default function HandleEmailAddress() {
  const { user, firebaseLib, emailAddress, setEmailAddress } = IndexSetting();
  const isInvalidEmailAddress = emailAddress === '';

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
  return (
    <div className={`${isInvalidEmailAddress && 'opacity-60'}`}>
      <input
        minLength={6}
        maxLength={50}
        aria-label='Enter your email address'
        type='email'
        placeholder='Change you email address'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setEmailAddress(target.value)}
        value={emailAddress}
      />
      <button
        className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
        type='submit'
        onClick={handleEmailAddress}
      >
        Change email address
      </button>
    </div>
  );
}
